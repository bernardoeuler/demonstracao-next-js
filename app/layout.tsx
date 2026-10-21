import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextQuotes • Monitor de Cotações e Câmbio em Tempo Real",
  description:
    "Acompanhe cotações de moedas e criptomoedas em tempo real com conversor integrado e dados de mercado atualizados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="app-header">
          <div className="header-inner">
            <Link href="/" className="brand-group">
              <div className="brand-icon">NQ</div>
              <div className="brand-text">
                <h1>NextQuotes</h1>
                <span className="brand-subtitle">Câmbio & Mercado Financeiro</span>
              </div>
            </Link>

            <nav>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-item nav-item-isr">
                    Painel Mercado
                  </Link>
                </li>
                <li>
                  <Link href="/ssr" className="nav-item nav-item-ssr">
                    Tempo Real
                  </Link>
                </li>
                <li>
                  <a
                    href="/api/cotacoes"
                    target="_blank"
                    rel="noreferrer"
                    className="nav-item"
                    title="Acessar endpoint REST da API"
                  >
                    API JSON
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="main-wrapper">{children}</div>

        <footer className="app-footer">
          <div className="footer-inner">
            <div>NextQuotes © {new Date().getFullYear()} • Dados via AwesomeAPI</div>
            <div>Atualizações em tempo real com alta performance</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
