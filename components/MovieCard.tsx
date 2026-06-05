type MovieCardProps = {
  title: string;
  image: string;
  rating: string;
  genre: string;
  year: string;
};

export default function MovieCard({
  title,
  image,
  rating,
  genre,
  year,
}: MovieCardProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#161A20]
        "
      >
        <img
          src={image}
          alt={title}
          className="
            h-[320px]
            w-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/20
            to-transparent
          "
        />

        <div className="absolute bottom-3 left-3">
          <span
            className="
              bg-red-500
              px-2
              py-1
              rounded-lg
              text-xs
              font-medium
            "
          >
            ★ {rating}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {genre} • {year}
        </p>
      </div>
    </div>
  );
}