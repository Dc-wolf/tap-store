"use client";

import FiltroPrecio from "./FiltroPrecio";
import FiltroCategoria from "./FiltroCategoria";
import FiltroTalla from "./FiltroTalla";
import FiltroOferta from "./FiltroOferta";
import FiltroColor from "./FiltroColor";

export default function Filtros({ tipo }: { tipo?: string }) {
  const esRopa = tipo === "ropa" || !tipo; // sin tipo seleccionado también muestra todo

  return (
    <aside className="bg-white p-4 rounded-xl space-y-6 text-black">
      <FiltroPrecio />
      {esRopa && <FiltroCategoria />}
      {esRopa && <FiltroColor />}
      {esRopa && <FiltroTalla />}
      <FiltroOferta />
    </aside>
  );
}