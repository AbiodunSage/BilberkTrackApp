"use client";

import React from "react";
import logout from "../hooks/useLogOut";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/Login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
