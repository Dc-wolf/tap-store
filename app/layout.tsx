import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} bg-gray-50 text-gray-900`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}