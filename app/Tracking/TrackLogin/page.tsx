"use client";
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
import React, { useState } from "react";
import TrackPage from "../page";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

const TrackLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: any) => {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  };

  const { loading, error, login } = useLogin();
  const handleSubmit = async () => {
    await login(formData);
  };
  return (
    <>
      <PageTitle title="Track Progress" />
      <div className="text-center font-semibold font-sans">
        <h1>Track your application process</h1>
        <p> Provide your application email and Password</p>
      </div>
      <div className="bg-gray-200 container w-3/4 border-solid border-3 shadow-lg flex flex-wrap">
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="m@example.com"
          required
        />
        <Input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
        />
        <div>
          <AlertDialog>
            <AlertDialogTrigger
              onClick={handleSubmit}
              className="bg-yellow-600 w-full border-2 rounded-md mx-auto px-8"
            >
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
