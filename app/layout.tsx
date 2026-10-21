import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextQuotes • Cotações em Tempo Real",
  description: "Monitor de cotações e conversor de câmbio rápido construído com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="navbar">
          <div className="nav-inner">
            <Link href="/" className="nav-brand">
              <span className="brand-dot" />
              <span className="brand-title">NextQuotes</span>
            </Link>

            <nav className="nav-menu">
              <Link href="/" className="nav-link">
                Mercado (ISR)
              </Link>
              <Link href="/ssr" className="nav-link">
                Tempo Real (SSR)
              </Link>
              <a
                href="/api/cotacoes"
                target="_blank"
                rel="noreferrer"
                className="nav-link nav-link-api"
              >
                API
              </a>
            </nav>
          </div>
        </header>

        <div className="app-main">{children}</div>

        <footer className="footer">
          <div className="footer-inner">
            <span>NextQuotes</span>
            <span>Dados de mercado via AwesomeAPI</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
