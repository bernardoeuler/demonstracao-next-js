import { getCotacoes } from "@/lib/cotacoes";
import { QuotesGrid } from "../components/QuotesGrid";
import { LiveReloadIndicator } from "../components/LiveReloadIndicator";
import { CurrencyConverter } from "../components/CurrencyConverter";

// Renderização dinâmica no servidor sob demanda (SSR)
export const dynamic = "force-dynamic";

export default async function SsrPage() {
  const { data, meta } = await getCotacoes({ cache: "no-store" });

  return (
    <main className="content-container">
      <div className="view-header">
        <div>
          <h2 className="view-title">Tempo Real</h2>
          <p className="view-desc">Cotações processadas no servidor a cada requisição (SSR).</p>
        </div>
        <LiveReloadIndicator
          serverTimestamp={meta.timestamp}
          revalidateSeconds={0}
          strategyName="SSR Dinâmico"
        />
      </div>

      <QuotesGrid cotacoes={data} generatedAt={meta.generatedAt} />
      <CurrencyConverter cotacoes={data} />
    </main>
  );
}
