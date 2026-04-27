"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

// ── TIPOS ─────────────────────────────────────────────────
type DatosCliente = {
  nombre: string;
  telefono: string;
  direccion: string;
};

type ErroresCampo = {
  nombre?: string;
  telefono?: string;
  direccion?: string;
};

// ── VALIDADORES ───────────────────────────────────────────
const validarNombre = (valor: string): string | undefined => {
  const trimmed = valor.trim();
  if (!trimmed) return "El nombre es obligatorio.";
  if (/\d/.test(trimmed)) return "El nombre no puede contener números.";
  if (/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/.test(trimmed)) return "Solo se permiten letras y espacios.";
  if (trimmed.length < 3) return "Mínimo 3 caracteres.";
  if (trimmed.length > 60) return "Máximo 60 caracteres.";
  return undefined;
};

const validarTelefono = (valor: string): string | undefined => {
  const trimmed = valor.trim();
  if (!trimmed) return "El teléfono es obligatorio.";
  if (!/^[67]\d{7}$/.test(trimmed)) return "Debe ser un celular boliviano válido (ej: 70012345).";
  return undefined;
};

const validarDireccion = (valor: string): string | undefined => {
  const trimmed = valor.trim();
  if (!trimmed) return "La dirección es obligatoria.";
  if (trimmed.length < 10) return "Mínimo 10 caracteres.";
  if (trimmed.length > 80) return "Máximo 80 caracteres.";
  if (!/[a-zA-Z0-9]/.test(trimmed)) return "La dirección debe contener letras o números reales.";
  return undefined;
};

// ── STEPPER ───────────────────────────────────────────────
const pasos = ["Identificación", "Tu Pedido", "Método de pago"];

function Stepper({ pasoActual }: { pasoActual: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {pasos.map((paso, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition
                ${i <= pasoActual ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-400"}`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs mt-1 ${
                i <= pasoActual ? "text-teal-500 font-semibold" : "text-gray-400"
              }`}
            >
              {paso}
            </span>
          </div>
          {i < pasos.length - 1 && (
            <div
              className={`w-20 h-1 mx-1 mb-5 rounded transition ${
                i < pasoActual ? "bg-teal-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── PASO 1 — IDENTIFICACIÓN ───────────────────────────────
function PasoIdentificacion({
  datos,
  setDatos,
  onSiguiente,
}: {
  datos: DatosCliente;
  setDatos: (d: DatosCliente) => void;
  onSiguiente: () => void;
}) {
  const [tocados, setTocados] = useState<Record<string, boolean>>({});

  const errores: ErroresCampo = {
    nombre: validarNombre(datos.nombre),
    telefono: validarTelefono(datos.telefono),
    direccion: validarDireccion(datos.direccion),
  };

  const valido =
    !errores.nombre && !errores.telefono && !errores.direccion;

  const marcarTocado = (campo: string) =>
    setTocados((prev) => ({ ...prev, [campo]: true }));

  const mostrarError = (campo: keyof ErroresCampo): string | undefined =>
    tocados[campo] ? errores[campo] : undefined;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Datos para recibir su pedido
      </h2>
      <p className="text-gray-400 text-sm mb-6">Completa tus datos de entrega</p>

      <div className="flex flex-col gap-4">
        {/* NOMBRE */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Nombre completo
          </label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            onBlur={() => marcarTocado("nombre")}
            maxLength={60}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
              mostrarError("nombre")
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-teal-400"
            }`}
          />
          {mostrarError("nombre") && (
            <p className="text-red-500 text-xs mt-1">{mostrarError("nombre")}</p>
          )}
        </div>

        {/* TELÉFONO */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Teléfono
          </label>
          <input
            type="tel"
            placeholder="Ej: 70012345"
            value={datos.telefono}
            onChange={(e) => {
              const soloDigitos = e.target.value.replace(/\D/g, "").slice(0, 8);
              setDatos({ ...datos, telefono: soloDigitos });
            }}
            onBlur={() => marcarTocado("telefono")}
            maxLength={8}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
              mostrarError("telefono")
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-teal-400"
            }`}
          />
          {mostrarError("telefono") && (
            <p className="text-red-500 text-xs mt-1">{mostrarError("telefono")}</p>
          )}
        </div>

        {/* DIRECCIÓN */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Dirección de entrega
          </label>
          <textarea
            placeholder="Ej: Av. Siempre Viva 123, La Paz"
            value={datos.direccion}
            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
            onBlur={() => marcarTocado("direccion")}
            rows={3}
            maxLength={80}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none transition ${
              mostrarError("direccion")
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-teal-400"
            }`}
          />
          <div className="flex justify-between items-start mt-1">
            {mostrarError("direccion") ? (
              <p className="text-red-500 text-xs">{mostrarError("direccion")}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-300 ml-auto">
              {datos.direccion.length}/80
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onSiguiente}
        disabled={!valido}
        className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition ${
          valido
            ? "bg-teal-500 hover:bg-teal-600"
            : "bg-gray-200 cursor-not-allowed text-gray-400"
        }`}
      >
        Continuar →
      </button>
    </div>
  );
}

// ── PASO 2 — TU PEDIDO ────────────────────────────────────
function PasoPedido({
  onSiguiente,
  onAtras,
}: {
  onSiguiente: () => void;
  onAtras: () => void;
}) {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  const tasa = 6.96;
  const subtotalBs = cart.reduce(
    (acc, i) => acc + i.price * tasa * i.quantity,
    0
  );
  const deliveryBs = 15;
  const totalBs = subtotalBs + deliveryBs;

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-400 text-lg">Tu carrito está vacío.</p>
        <button
          onClick={onAtras}
          className="mt-4 text-teal-500 underline text-sm"
        >
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tu Pedido</h2>

      {/* ITEMS */}
      <div className="flex flex-col gap-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-gray-100 rounded-xl p-3"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
              <p className="text-teal-500 font-bold text-sm mt-0.5">
                Bs. {(item.price * tasa * item.quantity).toFixed(0)}
              </p>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="text-gray-500 hover:text-black text-lg font-bold w-6 text-center"
              >
                −
              </button>
              <span className="text-sm font-semibold w-4 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="text-gray-500 hover:text-black text-lg font-bold w-6 text-center"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RESUMEN */}
      <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2 text-sm mb-6">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>Bs. {subtotalBs.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Delivery</span>
          <span>Bs. {deliveryBs}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2 mt-1">
          <span>Total</span>
          <span>Bs. {totalBs.toFixed(0)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAtras}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition"
        >
          ← Atrás
        </button>
        <button
          onClick={onSiguiente}
          className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold transition"
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}

// ── PASO 3 — MÉTODO DE PAGO ───────────────────────────────
function PasoPago({
  datos,
  onAtras,
}: {
  datos: DatosCliente;
  onAtras: () => void;
}) {
  const { cart, clearCart } = useCart();
  const [confirmado, setConfirmado] = useState(false);

  const tasa = 6.96;
  const subtotalBs = cart.reduce(
    (acc, i) => acc + i.price * tasa * i.quantity,
    0
  );
  const totalBs = subtotalBs + 15;

  if (confirmado) {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Pedido confirmado!
        </h2>
        <p className="text-gray-500 text-sm mb-1">
          Gracias, <span className="font-semibold">{datos.nombre}</span>
        </p>
        <p className="text-gray-500 text-sm">
          Te contactaremos al{" "}
          <span className="font-semibold">{datos.telefono}</span> para coordinar
          la entrega.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de pago</h2>

      <div className="border border-teal-200 bg-teal-50 rounded-2xl p-5 mb-4">
        <p className="font-bold text-teal-700 mb-1">QR / Transferencia bancaria</p>
        <p className="text-sm text-teal-600 mb-3">
          Realiza el pago por el monto exacto:
        </p>

        <div className="bg-white rounded-xl p-4 text-center mb-3 border border-teal-100">
          {/* Reemplaza este div con <img src="tu-qr.png" /> cuando tengas el QR */}
          <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center text-gray-400 text-xs">
            QR aquí
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Banco:</span>
            <span className="font-semibold">Banco Ejemplo</span>
          </div>
          <div className="flex justify-between">
            <span>Cuenta:</span>
            <span className="font-semibold">1234567890</span>
          </div>
          <div className="flex justify-between">
            <span>Titular:</span>
            <span className="font-semibold">Tu Tienda SRL</span>
          </div>
          <div className="flex justify-between text-teal-600 font-bold text-base mt-2 border-t border-teal-100 pt-2">
            <span>Monto a pagar:</span>
            <span>Bs. {totalBs.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mb-6">
        Una vez realizado el pago, confirma tu pedido y nos comunicaremos
        contigo.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onAtras}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition"
        >
          ← Atrás
        </button>
        <button
          onClick={() => {
            clearCart();
            setConfirmado(true);
          }}
          className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold transition"
        >
          Confirmar pedido ✓
        </button>
      </div>
    </div>
  );
}

// ── PAGE PRINCIPAL ────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(0);
  const [datos, setDatos] = useState<DatosCliente>({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← Seguir comprando
        </button>
        <h1 className="font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="px-4 py-8">
        <Stepper pasoActual={pasoActual} />

        {pasoActual === 0 && (
          <PasoIdentificacion
            datos={datos}
            setDatos={setDatos}
            onSiguiente={() => setPasoActual(1)}
          />
        )}
        {pasoActual === 1 && (
          <PasoPedido
            onSiguiente={() => setPasoActual(2)}
            onAtras={() => setPasoActual(0)}
          />
        )}
        {pasoActual === 2 && (
          <PasoPago datos={datos} onAtras={() => setPasoActual(1)} />
        )}
      </div>
    </div>
  );
}
