import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
      image: true,
    },
    take: 10,
  });

  return Response.json(users);
}