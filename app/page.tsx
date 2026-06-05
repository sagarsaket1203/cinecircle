import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

import {
  Home,
  Film,
  Users,
  Search,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 h-screen border-r border-white/10 flex-col p-6 fixed">
          <h1 className="text-2xl font-bold">
            Cine<span className="text-red-500">Circle</span>
          </h1>

          <nav className="mt-10 space-y-2">
            <SidebarItem icon={<Home size={20} />} label="Home" active />
            <SidebarItem icon={<Film size={20} />} label="Movies" />
            <SidebarItem icon={<Users size={20} />} label="Friends" />
            <SidebarItem icon={<Search size={20} />} label="Search" />
            <SidebarItem icon={<BarChart3 size={20} />} label="Stats" />
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
          </nav>

        <div className="mt-auto">
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
    {session.user.image ? (
      <img
  src={session.user.image || "https://ui-avatars.com/api/?name=S"}
  alt="profile"
  className="h-10 w-10 rounded-full object-cover"
/>
    ) : (
      <div className="h-10 w-10 rounded-full bg-red-500"></div>
    )}

    <div>
      <p className="font-medium">
        {session.user.name}
      </p>

      <p className="text-sm text-gray-400">
        {session.user.email}
      </p>
    </div>
  </div>
</div>
        </aside>

        {/* Main */}
        <main className="flex-1 md:ml-64">
          {/* Top Bar */}
          <div className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0D10]/80 border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="w-full max-w-md">
                <input
                  placeholder="Search movies, friends..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <Bell className="ml-4 text-gray-400" />
            </div>
          </div>

          {/* Hero */}
          <section className="px-6 py-8">
            <h2 className="text-4xl font-bold">
              Hello, {session.user.name} 
            </h2>

            <p className="text-gray-400 mt-2">
              Discover, track and share your love for movies.
            </p>
          </section>

          {/* Recommended */}
          <section className="px-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-semibold">
                Recommended For You
              </h3>

              <button className="text-red-500">
                See All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.title}
                  title={movie.title}
                  image={movie.image}
                  rating={movie.rating}
                  genre={movie.genre}
                  year={movie.year}
                />
              ))}
            </div>
          </section>

          {/* Bottom Cards */}
          <section className="grid lg:grid-cols-3 gap-6 px-6 py-10">
            <div className="bg-[#161A20] rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-5">
                Friend Activity
              </h3>

              <div className="space-y-5">
                <ActivityItem
                  user="Rahul"
                  action="watched Interstellar"
                />

                <ActivityItem
                  user="Ankit"
                  action="rated Fight Club ★★★★★"
                />

                <ActivityItem
                  user="Priya"
                  action="recommended About Time"
                />
              </div>
            </div>

            <div className="bg-[#161A20] rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-5">
                Trending Among Friends
              </h3>

              <div className="space-y-5">
                <TrendingItem
                  title="Oppenheimer"
                  count="12 friends watched"
                />

                <TrendingItem
                  title="Dune Part Two"
                  count="8 friends watched"
                />

                <TrendingItem
                  title="The Godfather"
                  count="6 friends watched"
                />
              </div>
            </div>

            <div className="bg-[#161A20] rounded-3xl p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold">
                🔥 Taste Match
              </h3>

              <div className="mt-5">
                <p className="text-6xl font-bold text-green-400">
                  87%
                </p>

                <p className="text-gray-400 mt-2">
                  Great match with Rahul
                </p>
              </div>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Shared Movies</span>
                  <span>54</span>
                </div>

                <div className="flex justify-between">
                  <span>Favorite Genre</span>
                  <span>Sci-Fi</span>
                </div>

                <div className="flex justify-between">
                  <span>Same Ratings</span>
                  <span>38</span>
                </div>

                <div className="flex justify-between">
                  <span>Watchlist Overlap</span>
                  <span>21</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
        active ? "bg-red-600" : "hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function MovieCard({
  title,
  image,
  rating,
  genre,
  year,
}: {
  title: string;
  image: string;
  rating: string;
  genre: string;
  year: string;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161A20]">
        <img
          src={image}
          alt={title}
          className="h-[320px] w-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3">
          <span className="bg-red-500 px-2 py-1 rounded-lg text-xs font-medium">
            ★ {rating}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {genre} • {year}
        </p>
      </div>
    </div>
  );
}

function ActivityItem({
  user,
  action,
}: {
  user: string;
  action: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-red-500"></div>

      <div>
        <span className="font-semibold">{user}</span>{" "}
        <span className="text-gray-400">
          {action}
        </span>
      </div>
    </div>
  );
}

function TrendingItem({
  title,
  count,
}: {
  title: string;
  count: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span>{title}</span>

      <span className="text-gray-400 text-sm">
        {count}
      </span>
    </div>
  );
}

const movies = [
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    year: "2014",
    rating: "4.8",
    image:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Inception",
    genre: "Sci-Fi",
    year: "2010",
    rating: "4.7",
    image:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    year: "2008",
    rating: "4.9",
    image:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Arrival",
    genre: "Sci-Fi",
    year: "2016",
    rating: "4.6",
    image:
      "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
  },
  {
    title: "Whiplash",
    genre: "Drama",
    year: "2014",
    rating: "4.8",
    image:
      "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
  },
];