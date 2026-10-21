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
    <div className="status-bar">
      <div className="status-left">
        <span className={`status-dot ${isCacheExpired ? "dot-amber" : "dot-green"}`} />
        <span className="status-tag">{strategyName}</span>
        <span className="status-separator">•</span>
        <span className="status-text">
          {revalidateSeconds > 0
            ? isCacheExpired
              ? "Pronto para atualizar"
              : `Atualizado há ${ageSeconds}s`
            : "Direto do Servidor"}
        </span>
      </div>

      <button
        onClick={handleRefresh}
        disabled={isPending}
        className="btn-refresh"
        title="Atualizar dados"
      >
        <svg
          className={`icon-refresh ${isPending ? "spin" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span>{isPending ? "Atualizando..." : "Atualizar"}</span>
      </button>
    </div>
  );
}
