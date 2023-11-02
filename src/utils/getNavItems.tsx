import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

type NavItem = {
  href: string;
  icon: JSX.Element;
  label: string;
  badgeValue?: string | number;
  isDisabled?: boolean;
};

export function getNavItems(
  userId: string,
  friendsBadgeValue: string | number
): NavItem[][] {
  return [
    [
      { href: "/posts", icon: <DensityMediumIcon />, label: "Posts" },
      { href: "/chats", icon: <ForumIcon />, label: "Chats" },
      {
        href: `/profiles/${userId}`,
        icon: <AccountCircleIcon />,
        label: "My profile",
      },
      { href: "/profiles", icon: <GroupsIcon />, label: "Users" },
      {
        href: "/friends",
        icon: <PeopleIcon />,
        label: "Friends",
        badgeValue: friendsBadgeValue,
      },
    ],
    [
      {
        href: "/settings",
        icon: <SettingsIcon />,
        label: "Settings",
        isDisabled: true,
      },
    ],
  ];
}
