import { RequestStatus } from "@/models/RequestStatus";
import {
  selectAuthStatus,
  selectIsAuthed,
} from "@/redux/slices/auth/selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function withProtected(Component: React.FC) {
  function Protected(props: any) {
    const router = useRouter();
    const isAuthed = useSelector(selectIsAuthed);
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
      if (authStatus === RequestStatus.Loading) {
        return;
      }
      if (!isAuthed) {
        router.push("/login");
      }
    }, [authStatus, isAuthed]);

    return authStatus === RequestStatus.Loading ? (
      <div data-testid="loading-txt">loading...</div>
    ) : isAuthed ? (
      <Component {...props} />
    ) : (
      <div data-testid="redirect-txt">Redirecting...</div>
    );
  }

  return Protected;
}

export { withProtected };
