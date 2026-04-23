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


type FiltrosType = {
  categoria?: string;
  talla?: string;
  precio?: string;
  oferta?: string;
  buscar?: string;
};

type WhereInput = Prisma.productWhereInput;

async function getProductos(page: number, filtros: FiltrosType) {
  const limit = 6;
  const skip = (page - 1) * limit;
  const where: WhereInput = {};

  if (filtros.categoria) where.category = filtros.categoria;

  if (filtros.talla) {
    where.talla = { contains: filtros.talla };
  }

  if (filtros.precio) {
    const [min, max] = filtros.precio.split("-");
    where.price = { gte: Number(min), lte: Number(max) };
  }
  if (filtros.oferta === "true") where.oferta = true;
  if (filtros.buscar) {
  where.name = { contains: filtros.buscar };
}

  const productos = await prisma.product.findMany({ where, skip, take: limit });
  const total = await prisma.product.count({ where });

  return { productos, totalPages: Math.ceil(total / limit) };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categoria?: string;
    talla?: string;
    precio?: string;
    oferta?: string;
    buscar?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const filtros: FiltrosType = {
    categoria: params?.categoria,
    talla: params?.talla,
    precio: params?.precio,
    oferta: params?.oferta,
    buscar: params?.buscar,
  };

  const { productos, totalPages } = await getProductos(currentPage, filtros);

  return (
    <>
      <Navbar />

      {/* HERO BANNER */}
      <Hero />

      <main className="w-full px-4 md:px-10 py-8">

        {/* TÍTULO SECCIÓN */}
        <div className="mb-6 px-10">
          <h2 className="text-2xl font-bold text-gray-900">Nuestros Productos</h2>
          <p className="text-gray-500 text-sm mt-1">Explora todo nuestro catálogo</p>
        </div>

        {/* BUSCADOR */}
       <Buscador />

        {/* TABS */}
        <div className="mb-6">
          <Tabs categoriaActiva={params?.categoria}/>
        </div>

        {/* GRID PRINCIPAL: FILTROS + PRODUCTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* FILTROS */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <Filtros />
          </aside>

          {/* PRODUCTOS */}
          <section className="lg:col-span-3">
            <ProductGrid productos={productos} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}