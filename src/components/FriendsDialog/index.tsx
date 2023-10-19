import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { Friend } from "@/models/Friend";

import * as Styled from "./FriendsDialog.styled";
import UserSummary from "../UserSummary";

type FriendsDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  friends: Friend[];
};

function FriendsDialog(props: FriendsDialogProps) {
  const { isOpen, onClose, friends } = props;

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
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;
