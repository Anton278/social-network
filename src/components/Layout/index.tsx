import Header from "../Header";
import * as Styled from "./Layout.styled";

type LayoutProps = {
  children?: JSX.Element;
};

function Layout({ children }: LayoutProps) {
  return (
    <Styled.LayoutWrapper>
      <Header />
      <Styled.Main fixed component="main">
        {children}
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}

export default Layout;
