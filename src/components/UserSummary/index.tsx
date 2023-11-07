import { Avatar, Typography, Button } from "@mui/material";
import { useState } from "react";
import { arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";

import { stringToColor } from "@/utils/stringToColor";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateUser } from "@/redux/slices/user/thunks";
import { Friend } from "@/models/Friend";
import { createChat } from "@/utils/createChat";
import usersService from "@/services/Users";
import { sendFriendsRequest } from "@/utils/sendFriendsRequest";

import * as Styled from "./UserSummary.styled";

interface UserSummaryProps {
  id: string;
  fullName: string;
  username: string;
  showActionButtons?: boolean;
  actionButtonsType?: "friends" | "create-chat";
  onCreatedChat?: () => void;
}

function UserSummary(props: UserSummaryProps) {
  const {
    id,
    fullName,
    username,
    showActionButtons = true,
    actionButtonsType = "friends",
    onCreatedChat = () => {},
  } = props;

  const user: Friend = {
    id,
    fullName,
    username,
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const authedUser = useAppSelector((state) => state.user);
  const authedUserChats = useAppSelector((state) => state.chats.chats);
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

  async function handleAddFriend() {
    try {
      setIsLoading(true);
      await sendFriendsRequest(authedUser, user, dispatch);
    } catch (err) {
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
      const sender = await usersService.getOne(user.id);
      const updatedSentFriendsRequests = sender.sentFriendsRequests.filter(
        (sentFriendsRequest) => sentFriendsRequest.id !== authedUser.id
      );
      await usersService.update(
        {
          sentFriendsRequests: updatedSentFriendsRequests,
          friends: arrayUnion({
            id: authedUser.id,
            fullName: authedUser.fullName,
            username: authedUser.username,
          }),
        },
        sender.id
      );
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
      const recepient = await usersService.getOne(user.id);
      const updatedReceivedFriendsRequests =
        recepient.receivedFriendsRequests.filter(
          (receivedFriendsRequest) =>
            receivedFriendsRequest.id !== authedUser.id
        );
      await usersService.update(
        {
          receivedFriendsRequests: updatedReceivedFriendsRequests,
        },
        user.id
      );
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
      const friend = await usersService.getOne(user.id);
      const updatedFriends = friend.friends.filter(
        (friend) => friend.id !== authedUser.id
      );
      await usersService.update(
        {
          friends: updatedFriends,
        },
        user.id
      );
    } catch (e) {
      await dispatch(updateUser({ friends: authedUserFriends }));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateChat() {
    try {
      setIsLoading(true);
      await createChat(authedUser, user, authedUserChats, router, dispatch);
    } catch (err) {
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
      {authedUser.id !== user.id &&
        showActionButtons &&
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
              onClick={handleAddFriend}
              disabled={isLoading}
            >
              Add friend
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            onClick={handleCreateChat}
            disabled={isLoading}
          >
            Create chat
          </Button>
        ))}
    </Styled.Box>
  );
}

export default UserSummary;
