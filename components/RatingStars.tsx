"use client";

export default function RatingStars({
  movieId,
}: {
  movieId: string;
}) {
  async function rateMovie(rating: number) {
    const res = await fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
        rating,
      }),
    });

    if (res.ok) {
      alert(`Rated ${rating} stars`);
    }
  }

  return (
    <div className="flex gap-1 mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => rateMovie(star)}
          className="text-yellow-400 text-xl"
        >
          ★
        </button>
      ))}
    </div>
  );
}