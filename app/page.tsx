import { getCotacoes } from "@/lib/cotacoes";
import { QuotesGrid } from "./components/QuotesGrid";
import { LiveReloadIndicator } from "./components/LiveReloadIndicator";
import { CurrencyConverter } from "./components/CurrencyConverter";

// Cache com revalidação a cada 15 segundos (ISR)
export const revalidate = 15;

export default async function HomePage() {
  const { data, meta } = await getCotacoes({ revalidate: 15 });

  return (
    <main className="content-container">
      <div className="view-header">
        <div>
          <h2 className="view-title">Mercado</h2>
          <p className="view-desc">Cotações atualizadas com revalidação estática (ISR).</p>
        </div>
        <LiveReloadIndicator
          serverTimestamp={meta.timestamp}
          revalidateSeconds={15}
          strategyName="ISR (15s)"
        />
      </div>

      <QuotesGrid cotacoes={data} generatedAt={meta.generatedAt} />
      <CurrencyConverter cotacoes={data} />
    </main>
  );
}
