import Link from "next/link";

export default function Tabs({ categoriaActiva }: { categoriaActiva?: string }) {
  const base = "px-4 py-2 rounded-full text-sm font-medium transition";
  const activa = "bg-black text-white";
  const inactiva = "bg-gray-200 text-black hover:bg-gray-300";

  const tabs = ["Camisetas", "Pantalones", "Blusas", "Hoodies"];

  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      <Link href="/" className={`${base} ${!categoriaActiva ? activa : inactiva}`}>
        Todos
      </Link>
      {tabs.map((cat) => (
        <Link
          key={cat}
          href={`/?categoria=${cat}`}
          className={`${base} ${categoriaActiva === cat ? activa : inactiva}`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}