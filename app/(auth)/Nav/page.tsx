import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div>
      <nav className="flex flex-wrap space-x-40 ">
        <Image src="/logo.png" alt="logo" height={100} width={100} />
        <Button asChild>
          <Link href="/">Go back</Link>
        </Button>
      </nav>
    </div>
  );
};

export default Navigation;
