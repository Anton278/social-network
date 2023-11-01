import { doc, updateDoc } from "firebase/firestore";

import { Friend } from "@/models/Friend";
import { User } from "@/models/User";
import { db } from "@/pages/_app";
import { updateUser } from "@/redux/slices/user/thunks";
import { AppDispatch } from "@/redux/store";

export async function acceptFriendsRequest(
  user: User,
  profile: User,
  dispatch: AppDispatch,
  setProfile: React.Dispatch<React.SetStateAction<User>>
) {
  try {
    const updatedReceivedFriendsReqs: Friend[] =
      user.receivedFriendsRequests.filter((friend) => friend.id !== profile.id);

    await dispatch(
      updateUser({
        receivedFriendsRequests: updatedReceivedFriendsReqs,
        friends: [
          ...user.friends,
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

    const updatedSentFriendsRequests: Friend[] =
      profile.sentFriendsRequests.filter((friend) => friend.id !== user.id);
    const updatedFriends: Friend[] = [
      ...profile.friends,
      {
        username: user.username,
        fullName: user.fullName,
        id: user.id,
      },
    ];

    await updateDoc(profileDocRef, {
      sentFriendsRequests: updatedSentFriendsRequests,
      friends: updatedFriends,
    });

    setProfile({
      ...profile,
      friends: updatedFriends,
      sentFriendsRequests: updatedSentFriendsRequests,
    });
  } catch (e) {
    const updatedFriends = user.friends.filter(
      (friend) => friend.id !== profile.id
    );
    await dispatch(
      updateUser({
        receivedFriendsRequests: [
          ...user.receivedFriendsRequests,
          {
            fullName: profile.fullName,
            id: profile.id,
            username: profile.username,
          },
        ],
        friends: updatedFriends,
      })
    );
    return Promise.reject(e);
  }
}
