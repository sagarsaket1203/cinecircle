"use client";

export default function AcceptRequestButton({
  requestId,
}: {
  requestId: string;
}) {
  return (
    <button
      onClick={async () => {
        const res = await fetch(
          "/api/friend-request/accept",
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
      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
    >
      Accept
    </button>
  );
}