import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "./useRouter";

export function useRequireAuth(redirectUrl = "/login") {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuth === false) {
      router.push(redirectUrl);
    }
  }, [auth, router, redirectUrl]);

  return auth;
}
