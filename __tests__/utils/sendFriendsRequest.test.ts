import { Friend } from "@/models/Friend";
import { User } from "@/models/User";
import { AppDispatch } from "@/redux/store";
import { sendFriendsRequest } from "@/utils/sendFriendsRequest";
import usersService from "../../src/services/Users";
import * as userThunks from "../../src/redux/slices/user/thunks";

jest.mock("../../src/services/Users");
jest.mock("../../src/redux/slices/user/thunks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../src/redux/slices/user/thunks"),
  };
});
const updateUserSpy = jest.spyOn(userThunks, "updateUser");

afterEach(() => {
  jest.clearAllMocks();
});

describe("sendFriendsRequest util", () => {
  it("should stop execution if first update user failed", async () => {
    const user: User = {
      email: "",
      friends: [],
      fullName: "",
      id: "",
      receivedFriendsRequests: [],
      sentFriendsRequests: [],
      username: "",
    };
    const profile: Friend = {
      fullName: "",
      id: "",
      username: "",
    };
    const dispatch = jest.fn(() => ({
      unwrap: () => Promise.reject(""),
    })) as AppDispatch;
    try {
      await sendFriendsRequest(user, profile, dispatch);
    } catch (err) {
    } finally {
      expect(updateUserSpy).toHaveBeenCalledTimes(1);
      expect(usersService.update).not.toHaveBeenCalled();
    }
  });

  it("should update user and profile", async () => {
    const user: User = {
      email: "",
      friends: [],
      fullName: "",
      id: "",
      receivedFriendsRequests: [],
      sentFriendsRequests: [
        {
          fullName: "Chuck Norris",
          id: "chuk-norris-id",
          username: "chuck001",
        },
      ],
      username: "",
    };
    const profile: Friend = {
      fullName: "John Doe",
      id: "profile-id",
      username: "john001",
    };
    const dispatch = jest.fn(() => ({
      unwrap: () => Promise.resolve(""),
    })) as AppDispatch;
    try {
      await sendFriendsRequest(user, profile, dispatch);
    } catch (err) {
    } finally {
      expect(updateUserSpy).toHaveBeenCalledWith({
        sentFriendsRequests: [
          {
            fullName: "Chuck Norris",
            id: "chuk-norris-id",
            username: "chuck001",
          },
          {
            fullName: "John Doe",
            id: "profile-id",
            username: "john001",
          },
        ],
      });
      expect(usersService.update).toHaveBeenCalled();
    }
  });

  it("should handle update profile error", async () => {
    const user: User = {
      email: "",
      friends: [],
      fullName: "",
      id: "",
      receivedFriendsRequests: [],
      sentFriendsRequests: [
        {
          fullName: "Chuck Norris",
          id: "chuk-norris-id",
          username: "chuck001",
        },
      ],
      username: "",
    };
    const profile: Friend = {
      fullName: "John Doe",
      id: "profile-id",
      username: "john001",
    };
    const dispatch = jest.fn(() => ({
      unwrap: () => Promise.resolve(""),
    })) as AppDispatch;
    // @ts-expect-error
    usersService.update.mockImplementation(() => Promise.reject(""));
    try {
      await sendFriendsRequest(user, profile, dispatch);
    } catch (err) {
    } finally {
      expect(updateUserSpy).toHaveBeenCalledTimes(2);
    }
  });
});
