import Header from "@/components/Header";
import { RequestStatus } from "@/models/RequestStatus";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import authService from "../../src/services/Auth";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: pushMock,
    };
  },
}));

jest.mock("../../src/services/Auth");

describe("Header", () => {
  it("should show register and login buttons if user is not authed", () => {
    renderWithRedux(<Header />);

    const registerOrLoginBox = screen.getByTestId("register-or-login-box");
    expect(registerOrLoginBox).toBeInTheDocument();
  });

  it("should show logout button and logout on click on it", async () => {
    renderWithRedux(<Header />, {
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const logoutBtn = screen.getByTestId("logout-btn");
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
    expect(authService.logout).toHaveBeenCalled();
  });
});
