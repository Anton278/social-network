import { Post } from "@/models/Post";

function sortByDate(posts: Post[]) {
  posts.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds);
}

export { sortByDate };
