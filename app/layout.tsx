import "./globals.css";
import { CartProvider } from "@/components/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}