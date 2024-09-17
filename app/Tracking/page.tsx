"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Minus } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/firebase/firebase"; // ensure firestore and storage are properly exported from your firebase config
import { Progress } from "@/components/ui/progress";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  DocumentData,
} from "firebase/firestore"; // Firestore imports
import { ref, listAll } from "firebase/storage"; // Storage imports
import { Skeleton } from "@/components/ui/skeleton";

interface UserData {
  paymentStatus: boolean;
  visaStatus: boolean;
}

const TrackPage: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subcollectionData, setSubcollectionData] = useState<DocumentData[]>(
    []
  );
  const [dataLoading, setDataLoading] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState<
    boolean | null
  >(null);

  const [uploadsFolderUpdated, setUploadsFolderUpdated] = useState(false);

  const fetchSubcollectionData = async (
    parentCollection: string,
    parentDocId: string,
    subcollection: string
  ) => {
    const subcollectionRef = collection(
      firestore,
      parentCollection,
      parentDocId,
      subcollection
    );
    const q = query(subcollectionRef);
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      setApplicationSubmitted(false);
    } else {
      const data = snapshot.docs.map((doc) => doc.data());
      setSubcollectionData(data);
      setApplicationSubmitted(true);
    }
  };

  const checkUploadsFolderUpdated = async (userId: string) => {
    try {
      const folderRef = ref(storage, `uploads/${userId}`);
      const result = await listAll(folderRef);
      if (result.items.length > 0) {
        setUploadsFolderUpdated(true);
      } else {
        console.log("Uploads folder is empty.");
        setUploadsFolderUpdated(false);
      }
    } catch (error) {
      console.error("Error checking uploads folder:", error);
      setUploadsFolderUpdated(false);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid); // Reference to the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);

          // Fetch subcollection data
          await fetchSubcollectionData("users", user.uid, "applications");

          // Check if file is uploaded
          await checkUploadsFolderUpdated(user.uid);
        } else {
          console.log("No such document!");
        }
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-yellow-500" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-yellow-500" />
          <Skeleton className="h-4 w-[200px] bg-yellow-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user is signed in</div>;
  }

  const ProgressBar = () => {
    let progressValue = 0;
    if (applicationSubmitted) {
      progressValue += 25; // 25% for submitted
    }
    if (uploadsFolderUpdated) {
      progressValue += 25; // Additional 25% for file uploaded
    }
    if (userData?.paymentStatus == true) {
      progressValue += 25; // Additional 25% for payment
    }
    if (userData?.visaStatus) {
      progressValue += 25; // Additional 25% for visa processing
    }
    return progressValue;
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
      <PageTitle title="Application Status" />
      <div className="space-y-8">
        <div className="flex flex-wrap items-center border-4 rounded-2xl space-x-4 sm:space-x-6 px-4 sm:px-8">
          <div>Application Submitted</div>
          {applicationSubmitted ? <Check /> : <Minus />}
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center border-4 rounded-2xl space-x-4 sm:space-x-6 px-4 sm:px-8">
          <div>File Uploaded</div>
          {uploadsFolderUpdated ? <Check /> : <Minus />}
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center border-4 rounded-2xl space-x-4 sm:space-x-6 px-4 sm:px-8">
          <div>Payment</div>
          {userData?.paymentStatus == true ? <Check /> : <Minus />}
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center border-4 rounded-2xl space-x-4 sm:space-x-6 px-4 sm:px-8">
          <div>Visa Processing</div>
          {userData?.visaStatus == true ? <Check /> : <Minus />}
        </div>
      </div>
      <PageTitle title="Progress Bar" />
      <Progress value={ProgressBar()} />
    </div>
  );
};

export default TrackPage;
