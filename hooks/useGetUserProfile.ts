"use client";
import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface UserProfile {
  username: string;
  email: string;
}

const useGetUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async (uid: string) => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, userProfile };
};

export default useGetUserProfile;
