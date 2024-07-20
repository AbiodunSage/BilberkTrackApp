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
    {
      name: "The Ultimate guide to studying Abroad",
      link: "https://bilberktravelagency.com/the-ultimate-guide-to-studying-abroad-steps-to-get-started/",
    },
    {
      name: "your gateway to excellence",
      link: "https://bilberktravelagency.com/your-gateway-to-excellence-study-in-cyprus-with-bilberk-travel-agency/",
    },
    {
      name: "study in italy",
      link: "https://bilberktravelagency.com/unlock-your-potential-study-in-italy-with-bilberk-travel-agency/",
    },
    {
      name: "study in romania",
      link: "https://bilberktravelagency.com/your-ultimate-guide-to-studying-in-romania/",
    },
    {
      name: "Learn more exciting stuffs,visit our blog",
      link: "https://bilberktravelagency.com/blog/",
    },
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
