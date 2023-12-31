import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserId } from "@/redux/slices/user/selectors";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { useMemo, memo } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import * as Styled from "./AsideNav.styled";

function AsideNav() {
  const router = useRouter();
  const userId = useSelector(selectUserId);
  const user = useAppSelector((state) => state.user);

  const requestsTotal = useMemo(
    () => user.receivedFriendsRequests.length,
    [user.receivedFriendsRequests]
  );

  return (
    <Styled.Aside>
      <List>
        <ListItemButton
          component={Link}
          selected={router.pathname === "/posts"}
          href="/posts"
        >
          <ListItemIcon>
            <DensityMediumIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          selected={router.pathname.includes("/chats")}
          href="/chats"
        >
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          selected={window.location.pathname === `/profiles/${userId}`}
          href={`/profiles/${userId}`}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My profile" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          selected={router.pathname === "/profiles"}
          href="/profiles"
        >
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          selected={router.pathname === "/friends"}
          href="/friends"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
          <Badge
            max={100}
            color="secondary"
            badgeContent={requestsTotal}
            sx={{ marginLeft: "15px" }}
          />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton
          component={Link}
          selected={router.pathname === "/settings"}
          href="/settings"
          disabled={true}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Styled.Aside>
  );
}

export default memo(AsideNav);
