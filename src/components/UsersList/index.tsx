import * as Styled from "./UsersList.styled";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Avatar, Typography } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import { memo } from "react";

interface UsersListProps {
  usersDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  searchValue?: string;
}

function UsersList(props: UsersListProps) {
  const { usersDocs = [], searchValue = "" } = props;

  const searchedUsersDocs = usersDocs.filter((userDoc) =>
    userDoc.data().username.includes(searchValue)
  );

  return (
    <Styled.List>
      {searchedUsersDocs.length ? (
        usersDocs
          .filter((userDoc) => userDoc.data().username.includes(searchValue))
          .map((userDoc) => {
            const user = userDoc.data();

            return (
              <Styled.User href={`/profiles/${user.userId}`} key={user.userId}>
                <Avatar
                  sx={{
                    bgcolor: stringToColor(user.fullName),
                    marginRight: "10px",
                  }}
                >
                  {user.fullName.split(" ")[0][0]}
                  {user.fullName.split(" ")[1][0]}
                </Avatar>
                <div>
                  <Typography
                    component="h5"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {user.username}
                  </Typography>
                  <Typography>{user.fullName}</Typography>
                </div>
              </Styled.User>
            );
          })
      ) : (
        <Typography>No results found by search "{searchValue}"</Typography>
      )}
    </Styled.List>
  );
}

export default memo(UsersList);
