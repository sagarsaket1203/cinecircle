import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import RatingStars from "@/components/RatingStars";
import RecommendButton from "@/components/RecommendButton";

export default async function WatchedPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      watchedMovies: {
        include: {
          movie: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Watched Movies
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {user?.watchedMovies.map((item) => (
          <div
            key={item.id}
            className="bg-[#161A20] rounded-2xl overflow-hidden"
          >
            <img
              src={item.movie.posterPath || ""}
              alt={item.movie.title}
              className="w-full h-[320px] object-cover"
            />

           <div className="p-4">
  <h3>{item.movie.title}</h3>

  <p className="text-gray-400 text-sm">
    {item.movie.releaseYear}
  </p>

  <RatingStars movieId={item.movie.id} />
  <RecommendButton
  movieId={item.movie.id}
  />
</div>
          </div>
        ))}
      </div>
    </div>
  );
}