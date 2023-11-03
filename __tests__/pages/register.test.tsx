import { fireEvent, screen } from "@testing-library/react";
import Register from "../../src/pages/register";
import { User } from "@/models/User";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { RequestStatus } from "../../src/models/RequestStatus";

import usersService from "../../src/services/Users";
import authService from "../../src/services/Auth";
import { fillRegisterPageInputs } from "@/utils/fillRegisterPageInputs";

jest.mock("../../src/services/Users");
jest.mock("../../src/services/Auth");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const existingUser: User = {
  email: "johndoe@gmail.com",
  friends: [],
  fullName: "John Doe",
  id: "",
  receivedFriendsRequests: [],
  sentFriendsRequests: [],
  username: "john123",
  chats: [],
};
// @ts-expect-error
usersService.getAll.mockResolvedValue([existingUser]);
// @ts-expect-error
usersService.create.mockImplementation(() => {
  return Promise.reject("");
});
// @ts-expect-error
authService.register.mockImplementation(() => {
  return Promise.resolve({ user: { uid: "" } });
});

describe("register page form", () => {
  it("should return error if username taken", async () => {
    renderWithRedux(<Register />, {
      auth: { isAuthed: false, status: RequestStatus.IDLE },
    });

    fillRegisterPageInputs();

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt.innerHTML).toBe("User with this username already exist");
  });

  it("should return error if email taken", async () => {
    renderWithRedux(<Register />, {
      auth: { isAuthed: false, status: RequestStatus.IDLE },
    });

    fillRegisterPageInputs("john007");

    // @ts-expect-error
    authService.register.mockImplementationOnce(() =>
      Promise.reject({ code: "auth/email-already-in-use" })
    );

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt.innerHTML).toBe("Error: Email already in use");
  });

  it("should delete user from firebase auth if occured error on creating user", async () => {
    renderWithRedux(<Register />, {
      auth: { isAuthed: false, status: RequestStatus.IDLE },
    });

    fillRegisterPageInputs("john007", "johndoe2@gmail.com");

    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt.innerHTML).toBe("Failed to create user");

    // @ts-expect-error
    expect(authService.delete.mock.calls).toEqual([[]]);
  });
});
