import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      {/* SECCIÓN PRINCIPAL - Fondo naranja */}
      <div className="bg-orange-500 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Columna 1: Información */}
          <div>
            <h4 className="font-bold text-lg mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Envíos en La Paz</Link></li>
              <li><Link href="#" className="hover:underline">Envíos a Nivel Nacional</Link></li>
              <li><Link href="#" className="hover:underline">Formas de pago</Link></li>
              <li><Link href="#" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:underline">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Columna 2: Estamos para ayudarte */}
          <div>
            <h4 className="font-bold text-lg mb-4">Estamos para ayudarte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">¿Cómo Comprar?</Link></li>
              <li><Link href="#" className="hover:underline">Mi Cuenta</Link></li>
              <li><Link href="#" className="hover:underline">Mis Pedidos</Link></li>
              <li><Link href="#" className="hover:underline">Rastrea tu Pedido</Link></li>
              <li><Link href="#" className="hover:underline">Devoluciones y Reembolsos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Nuestras Oficinas */}
          <div>
            <h4 className="font-bold text-lg mb-4">Nuestras Oficinas</h4>
            <p className="text-sm leading-relaxed">
              Av. M.I. Belzu N° S-0734 entre J. Armando Méndez y A. Honorato
              Salazar - Zona Las Cuadras - Cochabamba
            </p>
            <Link
              href="https://maps.google.com"
              target="_blank"
              className="inline-flex items-center gap-2 mt-3 bg-white text-orange-500 font-semibold text-sm px-4 py-2 rounded-full hover:bg-orange-50 transition"
            >
              📍 Ubicación
            </Link>
            <p className="text-sm mt-3">
              Horario de atención en tienda:<br />
              Lunes a Sábado: 14:00 a 19:00<br />
              Domingos y Feriados: Cerrado
            </p>
          </div>

          {/* Columna 4: Contáctanos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contáctanos</h4>
            <p className="text-sm font-semibold">DIPIA BOLIVIA</p>
            <p className="text-sm mb-4">NIT: 595963024</p>

            {/* Iconos de redes sociales */}
            <div className="flex items-center gap-3">
              <Link href="#" className="bg-white text-orange-500 p-2 rounded-full hover:bg-orange-100 transition">
                <FaFacebookF size={14} />
              </Link>
              <Link href="#" className="bg-white text-orange-500 p-2 rounded-full hover:bg-orange-100 transition">
                <FaInstagram size={14} />
              </Link>
              <Link href="#" className="bg-white text-orange-500 p-2 rounded-full hover:bg-orange-100 transition">
                <FaTiktok size={14} />
              </Link>
              <Link href="#" className="bg-white text-orange-500 p-2 rounded-full hover:bg-orange-100 transition">
                <FaEnvelope size={14} />
              </Link>
              <Link href="#" className="bg-white text-orange-500 p-2 rounded-full hover:bg-orange-100 transition">
                <FaPhone size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR - Blanca */}
      <div className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-extrabold text-xl">Tap</span>
            <span className="text-green-500 font-extrabold text-xl">Tap</span>
            <span className="text-gray-700 font-semibold text-sm ml-1">Store</span>
          </div>

          {/* Links */}
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-800 transition">Términos</Link>
            <Link href="#" className="hover:text-gray-800 transition">Privacidad</Link>
            <Link href="#" className="hover:text-gray-800 transition">Ayuda</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © 2028 TapTap. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
