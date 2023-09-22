import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withProtected(Component: React.FC) {
  function Protected(props: any) {
    const router = useRouter();
    const { auth, isLoading } = useFirebaseAuth();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!auth.currentUser) {
        router.push("/login");
      }
    }, [isLoading]);

    return isLoading ? (
      <div>loading...</div>
    ) : auth.currentUser ? (
      <Component {...props} />
    ) : (
      <div>Redirecting...</div>
    );
  }

  return Protected;
}

export { withProtected };
