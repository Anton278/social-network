import { Avatar, Typography, Button } from "@mui/material";
import { useState } from "react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { stringToColor } from "@/utils/stringToColor";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateUser } from "@/redux/slices/user/thunks";
import { Friend } from "@/models/Friend";
import { db } from "@/pages/_app";
import { User } from "@/models/User";
import { createChat, deleteChat } from "@/redux/slices/chats/thunks";
import { Chat } from "@/models/Chat";

import * as Styled from "./UserSummary.styled";

interface UserSummaryProps {
  id: string;
  fullName: string;
  username: string;
  showActionButtons?: boolean;
  actionButtonsType?: "friends" | "create-chat";
  onCreatedChat?: () => void;
  authedUserChats?: Chat[];
}

function UserSummary(props: UserSummaryProps) {
  const {
    id,
    fullName,
    username,
    showActionButtons = true,
    actionButtonsType = "friends",
    onCreatedChat = () => {},
    authedUserChats = [],
  } = props;

  const user: Friend = {
    id,
    fullName,
    username,
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const authedUser = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const isFriend = Boolean(
    authedUser.friends.find((friend) => friend.id === user.id)
  );
  const isSentFriendsRequest = Boolean(
    authedUser.sentFriendsRequests.find(
      (sentFriendsRequest) => sentFriendsRequest.id === user.id
    )
  );
  const isReceivedFriendsRequest = Boolean(
    authedUser.receivedFriendsRequests.find(
      (receivedFriendsRequest) => receivedFriendsRequest.id === user.id
    )
  );

  async function handleAddFriend(authedUserSentFriendsRequests: Friend[]) {
    setIsLoading(true);
    try {
      await dispatch(
        updateUser({
          sentFriendsRequests: [...authedUserSentFriendsRequests, user],
        })
      ).unwrap();
    } catch (e) {
      return setIsLoading(false);
    }

    try {
      const recipientDocRef = doc(db, "users", user.id);
      await updateDoc(recipientDocRef, {
        receivedFriendsRequests: arrayUnion({
          username: authedUser.username,
          fullName: authedUser.fullName,
          id: authedUser.id,
        }),
      });
    } catch (e) {
      await dispatch(
        updateUser({
          sentFriendsRequests: authedUserSentFriendsRequests,
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptFriendsRequest(
    authedUserReceivedFriendsRequests: Friend[],
    authedUserFriends: Friend[]
  ) {
    setIsLoading(true);
    try {
      const updatedReceivedFriendsRequests =
        authedUserReceivedFriendsRequests.filter(
          (receivedFriendsRequest) => receivedFriendsRequest.id !== user.id
        );
      await dispatch(
        updateUser({
          receivedFriendsRequests: updatedReceivedFriendsRequests,
          friends: [...authedUserFriends, user],
        })
      ).unwrap();
    } catch (e) {
      return setIsLoading(false);
    }

    try {
      const senderDocRef = doc(db, "users", user.id);
      const senderDoc = await getDoc(senderDocRef);
      const sender = senderDoc.data() as User;
      const updatedSentFriendsRequests = sender.sentFriendsRequests.filter(
        (sentFriendsRequest) => sentFriendsRequest.id !== authedUser.id
      );
      await updateDoc(senderDocRef, {
        sentFriendsRequests: updatedSentFriendsRequests,
        friends: arrayUnion({
          id: authedUser.id,
          fullName: authedUser.fullName,
          username: authedUser.username,
        }),
      });
    } catch (e) {
      await dispatch(
        updateUser({
          receivedFriendsRequests: authedUserReceivedFriendsRequests,
          friends: authedUserFriends,
        })
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCancelFriendsRequest(
    authedUserSentFriendsRequests: Friend[]
  ) {
    setIsLoading(true);
    try {
      const updatedSentFriendsRequests = authedUserSentFriendsRequests.filter(
        (sentFriendsRequest) => sentFriendsRequest.id !== user.id
      );
      await dispatch(
        updateUser({ sentFriendsRequests: updatedSentFriendsRequests })
      ).unwrap();
    } catch (e) {
      return setIsLoading(false);
    }

    try {
      const recepientDocRef = doc(db, "users", user.id);
      const recepientDoc = await getDoc(recepientDocRef);
      const recepient = recepientDoc.data() as User;
      const updatedReceivedFriendsRequests =
        recepient.receivedFriendsRequests.filter(
          (receivedFriendsRequest) =>
            receivedFriendsRequest.id !== authedUser.id
        );
      await updateDoc(recepientDocRef, {
        receivedFriendsRequests: updatedReceivedFriendsRequests,
      });
    } catch (e) {
      await dispatch(
        updateUser({ sentFriendsRequests: authedUserSentFriendsRequests })
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteFriend(authedUserFriends: Friend[]) {
    setIsLoading(true);
    try {
      const updatedFriends = authedUserFriends.filter(
        (friend) => friend.id !== user.id
      );
      await dispatch(updateUser({ friends: updatedFriends })).unwrap();
    } catch (e) {
      return setIsLoading(false);
    }

    try {
      const friendDocRef = doc(db, "users", user.id);
      const friendDoc = await getDoc(friendDocRef);
      const friend = friendDoc.data() as User;
      const updatedFriends = friend.friends.filter(
        (friend) => friend.id !== authedUser.id
      );
      await updateDoc(friendDocRef, {
        friends: updatedFriends,
      });
    } catch (e) {
      await dispatch(updateUser({ friends: authedUserFriends }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateChat(authedUserChatIds: string[]) {
    setIsLoading(true);
    const chatWithUser = authedUserChats.find(
      (chat) =>
        chat.participants[0].id === user.id ||
        chat.participants[1].id === user.id
    );
    if (chatWithUser) {
      return router.push(`/chats/${chatWithUser.id}`);
    }
    let createdChat: Chat | undefined;
    const userDocRef = doc(db, "users", user.id);
    try {
      createdChat = await dispatch(
        createChat([
          user,
          {
            fullName: authedUser.fullName,
            username: authedUser.username,
            id: authedUser.id,
          },
        ])
      ).unwrap();
      await dispatch(
        updateUser({ chats: [...authedUserChatIds, createdChat.id] })
      ).unwrap();
      await updateDoc(userDocRef, { chats: arrayUnion(createdChat.id) });
      onCreatedChat();
    } catch (e) {
      if (!createdChat?.id) {
        return setIsLoading(false);
      }
      await dispatch(deleteChat(createdChat.id));
      await dispatch(updateUser({ chats: authedUserChatIds }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Styled.Box data-testid="user-summary">
      <Styled.User href={`/profiles/${id}`}>
        <Avatar
          sx={{
            bgcolor: stringToColor(fullName),
            marginRight: "10px",
          }}
        >
          {fullName.split(" ")[0][0]}
          {fullName.split(" ")[1][0]}
        </Avatar>
        <div>
          <Typography
            component="h5"
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "5px",
            }}
          >
            {username}
          </Typography>
          <Typography>{fullName}</Typography>
        </div>
      </Styled.User>
      {showActionButtons &&
        (actionButtonsType === "friends" ? (
          isFriend ? (
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleDeleteFriend(authedUser.friends)}
              disabled={isLoading}
            >
              Delete friend
            </Button>
          ) : isSentFriendsRequest ? (
            <Button
              variant="outlined"
              onClick={() =>
                handleCancelFriendsRequest(authedUser.sentFriendsRequests)
              }
              disabled={isLoading}
            >
              Cancel friends request
            </Button>
          ) : isReceivedFriendsRequest ? (
            <Button
              variant="contained"
              onClick={() =>
                handleAcceptFriendsRequest(
                  authedUser.receivedFriendsRequests,
                  authedUser.friends
                )
              }
              disabled={isLoading}
            >
              Accept friends request
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleAddFriend(authedUser.sentFriendsRequests)}
              disabled={isLoading}
            >
              Add friend
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            onClick={() => handleCreateChat(authedUser.chats)}
            disabled={isLoading}
          >
            Create chat
          </Button>
        ))}
    </Styled.Box>
  );
}

export default UserSummary;
