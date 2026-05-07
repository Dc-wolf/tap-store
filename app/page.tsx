export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Buscador from "@/components/Buscador";
import Filtros from "@/components/Filtros";
import Tabs from "@/components/Tabs";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Producto = {
  id: number;
  name: string | null;
  category: string | null;
  categoryId?: number | null;
  price: number | null;
  image?: string | null;
  description?: string | null;
  stock?: number | null;
  categoryRel?: { id: number; name: string; slug: string } | null;
  variants?: {
    id: number;
    colorId: number;
    sizeId: number;
    stock: number;
    color: { id: number; name: string; hex: string | null };
    size: { id: number; name: string; order: number };
  }[];
};

type FiltrosType = {
  tipo?: string;
  categoria?: string;
  color?: string;
  talla?: string;
  precio?: string;
  oferta?: string;
  buscar?: string;
};

const STOP_WORDS = ["color", "talla", "de", "en", "el", "la", "los", "las", "con", "y", "un", "una"];

async function getProductos(page: number, filtros: FiltrosType) {
  const limit = 6;
  const skip = (page - 1) * limit;

  const palabras = filtros.buscar
    ? filtros.buscar
        .toLowerCase()
        .split(/\s+/)
        .filter((p) => p.length > 1 && !STOP_WORDS.includes(p))
    : [];

  const variantFilter = {
    stock: { gt: 0 },
    ...(filtros.color ? { color: { name: filtros.color } } : {}),
    ...(filtros.talla ? { size: { name: filtros.talla } } : {}),
  };

  const where: Prisma.productWhereInput = {
    status: "active",
    visibility: "public",
    variants: { some: variantFilter },
    ...(filtros.tipo ? { categoryTypeRel: { slug: filtros.tipo } } : {}),
    ...(filtros.categoria ? { categoryRel: { slug: filtros.categoria } } : {}),
    ...(filtros.precio
      ? (() => {
          const [min, max] = filtros.precio!.split("-");
          return { price: { gte: Number(min), lte: Number(max) } };
        })()
      : {}),
    ...(filtros.oferta === "true" ? { oferta: true } : {}),
    ...(palabras.length > 0
      ? {
          AND: palabras.map((palabra) => ({
            OR: [
              { name: { contains: palabra } },
              { categoryRel: { name: { contains: palabra } } },
              {
                variants: {
                  some: {
                    color: { name: { contains: palabra } },
                  },
                },
              },
            ],
          })),
        }
      : {}),
  };

  const [productos, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      include: {
        categoryRel: true,
        variants: {
          where: variantFilter,
          include: { color: true, size: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }) as unknown as Producto[],
    prisma.product.count({ where }),
  ]);

  return { productos, totalPages: Math.ceil(total / limit) };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    tipo?: string;
    categoria?: string;
    color?: string;
    talla?: string;
    precio?: string;
    oferta?: string;
    buscar?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const filtros: FiltrosType = {
    tipo: params?.tipo,
    categoria: params?.categoria,
    color: params?.color,
    talla: params?.talla,
    precio: params?.precio,
    oferta: params?.oferta,
    buscar: params?.buscar,
  };

  const { productos, totalPages } = await getProductos(currentPage, filtros);

  return (
    <>
      <Navbar />
      <Hero />
      <main className="w-full px-4 md:px-10 py-8">
        <div className="mb-6 px-10">
          <h2 className="text-2xl font-bold text-gray-900">Nuestros Productos</h2>
          <p className="text-gray-500 text-sm mt-1">Explora todo nuestro catálogo</p>
        </div>
        <Buscador />
        <div className="mb-6">
          <Tabs tipoActivo={params?.tipo} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <Filtros tipo={params?.tipo} />
          </aside>
          <section className="lg:col-span-3">
            <ProductGrid productos={productos} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}