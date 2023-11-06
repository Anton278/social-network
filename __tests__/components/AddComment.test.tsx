import AddComment from "@/components/AddComment";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import * as postsThunks from "../../src/redux/slices/posts/thunks";
import { RequestStatus } from "@/models/RequestStatus";

jest.mock("../../src/pages/_app");
jest.mock("../../src/redux/slices/posts/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/posts/thunks"),
  };
});
const updatePostSpy = jest.spyOn(postsThunks, "updatePost");

describe("AddComment", () => {
  it("should disable send button if input is empty", () => {
    renderWithRedux(<AddComment comments={[]} postId="post-id" />);
    const input = screen.getByLabelText("Add comment");
    const sendBtn = screen.getByTestId("send-btn");
    expect(sendBtn).toBeDisabled();
    fireEvent.input(input, { target: { value: "123" } });
    expect(sendBtn).not.toBeDisabled();
    fireEvent.input(input, { target: { value: "" } });
    expect(sendBtn).toBeDisabled();
  });

  it("should call add comment thunk", () => {
    renderWithRedux(<AddComment comments={[]} postId="post-id" />, {
      user: {
        email: "",
        friends: [],
        fullName: "John Doe",
        id: "user-id",
        receivedFriendsRequests: [],
        sentFriendsRequests: [],
        status: RequestStatus.IDLE,
        username: "john001",
      },
    });
    const input = screen.getByLabelText("Add comment");
    const sendBtn = screen.getByTestId("send-btn");
    fireEvent.input(input, { target: { value: "test comment" } });
    fireEvent.click(sendBtn);
    // ignore comment timestamp
    // @ts-ignore
    delete updatePostSpy.mock.calls[0][0].comments[0].timestamp;
    expect(updatePostSpy).toHaveBeenCalledWith({
      id: "post-id",
      comments: [
        {
          comment: "test comment",
          author: {
            fullName: "John Doe",
            id: "user-id",
            username: "john001",
          },
          id: 1,
          isEdited: false,
        },
      ],
    });
  });
});
