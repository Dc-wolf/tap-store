"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tallas = ["S", "M", "L"];

export default function FiltroTalla() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tallaActual = searchParams.get("talla");

  const cambiar = (t: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (t === tallaActual) {
      params.delete("talla");
    } else {
      params.set("talla", t);
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
  <h3 className="font-semibold">Talla</h3>
  {tallaActual && (
    <button
      onClick={() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("talla");
        params.set("page", "1");
        router.push(`/?${params.toString()}`);
      }}
      className="text-xs bg-red-100 text-red-500 hover:bg-red-200 transition px-2 py-0.5 rounded-full"
    >
      Borrar Talla
    </button>
  )}
</div>

      <div className="flex flex-col gap-2 text-sm">
        {tallas.map((t) => (
          <label key={t} className="flex items-center gap-2">
            <input
              type="radio"
              checked={tallaActual === t}
              onChange={() => cambiar(t)}
            />
            Talla {t}
          </label>
        ))}
      </div>
    </div>
  );
}