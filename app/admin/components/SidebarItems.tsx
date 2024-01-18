import { SideBarItem } from "@/types/types";
import {
  BookA,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const sideBar: SideBarItem[] = [
  {
    name: "overview",
    label: "Overview",
    icon: <LayoutDashboard />,
    hide: false, // set the hidden value to true if you want to. U can use different var for different purposes.
    path: "/admin",
    active: "/admin",
  },
  {
    name: "accounts",
    label: "Accounts",
    icon: <BookA />,
    hide: false,
    path: "/admin/accounts",
    active: "/admin/accounts",
  },
  {
    name: "users",
    label: "Admin Users",
    icon: <Users />,
    hide: false,
    path: "/admin/users",
    active: "/admin/users",
  },
];
