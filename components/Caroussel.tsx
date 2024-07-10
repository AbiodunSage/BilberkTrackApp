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
  { src: "/applycard.png", link: "/applycard" },
  { src: "/bilberklogo.jpg", link: "/google.com" },
  { src: "/logo.png", link: "/ApplicationForm" },
  { src: "/mickey.png", link: "/UploadFiles" },
  { src: "/registrationImage.png", link: "Signup" },
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
            <div className="p-1">
              <Card>
                <Link href={item.link}>
                  <Image
                    src={item.src}
                    width={200}
                    height={200}
                    alt={`Blog Image ${index + 1}`}
                  />
                </Link>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
