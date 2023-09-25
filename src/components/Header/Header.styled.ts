import styled from "@emotion/styled";

export const Nav = styled.nav({});

export const Links = styled.ul({
  margin: 0,
  padding: 0,
  display: "flex",
  listStyleType: "none",

  "li:not(:last-of-type)": { marginRight: "10px" },
});
