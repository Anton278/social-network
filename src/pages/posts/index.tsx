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
import { isFriend } from "@/utils/isFriend";
import * as Styled from "@/styles/Posts.styled";
import { sortByDate } from "@/utils/sortByDate";

const posts = [
  {
    author: { username: "anton278", fullName: "Anton Nakonechnyi" },
    authorId: "1",
    post: "Very first post. Hello!",
    comments: [
      {
        userId: "CwYS23Q87iOxCpHCTU1qlzDka263",
        username: "john001",
        comment: "Comment 1",
        id: "1",
        fullName: "John Doe",
      },
      {
        userId: "CwYS23Q87iOxCpHCTU1qlzDka263",
        username: "john001",
        comment: "Comment 2",
        id: "2",
        fullName: "John Doe",
      },
    ],
  },
  {
    author: { username: "john001", fullName: "John Doe" },
    authorId: "2",
    post: "Lorem ipsum dolor...",
    comments: [],
  },
];

interface PostWithId extends PostModel {
  id: string;
}

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

          const isAuthorFriend = isFriend(
            post.author.userId,
            friends,
            sentFriendsRequests
          );

          if (isAuthorFriend || post.author.userId === userId) {
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
        <AddPost />
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
