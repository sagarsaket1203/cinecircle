import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { username } = await req.json();

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    return Response.json(
      { error: "Username already taken" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      username,
    },
  });

  return Response.json({
    success: true,
  });
}