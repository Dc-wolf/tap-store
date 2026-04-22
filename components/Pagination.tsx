import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages) {
      pages.push(i);
    } else if (i >= currentPage - 1 && i <= currentPage + 1) {
      pages.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push("...");
    }
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
      
      {/* ANTERIOR */}
      {currentPage > 1 ? (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </Link>
      ) : (
        <span className="px-3 py-1 bg-gray-100 text-gray-400 rounded">
          ←
        </span>
      )}

      {/* NÚMEROS */}
      {pages.map((p, index) => {
        if (p === "...") {
          return (
            <span key={`dots-${index}`} className="px-2">
              ...
            </span>
          );
        }

        return (
          <Link
            key={`page-${p}`}
            href={`/?page=${p}`}
            className={`px-3 py-1 rounded ${
              currentPage === p
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </Link>
        );
      })}

      {/* SIGUIENTE */}
      {currentPage < totalPages ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </Link>
      ) : (
        <span className="px-3 py-1 bg-gray-100 text-gray-400 rounded">
          →
        </span>
      )}
    </div>
  );
}