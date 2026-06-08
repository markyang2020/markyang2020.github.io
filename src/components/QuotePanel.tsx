import { FileText, Send } from "lucide-react";
import { text, ui } from "../domain/i18n";
import { computeBOM } from "../domain/pricing";
import { useConfigStore } from "../stores/configStore";

export function QuotePanel() {
  const config = useConfigStore((state) => state.config);
  const quote = computeBOM(config);
  const lang = config.language;
  const t = ui.quote;

  return (
    <aside className="panel panel-right" dir="ltr">
      <div className="panel-heading compact">
        <div>
          <p className="eyebrow">{text(t.eyebrow, lang)}</p>
          <h2>{text(t.title, lang)}</h2>
        </div>
        <FileText size={21} />
      </div>

      <div className="quote-summary">
        <span>{text(t.total, lang)}</span>
        <strong>${quote.total.toLocaleString()}</strong>
        <small>{text(t.exw, lang)} · {quote.weightTons.toFixed(1)} {text(t.tons, lang)}</small>
      </div>

      <div className="bom-table">
        {quote.lines.map((line) => (
          <div className="bom-line" key={line.sku}>
            <div>
              <strong>{line.name}</strong>
              <small>{line.category} · {line.sku}</small>
            </div>
            <span>{line.qty}</span>
            <b>${line.amount.toLocaleString()}</b>
          </div>
        ))}
      </div>

      <div className="totals">
        <div><span>{text(t.subtotal, lang)}</span><b>${quote.subtotal.toLocaleString()}</b></div>
        <div><span>{text(t.packing, lang)}</span><b>${quote.exportPacking.toLocaleString()}</b></div>
        <div><span>{text(t.freight, lang)}</span><b>${quote.estimatedFreight.toLocaleString()}</b></div>
      </div>

      <button className="inquiry-button" type="button">
        <Send size={17} />
        {text(t.inquiry, lang)}
      </button>
    </aside>
  );
}
