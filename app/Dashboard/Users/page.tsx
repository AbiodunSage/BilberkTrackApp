"use client";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";
import { DialogDemo } from "../EditProfile";
import Image from "next/image";
import Data from "../../Database/Data";

const user = Data;

let backgroundColor = "";

if (user.status === "Approved") {
  backgroundColor = "bg-green-400"; // Green for approved (already included)
} else if (user.status === "Rejected") {
  backgroundColor = "bg-red-500";
} else if (user.status === "Under Review") {
  backgroundColor = "bg-yellow-300";
} else {
  console.warn(`Unexpected user status: ${user.status}`); // Handle unexpected values
  backgroundColor = "bg-gray-200";
}
const UsersPage = () => {
  return (
    <>
      <PageTitle title="User" />
      <div className="box-border h-3/4 w-full p-4 border-4 shadow-2xl rounded-lg m-8">
        <div className="l">
          <Image
            className="rounded-md m-8"
            src={user.image}
            alt="profile pic"
            width={200}
            height={200}
          />
        </div>
        <div className="bg-gray-400 border-2 rounded-md shadow-2xl border-yellow-600 container w-auto px-4 py-8 ">
          <div className="bg-white border-3 border-solid rounded-md m-4 shadow-2xl border-black text-yellow-600 ">
            <h1 className="m-2">NAME : {user.name}</h1>
          </div>

          <div className="bg-white border-3 border-solid rounded-md m-4 shadow-2xl border-black text-yellow-600 ">
            <h1 className="m-2">USERNAME : {user.Username}</h1>
          </div>

          <div className="bg-white border-3 border-solid rounded-md m-4 shadow-2xl border-black text-yellow-600 ">
            <h1 className="m-2">EMAIL : {user.email}</h1>
          </div>
        </div>
        <div className="absolute">
          <DialogDemo />
        </div>
        <div className="mt-12 flex flex-wrap gap m-5 ">
          <h1 className="bg-gray-100 border-3 w-1/4 border-solid rounded-md m-4 text-center shadow-2xl font bold text-yellow-800">
            status
          </h1>
          <h1
            className={`border-3 w-1/2 border-solid rounded-md m-4 text-center shadow-2xl font bold ${backgroundColor}`}
          >
            {user.status}
          </h1>
        </div>
      </div>
    </>
  );
};

export default UsersPage;
