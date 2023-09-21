import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withProtected(Component: React.FC) {
  function Protected(props: any) {
    const router = useRouter();

    useEffect(() => {
      if (!auth.currentUser) {
        router.push("/login");
      }
    }, []);

    return auth.currentUser ? (
      <Component {...props} />
    ) : (
      <div>Redirecting...</div>
    );
  }

  return Protected;
}

export { withProtected };
