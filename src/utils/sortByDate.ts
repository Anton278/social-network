import { PostWithId } from "@/models/PostWithId";

function sortByDate(posts: PostWithId[]) {
  const sortedPosts = posts.sort(
    (a, b) => b.timeStamp.seconds - a.timeStamp.seconds
  );

  return sortedPosts;
}

export { sortByDate };
