import { AppDispatch } from "@/redux/store";
import { User } from "@/models/User";
import { updateUser } from "@/redux/slices/user/thunks";
import usersService from "@/services/Users";

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
    const updatedFriends = profile.friends.filter(
      (friend) => friend.id !== user.id
    );

    await usersService.update(
      {
        friends: updatedFriends,
      },
      profile.id
    );

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
