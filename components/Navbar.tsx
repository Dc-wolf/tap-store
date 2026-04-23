"use client";

import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      {/* Menú hamburguesa */}
      <button className="text-white text-2xl">☰</button>

      {/* Título */}
      <h1 className="font-bold text-lg">Tap Tap Store</h1>

      {/* Botón derecho */}
      <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
        Ingresar / Crear mi tienda
      </button>
    </nav>
  );
}