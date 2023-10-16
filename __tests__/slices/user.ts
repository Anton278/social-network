import { RequestStatus } from "@/models/RequestStatus";
import { makeStore } from "@/redux/store";
import usersService from "../../src/services/Users";
import { getUser } from "@/redux/slices/user/thunks";
import { User } from "@/models/User";

jest.mock("../../src/services/Users");

const initState = {
  status: RequestStatus.Loading,
  email: "",
  username: "",
  id: "",
  fullName: "",
  friends: [],
  sentFriendsRequests: [],
  receivedFriendsRequests: [],
};
const user: User = {
  email: "johndoe@gmail.com",
  username: "john001",
  id: "123",
  fullName: "John Doe",
  friends: [],
  sentFriendsRequests: [],
  receivedFriendsRequests: [],
};

describe("user slice", () => {
  it("should have proper init state", () => {
    const store = makeStore();
    const user = store.getState().user;
    expect(user).toEqual(initState);
  });

  it("should properly handle setUser case", () => {
    const store = makeStore();
    store.dispatch({
      type: "user/setUser",
      payload: user,
    });
    expect(store.getState().user).toEqual({
      ...user,
      status: RequestStatus.IDLE,
    });
  });

  it("should properly handle successed getUser case", async () => {
    const store = makeStore();

    usersService.getAll
      // @ts-expect-error
      .mockImplementationOnce(() => Promise.resolve([user]));

    await store.dispatch(getUser("johndoe@gmail.com"));

    expect(store.getState().user).toEqual({
      ...user,
      status: RequestStatus.IDLE,
    });
  });

  it("should properly handle failed getUser case", async () => {
    const store = makeStore();

    usersService.getAll
      // @ts-expect-error
      .mockImplementationOnce(() => Promise.resolve([]));

    await store.dispatch(getUser("johndoe@gmail.com"));

    expect(store.getState().user).toEqual({
      ...initState,
      status: RequestStatus.Error,
    });
  });
});
