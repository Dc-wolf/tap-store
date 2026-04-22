"use client";

import { useCart } from "./CartContext";

type Producto = {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string | null;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addToCart, cart } = useCart();

  function convertirABS(precioUSD: number) {
    const tasa = 6.96;
    return (precioUSD * tasa).toFixed(0);
  }

  const cantidad = cart.find((i: CartItem) => i.id === producto.id)?.quantity ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* IMAGEN CON BADGE */}
      <div className="relative">
        <img
          src={producto.image || `https://picsum.photos/300/300?random=${producto.id}`}
          className="w-full h-52 object-cover"
          alt={producto.name}
        />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Popular
        </span>
      </div>

      {/* INFO */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base">{producto.name}</h3>
        <p className="text-gray-400 text-sm mt-0.5 truncate">Enterizos Suplex color azul,...</p>

        <p className="text-green-500 font-bold text-xl mt-2">
          Bs. {convertirABS(producto.price)}
        </p>

        {/* BOTÓN + CONTADOR */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => addToCart(producto)}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            🛒 COMPRAR AHORA
          </button>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1">
            <button className="text-gray-500 hover:text-black text-lg font-bold w-6 text-center">−</button>
            <span className="text-sm font-semibold w-4 text-center">{cantidad}</span>
            <button className="text-gray-500 hover:text-black text-lg font-bold w-6 text-center">+</button>
          </div>
        </div>
      </div>

    </div>
  );
}