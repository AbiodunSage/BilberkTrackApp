import {
  FacebookIcon,
  Instagram,
  InstagramIcon,
  LinkedinIcon,
  Youtube,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer style={{ margin: "auto" }} className="">
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
            className="font-medium underline underline-offset-4 shadow-xl"
            style={{ color: "#1b2631", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5b041")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1b2631")}
          >
            <InstagramIcon />
          </a>
          .{" "}
          <a
            href="https://www.youtube.com/@BilberkTravelAgency"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
            style={{ color: "#1b2631", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5b041")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1b2631")}
          >
            <Youtube />
          </a>
          .
          <a
            href="https://www.facebook.com/Bilberktravelagency?ref=xav_pl_fb_external_link_android"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
            style={{ color: "#1b2631", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5b041")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1b2631")}
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/bilberk-global-company-ltd/posts/?feedView=all"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
            style={{ color: "#1b2631", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f5b041")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1b2631")}
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
