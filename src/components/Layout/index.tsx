import Header from "../Header";
import * as Styled from "./Layout.styled";
import type { Breakpoint } from "@mui/material/styles";
import AsideNav from "../AsideNav";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";

type LayoutProps = {
  maxWidth?: Breakpoint;
  children?: JSX.Element;
};

function Layout({ children, maxWidth }: LayoutProps) {
  const isAuthed = useSelector(selectIsAuthed);

  return (
    <Styled.LayoutWrapper>
      <Header />
      <Styled.Main>
        {isAuthed && <AsideNav />}
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}

export default Layout;
