import Header from "../Header";
import * as Styled from "./Layout.styled";
import AsideNav from "../AsideNav";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/redux/slices/auth/selectors";

type LayoutProps = {
  children?: React.ReactNode;
  layoutWrapperStyles?: React.CSSProperties;
  mainNodeStyles?: React.CSSProperties;
};

function Layout(props: LayoutProps) {
  const { children, layoutWrapperStyles, mainNodeStyles } = props;
  const isAuthed = useSelector(selectIsAuthed);

  return (
    <Styled.LayoutWrapper style={layoutWrapperStyles}>
      <Header />
      {/* @ts-expect-error */}
      <Styled.Main fixed component="main" style={mainNodeStyles}>
        {isAuthed && <AsideNav />}
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.Main>
    </Styled.LayoutWrapper>
  );
}

export default Layout;
