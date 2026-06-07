import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      watchlist: true,
      watchedMovies: {
        include: {
          movie: true,
        },
        orderBy: {
          watchedAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const watchedCount = user.watchedMovies.length;
  const watchlistCount = user.watchlist.length;

  const ratings = user.watchedMovies
    .filter((m) => m.rating !== null)
    .map((m) => m.rating as number);

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((a, b) => a + b, 0) /
          ratings.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-[#161A20] border border-white/10 rounded-3xl p-8">
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-6"
            />
          )}

          <h2 className="text-3xl font-semibold">
            {user.name}
          </h2>

          <p className="text-gray-400 mt-2">
            {user.email}
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-gray-400 text-sm">
                Watched
              </p>

              <p className="text-3xl font-bold">
                {watchedCount}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-gray-400 text-sm">
                Watchlist
              </p>

              <p className="text-3xl font-bold">
                {watchlistCount}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-gray-400 text-sm">
                Avg Rating
              </p>

              <p className="text-3xl font-bold">
                {averageRating}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#161A20] border border-white/10 rounded-3xl p-8 mt-8">
          <h3 className="text-2xl font-semibold mb-6">
            Recent Ratings
          </h3>

          <div className="space-y-4">
            {user.watchedMovies
              .filter((m) => m.rating !== null)
              .slice(0, 5)
              .map((movie) => (
                <div
                  key={movie.id}
                  className="flex justify-between items-center"
                >
                  <span>{movie.movie.title}</span>

                  <span className="text-yellow-400">
                    {"★".repeat(movie.rating ?? 0)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}