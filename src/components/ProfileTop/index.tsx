import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import Avatar from "../Avatar";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUserId } from "@/redux/slices/user/selectors";
import ProfileActionsBar from "../ProfileActionsBar";
import { ProfileContext } from "@/pages/profiles/[id]";
import FriendsDialog from "../FriendsDialog";

import * as Styled from "./ProfileTop.styled";

type ProfileTopProps = {
  postsCount: number | string;
};

function ProfileTop({ postsCount }: ProfileTopProps) {
  const router = useRouter();
  const profileId = router.query.id;
  const { profile } = useContext(ProfileContext);
  const userId = useAppSelector(selectUserId);
  const [showFriends, setShowFriends] = useState(false);

  return (
    <>
      <section>
        <Styled.TopBar>
          <Avatar sizes={100} fullName={profile?.fullName} />
          <Styled.Counts>
            <Styled.PostsCount>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                {postsCount}
              </Typography>
              <Typography>posts</Typography>
            </Styled.PostsCount>
            <Styled.FriendsCount onClick={() => setShowFriends(true)}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                {profile?.friends.length}
              </Typography>
              <Typography>friends</Typography>
            </Styled.FriendsCount>
          </Styled.Counts>
        </Styled.TopBar>
        <Styled.InfoBar>
          <Typography>
            Username: <b>{profile?.username}</b>
          </Typography>
          <Typography>
            Full name: <b>{profile?.fullName}</b>
          </Typography>
        </Styled.InfoBar>
        {profileId !== userId && <ProfileActionsBar />}
      </section>
      <FriendsDialog
        isOpen={showFriends}
        onClose={() => setShowFriends(false)}
        friends={profile?.friends || []}
      />
    </>
  );
}

export default ProfileTop;
