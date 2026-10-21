import { CotacoesData } from "@/types/finance";
import { formatBRL } from "@/lib/cotacoes";

interface QuotesGridProps {
  cotacoes: CotacoesData;
  generatedAt: string;
}

export function QuotesGrid({ cotacoes, generatedAt }: QuotesGridProps) {
  const items = [
    {
      code: "USD",
      name: "Dólar Americano",
      flag: "🇺🇸",
      data: cotacoes.USDBRL,
      color: "card-usd",
    },
    {
      code: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      data: cotacoes.EURBRL,
      color: "card-eur",
    },
    {
      code: "GBP",
      name: "Libra Esterlina",
      flag: "🇬🇧",
      data: cotacoes.GBPBRL,
      color: "card-gbp",
    },
    {
      code: "BTC",
      name: "Bitcoin",
      flag: "₿",
      data: cotacoes.BTCBRL,
      color: "card-btc",
    },
    {
      code: "ETH",
      name: "Ethereum",
      flag: "Ξ",
      data: cotacoes.ETHBRL,
      color: "card-eth",
    },
  ];

  return (
    <div className="quotes-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Principais Moedas e Cripto</h2>
          <p className="section-subtitle">
            Valores convertidos em Real (BRL) • Horário do servidor: <strong>{generatedAt}</strong>
          </p>
        </div>
      </div>

      <div className="cards-grid">
        {items.map((item) => {
          const pct = parseFloat(item.data.pctChange) || 0;
          const isPositive = pct >= 0;

          return (
            <div key={item.code} className={`quote-card ${item.color}`}>
              <div className="card-top">
                <div className="currency-info">
                  <span className="currency-flag">{item.flag}</span>
                  <div>
                    <h3 className="currency-name">{item.name}</h3>
                    <span className="currency-pair">
                      {item.data.code}/{item.data.codein}
                    </span>
                  </div>
                </div>

                <div className={`pct-badge ${isPositive ? "pct-up" : "pct-down"}`}>
                  <span className="pct-arrow">{isPositive ? "▲" : "▼"}</span>
                  <span>{isPositive ? `+${pct.toFixed(2)}%` : `${pct.toFixed(2)}%`}</span>
                </div>
              </div>

              <div className="card-middle">
                <div className="price-label">Valor de Compra (Bid)</div>
                <div className="price-main">{formatBRL(item.data.bid)}</div>
              </div>

              <div className="card-bottom">
                <div className="detail-stat">
                  <span className="stat-label">Máxima do Dia</span>
                  <span className="stat-value">{formatBRL(item.data.high)}</span>
                </div>
                <div className="detail-stat">
                  <span className="stat-label">Mínima do Dia</span>
                  <span className="stat-value">{formatBRL(item.data.low)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
