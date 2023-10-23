import Posts from "@/pages/posts";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { screen } from "@testing-library/react";
import postsService from "../../src/services/Posts";
import { Post } from "@/models/Post";
import type { Timestamp } from "firebase/firestore";
import { RequestStatus } from "@/models/RequestStatus";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

jest.mock("../../src/services/Posts");

const testPosts: Post[] = [
  {
    author: { fullName: "John Doe", id: "1", username: "john001" },
    body: "Test post 1",
    comments: [],
    timeStamp: {
      seconds: Date.now() / 1000,
      nanoseconds: 0,
    } as Timestamp,
    isPrivate: false,
    id: "1",
    isEdited: false,
  },
  {
    author: { fullName: "Calvin C Chandler", id: "2", username: "calvin001" },
    body: "Test post 2",
    comments: [],
    timeStamp: {
      seconds: Date.now() / 1000 - 86400,
      nanoseconds: 0,
    } as Timestamp,
    isPrivate: false,
    id: "2",
    isEdited: false,
  },
];

const friendsPosts: Post[] = [
  {
    author: { fullName: "John Doe", id: "1", username: "john001" },
    body: "Test post 1",
    comments: [],
    timeStamp: { seconds: Date.now() / 1000, nanoseconds: 0 } as Timestamp,
    isPrivate: false,
    id: "1",
    isEdited: false,
  },
  {
    author: { fullName: "Calvin C Chandler", id: "2", username: "calvin001" },
    body: "Test post 2",
    comments: [],
    timeStamp: { seconds: Date.now() / 1000, nanoseconds: 0 } as Timestamp,
    isPrivate: true,
    id: "2",
    isEdited: false,
  },
];

const otherUsersPosts: Post[] = [
  {
    author: { fullName: "Robert C Foster", id: "4", username: "robert001" },
    body: "Test post 3",
    comments: [],
    timeStamp: { seconds: Date.now() / 1000, nanoseconds: 0 } as Timestamp,
    isPrivate: false,
    id: "3",
    isEdited: false,
  },
  {
    author: { fullName: "Darlene E Perez", id: "5", username: "perez001" },
    body: "Test post 4",
    comments: [],
    timeStamp: { seconds: Date.now() / 1000, nanoseconds: 0 } as Timestamp,
    isPrivate: true,
    id: "4",
    isEdited: false,
  },
];

const user = {
  status: RequestStatus.IDLE,
  email: "maude.kin9@hotmail.com",
  username: "thomas001",
  id: "3",
  fullName: "Thomas E Kincaid",
  friends: [
    { fullName: "John Doe", id: "1", username: "john001" },
    { fullName: "Calvin C Chandler", id: "2", username: "calvin001" },
  ],
  sentFriendsRequests: [],
  receivedFriendsRequests: [],
};

describe("Posts page", () => {
  it("should map friends posts", async () => {
    // @ts-expect-error
    postsService.getAll.mockImplementationOnce(() =>
      Promise.resolve(friendsPosts)
    );

    renderWithRedux(<Posts />, {
      user,
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();

    const posts = await screen.findAllByTestId("post");
    expect(posts.length).toBe(2);
  });

  it("should not map yesterday posts", async () => {
    // @ts-expect-error
    postsService.getAll.mockImplementationOnce(() =>
      Promise.resolve(testPosts)
    );

    renderWithRedux(<Posts />, {
      user,
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const posts = await screen.findAllByTestId("post");
    expect(posts.length).toBe(1);
  });

  it("should map other users posts", async () => {
    // @ts-expect-error
    postsService.getAll.mockImplementationOnce(() =>
      Promise.resolve(otherUsersPosts)
    );

    renderWithRedux(<Posts />, {
      user,
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const posts = await screen.findAllByTestId("post");
    expect(posts.length).toBe(1);
  });

  it("should display error", async () => {
    // @ts-expect-error
    postsService.getAll.mockImplementationOnce(() => Promise.reject(""));

    renderWithRedux(<Posts />, {
      user,
      auth: { isAuthed: true, status: RequestStatus.IDLE },
    });

    const errTxt = await screen.findByTestId("err-txt");
    expect(errTxt).toBeInTheDocument();
  });
});
