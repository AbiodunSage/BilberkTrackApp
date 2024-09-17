"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useShowToast from "@/hooks/useShowToast";

export default function Home() {
  const router = useRouter();
  const showToast = useShowToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    if (!formData.email || !formData.password) {
      showToast("destructive", "Please fill all the fields", "error");
      return;
    }

    const success = await login(formData);

    if (success) {
      showToast("variant", "Logged in successfully", "success");
      router.push("/board");
    }
  };

  const Redirect = () => {
    const url = "https://bilberktravelagency.com/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bg-scroll min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/landingpagebg.jpg')`,
      }}
    >
      <main className="flex flex-col justify-between p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8"></div>
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="m-8 gap-4 ">
            <Image
              onClick={Redirect}
              src="/logowithoutBackground.png"
              alt="logo"
              width={400}
              height={400}
              className="w-40 h-auto md:w-96"
            />
          </div>
          <div className="flex items-center justify-center py-8 md:py-12">
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
                <p
                  style={{ fontFamily: "cursive", fontSize: 20 }}
                  className="text-sm md:text-base text-muted-foreground"
                >
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
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
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full"
                  disabled={loading} // Disable while loading
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <p style={{ fontFamily: "cursive", fontSize: 20 }}>
                  Don&apos;t have an account?{" "}
                </p>
                <Link href="/Signup" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
