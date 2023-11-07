import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import Link from "next/link";

import { Friend } from "@/models/Friend";
import UserSummary from "../UserSummary";

import * as Styled from "./FriendsDialog.styled";

type FriendsDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  friends: Friend[];
  buttonsType?: "friends" | "create-chat";
  onCreatedChat?: () => void;
};

function FriendsDialog(props: FriendsDialogProps) {
  const {
    isOpen,
    onClose,
    friends,
    buttonsType,
    onCreatedChat = () => {},
  } = props;

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
        {friends.length ? (
          friends.map((friend) => (
            <UserSummary
              key={friend.id}
              fullName={friend.fullName}
              id={friend.id}
              username={friend.username}
              actionButtonsType={buttonsType}
              onCreatedChat={onCreatedChat}
            />
          ))
        ) : (
          <Typography>
            <Link href="/profiles">Add friend</Link> to create chat
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;
