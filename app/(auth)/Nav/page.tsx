"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname

const Navigation = () => {
  const [state, setState] = React.useState(false);
  const pathname = usePathname(); // Get the current pathname

  const menus = [
    { title: "Home", path: "/" },
    { title: "DashBoard", path: "/board" },
    { title: "SignUp", path: "/Signup" },
    { title: "Track", path: "/Tracking/TrackLogin" },
  ];

  return (
    <div>
      <nav className="bg-white w-full border-b md:border-2 rounded-md mt-8 mb-8 shadow-md border-yellow-600">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <Image
                src={"/logowithoutBackground.png"}
                alt="logo"
                width={100}
                height={50}
              />
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                <Menu />
              </button>
            </div>
          </div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menus.map(
                (item, idx) =>
                  pathname !== item.path && ( // Only render the link if the current route is not equal to the link's path
                    <li
                      key={idx}
                      className="text-gray-600 hover:text-white hover:bg-yellow-600 bg-yellow-500 m-6 px-8 uppercase rounded-md"
                    >
                      <Link href={item.path}>{item.title}</Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
