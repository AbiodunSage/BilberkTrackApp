"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Minus } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase"; // ensure firestore is properly exported from your firebase config
import { Progress } from "@/components/ui/progress";
import { doc, getDoc, DocumentData } from "firebase/firestore"; // Firestore imports
import { Skeleton } from "@/components/ui/skeleton";

interface UserData {
  applications: boolean;
  ApplicationProcessed: boolean;
  Payment: boolean;
  VisaProcessing: boolean;
}

const TrackPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid); // Change "users" to your Firestore collection name
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
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
    if (userData?.applications) {
      progressValue += 25; // 25% for submitted
    }
    if (userData?.ApplicationProcessed) {
      progressValue += 25; // Additional 25% for processed
    }
    if (userData?.Payment) {
      progressValue += 25; // Additional 25% for payment
    }
    if (userData?.VisaProcessing) {
      progressValue += 25; // Additional 25% for visa processing
    }
    return progressValue;
  };

  return (
    <ScrollArea className="h-[300px] w-[450px] rounded-md border p-4">
      <div className="space-y-8">
        <PageTitle title="Application Status" />
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div>Application Submitted</div>
            {userData?.applications ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div>Application Processed</div>
            {userData?.ApplicationProcessed ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div>Payment</div>
            {userData?.Payment ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div>Visa Processing</div>
            {userData?.VisaProcessing ? <Check /> : <Minus />}
          </div>
        </div>
        <Progress value={ProgressBar()} />
      </div>
    </ScrollArea>
  );
};

export default TrackPage;
