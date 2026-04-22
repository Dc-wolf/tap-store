import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorias = ["Camisetas", "Pantalones", "Blusas", "Hoodies"];
const nombres = ["Classic", "Urban", "Premium", "Sport", "Casual"];
const tallas = ["S", "M", "L"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice() {
  return Math.floor(Math.random() * 90) + 10;
}

function randomStock() {
  return Math.floor(Math.random() * 20) + 1;
}

function randomTalla() {
  const count = Math.floor(Math.random() * 3) + 1;
  const set = new Set();
  while (set.size < count) {
    set.add(random(tallas));
  }
  return Array.from(set).join(",");
}

async function main() {
  console.log("🌱 Seeding...");

  await prisma.product.deleteMany(); // limpia

  for (let i = 1; i <= 100; i++) {
    await prisma.product.create({
      data: {
        name: `${random(nombres)} ${random(categorias)} ${i}`,
        code: `PRD${i}`,
        category: random(categorias),
        price: randomPrice(),
        stock: randomStock(),
        talla: randomTalla(),
        oferta: Math.random() > 0.7,
        description: "Producto de prueba",
        image: `https://picsum.photos/300/300?random=${i}`,
        ownerId: 1,
        commissionPercentage: 10,
      },
    });
  }

  console.log("✅ 100 productos creados");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());