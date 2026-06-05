import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0D10]/80 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search movies, people..."
            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              pl-12
              pr-4
              py-3
              outline-none
              focus:border-red-500
              transition
            "
          />
        </div>

        <button
          className="
            ml-4
            p-3
            rounded-xl
            bg-white/5
            border
            border-white/10
            hover:bg-white/10
            transition
          "
        >
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
}