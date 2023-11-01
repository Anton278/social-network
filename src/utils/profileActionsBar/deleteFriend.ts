import { AppDispatch } from "@/redux/store";
import { doc, updateDoc } from "firebase/firestore";

import { User } from "@/models/User";
import { updateUser } from "@/redux/slices/user/thunks";
import { db } from "@/pages/_app";

export async function deleteFriend(
  user: User,
  profile: User,
  dispatch: AppDispatch,
  setProfile: React.Dispatch<React.SetStateAction<User>>
) {
  try {
    const updatedFriends = user.friends.filter(
      (friend) => friend.id !== profile.id
    );
    await dispatch(updateUser({ friends: updatedFriends })).unwrap();
  } catch (e) {
    return Promise.reject(e);
  }

  try {
    const profileDocRef = doc(db, "users", profile.id);

    const updatedFriends = profile.friends.filter(
      (friend) => friend.id !== user.id
    );

    await updateDoc(profileDocRef, {
      friends: updatedFriends,
    });

    setProfile({ ...profile, friends: updatedFriends });
  } catch (e) {
    await dispatch(
      updateUser({
        friends: [
          ...user.friends,
          {
            fullName: profile.fullName,
            id: profile.id,
            username: profile.username,
          },
        ],
      })
    );
    return Promise.reject(e);
  }
}
