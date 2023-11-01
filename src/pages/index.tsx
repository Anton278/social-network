import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppSelector } from "@/hooks/useAppSelector";
import { RequestStatus } from "@/models/RequestStatus";
import {
  selectAuthStatus,
  selectIsAuthed,
} from "@/redux/slices/auth/selectors";

export default function Home() {
  const router = useRouter();
  const isAuthed = useAppSelector(selectIsAuthed);
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === RequestStatus.IDLE) {
      router.push(isAuthed ? "/posts" : "/login");
    }
  }, [authStatus]);

  return (
    <div>
      {authStatus === RequestStatus.Loading ? "loading..." : "redirecting..."}
    </div>
  );
}
