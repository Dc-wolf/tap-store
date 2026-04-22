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
      <h3 className="font-semibold mb-3">Talla</h3>

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