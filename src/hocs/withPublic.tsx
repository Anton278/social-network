import { RequestStatus } from "@/models/RequestStatus";
import {
  selectAuthStatus,
  selectIsAuthed,
} from "@/redux/slices/auth/selectors";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function withPublic(Component: React.FC) {
  function Public(props: any) {
    const router = useRouter();
    const isAuthed = useSelector(selectIsAuthed);
    const authStatus = useSelector(selectAuthStatus);

    useEffect(() => {
      if (authStatus === RequestStatus.Loading) {
        return;
      }
      if (isAuthed) {
        router.push("/posts");
      }
    }, [isAuthed, authStatus]);

    return authStatus === RequestStatus.Loading ? (
      <div data-testid="loading-txt">loading...</div>
    ) : isAuthed ? (
      <div data-testid="redirect-txt">Redirecting...</div>
    ) : (
      <Component {...props} />
    );
  }

  return Public;
}

export { withPublic };
