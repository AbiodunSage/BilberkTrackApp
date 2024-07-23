"use client";
import DialogButton from "@/components/Dialog";
import PageTitle from "@/components/PageTitle";
import { auth, firestore } from "@/firebase/firebase";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserProfileData {
  bio: string;
  profilePicture?: string;
}

const ProfilePage = () => {
  const { isLoading, userProfile } = useGetUserProfile();
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfileData(userDoc.data() as UserProfileData);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProfileData();
  }, [user]);

  const profilePicture = profileData?.profilePicture ?? "/mickey.png";
  return (
    <>
      <div className="flex flex-col  justify-center items-center border-r-black rounded-s-xl">
        <div className="">
          <img
            style={{ width: "200px", height: "200px" }}
            className="border-style-solid border-s-yellow-500 border-2 rounded-full"
            src={profilePicture}
            alt="something"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="  border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title={`Name:${userProfile?.username}`} />
          </div>
          <div className=" border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title={`Email:${userProfile?.email}`} />
          </div>
          <div className="  border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl">
            <PageTitle title="Bio" />
            {profileData?.bio}
          </div>
          <DialogButton />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
