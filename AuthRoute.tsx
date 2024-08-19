"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "./firebase/firebase";
import useShowToast from "./hooks/useShowToast";

const HOME_ROUTE = "/Signup";
const DASH_BOARD = "/Board";

const AuthRouter = (props: any) => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathName = usePathname();
  const showToast = useShowToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        showToast("destructive", "Log In or Sign Up", "error");
        router.replace(HOME_ROUTE);
      }
    }
  }, [loading, user, router, pathName]);

  if (loading || !user) {
    return null; // Don't render the children until authentication is determined
  }

  return <>{props.children}</>;
};

export default AuthRouter;
