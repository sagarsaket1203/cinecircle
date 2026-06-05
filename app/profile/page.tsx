import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-[#161A20] border border-white/10 rounded-3xl p-8">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-6"
            />
          )}

          <h2 className="text-2xl font-semibold">
            {session.user.name}
          </h2>

          <p className="text-gray-400 mt-2">
            {session.user.email}
          </p>
        </div>
      </div>
    </div>
  );
}