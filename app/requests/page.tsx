import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AcceptRequestButton from "@/components/AcceptRequestButton";
import DeclineRequestButton from "@/components/DeclineRequestButton";

export default async function RequestsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const me = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!me) {
    redirect("/login");
  }

  const requests = await prisma.friendRequest.findMany({
    where: {
      receiverId: me.id,
    },
    include: {
      sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Friend Requests
      </h1>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-[#161A20] rounded-2xl p-5 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {request.sender.name}
                </p>

                <p className="text-gray-400">
                  @{request.sender.username}
                </p>
              </div>

              <div className="flex gap-3">
                <AcceptRequestButton
                  requestId={request.id}
                />

                <DeclineRequestButton
                  requestId={request.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}