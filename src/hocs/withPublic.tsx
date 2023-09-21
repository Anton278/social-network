import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

function withPublic(Component: React.FC) {
  function Public(props: any) {
    const router = useRouter();

    useEffect(() => {
      if (auth.currentUser) {
        router.push("/posts");
      }
    }, []);

    return auth.currentUser ? (
      <div>Redirecting...</div>
    ) : (
      <Component {...props} />
    );
  }

  return Public;
}

export { withPublic };
