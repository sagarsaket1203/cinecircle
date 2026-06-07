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

  const sender = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!sender) {
    return Response.json(
      { error: "Sender not found" },
      { status: 404 }
    );
  }

  await prisma.recommendation.create({
    data: {
      senderId: sender.id,
      receiverId: body.receiverId,
      movieId: body.movieId,
      note: body.note,
    },
  });

  return Response.json({
    success: true,
  });
}