import Header from "../Header";
import * as Styled from "./Layout.styled";
import type { Breakpoint } from "@mui/material/styles";
import AsideNav from "../AsideNav";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";

type LayoutProps = {
  maxWidth?: Breakpoint;
  children?: React.ReactNode;
};

function Layout({ children, maxWidth }: LayoutProps) {
  const isAuthed = useSelector(selectIsAuthed);

  return (
    <Styled.LayoutWrapper>
      <Header />
      {/* @ts-expect-error */}
      <Styled.Main fixed component="main">
        {isAuthed && <AsideNav />}
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}

export default Layout;
