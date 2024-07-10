"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewsLetter = () => {
  const News = [
    { name: "story story", link: "/applycard" },
    { name: "story story", link: "/applycard" },
    { name: "story story", link: "/applycard" },
    { name: "story story", link: "/applycard" },
    { name: "story story", link: "/applycard" },
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="flex">
      <Carousel
        plugins={[plugin.current]}
        className="w-full  bg-yellow-100 border-solid border-2 border-gray-500 rounded-md  "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {News.map((item, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <Link href={item.link}>
                    <div>{item.name}</div>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <div className="float-right bg-slate-600 p-2">Full Blog stories</div> */}
    </div>
  );
};

export default NewsLetter;
