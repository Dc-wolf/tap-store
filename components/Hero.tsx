import Link from "next/link";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden w-full flex flex-col md:flex-row items-center justify-between gap-6 px-6 md:px-16 py-10 md:py-20"
      style={{
        background: "linear-gradient(to bottom, #fc6406 0%, #ffffff 100%)",
        minHeight: "280px",
      }}
    >
      {/* CONTENIDO IZQUIERDO */}
      <div className="relative z-10 w-full md:max-w-lg px-2 md:px-10">

        {/* Badge + redes */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-white text-orange-500 px-3 py-1 rounded text-xs font-semibold flex items-center gap-1">
            ⚡ Tienda verificada en TAP TAP
          </span>
          <span className="bg-black text-white p-1.5 rounded-md">
            <FaTiktok size={14} />
          </span>
          <span className="bg-green-500 text-white p-1.5 rounded-md">
            <FaWhatsapp size={14} />
          </span>
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none uppercase text-white break-words">
          ANALIS - COSTUMS
        </h1>

        {/* Subtítulo */}
        <p className="mt-2 text-sm font-bold underline underline-offset-2 text-white">
          ROPA - ACCESORIOS
        </p>

        {/* Lista */}
        <ul className="mt-3 text-sm space-y-1 text-gray-800 font-medium">
          <li>👗 Ropa casual para la mujer moderna y real de hoy en día</li>
          <li>🚚 Envíos a TODO el país</li>
          <li>
            <img src="https://flagcdn.com/w20/bo.png" alt="Bolivia" className="inline w-4 mr-1 mb-0.5" />
            Hecho en BOLIVIA
          </li>
        </ul>

        {/* Botón CTA */}
        <Link
          href="/register"
          className="mt-5 bg-green-600 text-white px-6 py-4 rounded-2xl flex items-center justify-between gap-4 hover:bg-green-700 transition shadow-lg w-full max-w-sm"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide">TU TAMBIEN</p>
            <p className="text-2xl font-black uppercase leading-tight">CREA TU CUENTA</p>
            <p className="text-xs text-white/80 mt-0.5">Si vendes en redes sociales este es tu lugar</p>
          </div>
          <span className="text-5xl">⚡</span>
        </Link>

      </div>

      {/* IMÁGENES - se ocultan en móvil, aparecen en md+ */}
      <div className="hidden md:flex relative w-64 h-64 md:w-80 md:h-72 flex-shrink-0">
        <img src="/hero/ropa1.png" alt="ropa" className="absolute top-0 left-8 w-28 md:w-36 drop-shadow-lg" />
        <img src="/hero/jeans.png" alt="jeans" className="absolute top-0 right-0 w-20 md:w-24 drop-shadow-lg" />
        <img src="/hero/reloj.png" alt="reloj" className="absolute top-1/2 right-8 w-12 md:w-16 -translate-y-1/2 drop-shadow-lg" />
        <img src="/hero/bolso.png" alt="bolso" className="absolute bottom-0 left-0 w-24 md:w-28 drop-shadow-lg" />
        <img src="/hero/zapatos.png" alt="zapatos" className="absolute bottom-0 right-0 w-24 md:w-28 drop-shadow-lg" />
      </div>

    </section>
  );
}