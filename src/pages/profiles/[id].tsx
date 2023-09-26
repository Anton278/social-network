import Layout from "@/components/Layout";
import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Typography, Button, Divider } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import { User } from "@/models/User";
import * as Styled from "@/styles/Profile.styled";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import { withProtected } from "@/hocs/withProtected";
import Post from "@/components/Post";
import { selectUserId } from "@/redux/slices/auth/selectors";
import { toast } from "react-toastify";
import UserService from "@/services/UserService";

const posts = ["My first post", "My second post"];

function Profile() {
  const router = useRouter();
  const id = router.query.id;
  const userId = useSelector(selectUserId);
  const { db } = useFirebaseDB();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSentFriendReq, setIsSentFriendReq] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  async function handleAddFriend() {
    if (typeof id !== "string") {
      return;
    }

    try {
      const userDoc = await UserService.getUserDoc(userId);
      const friendDoc = await UserService.getUserDoc(id);

      await UserService.addFriend(userDoc, friendDoc);
      toast.success(`Sent friend request to ${user?.fullName}!`);
    } catch (e) {}
  }

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);

      const q = query(collection(db, "users"), where("userId", "==", id));

      try {
        const usersDocs = (await getDocs(q)).docs;
        if (!usersDocs[0]) {
          return setError("Failed to get user");
        }

        const user = usersDocs[0].data();
        setUser(user as User);

        if (user.userId === userId) {
          // my profile
          return;
        }
        if (user.friendsRequests.includes(userId)) {
          setIsSentFriendReq(true);
        }
      } catch (e) {
        setError("Failed to get user");
      } finally {
        setIsLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <Layout maxWidth="md">
      <>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <Styled.TopBar>
              <Styled.TopBarLeft>
                {user && (
                  <Avatar
                    sx={{
                      width: "100px",
                      height: "100px",
                      bgcolor: stringToColor("Anton Nakonechnyi"),
                    }}
                  >
                    {user.fullName.split(" ")[0][0]}
                    {user.fullName.split(" ")[1][0]}
                  </Avatar>
                )}
                <Typography
                  component="h5"
                  sx={{ fontSize: 18, marginTop: "10px" }}
                >
                  {user?.fullName}
                </Typography>
              </Styled.TopBarLeft>
              <Styled.TopBarRight>
                <Styled.PostsButton>
                  <Typography component="b" sx={{ fontWeight: "bold" }}>
                    {user?.posts.length}
                  </Typography>
                  <Typography sx={{ marginTop: "5px" }}>posts</Typography>
                </Styled.PostsButton>
                <Styled.FriendsLink href="#">
                  <Typography component="b" sx={{ fontWeight: "bold" }}>
                    {user?.friends.length}
                  </Typography>
                  <Typography sx={{ marginTop: "5px" }}>friends</Typography>
                </Styled.FriendsLink>
              </Styled.TopBarRight>
            </Styled.TopBar>
            {id !== userId && (
              <Styled.ActionsBar>
                <>
                  {isSentFriendReq ? (
                    <Button variant="contained">Cancel friend request</Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddFriend}
                    >
                      Add friend
                    </Button>
                  )}
                  {/* <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
              Delete friend
            </Button> */}
                  <Button variant="outlined" startIcon={<MessageIcon />}>
                    Message
                  </Button>
                </>
              </Styled.ActionsBar>
            )}
          </>
        )}
        <Divider sx={{ marginTop: "30px", marginBottom: "30px" }} />
        {user &&
          posts.map((post) => (
            <Post
              key={post}
              author={{ username: user.username, fullName: user.fullName }}
              text={post}
              date="1 minute ago"
            />
          ))}
      </>
    </Layout>
  );
}

export default withProtected(Profile);
