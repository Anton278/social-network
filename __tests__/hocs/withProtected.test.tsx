import { withProtected } from "@/hocs/withProtected";
import { RequestStatus } from "@/models/RequestStatus";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { screen } from "@testing-library/react";

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

describe("withPublic HOC", () => {
  it("should show loading indicator if auth status loading", () => {
    const WithPtotectedFC = withProtected(() => null);
    renderWithRedux(<WithPtotectedFC />);

    const loadingTxt = screen.getByTestId("loading-txt");
    expect(loadingTxt).toBeInTheDocument();
  });

  it("should return component if user is authed", () => {
    const WithPtotectedFC = withProtected(() => (
      <h1 data-testid="test-txt">FC Component</h1>
    ));
    renderWithRedux(<WithPtotectedFC />, {
      auth: { status: RequestStatus.IDLE, isAuthed: true },
    });

    const testTxt = screen.getByTestId("test-txt");
    expect(testTxt).toBeInTheDocument();
  });

  it("should redirect to /login if user is not authed", () => {
    const WithPtotectedFC = withProtected(() => null);
    renderWithRedux(<WithPtotectedFC />, {
      auth: { status: RequestStatus.IDLE, isAuthed: false },
    });

    const redirectTxt = screen.getByTestId("redirect-txt");
    expect(redirectTxt).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
