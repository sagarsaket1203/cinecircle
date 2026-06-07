import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  await prisma.friendRequest.delete({
    where: {
      id: body.requestId,
    },
  });

  return Response.json({
    success: true,
  });
}