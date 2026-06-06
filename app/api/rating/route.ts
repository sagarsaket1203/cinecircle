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

  await prisma.watchedMovie.update({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId: body.movieId,
      },
    },
    data: {
      rating: body.rating,
    },
  });

  return Response.json({
    success: true,
  });
}