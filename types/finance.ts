export interface CurrencyQuote {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface CotacoesData {
  USDBRL: CurrencyQuote;
  EURBRL: CurrencyQuote;
  BTCBRL: CurrencyQuote;
  ETHBRL: CurrencyQuote;
  GBPBRL: CurrencyQuote;
}

export interface RenderingMetadata {
  strategy: 'ISR' | 'SSR' | 'API';
  generatedAt: string;
  timestamp: number;
  revalidateIntervalSeconds?: number;
  source: 'AwesomeAPI (Ao vivo)' | 'Mock Fallback (Offline)';
  renderedBy: 'Next.js App Router (Node.js runtime)';
}
