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
      className="bg-scroll"
      style={{
        backgroundImage: `url('/landingpagebg.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <main className=" min-h-screen  p-8">
        <div className="">
          <div className="flex items-center gap-4">
            <Image
              src="/logowithoutBackground.png"
              alt="logo"
              width={200}
              height={200}
            />
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
        <div className="flex gap-2 items-center justify-center m-8">
          <div className="flex items-center justify-center py-12">
            <div className="grid w-[350px] gap-2">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
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
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div>
                    <Input
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-yellow-600 w-1/2 border-2 rounded-md px-4 grid justify-items-end items-end">
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
          <div className="flex items-center justify-center">
            <ScrollArea className="h-[500px] w-[400px] rounded-md border p-4">
              <img src="/registrationImage.png" alt="logo" />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
