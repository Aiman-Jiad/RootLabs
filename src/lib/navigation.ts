import type { LucideIcon } from "lucide-react";
import {
  FolderKanban,
  LayoutDashboard,
  Library,
  Map as MapIcon,
  ShieldCheck,
  User,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    icon: MapIcon,
  },
  {
    label: "Resources",
    href: "/resources",
    icon: Library,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Cybersecurity",
    href: "/cybersecurity",
    icon: ShieldCheck,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];
