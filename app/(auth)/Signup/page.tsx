"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import useSignUpWithEmailAndPassword from "../../../hooks/useSignUpWithEmailAndPassword";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Signuppage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, signup } = useSignUpWithEmailAndPassword();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    signup(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 md:py-12 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            src="/NobackgroundLogo.png"
            alt="logo"
            width={200}
            height={200}
            className="w-40 h-auto md:w-56"
          />
        </div>

        {/* Signup Form Section */}
        <Card className="border-2 border-yellow-500 rounded-lg shadow-2xl p-6 w-full max-w-xs md:max-w-sm lg:max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
            <CardDescription className="mt-1 text-gray-500">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              {/* Username */}
              <Input
                id="username"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />

              {/* Full Name */}
              <Input
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                required
                value={formData.fullname}
                onChange={handleChange}
              />

              {/* Email */}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              {/* Password */}
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                type="submit"
                className="w-full mt-4"
                disabled={loading}
              >
                {loading ? <Skeleton className="h-5" /> : "Create an account"}
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signuppage;
