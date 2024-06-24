"use client";

import React from "react";
import logout from "../hooks/useLogOut";
import { useRouter } from "next/navigation";

const HomeButton: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return <button onClick={handleLogout}>Home</button>;
};

export default HomeButton;
