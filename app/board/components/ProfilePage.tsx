"use client";
import PageTitle from "@/components/PageTitle";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfilePage = () => {
  const { isLoading, userProfile } = useGetUserProfile();
  return (
    <>
      <div className="flex flex-col bg-yellow-500  justify-center items-center border-r-black rounded-s-xl">
        <div className="rounded-xl">
          <Image src={"/mickey.png"} alt="something" width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <PageTitle title="Name" />: {userProfile?.username}
          <PageTitle title="Email" />: {userProfile?.email}
          <PageTitle title="Bio" />: i am an Engineer, i think Angel really
          likes me,i wish to hold her soon, money has finished in the country
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
