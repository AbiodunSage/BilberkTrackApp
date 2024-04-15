import React from "react";
import PageTitle from "./PageTitle";
import Image from "next/image";

import Link from "next/link";
import { Button } from "./ui/button";

const DashGrid = () => {
  return (
    <>
      <PageTitle title="DashGrid" />
      <div className="container w-3/4 h-3/4 mx-auto bg-slate-300 shadow-xl">
        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <Image
              src="/applycard.png"
              alt="applycard"
              height={300}
              width={300}
            />
            <div className="bg-yellow-600 rounded-lg shadow-md hover:bg-white text-center font-extrabold text-black">
              Apply Online
            </div>
          </div>

          <div className="">
            <Image
              src="/LoginImage.gif"
              alt="applycard"
              height={250}
              width={300}
            />
            <div className="bg-yellow-600 rounded-lg shadow-md hover:bg-white text-center font-extrabold text-black">
              Learn More about us
            </div>
          </div>
          <div>
            {" "}
            <div className="bg-yellow-600 rounded-lg shadow-md hover:bg-white text-center font-extrabold text-black">
              <a href="/Tracking/TrackLogin">Track Your Application</a>
            </div>
          </div>
          <div>
            {" "}
            <div className="bg-yellow-600 rounded-lg shadow-md hover:bg-white text-center font-extrabold text-black">
              Visa Training
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashGrid;
