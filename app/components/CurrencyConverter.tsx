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
  const gbpRate = parseFloat(cotacoes.GBPBRL.bid) || 7.3;
  const btcRate = parseFloat(cotacoes.BTCBRL.bid) || 390000;

  const presets = [100, 500, 1000, 5000];

  return (
    <div className="converter-box">
      <div className="converter-top">
        <h3 className="converter-heading">Conversor de Câmbio</h3>
        <div className="converter-presets">
          {presets.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setAmountBRL(val)}
              className={`preset-btn ${amountBRL === val ? "preset-btn-active" : ""}`}
            >
              R$ {val.toLocaleString("pt-BR")}
            </button>
          ))}
        </div>
      </div>

      <div className="converter-body">
        <div className="converter-field">
          <label htmlFor="brl-input" className="converter-field-label">
            Valor em Reais (BRL)
          </label>
          <div className="input-group">
            <span className="input-currency">R$</span>
            <input
              id="brl-input"
              type="number"
              min="0"
              value={isNaN(amountBRL) ? "" : amountBRL}
              onChange={(e) => setAmountBRL(parseFloat(e.target.value) || 0)}
              className="converter-text-input"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="conversion-outputs">
          <div className="output-chip">
            <span className="chip-label">🇺🇸 Dólar</span>
            <span className="chip-val">
              ${" "}
              {(amountBRL / usdRate).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="output-chip">
            <span className="chip-label">🇪🇺 Euro</span>
            <span className="chip-val">
              €{" "}
              {(amountBRL / eurRate).toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="output-chip">
            <span className="chip-label">🇬🇧 Libra</span>
            <span className="chip-val">
              £{" "}
              {(amountBRL / gbpRate).toLocaleString("en-GB", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="output-chip output-chip-btc">
            <span className="chip-label">₿ Bitcoin</span>
            <span className="chip-val">
              ₿ {(amountBRL / btcRate).toFixed(5)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
