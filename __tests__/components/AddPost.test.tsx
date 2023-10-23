import AddPost from "@/components/AddPost";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";
import postsService from "../../src/services/Posts";
import { RequestStatus } from "@/models/RequestStatus";
import { serverTimestamp } from "firebase/firestore";

jest.mock("../../src/services/Posts");

describe("Add post", () => {
  it("should dispatch thunk with proper arg on submit and clear input after", async () => {
    const post = {
      author: {
        fullName: "John Doe",
        id: "1",
        username: "john001",
      },
      body: "This is a test post 1",
      comments: [],
      //@ts-expect-error
      timeStamp: { seconds: Date.now / 1000 },
      isPrivate: true,
      isEdited: false,
    };

    //@ts-expect-error
    postsService.create.mockImplementation(() => Promise.resolve(post));

    renderWithRedux(<AddPost />, {
      user: {
        email: "",
        friends: [],
        fullName: "John Doe",
        id: "1",
        receivedFriendsRequests: [],
        sentFriendsRequests: [],
        status: RequestStatus.IDLE,
        username: "john001",
      },
    });

    const input = screen.getByLabelText<HTMLInputElement>(
      "What you want to tell?"
    );
    fireEvent.input(input, {
      target: {
        value: "This is a test post 1",
      },
    });

    const isPrivateCheckbox = screen.getByLabelText("Only for friends");
    fireEvent.click(isPrivateCheckbox);

    const submitBtn = screen.getByTestId<HTMLButtonElement>("submit-btn");
    submitBtn.click();

    const sendIcon = await screen.findByTestId("send-icon");
    // @ts-expect-error
    expect(postsService.create.mock.calls[0][0]).toEqual({
      ...post,
      timeStamp: serverTimestamp(),
    });
    expect(input.value).toBe("");
  });

  it("should dispatch thunk with proper arg on submit", async () => {
    //@ts-expect-error
    postsService.create.mockImplementation(() => Promise.reject(""));

    renderWithRedux(<AddPost />);

    const input = screen.getByLabelText<HTMLInputElement>(
      "What you want to tell?"
    );
    fireEvent.input(input, {
      target: {
        value: "This is a test post 1",
      },
    });

    const submitBtn = screen.getByTestId<HTMLButtonElement>("submit-btn");
    submitBtn.click();

    const errorTxt = await screen.findByTestId("error-txt");
    expect(errorTxt).toBeInTheDocument();
  });
});
