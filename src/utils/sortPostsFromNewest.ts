import { Post } from "@/models/Post";

function sortPostsFromNewest(posts: Post[]) {
  const sortedPosts = posts.sort(
    (a, b) => b.timeStamp.seconds - a.timeStamp.seconds
  );

  return sortedPosts;
}

export { sortPostsFromNewest };
