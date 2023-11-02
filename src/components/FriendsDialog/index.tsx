import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { useEffect } from "react";
import Link from "next/link";

import { Friend } from "@/models/Friend";

import * as Styled from "./FriendsDialog.styled";
import UserSummary from "../UserSummary";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getChats } from "@/redux/slices/chats/thunks";
import { RequestStatus } from "@/models/RequestStatus";

type FriendsDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  friends: Friend[];
  userSummaryActionButtonsType?: "friends" | "create-chat";
  onCreatedChat?: () => void;
};

function FriendsDialog(props: FriendsDialogProps) {
  const {
    isOpen,
    onClose,
    friends,
    userSummaryActionButtonsType,
    onCreatedChat = () => {},
  } = props;

  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.chats);
  const chatsStatus = useAppSelector((state) => state.chats.status);

  useEffect(() => {
    if (userSummaryActionButtonsType === "friends") {
      return;
    }
    if (!chats.length) {
      return;
    }
    dispatch(getChats());
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>Friends</DialogTitle>
      <DialogContent dividers>
        {userSummaryActionButtonsType === "create-chat" ? (
          chatsStatus === RequestStatus.Error ? (
            <Typography color={"error"}>Failed to load chats</Typography>
          ) : chatsStatus === RequestStatus.Loading ? (
            <Typography>loading...</Typography>
          ) : friends.length ? (
            friends.map((friend) => (
              <UserSummary
                key={friend.id}
                fullName={friend.fullName}
                id={friend.id}
                username={friend.username}
                actionButtonsType={userSummaryActionButtonsType}
                onCreatedChat={onCreatedChat}
                authedUserChats={chats}
              />
            ))
          ) : (
            <Typography>
              <Link href="/profiles">Add friend</Link> to create chat
            </Typography>
          )
        ) : (
          friends.map((friend) => (
            <UserSummary
              key={friend.id}
              fullName={friend.fullName}
              id={friend.id}
              username={friend.username}
              actionButtonsType={userSummaryActionButtonsType}
              onCreatedChat={onCreatedChat}
            />
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;
