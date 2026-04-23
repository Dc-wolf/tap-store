"use client";
import { useState } from "react";

type Producto = {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string | null;
  description?: string | null;
  stock?: number;
};

function generarGaleria(producto: Producto): string[] {
  if (producto.image && producto.image.includes(",")) {
    return producto.image.split(",");
  }
  if (producto.image && producto.image.trim() !== "") {
    return [producto.image, producto.image, producto.image];
  }
  return [
    `https://picsum.photos/400/300?random=${producto.id}a`,
    `https://picsum.photos/400/300?random=${producto.id}b`,
    `https://picsum.photos/400/300?random=${producto.id}c`,
  ];
}

export default function ProductoModal({
  producto,
  onClose,
}: {
  producto: Producto;
  onClose: () => void;
}) {
  const imagenes = generarGaleria(producto);
  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);

  function convertirABS(precioUSD: number) {
    const tasa = 6.96;
    return (precioUSD * tasa).toFixed(0);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click fuera cierra
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-5 relative"
        onClick={(e) => e.stopPropagation()} // evita cerrar al clickear adentro
      >
        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        {/* IMAGEN PRINCIPAL */}
        <img
          src={imagenActiva}
          className="w-full h-64 object-cover rounded-xl mb-3"
          alt={producto.name}
        />

        {/* GALERÍA */}
        <div className="flex gap-2 mb-4 justify-center">
          {imagenes.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setImagenActiva(img)}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition
                ${imagenActiva === img ? "border-teal-500" : "border-gray-200"}`}
            />
          ))}
        </div>

        {/* INFO */}
        <h2 className="text-xl font-bold text-gray-900">{producto.name}</h2>
        <p className="text-gray-500 text-sm mt-1 mb-3">
          {producto.description || "Sin descripción"}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-green-500 font-bold text-2xl">
            Bs. {convertirABS(producto.price)}
          </p>
          <p className="text-sm text-gray-400">
            Stock disponible: <span className="font-semibold text-gray-600">{producto.stock ?? 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
}