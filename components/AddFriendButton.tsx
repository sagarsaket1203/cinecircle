"use client";

export default function AddFriendButton({
  friendId,
}: {
  friendId: string;
}) {
  return (
    <button
      onClick={async () => {
        const res = await fetch(
          "/api/friends/add",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              friendId,
            }),
          }
        );

        if (res.ok) {
          alert("Friend added!");
        }
      }}
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
    >
      Add Friend
    </button>
  );
}