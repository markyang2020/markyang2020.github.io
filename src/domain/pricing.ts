import { addons, baseFrames, wallMaterials } from "./catalog";
import type { AddonKey } from "./catalog";
import { text } from "./i18n";
import type { HouseConfig } from "../stores/configStore";

const kitchenDependentAddons = new Set<AddonKey>(["stove", "sink", "fridge"]);

export type BomLine = {
  sku: string;
  name: string;
  category: string;
  qty: number;
  unitPrice: number;
  amount: number;
};

export type Quote = {
  lines: BomLine[];
  subtotal: number;
  exportPacking: number;
  estimatedFreight: number;
  total: number;
  weightTons: number;
};

export function computeBOM(config: HouseConfig): Quote {
  const frame = baseFrames[config.size];
  const material = wallMaterials[config.wallMaterial];

  const lines: BomLine[] = [
    {
      sku: `FRAME-${config.size.toUpperCase()}`,
      name: text({ en: `Base Frame ${text(frame.label, config.language)}`, zh: `基础框架 ${text(frame.label, config.language)}` }, config.language),
      category: text({ en: "Structure", zh: "主体结构", es: "Estructura", fr: "Structure", de: "Struktur" }, config.language),
      qty: 1,
      unitPrice: frame.price,
      amount: frame.price,
    },
    {
      sku: `WALL-${config.wallMaterial.toUpperCase()}`,
      name: text(material.label, config.language),
      category: text({ en: "Envelope", zh: "围护结构", es: "Envolvente", fr: "Enveloppe", de: "Gebaeudehulle" }, config.language),
      qty: 1,
      unitPrice: material.price,
      amount: material.price,
    },
  ];

  Object.entries(config.addons).forEach(([key, qty]) => {
    if (qty <= 0) return;
    const addonKey = key as AddonKey;
    if (config.addons.kitchen <= 0 && kitchenDependentAddons.has(addonKey)) return;

    const item = addons[addonKey];
    lines.push({
      sku: item.sku,
      name: text(item.label, config.language),
      category: text(item.category, config.language),
      qty,
      unitPrice: item.unitPrice,
      amount: item.unitPrice * qty,
    });
  });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const exportPacking = Math.round(subtotal * 0.035);
  const estimatedFreight = Math.round((frame.weight * 720 + subtotal * 0.018) / 10) * 10;
  const total = subtotal + exportPacking + estimatedFreight;

  return { lines, subtotal, exportPacking, estimatedFreight, total, weightTons: frame.weight };
}
