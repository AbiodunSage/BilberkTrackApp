import Image from "next/image";
import React from "react";
import Former from "./loginform/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const loginpage = () => {
  return (
    <>
      <div className="flex justify-center  rounded-2xl text-black bg-gray-200 shadow-[0px_8px]">
        <div className=" p-2 ">
          {/* <Image
            src="/logowithoutBackground.png"
            alt="Logo"
            height={300}
            width={300}
          /> */}
          <div className="flex justify-center">
            <Image
              className="rounded-full"
              src="/bilImage.png"
              alt="any"
              height={300}
              width={300}
            />
          </div>
          <Former />
        </div>
        <div className="flex flex-wrap ">
          <Image src="/LoginImage.gif" alt="welcome" height={800} width={500} />
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <p className="text-2xl">Already have an account!!!</p>
        <Button asChild>
          <Link href="/Dashboard">Start your Application</Link>
        </Button>
      </div>
    </>
  );
};

export default loginpage;
