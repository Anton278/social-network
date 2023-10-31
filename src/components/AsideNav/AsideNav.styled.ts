import styled from "@emotion/styled";

export const Aside = styled.aside({
  maxWidth: "320px",
  width: "100%",
  display: "none",

  "@media(min-width: 900px)": {
    display: "block",
  },
});
