import Image from "next/image";
import React from "react";
import Former from "./signupform/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signuppage = () => {
  return (
    <>
      <main className="container w-auto rounded-2xl  bg-gray-400 shadow-[0px_8px]">
        <div className="flex justify-center container-lg">
          <div className="p-2  rounded-lg border-black">
            <Image
              src="/logowithoutBackground.png"
              alt="Logo"
              height={150}
              width={150}
            />
            <div className="flex justify-center">
              <Image
                className="rounded-full"
                src="/bilImage.png"
                alt="any"
                height={200}
                width={200}
              />
            </div>
            <Former />
            <div className="flex justify-center">
              <p className="text-2xl">Already have an account!!!</p>
              <Button asChild>
                <Link href="/Login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="">
            <Image
              className="rounded-md"
              src="/registrationImage.png"
              alt="welcome"
              height={100}
              width={400}
              objectFit="cover"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default signuppage;
