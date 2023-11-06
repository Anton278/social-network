import ChatSummary from "@/components/ChatSummary";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import * as chatThunks from "../../src/redux/slices/chats/thunks";
import { RequestStatus } from "@/models/RequestStatus";

jest.mock("../../src/pages/_app");
jest.mock("../../src/redux/slices/chats/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/chats/thunks"),
  };
});
const deleteChatSpy = jest.spyOn(chatThunks, "deleteChat");

describe("ChatSummary", () => {
  it("should call delete thunk with id", async () => {
    renderWithRedux(
      <ChatSummary
        id="chat-id"
        interlocutor={{ fullName: "", id: "", username: "" }}
        lastMessage=""
      />,
      {
        chats: {
          chats: [
            {
              createdAt: "",
              id: "chat-id",
              lastMessage: "",
              messages: [],
              participants: [],
            },
          ],
          status: RequestStatus.IDLE,
        },
      }
    );
    const moreMenuBtn = screen.getByTestId("more-menu-btn");
    fireEvent.click(moreMenuBtn);
    const deleteBtn = await screen.findByTestId("delete-btn");
    fireEvent.click(deleteBtn);
    expect(deleteChatSpy.mock.calls[0][0]).toBe("chat-id");
  });
});
