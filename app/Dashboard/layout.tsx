import React from "react";
import { cn } from "../../lib/utils";
import SideNavbar from "../../components/sideNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",

          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        {/* sidebar */}
        {/* <p className="border">Sidebar</p> */}
        <SideNavbar />
        <div></div>
        {/* main page */}
        <div className="flex flex-wrap w-full">
          <div className="p-8">{children}</div>
          <div className="">{/*  <DashGrid /> */}</div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
