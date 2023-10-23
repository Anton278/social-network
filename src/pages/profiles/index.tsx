import { InputAdornment, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Layout from "@/components/Layout";
import { selectUsers, selectUsersStatus } from "@/redux/slices/users/selectors";
import { RequestStatus } from "@/models/RequestStatus";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUsers } from "@/redux/slices/users/thunks";
import UserSummary from "@/components/UserSummary";
import { withProtected } from "@/hocs/withProtected";

import * as Styled from "@/styles/Profiles.styled";

function Profiles() {
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const usersStatus = useSelector(selectUsersStatus);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const searchedUsers = users.filter((user) =>
    user.username.includes(searchValue)
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Layout>
      <Styled.SearchBar>
        <Styled.Search
          label="Search by username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Styled.SearchBar>
      <Styled.UsersListWrapper>
        {usersStatus === RequestStatus.Error ? (
          <Typography color="error" sx={{ textAlign: "center" }}>
            Failed to load users
          </Typography>
        ) : usersStatus === RequestStatus.Loading ? (
          <div style={{ textAlign: "center" }}>loading...</div>
        ) : searchedUsers.length ? (
          searchedUsers
            .slice(0, page * itemsPerPage)
            .map((user) => (
              <UserSummary
                fullName={user.fullName}
                id={user.id}
                username={user.username}
                key={user.id}
              />
            ))
        ) : (
          <Typography>
            No results by "<b>{searchValue}</b>"
          </Typography>
        )}
      </Styled.UsersListWrapper>
      {Boolean(searchedUsers.length) &&
        !searchValue &&
        page * itemsPerPage < users.length && (
          <Styled.ShowMoreWrapper>
            <Button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Show more
            </Button>
          </Styled.ShowMoreWrapper>
        )}
    </Layout>
  );
}

export default withProtected(Profiles);
