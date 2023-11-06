import EditComment from "@/components/EditComment";
import { renderWithRedux } from "@/utils/renderWithRedux";
import * as postsThunks from "../../src/redux/slices/posts/thunks";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("../../src/pages/_app");
jest.mock("../../src/redux/slices/posts/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/posts/thunks"),
  };
});
const updatePostSpy = jest.spyOn(postsThunks, "updatePost");

afterEach(() => {
  jest.clearAllMocks();
});

describe("EditComment", () => {
  it("should call onCancel handler", () => {
    const onCancel = jest.fn();
    renderWithRedux(
      <EditComment
        comment=""
        commentId={1}
        comments={[]}
        postId=""
        onCancel={onCancel}
      />
    );
    const cancelBtn = screen.getByTestId("cancel-btn");
    fireEvent.click(cancelBtn);
    expect(onCancel).toHaveBeenCalled();
  });

  it("should disable save button if input is empty or comment isn't changed", () => {
    renderWithRedux(
      <EditComment
        comment="orig comment"
        commentId={1}
        comments={[]}
        postId=""
      />
    );
    const input = screen.getByLabelText("Edit");
    const saveBtn = screen.getByTestId("save-btn");
    expect(saveBtn).toBeDisabled();
    fireEvent.input(input, { target: { value: "123" } });
    expect(saveBtn).not.toBeDisabled();
    fireEvent.input(input, { target: { value: "orig comment" } });
    expect(saveBtn).toBeDisabled();
  });

  it("call update post thunk with new values", () => {
    const onUpdated = jest.fn();
    renderWithRedux(
      <EditComment
        comment="orig comment"
        commentId={1}
        comments={[
          {
            author: { fullName: "", id: "", username: "" },
            comment: "orig comment",
            id: 1,
            isEdited: false,
            timestamp: 0,
          },
        ]}
        postId="post-id"
        onUpdated={onUpdated}
      />
    );
    const input = screen.getByLabelText("Edit");
    const saveBtn = screen.getByTestId("save-btn");
    fireEvent.input(input, { target: { value: "edited comment" } });
    fireEvent.click(saveBtn);
    expect(updatePostSpy).toHaveBeenCalledWith({
      id: "post-id",
      comments: [
        {
          author: { fullName: "", id: "", username: "" },
          comment: "edited comment",
          id: 1,
          isEdited: true,
          timestamp: 0,
        },
      ],
    });
  });
});
