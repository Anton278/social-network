import { renderWithRedux } from "@/utils/renderWithRedux";
import Comment from "@/components/Comment";
import { RequestStatus } from "@/models/RequestStatus";
import { fireEvent, screen } from "@testing-library/react";
import * as postsThunks from "../../src/redux/slices/posts/thunks";

jest.mock("../../src/pages/_app");
jest.mock("../../src/redux/slices/posts/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/posts/thunks"),
  };
});
const deleteCommentSpy = jest.spyOn(postsThunks, "deleteComment");

describe("Comment", () => {
  it("should call delete comment thunk", async () => {
    renderWithRedux(
      <Comment
        author={{ id: "author-id", fullName: "John Doe", username: "" }}
        comment=""
        id={1}
        isEdited={false}
        onEditClick={() => {}}
        postId="post-id"
        timestamp={0}
      />,
      {
        user: {
          id: "author-id",
          email: "",
          friends: [],
          fullName: "",
          receivedFriendsRequests: [],
          sentFriendsRequests: [],
          status: RequestStatus.IDLE,
          username: "",
        },
      }
    );
    const moreBtn = screen.getByTestId("more-btn");
    fireEvent.click(moreBtn);
    const deleteBtn = await screen.findByTestId("delete-btn");
    fireEvent.click(deleteBtn);
    expect(deleteCommentSpy).toHaveBeenCalledWith({
      postId: "post-id",
      commentId: 1,
    });
  });

  it("not display more button if comment author different", async () => {
    renderWithRedux(
      <Comment
        author={{ id: "author-id", fullName: "John Doe", username: "" }}
        comment=""
        id={1}
        isEdited={false}
        onEditClick={() => {}}
        postId="post-id"
        timestamp={0}
      />,
      {
        user: {
          id: "not-author-id",
          email: "",
          friends: [],
          fullName: "",
          receivedFriendsRequests: [],
          sentFriendsRequests: [],
          status: RequestStatus.IDLE,
          username: "",
        },
      }
    );
    const moreBtn = screen.queryByTestId("more-btn");
    expect(moreBtn).toBeNull();
  });
});
