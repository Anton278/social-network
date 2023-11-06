import ChatBottomBar from "@/components/ChatBottomBar";
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
const spy = jest.spyOn(chatThunks, "addMessage");

describe("ChatBottomBar component", () => {
  it("should disable button if input empty", () => {
    renderWithRedux(<ChatBottomBar id="test-chat" lastMessageId={undefined} />);
    const input = screen.getByLabelText("Send message");
    const sendBtn = screen.getByText("Send");
    expect(sendBtn).toBeDisabled();
    fireEvent.input(input, { target: { value: "test message 1" } });
    expect(sendBtn).not.toBeDisabled();
    fireEvent.input(input, { target: { value: "" } });
    expect(sendBtn).toBeDisabled();
  });

  it("should call thunk with proper args", () => {
    renderWithRedux(
      <ChatBottomBar id="test-chat" lastMessageId={undefined} />,
      {
        user: {
          chats: [],
          email: "",
          friends: [],
          fullName: "",
          id: "user-id_1",
          receivedFriendsRequests: [],
          sentFriendsRequests: [],
          status: RequestStatus.IDLE,
          username: "",
        },
      }
    );
    const input = screen.getByLabelText("Send message");
    const sendBtn = screen.getByText("Send");
    fireEvent.input(input, { target: { value: "test message 1" } });
    fireEvent.click(sendBtn);

    // ignore message timestamp
    // @ts-ignore
    delete spy.mock.calls[0][0].message.timeStamp;

    expect(spy.mock.calls[0][0]).toEqual({
      id: "test-chat",
      message: {
        authorId: "user-id_1",
        message: "test message 1",
        isEdited: false,
        id: 1,
      },
    });
  });
});
