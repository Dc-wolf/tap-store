"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categorias = [
  { name: "Tops", slug: "tops" },
  { name: "Crops", slug: "crops" },
  { name: "Calzas", slug: "calzas" },
  { name: "Poleras", slug: "poleras" },
  { name: "Chaquetas", slug: "chaquetas" },
  { name: "Enterizos", slug: "enterizos" },
  { name: "Palazos", slug: "palazos" },
  { name: "Medias", slug: "medias" },
  { name: "Otros", slug: "otros" },
];

export default function FiltroCategoria() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaActual = searchParams.get("categoria");

  const cambiar = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === categoriaActual) {
      params.delete("categoria");
    } else {
      params.set("categoria", slug);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Categoría</h3>
      <div className="flex flex-col gap-2 text-sm">
        {categorias.map((cat) => (
          <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={categoriaActual === cat.slug}
              onChange={() => cambiar(cat.slug)}
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>
  );
}