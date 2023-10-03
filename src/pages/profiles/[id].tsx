import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Typography, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import { toast } from "react-toastify";

import Layout from "@/components/Layout";
import { stringToColor } from "@/utils/stringToColor";
import { User } from "@/models/User";
import { withProtected } from "@/hocs/withProtected";
import Post from "@/components/Post";
import { selectUserId } from "@/redux/slices/user/selectors";
import UserService from "@/services/UserService";
import { selectPosts, selectPostsStatus } from "@/redux/slices/posts/selectors";
import { getPosts } from "@/redux/slices/posts/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { sortByDate } from "@/utils/sortByDate";
import { RequestStatus } from "@/models/RequestStatus";

import * as Styled from "@/styles/Profile.styled";

function Profile() {
  const router = useRouter();
  const profileId = router.query.id;
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const userId = useSelector(selectUserId);
  const { db } = useFirebaseDB();
  const [profile, setProfile] = useState<User>();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [isSentFriendReq, setIsSentFriendReq] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const profilePosts = sortByDate(
    posts.filter((post) => post.author.userId === profileId)
  );

  async function handleAddFriend() {
    if (typeof profileId !== "string") {
      return;
    }

    try {
      const userDoc = await UserService.getUserDoc(userId);
      const friendDoc = await UserService.getUserDoc(profileId);

      await UserService.addFriend(userDoc, friendDoc);
      toast.success(`Sent friend request to ${profile?.fullName}!`);
    } catch (e) {}
  }

  useEffect(() => {
    async function getProfile() {
      setIsProfileLoading(true);

      const q = query(
        collection(db, "users"),
        where("userId", "==", profileId)
      );

      try {
        const usersDocs = (await getDocs(q)).docs;
        if (!usersDocs[0]) {
          return setProfileError("Failed to get user");
        }

        const profile = usersDocs[0].data() as User;
        setProfile(profile);

        if (profile.userId === userId) {
          // my profile
          return;
        }
        // if (profile.friendsRequests.includes(userId)) {
        //   setIsSentFriendReq(true);
        // }
      } catch (e) {
        setProfileError("Failed to get user");
      } finally {
        setIsProfileLoading(false);
      }
    }

    getProfile();

    dispatch(getPosts());
  }, []);

  return (
    <Layout maxWidth="md">
      <>
        {isProfileLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <Styled.TopBar>
              <Styled.TopBarLeft>
                {profile && (
                  <Avatar
                    sx={{
                      width: "100px",
                      height: "100px",
                      bgcolor: stringToColor("Anton Nakonechnyi"),
                    }}
                  >
                    {profile.fullName.split(" ")[0][0]}
                    {profile.fullName.split(" ")[1][0]}
                  </Avatar>
                )}
                <Typography
                  component="h5"
                  sx={{ fontSize: 18, marginTop: "10px" }}
                >
                  {profile?.fullName}
                </Typography>
              </Styled.TopBarLeft>
              <Styled.TopBarRight>
                <Styled.PostsButton>
                  <Typography component="b" sx={{ fontWeight: "bold" }}>
                    {profilePosts.length}
                  </Typography>
                  <Typography sx={{ marginTop: "5px" }}>posts</Typography>
                </Styled.PostsButton>
                <Styled.FriendsLink href="#">
                  <Typography component="b" sx={{ fontWeight: "bold" }}>
                    {profile?.friends.length}
                  </Typography>
                  <Typography sx={{ marginTop: "5px" }}>friends</Typography>
                </Styled.FriendsLink>
              </Styled.TopBarRight>
            </Styled.TopBar>
            {profileId !== userId && (
              <Styled.ActionsBar>
                <>
                  {isSentFriendReq ? (
                    <Button variant="contained">Cancel friend request</Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddFriend}
                    >
                      Add friend
                    </Button>
                  )}
                  {/* <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
              Delete friend
            </Button> */}
                  <Button variant="outlined" startIcon={<MessageIcon />}>
                    Message
                  </Button>
                </>
              </Styled.ActionsBar>
            )}
          </>
        )}
        <Divider sx={{ marginTop: "30px", marginBottom: "30px" }} />
        {postsStatus === RequestStatus.Loading ? (
          <div>loading...</div>
        ) : postsStatus === RequestStatus.Error ? (
          <Typography color="error">Failed to get posts</Typography>
        ) : (
          profilePosts.map((profilePost) => (
            <Post
              key={profilePost.id}
              author={profilePost.author}
              text={profilePost.body}
              date={profilePost.timeStamp.seconds}
              comments={profilePost.comments}
              isPrivate={profilePost.isPrivate}
              postId={profilePost.id}
            />
          ))
        )}
      </>
    </Layout>
  );
}

export default withProtected(Profile);
