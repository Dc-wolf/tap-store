"use client";

import { useCart } from "./CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white p-4 flex justify-between">
      <h1 className="font-bold">TapTap Store</h1>

      <div>
        🛒 {totalItems}
      </div>
    </nav>
  );
}