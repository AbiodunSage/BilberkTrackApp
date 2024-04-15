import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import TrackPage from "../page";

const TrackLogin = () => {
  return (
    <>
      <PageTitle title="Track Progress" />
      <div className="text-center font-semibold font-sans">
        <h1>Track your application process</h1>
        <p> Provide your application Id and Password</p>
      </div>
      <div className="bg-gray-200 container w-3/4 border-solid border-3 shadow-lg flex flex-wrap">
        <Input type="text" placeholder="Application ID" />
        <Input type="passsword" placeholder="Acc password" />
        <div>
          <AlertDialog>
            <AlertDialogTrigger className="bg-yellow-600 w-full border-2 rounded-md mx-auto px-8">
              Check My progress
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>YOUR PROGRESS</AlertDialogTitle>
                <AlertDialogDescription>
                  <TrackPage />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};

export default TrackLogin;
