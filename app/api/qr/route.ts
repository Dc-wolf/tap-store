import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    const expiration_date = expiration.toISOString();

    const requestId = crypto.randomUUID();

    const response = await fetch(
      `${process.env.TUCUATE_BASE_URL}/v1/qr/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-Id": requestId,
          "X-Api-Key": process.env.TUCUATE_API_KEY!,
          "X-Tenant-Key": process.env.TUCUATE_TENANT_KEY!,
        },
        body: JSON.stringify({
          amount,
          currency: "BOB",
          gloss: "Pago de pedido",
          single_use: true,
          expiration_date,
          type: "BNB",
          bnb: {
            additional_data: "Pedido TapTap",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Error al generar QR" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error QR:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}