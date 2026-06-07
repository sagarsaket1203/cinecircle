import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RecommendationsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const me = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!me) {
    redirect("/login");
  }

  const recommendations =
    await prisma.recommendation.findMany({
      where: {
        receiverId: me.id,
      },
      include: {
        sender: true,
        movie: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Recommendations
      </h1>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-[#161A20] border border-white/10 rounded-2xl p-5"
          >
            <div className="flex gap-4">
              <img
                src={rec.movie.posterPath || ""}
                alt={rec.movie.title}
                className="w-24 rounded-xl"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  {rec.movie.title}
                </h2>

                <p className="text-gray-400 mt-1">
                  Recommended by {rec.sender.name}
                </p>

                {rec.note && (
                  <p className="mt-3 italic text-gray-300">
                    "{rec.note}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}