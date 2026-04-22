import ProductCard from "./ProductCard";

type Producto = {
  id: number;
  name: string;
  category: string;
  price: number;
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