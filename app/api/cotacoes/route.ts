import { NextResponse } from "next/server";
import { getCotacoes } from "@/lib/cotacoes";

// Route Handler nativo do Next.js App Router (Roda no ambiente Node.js)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency")?.toUpperCase();

  const { data, meta } = await getCotacoes({ cache: "no-store" });

  if (currency) {
    const key = `${currency}BRL` as keyof typeof data;
    if (data[key]) {
      return NextResponse.json({
        success: true,
        currency: data[key],
        meta: {
          ...meta,
          strategy: "API",
          endpoint: `/api/cotacoes?currency=${currency}`,
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: `Moeda '${currency}' não encontrada. Tente: USD, EUR, BTC, ETH, GBP`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data,
      meta: {
        ...meta,
        strategy: "API",
        endpoint: "/api/cotacoes",
        runtime: "Node.js (Next.js App Router)",
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        "X-Powered-By": "Next.js App Router",
      },
    }
  );
}
