"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { usePathname } from "next/navigation";
import {
  Home,
  Film,
  Users,
  Bookmark,
  CheckCircle,
  Inbox,
  User,
} from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 h-screen border-r border-white/10 flex-col p-6 fixed bg-[#0B0D10]">
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">
          Cine
          <span className="text-red-500">
            Circle
          </span>
        </h1>
      </Link>

      <nav className="mt-10 space-y-2">
        <SidebarItem
          href="/"
          icon={<Home size={20} />}
          label="Home"
          active={pathname === "/"}
        />

        <SidebarItem
          href="/movies"
          icon={<Film size={20} />}
          label="Movies"
          active={pathname === "/movies"}
        />

        <SidebarItem
          href="/watchlist"
          icon={<Bookmark size={20} />}
          label="Watchlist"
          active={pathname === "/watchlist"}
        />

        <SidebarItem
          href="/watched"
          icon={<CheckCircle size={20} />}
          label="Watched"
          active={pathname === "/watched"}
        />

        <SidebarItem
          href="/search"
          icon={<Users size={20} />}
          label="Friends"
          active={pathname === "/search"}
        />

        <SidebarItem
          href="/recommendations"
          icon={<Inbox size={20} />}
          label="Recommendations"
          active={pathname === "/recommendations"}
        />

        <SidebarItem
          href="/profile"
          icon={<User size={20} />}
          label="Profile"
          active={pathname === "/profile"}
        />
      </nav>

    <div className="mt-auto">
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="font-medium">
      CineCircle
    </p>

    <p className="text-sm text-gray-400 mb-4">
      Movie Recommendation Platform
    </p>

    <LogoutButton />
  </div>
</div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-red-600"
          : "hover:bg-white/5"
      }`}
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}