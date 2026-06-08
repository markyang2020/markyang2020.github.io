export type Language =
  | "en"
  | "zh"
  | "es"
  | "fr"
  | "de"
  | "ar"
  | "ru"
  | "pt"
  | "ja"
  | "ko";

export const languages: Record<Language, { native: string; label: string; dir: "ltr" | "rtl" }> = {
  en: { native: "English", label: "English", dir: "ltr" },
  zh: { native: "\u4e2d\u6587", label: "Chinese", dir: "ltr" },
  es: { native: "Espa\u00f1ol", label: "Spanish", dir: "ltr" },
  fr: { native: "Fran\u00e7ais", label: "French", dir: "ltr" },
  de: { native: "Deutsch", label: "German", dir: "ltr" },
  ar: { native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", label: "Arabic", dir: "rtl" },
  ru: { native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", label: "Russian", dir: "ltr" },
  pt: { native: "Portugu\u00eas", label: "Portuguese", dir: "ltr" },
  ja: { native: "\u65e5\u672c\u8a9e", label: "Japanese", dir: "ltr" },
  ko: { native: "\ud55c\uad6d\uc5b4", label: "Korean", dir: "ltr" },
};

export type LocalizedText = Partial<Record<Language, string>> & { en: string };

export function text(value: LocalizedText, language: Language) {
  return value[language] ?? value.en;
}

const zh = {
  exportConfigurator: "\u51fa\u53e3\u623f\u5c4b\u914d\u7f6e\u5668",
  premiumCapsule: "\u9ad8\u7aef\u592a\u7a7a\u8231\u623f\u5c4b",
  baseFrame: "\u57fa\u7840\u6846\u67b6",
  exteriorFinish: "\u5916\u5899\u9970\u9762",
  modules: "\u6a21\u5757\u4e0e\u9009\u914d",
  max: "\u6700\u591a",
  night: "\u591c\u666f\u6a21\u5f0f",
  day: "\u65e5\u666f\u6a21\u5f0f",
  interior: "\u5ba4\u5185\u67e5\u770b",
  liveEstimate: "\u5b9e\u65f6\u4f30\u4ef7",
  bomQuote: "BOM \u4e0e\u62a5\u4ef7",
  total: "\u9884\u4f30\u603b\u4ef7",
  exw: "EXW \u9884\u4f30",
  tons: "\u5428",
  subtotal: "\u5c0f\u8ba1",
  packing: "\u51fa\u53e3\u5305\u88c5",
  freight: "\u9884\u4f30\u8fd0\u8d39",
  inquiry: "\u751f\u6210\u8be2\u76d8",
  preview: "\u6d77\u5916\u9ad8\u7aef\u6837\u677f\u8231",
  hint: "\u62d6\u62fd\u67e5\u770b\u5916\u89c2\u4e0e\u5ba4\u5185 · \u9009\u914d\u5b9e\u65f6\u8054\u52a8 3D \u4e0e\u62a5\u4ef7",
};

export const ui = {
  configurator: {
    eyebrow: {
      en: "Export Configurator",
      zh: zh.exportConfigurator,
      es: "Configurador de Exportacion",
      fr: "Configurateur Export",
      de: "Export-Konfigurator",
      ar: "\u0645\u0647\u064a\u0626 \u0627\u0644\u062a\u0635\u062f\u064a\u0631",
      ru: "\u042d\u043a\u0441\u043f\u043e\u0440\u0442\u043d\u044b\u0439 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0442\u043e\u0440",
      pt: "Configurador de Exportacao",
      ja: "\u8f38\u51fa\u7528\u30b3\u30f3\u30d5\u30a3\u30ae\u30e5\u30ec\u30fc\u30bf\u30fc",
      ko: "\uc218\ucd9c\ud615 \uad6c\uc131\uae30",
    },
    title: {
      en: "Premium Space Capsule",
      zh: zh.premiumCapsule,
      es: "Capsula Premium",
      fr: "Capsule Premium",
      de: "Premium Raumkapsel",
      ar: "\u0643\u0628\u0633\u0648\u0644\u0629 \u0641\u0627\u062e\u0631\u0629",
      ru: "\u041f\u0440\u0435\u043c\u0438\u0430\u043b\u044c\u043d\u0430\u044f \u043a\u0430\u043f\u0441\u0443\u043b\u0430",
      pt: "Capsula Premium",
      ja: "\u30d7\u30ec\u30df\u30a2\u30e0\u30ab\u30d7\u30bb\u30eb",
      ko: "\ud504\ub9ac\ubbf8\uc5c4 \ucea1\uc290 \ud558\uc6b0\uc2a4",
    },
    baseFrame: { en: "Base Frame", zh: zh.baseFrame, es: "Estructura", fr: "Structure", de: "Grundrahmen", ar: "\u0627\u0644\u0647\u064a\u0643\u0644", ru: "\u041a\u0430\u0440\u043a\u0430\u0441", pt: "Estrutura", ja: "\u57fa\u672c\u30d5\u30ec\u30fc\u30e0", ko: "\uae30\ubcf8 \ud504\ub808\uc784" },
    material: { en: "Exterior Finish", zh: zh.exteriorFinish, es: "Acabado exterior", fr: "Finition exterieure", de: "Aussenfinish", ar: "\u0627\u0644\u062a\u0634\u0637\u064a\u0628 \u0627\u0644\u062e\u0627\u0631\u062c\u064a", ru: "\u041d\u0430\u0440\u0443\u0436\u043d\u0430\u044f \u043e\u0442\u0434\u0435\u043b\u043a\u0430", pt: "Acabamento exterior", ja: "\u5916\u88c5\u4ed5\u4e0a\u3052", ko: "\uc678\uc7a5 \ub9c8\uac10" },
    modules: { en: "Modules & Options", zh: zh.modules, es: "Modulos y opciones", fr: "Modules et options", de: "Module und Optionen", ar: "\u0627\u0644\u0648\u062d\u062f\u0627\u062a \u0648\u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a", ru: "\u041c\u043e\u0434\u0443\u043b\u0438 \u0438 \u043e\u043f\u0446\u0438\u0438", pt: "Modulos e opcoes", ja: "\u30e2\u30b8\u30e5\u30fc\u30eb\u3068\u30aa\u30d7\u30b7\u30e7\u30f3", ko: "\ubaa8\ub4c8 \ubc0f \uc635\uc158" },
    max: { en: "up to", zh: zh.max, es: "hasta", fr: "jusqu'a", de: "bis zu", ar: "\u062d\u062a\u0649", ru: "\u0434\u043e", pt: "ate", ja: "\u6700\u5927", ko: "\ucd5c\ub300" },
    night: { en: "Night Mode", zh: zh.night, es: "Modo noche", fr: "Mode nuit", de: "Nachtmodus", ar: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0644\u064a\u0644\u064a", ru: "\u041d\u043e\u0447\u043d\u043e\u0439 \u0440\u0435\u0436\u0438\u043c", pt: "Modo noite", ja: "\u591c\u9593\u30e2\u30fc\u30c9", ko: "\uc57c\uac04 \ubaa8\ub4dc" },
    day: { en: "Day Mode", zh: zh.day, es: "Modo dia", fr: "Mode jour", de: "Tagmodus", ar: "\u0648\u0636\u0639 \u0627\u0644\u0646\u0647\u0627\u0631", ru: "\u0414\u043d\u0435\u0432\u043d\u043e\u0439 \u0440\u0435\u0436\u0438\u043c", pt: "Modo dia", ja: "\u663c\u9593\u30e2\u30fc\u30c9", ko: "\uc8fc\uac04 \ubaa8\ub4dc" },
    walk: { en: "Interior View", zh: zh.interior, es: "Vista interior", fr: "Vue interieure", de: "Innenansicht", ar: "\u0639\u0631\u0636 \u062f\u0627\u062e\u0644\u064a", ru: "\u0418\u043d\u0442\u0435\u0440\u044c\u0435\u0440", pt: "Vista interior", ja: "\u5ba4\u5185\u30d3\u30e5\u30fc", ko: "\uc2e4\ub0b4 \ubcf4\uae30" },
  },
  quote: {
    eyebrow: { en: "Live Estimate", zh: zh.liveEstimate, es: "Estimacion en vivo", fr: "Estimation live", de: "Live-Kalkulation", ar: "\u062a\u0642\u062f\u064a\u0631 \u0645\u0628\u0627\u0634\u0631", ru: "\u041e\u043d\u043b\u0430\u0439\u043d \u043e\u0446\u0435\u043d\u043a\u0430", pt: "Estimativa ao vivo", ja: "\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u898b\u7a4d", ko: "\uc2e4\uc2dc\uac04 \uacac\uc801" },
    title: { en: "BOM & Quotation", zh: zh.bomQuote, es: "BOM y cotizacion", fr: "BOM et devis", de: "BOM und Angebot", ar: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u062f \u0648\u0627\u0644\u0633\u0639\u0631", ru: "BOM \u0438 \u0441\u043c\u0435\u0442\u0430", pt: "BOM e cotacao", ja: "BOM \u3068\u898b\u7a4d", ko: "BOM \ubc0f \uacac\uc801" },
    total: { en: "Estimated Total", zh: zh.total, es: "Total estimado", fr: "Total estime", de: "Gesamtsumme", ar: "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u062a\u0642\u062f\u064a\u0631\u064a", ru: "\u0418\u0442\u043e\u0433\u043e", pt: "Total estimado", ja: "\u6982\u7b97\u5408\u8a08", ko: "\uc608\uc0c1 \ud569\uacc4" },
    exw: { en: "EXW estimate", zh: zh.exw, es: "Estimacion EXW", fr: "Estimation EXW", de: "EXW-Schatzung", ar: "\u062a\u0642\u062f\u064a\u0631 EXW", ru: "\u041e\u0446\u0435\u043d\u043a\u0430 EXW", pt: "Estimativa EXW", ja: "EXW \u6982\u7b97", ko: "EXW \uc608\uc0c1" },
    tons: { en: "tons", zh: zh.tons, es: "toneladas", fr: "tonnes", de: "Tonnen", ar: "\u0637\u0646", ru: "\u0442", pt: "toneladas", ja: "\u30c8\u30f3", ko: "\ud1a4" },
    subtotal: { en: "Subtotal", zh: zh.subtotal, es: "Subtotal", fr: "Sous-total", de: "Zwischensumme", ar: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a", ru: "\u041f\u043e\u0434\u044b\u0442\u043e\u0433", pt: "Subtotal", ja: "\u5c0f\u8a08", ko: "\uc18c\uacc4" },
    packing: { en: "Export Packing", zh: zh.packing, es: "Embalaje exportacion", fr: "Emballage export", de: "Exportverpackung", ar: "\u062a\u063a\u0644\u064a\u0641 \u0627\u0644\u062a\u0635\u062f\u064a\u0631", ru: "\u042d\u043a\u0441\u043f\u043e\u0440\u0442\u043d\u0430\u044f \u0443\u043f\u0430\u043a\u043e\u0432\u043a\u0430", pt: "Embalagem exportacao", ja: "\u8f38\u51fa\u68b1\u5305", ko: "\uc218\ucd9c \ud3ec\uc7a5" },
    freight: { en: "Freight Estimate", zh: zh.freight, es: "Flete estimado", fr: "Fret estime", de: "Fracht-Schatzung", ar: "\u062a\u0642\u062f\u064a\u0631 \u0627\u0644\u0634\u062d\u0646", ru: "\u041e\u0446\u0435\u043d\u043a\u0430 \u0444\u0440\u0430\u0445\u0442\u0430", pt: "Frete estimado", ja: "\u904b\u8cc3\u6982\u7b97", ko: "\uc6b4\uc784 \uc608\uc0c1" },
    inquiry: { en: "Generate Inquiry", zh: zh.inquiry, es: "Generar consulta", fr: "Generer demande", de: "Anfrage erstellen", ar: "\u0625\u0646\u0634\u0627\u0621 \u0627\u0633\u062a\u0641\u0633\u0627\u0631", ru: "\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441", pt: "Gerar consulta", ja: "\u554f\u3044\u5408\u308f\u305b\u4f5c\u6210", ko: "\ubb38\uc758 \uc0dd\uc131" },
  },
  scene: {
    preview: { en: "Premium Export Show Unit", zh: zh.preview, es: "Unidad premium de exportacion", fr: "Unite premium export", de: "Premium Export Show Unit", ar: "\u0648\u062d\u062f\u0629 \u0639\u0631\u0636 \u0641\u0627\u062e\u0631\u0629 \u0644\u0644\u062a\u0635\u062f\u064a\u0631", ru: "\u041f\u0440\u0435\u043c\u0438\u0443\u043c \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u043d\u044b\u0439 \u0448\u043e\u0443-\u044e\u043d\u0438\u0442", pt: "Unidade premium de exportacao", ja: "\u8f38\u51fa\u5411\u3051\u30d7\u30ec\u30df\u30a2\u30e0\u5c55\u793a\u68df", ko: "\ud504\ub9ac\ubbf8\uc5c4 \uc218\ucd9c \uc1fc \uc720\ub2db" },
    hint: { en: "Orbit the model · every option updates the 3D scene and quotation live", zh: zh.hint, es: "Gire el modelo · cada opcion actualiza el 3D y la cotizacion", fr: "Faites pivoter le modele · options et devis en direct", de: "Modell drehen · Optionen aktualisieren 3D und Angebot live", ar: "\u0642\u0645 \u0628\u062a\u062f\u0648\u064a\u0631 \u0627\u0644\u0646\u0645\u0648\u0630\u062c · \u0643\u0644 \u062e\u064a\u0627\u0631 \u064a\u062d\u062f\u062b \u0627\u0644\u0645\u0634\u0647\u062f \u0648\u0627\u0644\u0633\u0639\u0631 \u0645\u0628\u0627\u0634\u0631\u0629", ru: "\u0412\u0440\u0430\u0449\u0430\u0439\u0442\u0435 \u043c\u043e\u0434\u0435\u043b\u044c · \u043e\u043f\u0446\u0438\u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u044e\u0442 3D \u0438 \u0441\u043c\u0435\u0442\u0443", pt: "Gire o modelo · opcoes atualizam 3D e cotacao", ja: "\u30e2\u30c7\u30eb\u3092\u56de\u8ee2 · \u30aa\u30d7\u30b7\u30e7\u30f3\u304c3D\u3068\u898b\u7a4d\u3092\u5373\u6642\u66f4\u65b0", ko: "\ubaa8\ub378 \ud68c\uc804 · \uc635\uc158\uc774 3D\uc640 \uacac\uc801\uc744 \uc2e4\uc2dc\uac04 \uc5c5\ub370\uc774\ud2b8" },
  },
} satisfies Record<string, Record<string, LocalizedText>>;
