import { doc, updateDoc } from "firebase/firestore";

import { Friend } from "@/models/Friend";
import { User } from "@/models/User";
import { db } from "@/pages/_app";
import { updateUser } from "@/redux/slices/user/thunks";
import { AppDispatch } from "@/redux/store";

export async function cancelFriendsRequest(
  user: User,
  profile: User,
  dispatch: AppDispatch
) {
  try {
    const updatedSentFriendsRequests: Friend[] =
      user.sentFriendsRequests.filter(
        (sentFriendsReq) => sentFriendsReq.id !== profile.id
      );
    await dispatch(
      updateUser({
        sentFriendsRequests: updatedSentFriendsRequests,
      })
    ).unwrap();
  } catch (e) {
    return Promise.reject(e);
  }

  try {
    const profileDocRef = doc(db, "users", profile.id);

    const updatedReceivedFriendsReqs: Friend[] =
      profile.receivedFriendsRequests.filter((friend) => friend.id !== user.id);

    await updateDoc(profileDocRef, {
      receivedFriendsRequests: updatedReceivedFriendsReqs,
    });
  } catch (e) {
    await dispatch(
      updateUser({
        sentFriendsRequests: user.sentFriendsRequests,
      })
    );
    return Promise.reject(e);
  }
}
