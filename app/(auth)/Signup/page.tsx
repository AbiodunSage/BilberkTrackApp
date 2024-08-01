"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
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

const Signuppage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
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

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const handleSubmit = async () => {
    signup(formData);
  };

  return (
    <>
      <div className="grid grid-flow-col-2 align-middle">
        <div>
          <img
            src="/NobackgroundLogo.png"
            alt="logo"
            width={200}
            height={200}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center p-2 md:p-4 space-y-2 md:space-y-0 md:space-x-4">
          <Card className="w-full max-w-md border-2 border-yellow-500 rounded-lg shadow-2xl p-2 md:p-2">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="username">First name</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="SAGE"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Last name</Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      placeholder="SANI"
                      required
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading}
                >
                  {loading ? <Skeleton /> : "Create an account"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/Login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signuppage;
