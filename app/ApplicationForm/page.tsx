"use client";
import PageTitle from "@/components/PageTitle";
import React from "react";
import Navigation from "../(auth)/Nav/page";
import FormApply from "./FormApply";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ApplicationForm = () => {
  const router = useRouter();
  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } /*  else {
      router.push("/board"); // Fallback to the home page or any specific page
    } */
  };
  return (
    <>
      <main className=" w-3/4 mx-auto">
        {/* <Navigation /> */}
        <nav className="m-8">
          <Button className="bg-yellow-600" onClick={goBack}>
            BACK
          </Button>
        </nav>
        <PageTitle
          className=" flex justify-center bg-yellow-500  w-full  rounded-sm p-2 shadow-md"
          title="APPLICATION FORM"
        />
        <div className="m-6 text-pretty text-3xl">
          Hi there! Kindly fill up the form carefully and upload your documents.
          This form will help us understand your educational status and how to
          help you further
        </div>
        <FormApply />
        <div className="bg-yellow-600 m-8 w-full h-20 text-white text-center font-extrabold mx-auto">
          <h1 className="mx-auto">Thank you for Your Time!!!</h1>
        </div>
      </main>
    </>
  );
};

export default ApplicationForm;
