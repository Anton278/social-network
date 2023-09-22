import Layout from "@/components/Layout";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useFirebaseDB } from "@/hooks/useFirebaseDB";
import { selectUsersDocs } from "@/redux/slices/users/selectors";
import { getUsers } from "@/redux/slices/users/thunks";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Typography, Button } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import { User } from "@/models/User";
import Link from "next/link";
import * as Styled from "@/styles/Profile.styled";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";

function Profile() {
  const router = useRouter();
  const userId = router.query.id;
  const { db } = useFirebaseDB();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);

      try {
        const q = query(collection(db, "users"), where("userId", "==", userId));

        const querySnapshot = (await getDocs(q)).docs;
        if (querySnapshot[0]) {
          setUser(querySnapshot[0].data() as User);
          console.log("user ", querySnapshot[0].data());
        } else {
          setError("Failed to get user");
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
                  2
                </Typography>
                <Typography sx={{ marginTop: "5px" }}>posts</Typography>
              </Styled.PostsButton>
              <Styled.FriendsLink href="#">
                <Typography component="b" sx={{ fontWeight: "bold" }}>
                  12
                </Typography>
                <Typography sx={{ marginTop: "5px" }}>friends</Typography>
              </Styled.FriendsLink>
            </Styled.TopBarRight>
          </Styled.TopBar>
          <Styled.ActionsBar>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add friend
            </Button>
            {/* <Button variant="outlined" startIcon={<DeleteIcon />} color="error">
              Delete friend
            </Button> */}
            <Button variant="outlined" startIcon={<MessageIcon />}>
              Message
            </Button>
          </Styled.ActionsBar>
        </>
      )}
    </Layout>
  );
}

export default Profile;
