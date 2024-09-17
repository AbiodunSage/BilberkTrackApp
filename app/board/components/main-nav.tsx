import Link from "next/link";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/Logout";

import { useRouter } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  const ChangePage = () => {
    router.push("/ApplicationForm");
  };
  const SendHome = () => {
    const url = "https://bilberktravelagency.com/";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 px-4 py-2",
        "sm:space-x-2 md:space-x-4 lg:space-x-6", // Adjust spacing based on screen size
        "sm:flex-col md:flex-row lg:flex-row", // Flex direction changes on smaller screens
        className
      )}
      {...props}
    >
      <Link
        /* onClick={ChangePage} */
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary no-underline"
        href={"/ApplicationForm"}
      >
        Apply Online
      </Link>
      <Link
        /* onClick={ChangePage} */
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary no-underline"
        href={"/UploadFiles"}
      >
        Upload Files
      </Link>
      <Link
        href=""
        onClick={SendHome}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary no-underline"
      >
        Home
      </Link>
      {/* Responsive adjustments */}
      <div className="flex flex-col sm:flex-row items-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
