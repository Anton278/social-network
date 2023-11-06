import ChatTopBar from "@/components/ChatTopBar";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import * as chatThunks from "../../src/redux/slices/chats/thunks";

const pushMock = jest.fn();
jest.mock("../../src/pages/_app");
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { id: "chat-id" },
      asPath: "",
      push: pushMock,
    };
  },
}));
jest.mock("../../src/redux/slices/chats/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/chats/thunks"),
  };
});
const deleteChatSpy = jest.spyOn(chatThunks, "deleteChat");

afterEach(() => {
  jest.clearAllMocks();
});

describe("ChatTopBar", () => {
  it("should work back button", () => {
    renderWithRedux(
      <ChatTopBar
        interlocutor={{ fullName: "John Doe", id: "", username: "" }}
      />
    );
    const backBtn = screen.getByTestId("back-btn");
    fireEvent.click(backBtn);
    expect(pushMock).toHaveBeenCalledWith("/chats");
  });

  it("call delete thunk with chat id", async () => {
    renderWithRedux(
      <ChatTopBar
        interlocutor={{ fullName: "John Doe", id: "", username: "" }}
      />
    );
    const moreBtn = screen.getByTestId("more-btn");
    fireEvent.click(moreBtn);
    const deleteBtn = await screen.findByTestId("delete-btn");
    fireEvent.click(deleteBtn);
    expect(deleteChatSpy).toHaveBeenCalledWith("chat-id");
  });
});
