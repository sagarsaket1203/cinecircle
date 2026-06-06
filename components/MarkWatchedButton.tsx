"use client";

export default function MarkWatchedButton({
  movieId,
}: {
  movieId: string;
}) {
  return (
    <button
      onClick={async () => {
        const res = await fetch("/api/watched", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
          }),
        });

        if (res.ok) {
          window.location.reload();
        }
      }}
      className="mt-3 w-full bg-green-600 hover:bg-green-700 rounded-xl py-2"
    >
      ✓ Watched
    </button>
  );
}