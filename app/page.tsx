import { getCotacoes } from "@/lib/cotacoes";
import { QuotesGrid } from "./components/QuotesGrid";
import { LiveReloadIndicator } from "./components/LiveReloadIndicator";
import { CurrencyConverter } from "./components/CurrencyConverter";

// Cache com revalidação a cada 15 segundos (ISR)
export const revalidate = 15;

export default async function HomePage() {
  const { data, meta } = await getCotacoes({ revalidate: 15 });

  return (
    <main>
      <section className="page-hero">
        <div className="hero-tagline">
          <span className="badge-green">Mercado Aberto</span>
          <span className="badge-server">Atualização Periódica</span>
        </div>
        <h2 className="hero-title">Cotações e Câmbio de Moedas</h2>
        <p className="hero-description">
          Acompanhe os principais pares de moedas e criptomoedas negociadas em relação ao Real (BRL).
          Dados consolidados de fechamento e taxas de compra e venda atualizadas.
        </p>
      </section>

      {/* Indicador de Status e Atualização */}
      <LiveReloadIndicator
        serverTimestamp={meta.timestamp}
        revalidateSeconds={15}
        strategyName="Cache 15s"
      />

      {/* Grid de Cotações */}
      <QuotesGrid cotacoes={data} generatedAt={meta.generatedAt} />

      {/* Conversor Interativo */}
      <CurrencyConverter cotacoes={data} />
    </main>
  );
}
