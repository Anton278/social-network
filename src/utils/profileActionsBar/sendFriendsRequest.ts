import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "@/pages/_app";
import { Friend } from "@/models/Friend";
import { User } from "@/models/User";
import { updateUser } from "@/redux/slices/user/thunks";
import { AppDispatch } from "@/redux/store";

export async function sendFriendsRequest(
  user: User,
  profile: User,
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
    const profileDocRef = doc(db, "users", profile.id);

    await updateDoc(profileDocRef, {
      receivedFriendsRequests: arrayUnion({
        fullName: user.fullName,
        id: user.id,
        username: user.username,
      }),
    });
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
