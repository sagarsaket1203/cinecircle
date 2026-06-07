"use client";

export default function DeclineRequestButton({
  requestId,
}: {
  requestId: string;
}) {
  return (
    <button
      onClick={async () => {
        const res = await fetch(
          "/api/friend-request/decline",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              requestId,
            }),
          }
        );

        if (res.ok) {
          location.reload();
        }
      }}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
    >
      Decline
    </button>
  );
}