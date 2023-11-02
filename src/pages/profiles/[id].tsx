import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { Typography, Divider } from "@mui/material";

import Layout from "@/components/Layout";
import { User } from "@/models/User";
import { withProtected } from "@/hocs/withProtected";
import Post from "@/components/Post";
import { selectPosts, selectPostsStatus } from "@/redux/slices/posts/selectors";
import { getPosts } from "@/redux/slices/posts/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { sortPostsFromNewest } from "@/utils/sortPostsFromNewest";
import { RequestStatus } from "@/models/RequestStatus";
import { useAppSelector } from "@/hooks/useAppSelector";
import ProfileTop from "@/components/ProfileTop";

import * as Styled from "@/styles/Profile.styled";

type ProfileContextValue = {
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User>> | (() => void);
};
export const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  setProfile() {},
});

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

  const profilePosts = sortPostsFromNewest(
    posts.filter((post) => post.author.id === profileId)
  );

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

        if (!userDoc) {
          return setProfileError("Failed to load profile");
        }

        const profile = {
          ...userDoc.data(),
          id: userDoc.id,
        } as User;
        setProfile(profile);
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
    <Layout>
      <>
        {profileError ? (
          <Typography color={"error"}>{profileError}</Typography>
        ) : isProfileLoading ? (
          <div>loading...</div>
        ) : (
          <ProfileContext.Provider value={{ profile, setProfile }}>
            <ProfileTop postsCount={profilePosts.length} />
          </ProfileContext.Provider>
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
    </Layout>
  );
}

export default withProtected(Profile);
