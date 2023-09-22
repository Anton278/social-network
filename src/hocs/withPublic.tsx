import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withPublic(Component: React.FC) {
  function Public(props: any) {
    const router = useRouter();
    const { auth, isLoading } = useFirebaseAuth();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (auth.currentUser) {
        router.push("/posts");
      }
    }, [isLoading]);

    return isLoading ? (
      <div>loading...</div>
    ) : auth.currentUser ? (
      <div>Redirecting...</div>
    ) : (
      <Component {...props} />
    );
  }

  return Public;
}

export { withPublic };
