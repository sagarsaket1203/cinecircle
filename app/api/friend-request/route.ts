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
      { error: "User not found" },
      { status: 404 }
    );
  }

 const existingRequest =
  await prisma.friendRequest.findFirst({
    where: {
      senderId: sender.id,
      receiverId: body.receiverId,
    },
  });

if (existingRequest) {
  return Response.json(
    {
      error: "Friend request already sent",
    },
    {
      status: 400,
    }
  );
}

await prisma.friendRequest.create({
  data: {
    senderId: sender.id,
    receiverId: body.receiverId,
  },
});

return Response.json({
  success: true,
});
}