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

const blogData = [
  {
    src: "/1.svg",
    link: "https://bilberktravelagency.com/learning-more-about-your-destination-and-finding-a-part-time-job-after-getting-admission-to-study-abroad/",
  },
  {
    src: "/2.svg",
    link: "https://bilberktravelagency.com/blog/",
  },
  {
    src: "/3.svg",
    link: "https://bilberktravelagency.com/prepare-for-your-study-abroad-interview/",
  },

  {
    src: "/4.svg",
    link: "https://bilberktravelagency.com/how-to-get-your-visa-to-study-abroad/",
  },
  {
    src: "/5.svg",
    link: "https://bilberktravelagency.com/learning-more-about-your-destination-and-finding-a-part-time-job-after-getting-admission-to-study-abroad/",
  },
];

export function Caroussel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {blogData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 m-8">
              <Link legacyBehavior href={item.link} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.src}
                    alt={`Blog Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "fill",
                    }}
                  />
                </a>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
