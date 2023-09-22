import Header from "../Header";
import * as Styled from "./Layout.styled";
import type { Breakpoint } from "@mui/material/styles";

type LayoutProps = {
  maxWidth?: Breakpoint;
  children?: JSX.Element;
};

function Layout({ children, maxWidth }: LayoutProps) {
  return (
    <Styled.LayoutWrapper>
      <Header />
      {maxWidth ? (
        <Styled.Main maxWidth={maxWidth} component="main">
          {children}
        </Styled.Main>
      ) : (
        <Styled.Main fixed component="main">
          {children}
        </Styled.Main>
      )}
    </Styled.LayoutWrapper>
  );
}

export default Layout;
