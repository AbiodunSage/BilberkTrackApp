import PageTitle from "@/components/PageTitle";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DialogDemo } from "./EditProfile";
import Data from "../Database/Data";
import { CardContent } from "@/components/ui/card";

const user = Data;

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <h1 className="text-3xl font-semibold text-yellow-600">
            Hello, {user.name}
          </h1>
          <p className="text-lg font-bold">From your account dashboard</p>
          <p className="text-lg font-bold">you can view your recent</p>
          <p className="text-lg font-bold">Bookings,manage your billings</p>
          <p className="text-lg font-bold">address and edit your account</p>
        </div>
      </section>
      <section className="flex flex-wrap gap-5 w-1/2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          {user.bookings}
          <Button asChild>
            <Link href="https://bilberktravelagency.com/itinerary">
              Book Your Travel
            </Link>
          </Button>

          {/*   <BarChart /> */}
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p className="text-yellow-600  ">ACCOUNT INFO</p>
            <div>
              <h1 className="">{user.name}</h1>
              <h1>{user.Username}</h1>
              <h1>{user.email}</h1>
              <h1>{user.bookings}</h1>
              <DialogDemo />
            </div>

            <p className="text-sm text-gray-400"></p>
          </section>
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
