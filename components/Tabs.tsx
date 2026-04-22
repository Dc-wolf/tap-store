import Link from "next/link";

export default function Tabs({
  categoriaActiva,
}: {
  categoriaActiva?: string;
}) {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition";

  const activa = "bg-black text-white";
  const inactiva =
    "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      <Link
        href="/"
        className={`${base} ${
          !categoriaActiva ? activa : inactiva
        }`}
      >
        Todos
      </Link>

      <Link
        href="/?categoria=camisetas"
        className={`${base} ${
          categoriaActiva === "camisetas"
            ? activa
            : inactiva
        }`}
      >
        Camisetas
      </Link>

      <Link
        href="/?categoria=pantalones"
        className={`${base} ${
          categoriaActiva === "pantalones"
            ? activa
            : inactiva
        }`}
      >
        Pantalones
      </Link>

      <Link
        href="/?categoria=accesorios"
        className={`${base} ${
          categoriaActiva === "accesorios"
            ? activa
            : inactiva
        }`}
      >
        Accesorios
      </Link>

      <Link
        href="/?categoria=calzado"
        className={`${base} ${
          categoriaActiva === "calzado"
            ? activa
            : inactiva
        }`}
      >
        Calzado
      </Link>
    </div>
  );
}