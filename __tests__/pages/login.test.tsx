import { renderWithRedux } from "@/utils/renderWithRedux";
import Login from "../../src/pages/login";
import { RequestStatus } from "@/models/RequestStatus";
import { screen, fireEvent } from "@testing-library/react";
import authService from "../../src/services/Auth";
import usersService from "../../src/services/Users";

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

jest.mock("../../src/services/Auth");
jest.mock("../../src/services/Users");

describe("login page", () => {
  it("should show error if wrong email or password", async () => {
    renderWithRedux(<Login />, {
      auth: { isAuthed: false, status: RequestStatus.IDLE },
    });

    const emailOrUsernameInp = screen.getByLabelText("Email or Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.input(emailOrUsernameInp, {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "123" },
    });

    const loginBtn = screen.getByTestId("login-btn");

    //@ts-expect-error
    authService.login.mockImplementationOnce(() =>
      Promise.reject({ code: "auth/user-not-found" })
    );

    fireEvent.click(loginBtn);

    const errorTxt = await screen.findByTestId("error");
    expect(errorTxt.innerHTML).toBe("Wrong email or password");
  });

  it("should show error if wrong username or password", async () => {
    renderWithRedux(<Login />, {
      auth: { isAuthed: false, status: RequestStatus.IDLE },
    });

    const emailOrUsernameInp = screen.getByLabelText("Email or Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.input(emailOrUsernameInp, {
      target: { value: "john001" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "123" },
    });

    const loginBtn = screen.getByTestId("login-btn");

    //@ts-expect-error
    usersService.getAll.mockImplementationOnce(() => Promise.resolve([]));

    fireEvent.click(loginBtn);

    const errorTxt = await screen.findByTestId("error");
    expect(errorTxt.innerHTML).toBe("Wrong username or password");
  });
});
