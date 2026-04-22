"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FiltroPrecio() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const precioActual = searchParams.get("precio");

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

  return (
    <div>
      <h3 className="font-semibold mb-3">Precio</h3>

      {/* Inputs */}
      <div className="flex gap-2 mb-3">
        <input
          placeholder="mín."
          className="w-full border rounded px-2 py-1"
        />
        <input
          placeholder="máx."
          className="w-full border rounded px-2 py-1"
        />
      </div>

      {/* Radios */}
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