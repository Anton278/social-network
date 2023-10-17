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
import { sortByDate } from "@/utils/sortByDate";
import { getPosts } from "@/redux/slices/posts/thunks";
import { selectPosts, selectPostsStatus } from "@/redux/slices/posts/selectors";
import { RequestStatus } from "@/models/RequestStatus";

import * as Styled from "@/styles/Posts.styled";

function Posts() {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const { friends, sentFriendsRequests, id } = useAppSelector(
    (state) => state.user
  );

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

    const userAndFriendsPosts: PostModel[] = [];
    const otherUsersPosts: PostModel[] = [];

    posts.forEach((post) => {
      const isAuthorFriend = Boolean(
        friends.find((friend) => friend.id === post.author.id)
      );
      const isAuthorInSentFriendsRequests = Boolean(
        sentFriendsRequests.find(
          (futureFriend) => futureFriend.id === post.author.id
        )
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

      if (isAuthorFriend || isAuthorInSentFriendsRequests) {
        userAndFriendsPosts.push(post);
      } else {
        otherUsersPosts.push(post);
      }
    });

    sortByDate(userAndFriendsPosts);
    sortByDate(otherUsersPosts);

    setUserAndFriendsPosts(userAndFriendsPosts);
    setOtherUsersPosts(otherUsersPosts);
  }, [posts, friends, sentFriendsRequests, id]);

  if (postsStatus === RequestStatus.Loading) {
    return (
      <Layout>
        <>
          <AddPost />
          <div>Loading...</div>
        </>
      </Layout>
    );
  }

  if (postsStatus === RequestStatus.Error) {
    return (
      <Layout>
        <>
          <AddPost />
          <Typography color="error">Failed to get posts</Typography>
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
                comments={post.comments}
                isPrivate={post.isPrivate}
                postId={post.id}
              />
            ))}
          </Styled.PostsContainer>
          {Boolean(userAndFriendsPosts.length) && <FriendsPostsOver />}
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
              />
            ))}
          </Styled.PostsContainer>
        </div>
      </>
    </Layout>
  );
}

export default withProtected(Posts);
