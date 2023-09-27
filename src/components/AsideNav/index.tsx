import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserId } from "@/redux/slices/user/selectors";
import SettingsIcon from "@mui/icons-material/Settings";

function AsideNav() {
  const router = useRouter();
  const userId = useSelector(selectUserId);
  const [expandedFriends, setExpandedFriends] = useState(false);

  return (
    <aside style={{ maxWidth: "320px", width: "100%" }}>
      <List>
        <ListItemButton
          selected={router.pathname === "/posts"}
          onClick={() => router.push("/posts")}
        >
          <ListItemIcon>
            <DensityMediumIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItemButton>
        <ListItemButton
          selected={window.location.pathname === `/profiles/${userId}`}
          onClick={() => router.push(`/profiles/${userId}`)}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItemButton>
        <ListItemButton
          selected={router.pathname === "/profiles"}
          onClick={() => router.push("/profiles")}
        >
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton onClick={() => setExpandedFriends(!expandedFriends)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
          {expandedFriends ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={expandedFriends} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <HandshakeIcon />
              </ListItemIcon>
              <ListItemText primary="Sent friend requests" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <HandshakeIcon />
              </ListItemIcon>
              <ListItemText primary="Received friend requests" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </aside>
  );
}

export default AsideNav;
