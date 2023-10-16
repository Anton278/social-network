import { withPublic } from "@/hocs/withPublic";
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
    const WithPublicFC = withPublic(() => null);
    renderWithRedux(<WithPublicFC />);

    const loadingTxt = screen.getByTestId("loading-txt");
    expect(loadingTxt).toBeInTheDocument();
  });

  it("should return component if user is not authed", () => {
    const WithPublicFC = withPublic(() => (
      <h1 data-testid="test-txt">FC Component</h1>
    ));
    renderWithRedux(<WithPublicFC />, {
      auth: { status: RequestStatus.IDLE, isAuthed: false },
    });

    const testTxt = screen.getByTestId("test-txt");
    expect(testTxt).toBeInTheDocument();
  });

  it("should redirect to /posts if user authed", () => {
    const WithPublicFC = withPublic(() => (
      <h1 data-testid="test-txt">FC Component</h1>
    ));
    renderWithRedux(<WithPublicFC />, {
      auth: { status: RequestStatus.IDLE, isAuthed: true },
    });

    const redirectTxt = screen.getByTestId("redirect-txt");
    expect(redirectTxt).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
