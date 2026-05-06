import ProductCard from "./ProductCard";

type Variante = {
  id: number;
  colorId: number;
  sizeId: number;
  stock: number;
  color: { id: number; name: string; hex: string | null };
  size: { id: number; name: string; order: number };
};

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
  variants?: Variante[];
};

export default function ProductGrid({ productos }: { productos: Producto[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}