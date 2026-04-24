import ProductCard from "./ProductCard";

type Producto = {
  id: number;
  name: string | null;
  category: string | null;
  price: number | null;
  image?: string | null;
  description?: string | null;
  stock?: number | null;
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