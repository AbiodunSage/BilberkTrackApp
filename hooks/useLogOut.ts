import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import useShowToast from "./useShowToast";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const showToast = useShowToast();

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      showToast("destructive", "Logged out successfully", "success");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
};

export default useLogout;
