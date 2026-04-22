"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FiltroOferta() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activo = searchParams.get("oferta") === "true";

  const toggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (activo) {
      params.delete("oferta");
    } else {
      params.set("oferta", "true");
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">En Oferta</h3>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={activo} onChange={toggle} />
        En oferta
      </label>
    </div>
  );
}