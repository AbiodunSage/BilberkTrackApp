import Link from "next/link";

import { cn } from "@/lib/utils";
import LogoutButton from "@/components/Logout";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/ApplicationForm"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Apply Online
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Home
      </Link>
      {/*  <Link
        href="/Login"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <LogoutButton />
      </Link> */}
      <LogoutButton />
    </nav>
  );
}
