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

  const me = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!me) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  if (me.id === body.friendId) {
    return Response.json(
      { error: "Cannot add yourself" },
      { status: 400 }
    );
  }

  await prisma.friendship.upsert({
    where: {
      userAId_userBId: {
        userAId: me.id,
        userBId: body.friendId,
      },
    },
    update: {},
    create: {
      userAId: me.id,
      userBId: body.friendId,
    },
  });

  return Response.json({
    success: true,
  });
}