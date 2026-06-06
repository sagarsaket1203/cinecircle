const API_KEY = process.env.OMDB_API_KEY;

export async function searchMovies(query: string) {
  console.log("OMDB KEY:", API_KEY);

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  console.log("OMDB RESPONSE:", data);

  return data.Search || [];
}