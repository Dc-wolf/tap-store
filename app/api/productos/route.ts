import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

type WhereInput = NonNullable<
  Parameters<PrismaClient["product"]["findMany"]>[0]
>["where"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const categoria = searchParams.get("categoria");
    const talla = searchParams.get("talla");
    const precio = searchParams.get("precio");
    const oferta = searchParams.get("oferta");

    const where: WhereInput = {};

    if (categoria) {
      where.category = categoria;
    }

    if (talla) {
      where.talla = {
        contains: talla,
      };
    }

    if (precio) {
      const [min, max] = precio.split("-");
      where.price = {
        gte: Number(min),
        lte: Number(max),
      };
    }

    if (oferta === "true") {
      where.oferta = true;
    }

    const productos = await prisma.product.findMany({
      where,
      skip,
      take: limit,
    });

    const total = await prisma.product.count({
      where,
    });

    return NextResponse.json({
      productos,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("ERROR API:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}