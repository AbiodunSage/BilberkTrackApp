"use client";
import React, { useEffect } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";

const HelloUser: React.FC = () => {
  const { isLoading, userProfile } = useGetUserProfile();

  useEffect(() => {
    if (userProfile) {
      console.log("User profile loaded:", userProfile);
    }
  }, [userProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!userProfile) {
    return <div>User not found</div>;
  }
  return (
    <>
      <div>welcome {userProfile.username}</div>
    </>
  );
};

export default HelloUser;
