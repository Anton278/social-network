import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  IconButton,
} from "@mui/material";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

import { getNavItems } from "@/utils/getNavItems";
import { useAppSelector } from "@/hooks/useAppSelector";

import * as Styled from "./Menu.styled";

type MenuProps = {
  open: boolean;
  onClose?: () => void;
};

function Menu({ open, onClose }: MenuProps) {
  const router = useRouter();
  const { id, receivedFriendsRequests } = useAppSelector((state) => state.user);
  const navItems = getNavItems(id, receivedFriendsRequests.length);

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Styled.Inner>
        <Styled.TopBar>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Styled.TopBar>
        {navItems.map((navItemsGroup, navItemsGroupIdx) => (
          <Fragment key={navItemsGroupIdx}>
            <List>
              {navItemsGroup.map((navItem, navItemIdx) => (
                <ListItemButton
                  component={Link}
                  selected={router.pathname.includes(navItem.href)}
                  href={navItem.href}
                  key={navItemIdx}
                  disabled={navItem.isDisabled}
                >
                  <ListItemIcon>{navItem.icon}</ListItemIcon>
                  <ListItemText primary={navItem.label} />
                  {navItem.badgeValue !== undefined && (
                    <Badge
                      max={100}
                      color="secondary"
                      badgeContent={navItem.badgeValue}
                      sx={{ marginLeft: "15px" }}
                    />
                  )}
                </ListItemButton>
              ))}
            </List>
            {navItemsGroupIdx !== navItems.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Styled.Inner>
    </Drawer>
  );
}

export default Menu;
