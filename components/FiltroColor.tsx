"use client";

import { useRouter, useSearchParams } from "next/navigation";

const colores = [
  { name: "Negro", hex: "#000000" },
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Gris", hex: "#808080" },
  { name: "Rojo", hex: "#FF0000" },
  { name: "Rosado", hex: "#FFB6C1" },
  { name: "Azul", hex: "#0000FF" },
  { name: "Azul Marino", hex: "#001F5B" },
  { name: "Celeste", hex: "#87CEEB" },
  { name: "Verde", hex: "#008000" },
  { name: "Amarillo", hex: "#FFFF00" },
  { name: "Cafe", hex: "#6F4E37" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Morado", hex: "#800080" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Plomo", hex: "#B0B0B0" },
];

export default function FiltroColor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colorActual = searchParams.get("color");

  const cambiar = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name === colorActual) {
      params.delete("color");
    } else {
      params.set("color", name);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Color</h3>
      <div className="flex flex-wrap gap-2">
        {colores.map((c) => (
          <button
            key={c.name}
            onClick={() => cambiar(c.name)}
            title={c.name}
            className={`w-7 h-7 rounded-full border-2 transition ${
              colorActual === c.name
                ? "border-black scale-110"
                : "border-gray-300 hover:border-black"
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      {colorActual && (
        <p className="text-xs text-gray-500 mt-2">Color: {colorActual}</p>
      )}
    </div>
  );
}