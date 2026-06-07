import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const request = await prisma.friendRequest.findUnique({
    where: {
      id: body.requestId,
    },
  });

  if (!request) {
    return Response.json(
      { error: "Request not found" },
      { status: 404 }
    );
  }

 const existingFriendship =
  await prisma.friendship.findFirst({
    where: {
      OR: [
        {
          userAId: request.senderId,
          userBId: request.receiverId,
        },
        {
          userAId: request.receiverId,
          userBId: request.senderId,
        },
      ],
    },
  });

if (!existingFriendship) {
  await prisma.friendship.create({
    data: {
      userAId: request.senderId,
      userBId: request.receiverId,
    },
  });
}

 await prisma.friendRequest.delete({
  where: {
    id: request.id,
  },
});

  return Response.json({
    success: true,
  });
}