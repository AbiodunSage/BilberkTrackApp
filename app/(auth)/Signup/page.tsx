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
      <div className="flex flex-row items-center justify-center ">
        <Card className="mx-auto max-w-sm border-solid border-2 border-yellow-500  rounded-lg shadow-2xl m-8">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
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
                  <Label htmlFor="last-name">Last name</Label>
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
              <Button onClick={handleSubmit} type="submit" className="w-full">
                Create an account
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
        <div>img</div>
      </div>
    </>
  );
};

export default Signuppage;
