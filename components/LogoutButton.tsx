"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full mt-4 bg-red-600 hover:bg-red-700 transition py-2 rounded-xl text-sm font-medium"
    >
      Logout
    </button>
  );
}