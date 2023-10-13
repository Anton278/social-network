import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
import CloseIcon from "@mui/icons-material/Close";

import * as Styled from "@/styles/Profile.styled";
import { updateUser } from "@/redux/slices/user/thunks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Friend } from "@/models/Friend";
import FriendsDialog from "@/components/FriendsDialog";

function Profile() {
  const router = useRouter();
  const profileId = router.query.id;
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const user = useAppSelector((state) => state.user);
  const { db } = useFirebaseDB();
  const [profile, setProfile] = useState<User>({} as User);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [isSentFriendReq, setIsSentFriendReq] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isReceivedFriendReq, setIsReceivedFriendReq] = useState(false);

  const [showFriends, setShowFriends] = useState(false);

  const profilePosts = sortByDate(
    posts.filter((post) => post.author.userId === profileId)
  );

  async function handleAddFriend() {
    if (!profile) {
      return;
    }

    try {
      await dispatch(
        updateUser({
          docId: user.docId,
          sentFriendsRequests: [
            ...user.sentFriendsRequests,
            {
              fullName: profile.fullName,
              userId: profile.userId,
              username: profile.username,
            },
          ],
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.docId);

      await updateDoc(profileDocRef, {
        friendsRequests: arrayUnion({
          fullName: user.fullName,
          userId: user.userId,
          username: user.username,
        }),
      });
    } catch (e) {
      // removing profile from sent friends requests
      const updatedSentFriendsRequests: Friend[] =
        user.sentFriendsRequests.filter(
          (friend) => friend.userId !== profileId
        );
      return dispatch(
        updateUser({
          docId: user.docId,
          sentFriendsRequests: updatedSentFriendsRequests,
        })
      );
    }

    setIsSentFriendReq(true);
  }

  async function handleCancelFriendReq() {
    try {
      const updatedSentFriendsRequests: Friend[] =
        user.sentFriendsRequests.filter(
          (friend) => friend.userId !== profileId
        );
      await dispatch(
        updateUser({
          docId: user.docId,
          sentFriendsRequests: updatedSentFriendsRequests,
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.docId);

      const updatedFriendsRequests: Friend[] = profile.friendsRequests.filter(
        (friend) => friend.userId !== user.userId
      );

      await updateDoc(profileDocRef, {
        friendsRequests: updatedFriendsRequests,
      });
    } catch (e) {
      return dispatch(
        updateUser({
          docId: user.docId,
          friendsRequests: [
            ...user.friendsRequests,
            {
              fullName: profile.fullName,
              userId: profile.userId,
              username: profile.username,
            },
          ],
        })
      );
    }

    setIsSentFriendReq(false);
  }

  async function handleAcceptFriendReq() {
    try {
      const updatedFriendsRequests: Friend[] = user.friendsRequests.filter(
        (friend) => friend.userId !== profileId
      );

      await dispatch(
        updateUser({
          docId: user.docId,
          friendsRequests: updatedFriendsRequests,
          friends: [
            ...user.friends,
            {
              fullName: profile.fullName,
              userId: profile.userId,
              username: profile.username,
            },
          ],
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.docId);

      const updatedSentFriendsRequests: Friend[] =
        profile.sentFriendsRequests.filter(
          (friend) => friend.userId !== user.userId
        );
      const updatedFriends: Friend[] = [
        ...profile.friends,
        {
          username: user.username,
          fullName: user.fullName,
          userId: user.userId,
        },
      ];

      await updateDoc(profileDocRef, {
        sentFriendsRequests: updatedSentFriendsRequests,
        friends: updatedFriends,
      });

      setProfile({ ...profile, friends: updatedFriends });
    } catch (e) {
      const updatedFriends = user.friends.filter(
        (friend) => friend.userId !== profile.userId
      );
      return dispatch(
        updateUser({
          docId: user.docId,
          friendsRequests: [
            ...user.friendsRequests,
            {
              fullName: profile.fullName,
              userId: profile.userId,
              username: profile.username,
            },
          ],
          friends: updatedFriends,
        })
      );
    }

    setIsReceivedFriendReq(false);
    setIsFriend(true);
  }

  async function handleDeleteFriend() {
    try {
      const updatedFriends = user.friends.filter(
        (friend) => friend.userId !== profileId
      );
      await dispatch(
        updateUser({ docId: user.docId, friends: updatedFriends })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.docId);

      const updatedFriends = profile.friends.filter(
        (friend) => friend.userId !== user.userId
      );

      await updateDoc(profileDocRef, {
        friends: updatedFriends,
      });

      setProfile({ ...profile, friends: updatedFriends });
    } catch (e) {
      return dispatch(
        updateUser({
          docId: user.docId,
          friends: [
            ...user.friends,
            {
              fullName: profile.fullName,
              userId: profile.userId,
              username: profile.username,
            },
          ],
        })
      );
    }

    setIsFriend(false);
  }

  useEffect(() => {
    async function getProfile() {
      if (user.status === RequestStatus.Loading) {
        return;
      }
      if (user.status === RequestStatus.Error) {
        return setProfileError("Failed to load profile");
      }

      const q = query(
        collection(db, "users"),
        where("userId", "==", profileId)
      );

      try {
        const usersDocs = (await getDocs(q)).docs;
        if (!usersDocs[0]) {
          return setProfileError("Failed to load profile");
        }

        const profile = {
          ...usersDocs[0].data(),
          docId: usersDocs[0].id,
        } as User;
        setProfile(profile);

        if (profile.userId === user.userId) {
          // my profile
          return;
        }
        const isSentFriendRequest = user.sentFriendsRequests.find(
          (friend) => friend.userId === profileId
        );
        const isFriend = user.friends.find(
          (friend) => friend.userId === profileId
        );
        const isReceivedFriendReq = user.friendsRequests.find(
          (friend) => friend.userId === profileId
        );

        if (isSentFriendRequest) {
          setIsSentFriendReq(true);
        }
        if (isFriend) {
          setIsFriend(true);
        }
        if (isReceivedFriendReq) {
          setIsReceivedFriendReq(true);
        }
      } catch (e) {
        setProfileError("Failed to get user");
      } finally {
        setIsProfileLoading(false);
      }
    }

    getProfile();

    dispatch(getPosts());
  }, [user]);

  return (
    <Layout maxWidth="md">
      <>
        {profileError ? (
          <Typography color={"error"}>{profileError}</Typography>
        ) : isProfileLoading ? (
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
                <Styled.FriendsBtn onClick={() => setShowFriends(true)}>
                  <Typography component="b" sx={{ fontWeight: "bold" }}>
                    {profile?.friends.length}
                  </Typography>
                  <Typography sx={{ marginTop: "5px" }}>friends</Typography>
                </Styled.FriendsBtn>
              </Styled.TopBarRight>
            </Styled.TopBar>
            {profileId !== user.userId && (
              <Styled.ActionsBar>
                <>
                  {isFriend ? (
                    <Button
                      variant="contained"
                      onClick={handleDeleteFriend}
                      color="error"
                      startIcon={<CloseIcon />}
                    >
                      Delete friend
                    </Button>
                  ) : isReceivedFriendReq ? (
                    <Button variant="contained" onClick={handleAcceptFriendReq}>
                      Accept friend request
                    </Button>
                  ) : isSentFriendReq ? (
                    <Button variant="contained" onClick={handleCancelFriendReq}>
                      Cancel friend request
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddFriend}
                    >
                      Add friend
                    </Button>
                  )}
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
      <FriendsDialog
        isOpen={showFriends}
        onClose={() => setShowFriends(false)}
        friends={profile.friends || []}
      />
    </Layout>
  );
}

export default withProtected(Profile);
