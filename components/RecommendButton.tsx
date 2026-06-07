"use client";

export default function RecommendButton({
  movieId,
}: {
  movieId: string;
}) {
  async function sendRecommendation() {
    const receiverId = prompt(
      "Enter friend's user ID"
    );

    if (!receiverId) return;

    const note = prompt(
      "Add a recommendation note"
    );

    const res = await fetch(
      "/api/recommendations/send",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          receiverId,
          movieId,
          note,
        }),
      }
    );

    if (res.ok) {
      alert("Recommendation sent!");
    }
  }

  return (
    <button
      onClick={sendRecommendation}
      className="mt-2 w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-2"
    >
      Recommend
    </button>
  );
}