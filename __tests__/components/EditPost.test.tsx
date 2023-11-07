import EditPost from "@/components/EditPost";
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

describe("EditPost", () => {
  it("should disable button if value not changed or empty", async () => {
    renderWithRedux(
      <EditPost
        open={true}
        originalIsPrivate={false}
        postId="post-id"
        originalText="test post"
      />
    );
    const input = screen.getByLabelText("Edit post");
    const saveBtn = screen.getByTestId("save-btn");
    const isPrivateCheckbox = screen.getByLabelText("Only for friends");
    expect(saveBtn).toBeDisabled();
    fireEvent.input(input, { target: { value: "123" } });
    expect(saveBtn).not.toBeDisabled();
    fireEvent.input(input, { target: { value: "   " } });
    expect(saveBtn).toBeDisabled();
    fireEvent.input(input, { target: { value: "test post" } });
    fireEvent.click(isPrivateCheckbox);
    expect(saveBtn).not.toBeDisabled();
  });

  it("should call update post thunk", () => {
    renderWithRedux(
      <EditPost
        open={true}
        originalIsPrivate={false}
        postId="post-id"
        originalText="test post"
      />
    );
    const input = screen.getByLabelText("Edit post");
    fireEvent.input(input, { target: { value: "edited test post" } });
    const isPrivateCheckbox = screen.getByLabelText("Only for friends");
    fireEvent.click(isPrivateCheckbox);
    const saveBtn = screen.getByTestId("save-btn");
    fireEvent.click(saveBtn);
    expect(updatePostSpy).toHaveBeenCalledWith({
      id: "post-id",
      body: "edited test post",
      isPrivate: true,
      isEdited: true,
    });
  });
});
