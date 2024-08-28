import { FacebookIcon, Instagram, InstagramIcon, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex gap-3 text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          ></a>
          . Follow us for more information{" "}
          <a
            href="https://www.instagram.com/bilberk_travel_agency?igsh=OHdhcG1ycmdiandp"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            <InstagramIcon />
          </a>
          .{" "}
          <a
            href="https://www.youtube.com/@BilberkTravelAgency"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            <Youtube />
          </a>
          .
          <a
            href="https://www.facebook.com/Bilberktravelagency?ref=xav_pl_fb_external_link_android"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
