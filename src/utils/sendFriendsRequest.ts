import { arrayUnion } from "firebase/firestore";

import { Friend } from "@/models/Friend";
import { User } from "@/models/User";
import { updateUser } from "@/redux/slices/user/thunks";
import { AppDispatch } from "@/redux/store";
import usersService from "@/services/Users";

export async function sendFriendsRequest(
  user: User,
  profile: Friend,
  dispatch: AppDispatch
) {
  try {
    await dispatch(
      updateUser({
        sentFriendsRequests: [
          ...user.sentFriendsRequests,
          {
            fullName: profile.fullName,
            id: profile.id,
            username: profile.username,
          },
        ],
      })
    ).unwrap();
  } catch (e) {
    return Promise.reject(e);
  }

  try {
    await usersService.update(
      {
        receivedFriendsRequests: arrayUnion({
          fullName: user.fullName,
          id: user.id,
          username: user.username,
        }),
      },
      profile.id
    );
  } catch (e) {
    // removing profile from sent friends requests
    const updatedSentFriendsRequests: Friend[] =
      user.sentFriendsRequests.filter((friend) => friend.id !== profile.id);
    await dispatch(
      updateUser({
        sentFriendsRequests: updatedSentFriendsRequests,
      })
    );
    return Promise.reject(e);
  }
}
