import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  await prisma.movie.upsert({
    where: {
      id: body.imdbID,
    },
    update: {},
    create: {
      id: body.imdbID,
      title: body.title,
      posterPath: body.poster,
      releaseYear: parseInt(body.year),
    },
  });

  await prisma.watchlist.upsert({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId: body.imdbID,
      },
    },
    update: {},
    create: {
      userId: user.id,
      movieId: body.imdbID,
    },
  });

  return Response.json({
    success: true,
  });
}