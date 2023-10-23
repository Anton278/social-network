import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const SearchBar = styled.div({
  display: "flex",
  justifyContent: "center",
});

export const Search = styled(TextField)({
  width: "400px",
});

export const UsersListWrapper = styled.div({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
});

export const ShowMoreWrapper = styled.div({
  marginTop: 50,
  display: "flex",
  justifyContent: "center",
});
