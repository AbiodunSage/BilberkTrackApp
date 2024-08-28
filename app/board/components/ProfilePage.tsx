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

  const profilePicture =
    profileData?.profilePicture ?? "/profileplaceholder.png";
  return (
    <>
      <div className="flex flex-col items-center border-r-black rounded-s-xl p-1 sm:p-2 md:p-3 lg:p-4">
        <div className="mb-1 sm:mb-2 md:mb-3 lg:mb-4">
          <img
            style={{ width: "200px", height: "200px" }}
            className="border-style-solid border-s-yellow-500 border-2 rounded-full"
            src={profilePicture}
            alt="Profile"
          />
        </div>
        <div className="flex flex-col items-center w-full space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
          <div className="border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl p-1 sm:p-2 md:p-3 lg:p-4 bg-white">
            <PageTitle title={`Name: ${userProfile?.username}`} />
          </div>
          <div className="border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl p-1 sm:p-2 md:p-3 lg:p-4 bg-white">
            <PageTitle title={`Email:`} />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl overflow-hidden text-ellipsis whitespace-nowrap text-black">
              {userProfile?.email}
            </p>
          </div>
          <div className="border-style-solid border-x-black border-2 rounded-lg w-full shadow-xl p-1 sm:p-2 md:p-3 lg:p-4 bg-white">
            <PageTitle title="Bio" />
            <p>{profileData?.bio}</p>
          </div>
          <DialogButton />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
