import { withProtected } from "@/hocs/withProtected";

function Posts() {
  return <div>Posts</div>;
}

export default withProtected(Posts);
