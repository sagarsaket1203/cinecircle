import { searchMovies } from "@/lib/omdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");

  if (!q) {
    return Response.json([]);
  }

  const movies = await searchMovies(q);

  return Response.json(movies);
}