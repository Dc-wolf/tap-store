"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FiltroPrecio() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const precioActual = searchParams.get("precio");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const cambiarPrecio = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === precioActual) {
      params.delete("precio");
    } else {
      params.set("precio", value);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const aplicarCustom = () => {
    if (!min && !max) return;
    const value = `${min || 0}-${max || 9999}`;
    cambiarPrecio(value);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Precio</h3>

      {/* Inputs mín/máx */}
      <div className="flex gap-2 mb-2">
        <input
          placeholder="mín."
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
          type="number"
        />
        <input
          placeholder="máx."
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
          type="number"
        />
      </div>
      <button
        onClick={aplicarCustom}
        className="w-full bg-black text-white text-sm py-1 rounded mb-3 hover:bg-gray-800 transition"
      >
        Aplicar
      </button>

      {/* Radios predefinidos */}
      <div className="flex flex-col gap-2 text-sm">
        {[
          { label: "menos de Bs. 15.00", value: "0-15" },
          { label: "Bs. 15.00 hasta Bs. 30.00", value: "15-30" },
          { label: "Bs. 30.00 hasta Bs. 60.00", value: "30-60" },
          { label: "más de Bs. 100.00", value: "100-9999" },
        ].map((r) => (
          <label key={r.value} className="flex items-center gap-2">
            <input
              type="radio"
              checked={precioActual === r.value}
              onChange={() => cambiarPrecio(r.value)}
            />
            {r.label}
          </label>
        ))}
      </div>
    </div>
  );
}