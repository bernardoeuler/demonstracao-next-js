import { CotacoesData, RenderingMetadata } from "@/types/finance";

// Mock de fallback caso a internet do campus caia durante a apresentação
const FALLBACK_DATA: CotacoesData = {
  USDBRL: {
    code: "USD",
    codein: "BRL",
    name: "Dólar Americano/Real Brasileiro",
    high: "5.6520",
    low: "5.5840",
    varBid: "0.0210",
    pctChange: "0.38",
    bid: "5.6210",
    ask: "5.6225",
    timestamp: "1729548000",
    create_date: "2026-10-21 20:00:00",
  },
  EURBRL: {
    code: "EUR",
    codein: "BRL",
    name: "Euro/Real Brasileiro",
    high: "6.1240",
    low: "6.0680",
    varBid: "-0.0150",
    pctChange: "-0.24",
    bid: "6.0910",
    ask: "6.0940",
    timestamp: "1729548000",
    create_date: "2026-10-21 20:00:00",
  },
  BTCBRL: {
    code: "BTC",
    codein: "BRL",
    name: "Bitcoin/Real Brasileiro",
    high: "398000",
    low: "385000",
    varBid: "4500",
    pctChange: "1.16",
    bid: "392450",
    ask: "392500",
    timestamp: "1729548000",
    create_date: "2026-10-21 20:00:00",
  },
  ETHBRL: {
    code: "ETH",
    codein: "BRL",
    name: "Ethereum/Real Brasileiro",
    high: "15400",
    low: "14850",
    varBid: "180",
    pctChange: "1.20",
    bid: "15120",
    ask: "15135",
    timestamp: "1729548000",
    create_date: "2026-10-21 20:00:00",
  },
  GBPBRL: {
    code: "GBP",
    codein: "BRL",
    name: "Libra Esterlina/Real Brasileiro",
    high: "7.3400",
    low: "7.2800",
    varBid: "0.0350",
    pctChange: "0.48",
    bid: "7.3150",
    ask: "7.3190",
    timestamp: "1729548000",
    create_date: "2026-10-21 20:00:00",
  },
};

export async function getCotacoes(options?: {
  revalidate?: number | false;
  cache?: RequestCache;
}): Promise<{ data: CotacoesData; meta: RenderingMetadata }> {
  const now = new Date();
  const timestamp = now.getTime();
  const formattedTime = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });

  const isISR = typeof options?.revalidate === "number";
  const strategy = isISR ? "ISR" : "SSR";

  try {
    const fetchOptions: RequestInit = {};

    if (isISR) {
      // Configuração nativa de ISR no Next.js
      fetchOptions.next = { revalidate: options.revalidate as number };
    } else if (options?.cache) {
      fetchOptions.cache = options.cache;
    } else {
      fetchOptions.cache = "no-store";
    }

    const response = await fetch(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ETH-BRL,GBP-BRL",
      {
        ...fetchOptions,
        signal: AbortSignal.timeout(4000), // Timeout de 4s para segurança
      }
    );

    if (!response.ok) {
      throw new Error(`Status HTTP retornado: ${response.status}`);
    }

    const rawData = await response.json();

    return {
      data: {
        USDBRL: rawData.USDBRL || FALLBACK_DATA.USDBRL,
        EURBRL: rawData.EURBRL || FALLBACK_DATA.EURBRL,
        BTCBRL: rawData.BTCBRL || FALLBACK_DATA.BTCBRL,
        ETHBRL: rawData.ETHBRL || FALLBACK_DATA.ETHBRL,
        GBPBRL: rawData.GBPBRL || FALLBACK_DATA.GBPBRL,
      },
      meta: {
        strategy,
        generatedAt: formattedTime,
        timestamp,
        revalidateIntervalSeconds: isISR ? (options?.revalidate as number) : undefined,
        source: "AwesomeAPI (Ao vivo)",
        renderedBy: "Next.js App Router (Node.js runtime)",
      },
    };
  } catch {
    // Se a API estiver offline ou der timeout, usamos fallback gracioso
    return {
      data: FALLBACK_DATA,
      meta: {
        strategy,
        generatedAt: formattedTime,
        timestamp,
        revalidateIntervalSeconds: isISR ? (options?.revalidate as number) : undefined,
        source: "Mock Fallback (Offline)",
        renderedBy: "Next.js App Router (Node.js runtime)",
      },
    };
  }
}

export function formatBRL(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "R$ 0,00";

  return num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: num >= 1000 ? 2 : 3,
    maximumFractionDigits: num >= 1000 ? 2 : 4,
  });
}
