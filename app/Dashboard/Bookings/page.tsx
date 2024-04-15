import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <PageTitle title="Book your Travels" />
      <Button className="w-full" asChild>
        <Link href="https://bilberktravelagency.com/itinerary">
          click here to book your travels
        </Link>
      </Button>
    </>
  );
};

export default page;
