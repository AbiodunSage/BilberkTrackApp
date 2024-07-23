"use client";
import React, { useEffect } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Skeleton } from "@/components/ui/skeleton";

const HelloUser: React.FC = () => {
  const { isLoading, userProfile } = useGetUserProfile();

  useEffect(() => {
    if (userProfile) {
      console.log("User profile loaded:", userProfile);
    }
  }, [userProfile]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full bg-yellow-500" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-yellow-500" />
          <Skeleton className="h-4 w-[200px] bg-yellow-500" />
        </div>
      </div>
    );
  }
  if (!userProfile) {
    return <div>User not found</div>;
  }
  return (
    <>
      <div className="font-bold">welcome {userProfile.username}</div>
    </>
  );
};

export default HelloUser;
