"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categorias = ["Blusas", "Camison", "Pantalones", "Medias"];

export default function FiltroCategoria() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoriaActual = searchParams.get("categoria");

  const cambiar = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cat === categoriaActual) {
      params.delete("categoria");
    } else {
      params.set("categoria", cat);
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Categoría</h3>

      <div className="flex flex-col gap-2 text-sm">
        {categorias.map((cat) => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={categoriaActual === cat}
              onChange={() => cambiar(cat)}
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
}