"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookTemplate,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

type SidebarProps = {
  className: any;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MainNav: FC<SidebarProps> = ({
  className,
  isOpened,
  setIsOpened,
}) => {
  const pathname = usePathname();
  const userAuthorities = localStorage.getItem("authorities");
  const router = useRouter();
  console.log(userAuthorities?.length);

  const menuItems = [
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`,
      authorized: true,
      icon: (
        <LayoutDashboard
          size={15}
          color={`${pathname === `/admin` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/cohorts`,
      label: "Cohorts",
      active: pathname === `/admin/cohorts`,
      icon: (
        <Users
          size={15}
          color={`${pathname === `/admin/cohorts` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/calculator`,
      label: "Calculator",
      active: pathname === `/admin/calculator`,
      icon: (
        <Activity
          size={15}
          color={`${pathname === `/admin/calculator` ? "#fff" : "#707E94"}`}
        />
      ),
    },
    {
      href: `/admin/settings`,
      label: "Settings",
      active: pathname === `/admin/settings`,
      authorized: true,
      icon: (
        <Settings
          size={15}
          color={`${pathname === `/admin/settings` ? "#fff" : "#707E94"}`}
        />
      ),
    },
  ];

  return (
    <div>
      <nav
        className={cn("flex flex-col justify-center space-y-2 mt-3", className)}
      >
        <div className="font-semibold opacity-50">Menu</div>
        {menuItems.map((route, index) => (
          <div
            key={index}
            className={`${!route.authorized && "cursor-not-allowed"}`}
            title={`${!route.authorized && "Not Authorized"}`}
          >
            <Button
              variant="outline"
              className={cn(
                " w-full flex px-2 items-center justify-start border-none hover:text-cyan-500 rounded py-1 space-x-2",
                route.active
                  ? "text-white bg-cyan-500 hover:text-white hover:bg-cyan-500"
                  : "text-muted-foreground"
              )}
              key={route.href}
              onClick={() => {
                setIsOpened(!isOpened);
                router.push(route.href);
              }}
            >
              <span>{route?.icon}</span>
              <Link
                href={route.href}
                className={cn(
                  "text-base font-medium disabled transition-colors"
                )}
              >
                {route.label}
              </Link>
            </Button>
          </div>
        ))}
      </nav>
    </div>
  );
};
