"use client";

import FiltroPrecio from "./FiltroPrecio";
import FiltroCategoria from "./FiltroCategoria";
import FiltroTalla from "./FiltroTalla";
import FiltroOferta from "./FiltroOferta";

export default function Filtros() {
  return (
    <aside className="bg-white p-4 rounded-xl space-y-6 text-black">

      <FiltroPrecio />
      <FiltroCategoria />
      <FiltroTalla />
      <FiltroOferta />
      

    </aside>
  );
}