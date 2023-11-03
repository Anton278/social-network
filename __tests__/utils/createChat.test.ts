import { User } from "@/models/User";
import { createChat as createChatUtil } from "@/utils/createChat";
import usersService from "../../src/services/Users";
import chatsService from "../../src/services/Chats";
import { ChatParticipant } from "@/models/ChatParticipant";
import { Chat } from "@/models/Chat";
import { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store";

jest.mock("../../src/services/Users");
jest.mock("../../src/services/Chats");
const router = {
  push: jest.fn(() => Promise.resolve("")),
} as unknown as ReturnType<typeof useRouter>;
const dispatch = jest.fn(() => ({
  unwrap: () => Promise.resolve({ id: "1" }),
})) as AppDispatch;

afterEach(() => {
  jest.clearAllMocks();
});

describe("createChat util", () => {
  const user: User = {
    chats: [],
    email: "johndoe@gmail.com",
    friends: [],
    fullName: "John Doe",
    id: "1",
    receivedFriendsRequests: [],
    sentFriendsRequests: [],
    username: "john001",
  };
  const interlocutor: ChatParticipant = {
    fullName: "Will Smith",
    id: "2",
    username: "william001",
  };
  it("should open chat if it exists", async () => {
    const chats: Chat[] = [
      {
        createdAt: "",
        id: "1",
        lastMessage: "",
        messages: [],
        participants: [
          { fullName: user.fullName, id: user.id, username: user.username },
          interlocutor,
        ],
      },
    ];
    await createChatUtil(user, interlocutor, chats, router, dispatch);
    expect(router.push).toBeCalledWith(`/chats/${chats[0].id}`);
  });

  // can't mock thunks
  it("should call dispatch 2 times, usersService.update and redirect", async () => {
    const chats: Chat[] = [];
    await createChatUtil(user, interlocutor, chats, router, dispatch);
    // @ts-expect-error
    expect(dispatch.mock.calls).toHaveLength(2);
    expect(usersService.update).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith(`/chats/1`);
  });
});
