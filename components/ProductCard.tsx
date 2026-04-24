"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
import ProductoModal from "./ProductoModal";

type Producto = {
  id: number;
  name: string;
  price: number;
  category?: string;
  image?: string | null;
  description?: string | null;
  stock?: number;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function ProductCard({ producto }: { producto: Producto }) {
  const { addToCart, replaceCart, cart, increaseQuantity, decreaseQuantity } = useCart();
  const router = useRouter();
  const [modalAbierto, setModalAbierto] = useState(false);

  function convertirABS(precioUSD: number) {
    const tasa = 6.96;
    return (precioUSD * tasa).toFixed(0);
  }

  const cantidad = cart.find((i: CartItem) => i.id === producto.id)?.quantity ?? 0;
  const stockDisponible = producto.stock ?? 0;

  const handleIncrease = () => {
    if (cantidad >= stockDisponible) return;
    if (cantidad === 0) {
      addToCart(producto);
    } else {
      increaseQuantity(producto.id);
    }
  };

  const comprarAhora = () => {
    // Reemplaza el carrito con este producto y la cantidad actual (mínimo 1)
    replaceCart(producto, cantidad > 0 ? cantidad : 1);
    router.push("/checkout");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">

        {/* IMAGEN CON BADGE — click abre modal */}
        <div className="relative cursor-pointer" onClick={() => setModalAbierto(true)}>
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
          <p className="text-gray-400 text-sm mt-0.5 truncate">
            {producto.description || "Sin descripción"}
          </p>

          <p className="text-green-500 font-bold text-xl mt-2">
            Bs. {convertirABS(producto.price)}
          </p>

          {/* BOTÓN + CONTADOR */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={comprarAhora}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              COMPRAR AHORA
            </button>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1">
              <button
                onClick={() => decreaseQuantity(producto.id)}
                className="text-gray-500 hover:text-black text-lg font-bold w-6 text-center"
              >−</button>
              <span className="text-sm font-semibold w-4 text-center">{cantidad}</span>
              <button
                onClick={handleIncrease}
                disabled={cantidad >= stockDisponible}
                className={`text-lg font-bold w-6 text-center ${cantidad >= stockDisponible ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-black"}`}
              >+</button>
            </div>
          </div>

          {/* AVISO STOCK */}
          {cantidad >= stockDisponible && stockDisponible > 0 && (
            <p className="text-red-400 text-xs mt-2">Stock máximo alcanzado</p>
          )}
        </div>

      </div>

      {/* MODAL */}
      {modalAbierto && (
        <ProductoModal
          producto={producto}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </>
  );
}