import Layout from "@/components/Layout";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as Styled from "@/styles/Profiles.styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUsersDocs,
  selectUsersStatus,
} from "@/redux/slices/users/selectors";
import { RequestStatus } from "@/models/RequestStatus";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUsers } from "@/redux/slices/users/thunks";
import UsersList from "@/components/UsersList";

function Profiles() {
  const dispatch = useAppDispatch();
  const usersDocs = useSelector(selectUsersDocs);
  const usersStatus = useSelector(selectUsersStatus);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Layout>
      <>
        <Styled.SearchBar>
          <TextField
            id="input-with-icon-textfield"
            label="Search by username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            sx={{ width: "400px" }}
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
          ) : (
            <UsersList usersDocs={usersDocs} searchValue={searchValue} />
          )}
        </Styled.UsersListWrapper>
      </>
    </Layout>
  );
}

export default Profiles;
