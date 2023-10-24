import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { Friend } from "@/models/Friend";

import * as Styled from "./FriendsDialog.styled";
import UserSummary from "../UserSummary";

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
        {friends.map((friend) => (
          <UserSummary
            key={friend.id}
            fullName={friend.fullName}
            id={friend.id}
            username={friend.username}
            actionButtonsType={userSummaryActionButtonsType}
            onCreatedChat={onCreatedChat}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;
