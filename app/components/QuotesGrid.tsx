import { CotacoesData } from "@/types/finance";
import { formatBRL } from "@/lib/cotacoes";

interface QuotesGridProps {
  cotacoes: CotacoesData;
  generatedAt: string;
}

export function QuotesGrid({ cotacoes, generatedAt }: QuotesGridProps) {
  const items = [
    { code: "USD", name: "Dólar", pair: "USD/BRL", flag: "🇺🇸", data: cotacoes.USDBRL },
    { code: "EUR", name: "Euro", pair: "EUR/BRL", flag: "🇪🇺", data: cotacoes.EURBRL },
    { code: "GBP", name: "Libra", pair: "GBP/BRL", flag: "🇬🇧", data: cotacoes.GBPBRL },
    { code: "BTC", name: "Bitcoin", pair: "BTC/BRL", flag: "₿", data: cotacoes.BTCBRL },
    { code: "ETH", name: "Ethereum", pair: "ETH/BRL", flag: "Ξ", data: cotacoes.ETHBRL },
  ];

  return (
    <div className="quotes-container">
      <div className="quotes-grid">
        {items.map((item) => {
          const pct = parseFloat(item.data.pctChange) || 0;
          const isPositive = pct >= 0;

          return (
            <div key={item.code} className="quote-card">
              <div className="card-header">
                <div className="card-title-group">
                  <span className="card-flag">{item.flag}</span>
                  <div>
                    <span className="card-name">{item.name}</span>
                    <span className="card-pair">{item.pair}</span>
                  </div>
                </div>
                <span className={`badge-pct ${isPositive ? "pct-up" : "pct-down"}`}>
                  {isPositive ? `+${pct.toFixed(2)}%` : `${pct.toFixed(2)}%`}
                </span>
              </div>

              <div className="card-price">{formatBRL(item.data.bid)}</div>

              <div className="card-meta">
                <span>Mín: {formatBRL(item.data.low)}</span>
                <span>Máx: {formatBRL(item.data.high)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="quotes-footer-meta">
        Horário do servidor: {generatedAt}
      </div>
    </div>
  );
}
