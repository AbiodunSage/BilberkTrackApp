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
              <Link href="/Login"> Click to continue</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
