"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useLogin from "../hooks/useLogin";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useShowToast from "@/hooks/useShowToast";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const showToast = useShowToast();

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
    router.push("/board");
    showToast("variant", "Logged in successfully", "success");
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="bg-scroll min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/landingpagebg.jpg')`,
      }}
    >
      <main className="flex flex-col justify-between p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <Image
            src="/logowithoutBackground.png"
            alt="logo"
            width={150}
            height={150}
            className="w-24 h-auto md:w-40"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Button asChild>
              <Link href="https://bilberktravelagency.com/">
                Go back to site
              </Link>
            </Button>
            <Button asChild>
              <Link href="/Tracking/TrackLogin">Track Your Progress</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex items-center justify-center py-8 md:py-12">
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger className="text-sm text-yellow-600 hover:underline">
                      Forgot Password
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Forgot Password</AlertDialogTitle>
                        <AlertDialogDescription>
                          <ForgotPasswordModal />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button onClick={handleSubmit} type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/Signup" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <ScrollArea className="h-[400px] w-[300px] lg:h-[500px] lg:w-[400px] rounded-md border p-4">
              <img
                src="/registrationImage.png"
                alt="logo"
                className="h-full w-full object-cover"
              />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
