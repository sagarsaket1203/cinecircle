"use client";

import { useEffect, useState } from "react";
import AddFriendButton from "@/components/AddFriendButton";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    fetch(`/api/users/search?q=${query}`)
      .then((res) => res.json())
      .then(setUsers);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Find Friends
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search username..."
        className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl px-4 py-3"
      />

      <div className="mt-8 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#161A20] border border-white/10 rounded-2xl p-4 hover:border-red-500 transition"
          >
            <div className="flex items-center justify-between">
              <a
                href={`/u/${user.username}`}
                className="flex items-center gap-4"
              >
                <img
                  src={
                    user.image ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p className="text-gray-400">
                    @{user.username}
                  </p>
                </div>
              </a>

              <AddFriendButton friendId={user.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}