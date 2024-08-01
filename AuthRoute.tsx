"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { User, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "./firebase/firebase";

const HOME_ROUTE = "/Signup";
const DASH_BOARD = "/Board";

const AuthRouter = (props: any) => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathName = usePathname();

  const redirect = (
    isLoading: boolean,
    firebaseUser: User | null | undefined
  ) => {
    if (!isLoading) {
      if (firebaseUser) {
        router.push(DASH_BOARD);
      } else {
        router.push(HOME_ROUTE);
      }
    }
  };

  useEffect(() => {
    redirect(loading, user);
  }, [loading, user, pathName]);

  if (loading) {
    return null;
  } else {
    return <>{props.children}</>;
  }
};

export default AuthRouter;
