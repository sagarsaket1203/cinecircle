import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function FriendsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const me = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      friendshipsA: {
        include: {
          userB: true,
        },
      },
      friendshipsB: {
        include: {
          userA: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Friends
      </h1>

      <div className="space-y-4">
        {me?.friendshipsA.map((friendship) => (
          <div
            key={friendship.id}
            className="bg-[#161A20] rounded-2xl p-4 flex items-center gap-4"
          >
            <img
              src={
                friendship.userB.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              className="w-12 h-12 rounded-full"
            />

            <div>
              <p className="font-semibold">
                {friendship.userB.name}
              </p>

              <p className="text-gray-400">
                @{friendship.userB.username}
              </p>
            </div>
          </div>
        ))}

        {me?.friendshipsB.map((friendship) => (
          <div
            key={friendship.id}
            className="bg-[#161A20] rounded-2xl p-4 flex items-center gap-4"
          >
            <img
              src={
                friendship.userA.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              className="w-12 h-12 rounded-full"
            />

            <div>
              <p className="font-semibold">
                {friendship.userA.name}
              </p>

              <p className="text-gray-400">
                @{friendship.userA.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}