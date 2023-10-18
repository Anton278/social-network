import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  anchorEl: HTMLElement | null;
  handleClose?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

function PostMoreMenu(props: Props) {
  const {
    anchorEl,
    handleClose = () => {},
    onEditClick = () => {},
    onDeleteClick = () => {},
  } = props;

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          onEditClick();
          handleClose();
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onDeleteClick();
          handleClose();
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default PostMoreMenu;
