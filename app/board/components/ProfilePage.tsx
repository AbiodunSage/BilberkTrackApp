"use client";
import DialogButton from "@/components/Dialog";
import PageTitle from "@/components/PageTitle";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const { isLoading, userProfile } = useGetUserProfile();
  return (
    <>
      <div className="flex flex-col  justify-center items-center border-r-black rounded-s-xl">
        <div className="">
          <Image
            className="border-style-solid border-s-yellow-500 border-2 rounded-full"
            src={"/mickey.png"}
            alt="something"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className=" bg-yellow-500 border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title={`Name:${userProfile?.username}`} />
          </div>
          <div className=" bg-yellow-500 border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title={`Email:${userProfile?.email}`} />
          </div>
          <div className=" bg-yellow-500 border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title="Bio" />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
            praesentium nisi aliquid voluptatibus sit accusamus doloribus,
            reiciendis blanditiis animi amet ullam tenetur adipisci optio,
            veniam, alias quaerat commodi temporibus in.
          </div>
          <DialogButton />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
