import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Tabs({
  tipoActivo,
}: {
  tipoActivo?: string;
}) {
  const tipos = await prisma.category_type.findMany({
    orderBy: { id: "asc" },
  });

  const base = "px-4 py-2 rounded-full text-sm font-medium transition";
  const activa = "bg-black text-white";
  const inactiva = "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link href="/" className={`${base} ${!tipoActivo ? activa : inactiva}`}>
        Todos
      </Link>
      {tipos.map((tipo) => (
        <Link
          key={tipo.id}
          href={`/?tipo=${tipo.slug}`}
          className={`${base} ${tipoActivo === tipo.slug ? activa : inactiva}`}
        >
          {tipo.name}
        </Link>
      ))}
    </div>
  );
}