import PageTitle from "@/components/PageTitle";
import React from "react";
import Navigation from "../(auth)/Nav/page";
import FormApply from "./FormApply";
import UploadFiles from "@/app/UploadFiles/page";

const ApplicationForm = () => {
  return (
    <>
      <main className="container w-3/4 mx-auto">
        <Navigation />
        <PageTitle title="Application Form" />
        <div className="bg-red-400 w-full h-20 text-white text-center font-extrabold mx-auto">
          <h1 className="mx-auto">Online Registration</h1>
        </div>
        <h1>
          Hi,there! Kindly fill up the form carefully and upload your documents.
          This form will help us understand your educational status and how to
          help you further.
        </h1>
        <FormApply />
        <div className="bg-red-400 w-full h-20 text-white text-center font-extrabold mx-auto">
          <h1 className="mx-auto">Thank you for Your Time!!!</h1>
        </div>
      </main>
    </>
  );
};

export default ApplicationForm;
// push files to another firestore collection
