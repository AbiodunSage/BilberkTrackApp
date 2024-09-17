"use client";
import PageTitle from "@/components/PageTitle";
import React from "react";

import FormUpload from "./FormUpload";
import Navigation from "@/app/(auth)/Nav/page";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UploadFiles = () => {
  const router = useRouter();
  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    }
  };
  return (
    <>
      <main className="container w-3/4 mx-auto">
        {/* <Navigation /> */}
        <nav className="m-8">
          <Button className="bg-yellow-600" onClick={goBack}>
            BACK
          </Button>
        </nav>

        <PageTitle
          className=" flex justify-center bg-yellow-500  w-full  rounded-sm p-2 shadow-md"
          title="UPLOAD FILES"
        />

        <div className="m-8 text-3xl">
          Hi,there! Carefully Upload your documents. This will help us
          understand your educational status and how to help you further.
        </div>
        <FormUpload />
        <div className="bg-yellow-600 m-8 w-full h-20 text-white text-center font-extrabold mx-auto">
          <h1 className="mx-auto">Thank you for Your Time!!!</h1>
        </div>
      </main>
    </>
  );
};

export default UploadFiles;
// take files uploaded and push to storage
