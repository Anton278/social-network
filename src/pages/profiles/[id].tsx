import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
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
import UserService from "@/services/Users";
import { selectPosts, selectPostsStatus } from "@/redux/slices/posts/selectors";
import { getPosts } from "@/redux/slices/posts/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { sortPostsFromNewest } from "@/utils/sortPostsFromNewest";
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

  const profilePosts = sortPostsFromNewest(
    posts.filter((post) => post.author.id === profileId)
  );

  async function handleAddFriend() {
    if (!profile) {
      return;
    }

    try {
      await dispatch(
        updateUser({
          sentFriendsRequests: [
            ...user.sentFriendsRequests,
            {
              fullName: profile.fullName,
              id: profile.id,
              username: profile.username,
            },
          ],
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.id);

      await updateDoc(profileDocRef, {
        receivedFriendsRequests: arrayUnion({
          fullName: user.fullName,
          id: user.id,
          username: user.username,
        }),
      });
    } catch (e) {
      // removing profile from sent friends requests
      const updatedSentFriendsRequests: Friend[] =
        user.sentFriendsRequests.filter((friend) => friend.id !== profileId);
      return dispatch(
        updateUser({
          sentFriendsRequests: updatedSentFriendsRequests,
        })
      );
    }

    setIsSentFriendReq(true);
  }

  async function handleCancelFriendReq() {
    try {
      const updatedSentFriendsRequests: Friend[] =
        user.sentFriendsRequests.filter((friend) => friend.id !== profileId);
      await dispatch(
        updateUser({
          sentFriendsRequests: updatedSentFriendsRequests,
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.id);

      const updatedReceivedFriendsReqs: Friend[] =
        profile.receivedFriendsRequests.filter(
          (friend) => friend.id !== user.id
        );

      await updateDoc(profileDocRef, {
        receivedFriendsRequests: updatedReceivedFriendsReqs,
      });
    } catch (e) {
      return dispatch(
        updateUser({
          receivedFriendsRequests: [
            ...user.receivedFriendsRequests,
            {
              fullName: profile.fullName,
              id: profile.id,
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
      const updatedReceivedFriendsReqs: Friend[] =
        user.receivedFriendsRequests.filter(
          (friend) => friend.id !== profileId
        );

      await dispatch(
        updateUser({
          receivedFriendsRequests: updatedReceivedFriendsReqs,
          friends: [
            ...user.friends,
            {
              fullName: profile.fullName,
              id: profile.id,
              username: profile.username,
            },
          ],
        })
      ).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.id);

      const updatedSentFriendsRequests: Friend[] =
        profile.sentFriendsRequests.filter((friend) => friend.id !== user.id);
      const updatedFriends: Friend[] = [
        ...profile.friends,
        {
          username: user.username,
          fullName: user.fullName,
          id: user.id,
        },
      ];

      await updateDoc(profileDocRef, {
        sentFriendsRequests: updatedSentFriendsRequests,
        friends: updatedFriends,
      });

      setProfile({ ...profile, friends: updatedFriends });
    } catch (e) {
      const updatedFriends = user.friends.filter(
        (friend) => friend.id !== profile.id
      );
      return dispatch(
        updateUser({
          receivedFriendsRequests: [
            ...user.receivedFriendsRequests,
            {
              fullName: profile.fullName,
              id: profile.id,
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
        (friend) => friend.id !== profileId
      );
      await dispatch(updateUser({ friends: updatedFriends })).unwrap();
    } catch (e) {
      return;
    }

    try {
      const profileDocRef = doc(db, "users", profile.id);

      const updatedFriends = profile.friends.filter(
        (friend) => friend.id !== user.id
      );

      await updateDoc(profileDocRef, {
        friends: updatedFriends,
      });

      setProfile({ ...profile, friends: updatedFriends });
    } catch (e) {
      return dispatch(
        updateUser({
          friends: [
            ...user.friends,
            {
              fullName: profile.fullName,
              id: profile.id,
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
      if (typeof profileId !== "string") {
        return;
      }

      const docRef = doc(db, "users", profileId);
      try {
        const userDoc = await getDoc(docRef);
        console.log("res ", userDoc);

        if (!userDoc) {
          return setProfileError("Failed to load profile");
        }

        const profile = {
          ...userDoc.data(),
          id: userDoc.id,
        } as User;
        setProfile(profile);

        if (profile.id === user.id) {
          // my profile
          return;
        }
        const isSentFriendRequest = user.sentFriendsRequests.find(
          (friend) => friend.id === profileId
        );
        const isFriend = user.friends.find((friend) => friend.id === profileId);
        const isReceivedFriendReq = user.receivedFriendsRequests.find(
          (friend) => friend.id === profileId
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
  }, [user, db, dispatch, profileId]);

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
            {profileId !== user.id && (
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
              isEdited={profilePost.isEdited}
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
