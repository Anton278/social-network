import * as Styled from "./UsersList.styled";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Avatar, Typography } from "@mui/material";
import { stringToColor } from "@/utils/stringToColor";
import { memo } from "react";
import UserSummary from "../UserSummary";

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
              <UserSummary
                fullName={user.fullName}
                userId={user.userId}
                username={user.username}
                key={user.userId}
              />
            );
          })
      ) : (
        <Typography>No results found by search "{searchValue}"</Typography>
      )}
    </Styled.List>
  );
}

export default memo(UsersList);
