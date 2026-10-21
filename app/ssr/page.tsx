import { getCotacoes } from "@/lib/cotacoes";
import { QuotesGrid } from "../components/QuotesGrid";
import { LiveReloadIndicator } from "../components/LiveReloadIndicator";
import { CurrencyConverter } from "../components/CurrencyConverter";

// Força renderização dinâmica no servidor (Server-Side Rendering)
export const dynamic = "force-dynamic";

export default async function SsrPage() {
  const { data, meta } = await getCotacoes({ cache: "no-store" });

  return (
    <main>
      <section className="page-hero">
        <div className="hero-tagline">
          <span className="badge-blue">Modo Tempo Real (SSR)</span>
          <span className="badge-server">Renderizado Sob Demanda</span>
        </div>
        <h2 className="hero-title">Cotações Instantâneas</h2>
        <p className="hero-description">
          Nesta visão, os dados são obtidos diretamente na hora em que você acessa a página, sem cache intermediário.
          Ideal para operações que exigem precisão de milissegundos.
        </p>
      </section>

      {/* Indicador de Status SSR */}
      <LiveReloadIndicator
        serverTimestamp={meta.timestamp}
        revalidateSeconds={0}
        strategyName="SSR Dinâmico"
      />

      {/* Grid de Cotações */}
      <QuotesGrid cotacoes={data} generatedAt={meta.generatedAt} />

      {/* Conversor Interativo */}
      <CurrencyConverter cotacoes={data} />
    </main>
  );
}
