"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface LiveReloadIndicatorProps {
  serverTimestamp: number;
  revalidateSeconds: number;
  strategyName: string;
}

export function LiveReloadIndicator({
  serverTimestamp,
  revalidateSeconds,
  strategyName,
}: LiveReloadIndicatorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(revalidateSeconds);
  const [ageSeconds, setAgeSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - serverTimestamp) / 1000);
      setAgeSeconds(elapsed >= 0 ? elapsed : 0);

      const remaining = revalidateSeconds - elapsed;
      setSecondsRemaining(remaining > 0 ? remaining : 0);
    }, 500);

    return () => clearInterval(interval);
  }, [serverTimestamp, revalidateSeconds]);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const isCacheExpired = secondsRemaining === 0;

  return (
    <div className="status-banner">
      <div className="status-content">
        <div className="status-badge-container">
          <span className={`pulse-dot ${isCacheExpired ? "dot-amber" : "dot-green"}`} />
          <span className="status-strategy-tag">{strategyName}</span>
        </div>

        <div className="status-info">
          <div className="status-title">
            {revalidateSeconds > 0 ? (
              <>
                Última sincronização: <strong>{ageSeconds}s atrás</strong>
                {" • "}
                Status:{" "}
                <span className={isCacheExpired ? "text-amber" : "text-emerald"}>
                  {isCacheExpired ? "Novos dados disponíveis" : `Atualizado (janela de ${secondsRemaining}s)`}
                </span>
              </>
            ) : (
              <>
                Sincronização: <strong>Tempo Real (Direto do Servidor)</strong>
              </>
            )}
          </div>
          <div className="status-subtitle">
            {revalidateSeconds > 0
              ? "Dados sincronizados periodicamente para garantir máxima velocidade de carregamento."
              : "Requisição processada pelo servidor no momento exato do acesso."}
          </div>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isPending}
        className="refresh-button"
        title="Atualizar dados agora"
      >
        <svg
          className={`refresh-icon ${isPending ? "spin" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span>{isPending ? "Atualizando..." : "Atualizar Cotações"}</span>
      </button>
    </div>
  );
}
