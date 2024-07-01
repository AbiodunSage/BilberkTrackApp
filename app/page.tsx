import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="bg-scroll"
      style={{
        backgroundImage: `url('/landingpagebg.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <main className="flex min-h-screen flex-col justify-between p-24">
        <div className="flex flex-row gap-5 ">
          <div className="flex gap-4 basis-1/2">
            <Image
              src="/logowithoutBackground.png"
              alt="logo"
              width={200}
              height={200}
            />
            <Button asChild>
              <Link href="https://bilberktravelagency.com/">Go back Home</Link>
            </Button>
            <Button asChild className="bg-yellow-600 text-white ">
              <Link href="/Signup"> Click to continue</Link>
            </Button>
          </div>
          <div className="basis-1/2">
            {/*  <Image
              src="/landingpagesd.jpg"
              alt="logo"
              width={200}
              height={200}
            /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
{
  /* <div className="flex flex-wrap">
            <div className="box-border border-solid border-yellow-600 h-80 w-50 p-4 border-4 bg-black">
                            <h1 className="text-xl font-semibold text-white">
                BILberk Global Company LTD
              </h1>
            </div>
            <div className="box-border h-80 w-50 p-4 border-4 bg-yellow-600 border-black">
              <p className="text-l font-bold">
                Welcome, Sign in to create an account to begin your journey{" "}
              </p>
             
            </div>
          </div>
          <div className="m-8 place-content-center">
            
          </div> */
}
