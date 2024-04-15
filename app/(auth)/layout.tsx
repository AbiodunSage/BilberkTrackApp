import React from "react";
import Navigation from "./Nav/page";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full mx-auto">
      <Navigation />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
