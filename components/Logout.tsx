"use client";

import React from "react";
import useLogout from "../hooks/useLogOut";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { logout } = useLogout(); // Use the useLogout hook to get the logout function

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to home after logging out
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
