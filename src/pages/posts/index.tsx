import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Typography } from "@mui/material";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { withProtected } from "@/hocs/withProtected";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import AddPost from "@/components/AddPost";
import FriendsPostsOver from "@/components/FriendsPostsOver";
import { Post as PostModel } from "@/models/Post";
import { sortPostsFromNewest } from "@/utils/sortPostsFromNewest";
import { getPosts } from "@/redux/slices/posts/thunks";
import { selectPosts, selectPostsStatus } from "@/redux/slices/posts/selectors";
import { RequestStatus } from "@/models/RequestStatus";
import { Comment } from "@/models/Comment";

import * as Styled from "@/styles/Posts.styled";

function Posts() {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const { friends, id } = useAppSelector((state) => state.user);

  const [userAndFriendsPosts, setUserAndFriendsPosts] = useState<PostModel[]>(
    []
  );
  const [otherUsersPosts, setOtherUsersPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    if (!posts.length) {
      return;
    }

    const date = new Date();
    const strDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    const todaysPosts: PostModel[] = posts.filter((post) => {
      const postDate = new Date(post.timeStamp.seconds * 1000);
      const postStrDate = `${postDate.getDate()}.${postDate.getMonth()}.${postDate.getFullYear()}`;
      return postStrDate === strDate;
    });

    let userAndFriendsPosts: PostModel[] = [];
    let otherUsersPosts: PostModel[] = [];

    todaysPosts.forEach((post) => {
      const isAuthorFriend = Boolean(
        friends.find((friend) => friend.id === post.author.id)
      );

      if (post.author.id === id) {
        return userAndFriendsPosts.push(post);
      }

      if (post.isPrivate) {
        if (!isAuthorFriend) {
          return;
        }
        return userAndFriendsPosts.push(post);
      }

      if (isAuthorFriend) {
        userAndFriendsPosts.push(post);
      } else {
        otherUsersPosts.push(post);
      }
    });

    sortPostsFromNewest(userAndFriendsPosts);
    sortPostsFromNewest(otherUsersPosts);

    userAndFriendsPosts = userAndFriendsPosts.map((post) => {
      const { comments } = post;
      const sortedComments = JSON.parse(JSON.stringify(comments)).sort(
        (a: Comment, b: Comment) => b.timestamp - a.timestamp
      );
      return { ...post, comments: sortedComments };
    });

    otherUsersPosts = otherUsersPosts.map((post) => {
      const { comments } = post;
      const sortedComments = JSON.parse(JSON.stringify(comments)).sort(
        (a: Comment, b: Comment) => b.timestamp - a.timestamp
      );
      return { ...post, comments: sortedComments };
    });

    setUserAndFriendsPosts(userAndFriendsPosts);
    setOtherUsersPosts(otherUsersPosts);
  }, [posts, friends, id]);

  if (postsStatus === RequestStatus.Loading) {
    return (
      <Layout>
        <>
          <AddPost />
          <div data-testid="loading-indicator">Loading...</div>
        </>
      </Layout>
    );
  }

  if (postsStatus === RequestStatus.Error) {
    return (
      <Layout>
        <>
          <AddPost />
          <Typography color="error" data-testid="err-txt">
            Failed to get posts
          </Typography>
        </>
      </Layout>
    );
  }

  return (
    <Layout>
      <AddPost />
      <Styled.Posts>
        <Styled.PostsContainer>
          {userAndFriendsPosts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              text={post.body}
              date={post.timeStamp.seconds}
              comments={post.comments}
              isPrivate={post.isPrivate}
              postId={post.id}
              isEdited={post.isEdited}
            />
          ))}
        </Styled.PostsContainer>
        <FriendsPostsOver />
        <Styled.PostsContainer>
          {otherUsersPosts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              text={post.body}
              date={post.timeStamp.seconds}
              comments={post.comments}
              isPrivate={post.isPrivate}
              postId={post.id}
              isEdited={post.isEdited}
            />
          ))}
        </Styled.PostsContainer>
      </Styled.Posts>
    </Layout>
  );
}

export default withProtected(Posts);
