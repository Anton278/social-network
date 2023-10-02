import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";
import FriendsPostsOver from "@/components/FriendsPostsOver";
import { useState, useEffect } from "react";
import { Post as PostModel } from "@/models/Post";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../_app";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Typography } from "@mui/material";
import { selectUserId } from "@/redux/slices/user/selectors";
import * as Styled from "@/styles/Posts.styled";
import { sortByDate } from "@/utils/sortByDate";
import { PostWithId } from "@/models/PostWithId";

function Posts() {
  const { friends, sentFriendsRequests } = useAppSelector(
    (state) => state.user
  );
  const [userAndFriendsPosts, setUserAndFriendsPosts] = useState<PostWithId[]>(
    []
  );
  const userId = useSelector(selectUserId);
  const [otherUsersPosts, setOtherUsersPosts] = useState<PostWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      setError("");

      try {
        const postsDocs = (await getDocs(collection(db, "posts"))).docs;
        if (!postsDocs.length) {
          return;
        }

        const userAndFriendsPosts: PostWithId[] = [];
        const otherUsersPosts: PostWithId[] = [];
        postsDocs.forEach((postDoc) => {
          const post = postDoc.data() as PostModel;

          const isAuthorFriend = Boolean(
            friends.find((friend) => friend.userId === post.author.userId)
          );
          const isAuthorInSentFriendsRequests = Boolean(
            sentFriendsRequests.find(
              (futureFriend) => futureFriend.userId === post.author.userId
            )
          );

          if (post.author.userId === userId) {
            return userAndFriendsPosts.push({ ...post, id: postDoc.id });
          }

          if (post.isPrivate) {
            if (!isAuthorFriend) {
              return;
            }
            return userAndFriendsPosts.push({ ...post, id: postDoc.id });
          }

          if (isAuthorFriend || isAuthorInSentFriendsRequests) {
            userAndFriendsPosts.push({ ...post, id: postDoc.id });
          } else {
            otherUsersPosts.push({ ...post, id: postDoc.id });
          }
        });

        sortByDate(userAndFriendsPosts);
        sortByDate(otherUsersPosts);

        setUserAndFriendsPosts(userAndFriendsPosts);
        setOtherUsersPosts(otherUsersPosts);
      } catch (e) {
        setError("Failed to get posts");
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, [friends, sentFriendsRequests, userId]);

  function onAddedPost(post: PostWithId) {
    setUserAndFriendsPosts((oldPosts) => sortByDate([...oldPosts, post]));
  }

  if (isLoading) {
    return (
      <Layout>
        <>
          <AddPost />
          <div>Loading...</div>
        </>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <>
          <AddPost />
          <Typography color="error">{error}</Typography>
        </>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <AddPost onAddedPost={onAddedPost} />
        <div>
          <Styled.PostsContainer>
            {userAndFriendsPosts.map((post) => (
              <Post
                key={post.id}
                author={post.author}
                text={post.body}
                date={post.timeStamp.seconds}
                postId="#"
                comments={post.comments}
              />
            ))}
          </Styled.PostsContainer>
          {Boolean(userAndFriendsPosts.length) && <FriendsPostsOver />}
          <Styled.PostsContainer>
            {otherUsersPosts.map((otherUserPost) => (
              <Post
                key={otherUserPost.id}
                author={otherUserPost.author}
                text={otherUserPost.body}
                date={otherUserPost.timeStamp.seconds}
                postId="#"
                comments={otherUserPost.comments}
              />
            ))}
          </Styled.PostsContainer>
        </div>
      </>
    </Layout>
  );
}

export default withProtected(Posts);
