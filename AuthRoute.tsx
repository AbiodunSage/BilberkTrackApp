"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "./firebase/firebase";
import useShowToast from "./hooks/useShowToast";

const HOME_ROUTE = "/";
const DASH_BOARD = "/Board";

const AuthRouter = ({
  children,
  isLoggingOut,
}: {
  children: React.ReactNode;
  isLoggingOut: boolean;
}) => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathName = usePathname();
  const showToast = useShowToast();

  useEffect(() => {
    if (!loading && !isLoggingOut) {
      if (!user && pathName === DASH_BOARD) {
        showToast("destructive", "Log In or Sign Up", "error");
        router.replace(HOME_ROUTE);
      }
    }
  }, [loading, user, router, pathName, isLoggingOut]);

  if (loading || (!user && pathName === DASH_BOARD)) {
    return null; // Don't render the children until authentication is determined
  }

  return <>{children}</>;
};

export default AuthRouter;
