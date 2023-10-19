import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type MoreMenuProps = {
  anchorEl: HTMLElement | null;
  onClose?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

function MoreMenu(props: MoreMenuProps) {
  const {
    anchorEl,
    onClose = () => {},
    onEditClick = () => {},
    onDeleteClick = () => {},
  } = props;

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onEditClick();
          onClose();
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
          onClose();
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

export default MoreMenu;
