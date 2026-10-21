"use client";

import { useState } from "react";
import { CotacoesData } from "@/types/finance";

interface CurrencyConverterProps {
  cotacoes: CotacoesData;
}

export function CurrencyConverter({ cotacoes }: CurrencyConverterProps) {
  const [amountBRL, setAmountBRL] = useState<number>(1000);

  const usdRate = parseFloat(cotacoes.USDBRL.bid) || 5.6;
  const eurRate = parseFloat(cotacoes.EURBRL.bid) || 6.1;
  const btcRate = parseFloat(cotacoes.BTCBRL.bid) || 390000;
  const gbpRate = parseFloat(cotacoes.GBPBRL.bid) || 7.3;

  const convertedUSD = amountBRL / usdRate;
  const convertedEUR = amountBRL / eurRate;
  const convertedBTC = amountBRL / btcRate;
  const convertedGBP = amountBRL / gbpRate;

  const presets = [100, 500, 1000, 5000, 10000];

  return (
    <div className="converter-card">
      <div className="converter-header">
        <div>
          <h3 className="converter-title">Simulador de Conversão de Câmbio</h3>
          <p className="converter-subtitle">
            Calcule instantaneamente o valor equivalente em moeda estrangeira e cripto com base no valor de compra atual.
          </p>
        </div>
      </div>

      <div className="converter-input-group">
        <label htmlFor="amount-input" className="converter-label">
          Valor em Reais (BRL):
        </label>
        <div className="input-wrapper">
          <span className="input-prefix">R$</span>
          <input
            id="amount-input"
            type="number"
            min="0"
            step="50"
            value={isNaN(amountBRL) ? "" : amountBRL}
            onChange={(e) => setAmountBRL(parseFloat(e.target.value) || 0)}
            className="converter-input"
            placeholder="0.00"
          />
        </div>

        <div className="presets-row">
          <span className="presets-label">Atalhos rápidos:</span>
          {presets.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setAmountBRL(val)}
              className={`preset-pill ${amountBRL === val ? "preset-pill-active" : ""}`}
            >
              R$ {val.toLocaleString("pt-BR")}
            </button>
          ))}
        </div>
      </div>

      <div className="results-grid">
        <div className="result-item">
          <div className="result-flag">🇺🇸 Dólar Comercial</div>
          <div className="result-value">
            ${" "}
            {convertedUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="result-rate">1 USD = R$ {usdRate.toFixed(4)}</div>
        </div>

        <div className="result-item">
          <div className="result-flag">🇪🇺 Euro</div>
          <div className="result-value">
            €{" "}
            {convertedEUR.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="result-rate">1 EUR = R$ {eurRate.toFixed(4)}</div>
        </div>

        <div className="result-item">
          <div className="result-flag">🇬🇧 Libra Esterlina</div>
          <div className="result-value">
            £{" "}
            {convertedGBP.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="result-rate">1 GBP = R$ {gbpRate.toFixed(4)}</div>
        </div>

        <div className="result-item highlight-item">
          <div className="result-flag">₿ Bitcoin</div>
          <div className="result-value btc-val">
            ₿ {convertedBTC < 0.0001 ? convertedBTC.toFixed(7) : convertedBTC.toFixed(5)}
          </div>
          <div className="result-rate">1 BTC = R$ {btcRate.toLocaleString("pt-BR")}</div>
        </div>
      </div>
    </div>
  );
}
