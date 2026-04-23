"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Buscador() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [texto, setTexto] = useState(searchParams.get("buscar") || "");

  const buscar = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (texto.trim()) {
      params.set("buscar", texto.trim());
    } else {
      params.delete("buscar");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex mb-4 px-10 gap-2">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          placeholder="Buscar productos..."
          className="border border-gray-300 p-2 pl-9 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>
      <button
        onClick={buscar}
        className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
      >
        Buscar
      </button>
    </div>
  );
}