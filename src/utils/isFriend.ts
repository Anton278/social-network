import { Friend } from "@/models/Friend";

function isFriend(
  userId: string,
  friends: Friend[],
  sentFriendsRequests: Friend[]
) {
  const friend = friends.find((friend) => friend.userId === userId);
  if (friend) {
    return true;
  }

  const futureFriend = sentFriendsRequests.find(
    (sentFriendRequest) => sentFriendRequest.userId === userId
  );
  if (futureFriend) {
    return true;
  }

  return false;
}

export { isFriend };
