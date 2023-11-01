import { Button } from "@mui/material";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, memo, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";

import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ProfileContext } from "@/pages/profiles/[id]";
import { deleteFriend } from "@/utils/profileActionsBar/deleteFriend";
import { acceptFriendsRequest } from "@/utils/profileActionsBar/acceptFriendsRequest";
import { cancelFriendsRequest } from "@/utils/profileActionsBar/cancelFriendsRequest";
import { sendFriendsRequest } from "@/utils/profileActionsBar/sendFriendsRequest";

import * as Styled from "./ProfileActionsBar.styled";

type Props = {};

function ProfileActionsBar({}: Props) {
  const router = useRouter();
  const profileId = router.query.id;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { profile, setProfile } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false);

  const isFriend = useMemo(
    () => Boolean(user.friends.find((friend) => friend.id === profileId)),
    [user.friends]
  );
  const isReceivedFriendsReq = useMemo(
    () =>
      Boolean(
        user.receivedFriendsRequests.find(
          (receivedFriendsReq) => receivedFriendsReq.id === profileId
        )
      ),
    [user.receivedFriendsRequests]
  );
  const isSentFriendsReq = useMemo(
    () =>
      Boolean(
        user.sentFriendsRequests.find(
          (sentFriendsReq) => sentFriendsReq.id === profileId
        )
      ),
    [user.sentFriendsRequests]
  );

  async function handleDeleteFriend() {
    if (!profile) {
      return;
    }
    try {
      setIsLoading(true);
      await deleteFriend(user, profile, dispatch, setProfile);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAcceptFriendsReq() {
    if (!profile) {
      return;
    }
    try {
      setIsLoading(true);
      await acceptFriendsRequest(user, profile, dispatch, setProfile);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCancelFriendReq() {
    if (!profile) {
      return;
    }
    try {
      setIsLoading(true);
      await cancelFriendsRequest(user, profile, dispatch);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddFriend() {
    if (!profile) {
      return;
    }
    try {
      setIsLoading(true);
      await sendFriendsRequest(user, profile, dispatch);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Styled.ActionsBar>
      {isFriend ? (
        <Button
          variant="contained"
          onClick={handleDeleteFriend}
          color="error"
          startIcon={<CloseIcon />}
          disabled={isLoading}
        >
          Delete friend
        </Button>
      ) : isReceivedFriendsReq ? (
        <Button
          variant="contained"
          onClick={handleAcceptFriendsReq}
          disabled={isLoading}
        >
          Accept friend request
        </Button>
      ) : isSentFriendsReq ? (
        <Button
          variant="contained"
          onClick={handleCancelFriendReq}
          disabled={isLoading}
        >
          Cancel friend request
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddFriend}
          disabled={isLoading}
        >
          Add friend
        </Button>
      )}
      <Button variant="outlined" startIcon={<MessageIcon />}>
        Message
      </Button>
    </Styled.ActionsBar>
  );
}

export default memo(ProfileActionsBar);
