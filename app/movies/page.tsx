"use client";

import { useEffect, useState } from "react";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`/api/movies/search?q=${query}`)
        .then((res) => res.json())
        .then(setMovies);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Discover Movies
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl px-4 py-3"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {movies.map((movie: any) => (
          <div
            key={movie.imdbID}
            className="bg-[#161A20] border border-white/10 rounded-2xl overflow-hidden"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.Title}
              className="w-full h-[320px] object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">
                {movie.Title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {movie.Year}
              </p>

              <button
                onClick={async () => {
                  const res = await fetch("/api/watchlist", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      imdbID: movie.imdbID,
                      title: movie.Title,
                      poster: movie.Poster,
                      year: movie.Year,
                    }),
                  });

                  if (res.ok) {
                    alert("Added to watchlist!");
                  } else {
                    alert("Failed to add movie");
                  }
                }}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 rounded-xl py-2"
              >
                + Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}