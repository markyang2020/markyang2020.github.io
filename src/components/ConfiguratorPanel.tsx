import { Box, ChevronDown, DoorOpen, Globe2, Minus, Moon, Plus, Sun, SwatchBook } from "lucide-react";
import { useState } from "react";
import { addons, baseFrames, wallMaterials, type AddonKey, type Language, type SizeKey, type WallMaterial } from "../domain/catalog";
import { languages, text, ui } from "../domain/i18n";
import { useConfigStore } from "../stores/configStore";

export function ConfiguratorPanel() {
  const config = useConfigStore((state) => state.config);
  const setSize = useConfigStore((state) => state.setSize);
  const setWallMaterial = useConfigStore((state) => state.setWallMaterial);
  const setAddonQty = useConfigStore((state) => state.setAddonQty);
  const toggleDayMode = useConfigStore((state) => state.toggleDayMode);
  const toggleWalkMode = useConfigStore((state) => state.toggleWalkMode);
  const setLanguage = useConfigStore((state) => state.setLanguage);
  const [languageOpen, setLanguageOpen] = useState(false);
  const lang = config.language;
  const t = ui.configurator;

  const groupedAddons = (Object.keys(addons) as AddonKey[]).reduce<Record<string, AddonKey[]>>((groups, key) => {
    const category = text(addons[key].category, lang);
    groups[category] = [...(groups[category] ?? []), key];
    return groups;
  }, {});

  return (
    <aside className="panel panel-left" dir={languages[lang].dir}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{text(t.eyebrow, lang)}</p>
          <h1>{text(t.title, lang)}</h1>
        </div>
        <div
          className="language-picker"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setLanguageOpen(false);
            }
          }}
        >
          <button
            aria-expanded={languageOpen}
            aria-haspopup="listbox"
            className="language-trigger"
            onClick={() => setLanguageOpen((open) => !open)}
            type="button"
          >
            <span className="language-icon">
              <Globe2 size={15} />
            </span>
            <span className="language-copy">
              <small>Market</small>
              <strong>{lang.toUpperCase()} / {languages[lang].native}</strong>
            </span>
            <ChevronDown className={languageOpen ? "open" : ""} size={14} />
          </button>
          {languageOpen && (
            <div className="language-menu" role="listbox">
              {(Object.keys(languages) as Language[]).map((key) => (
                <button
                  aria-selected={lang === key}
                  className={lang === key ? "active" : ""}
                  key={key}
                  onClick={() => {
                    setLanguage(key);
                    setLanguageOpen(false);
                  }}
                  role="option"
                  type="button"
                >
                  <span>{key.toUpperCase()}</span>
                  <strong>{languages[key].native}</strong>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="control-section">
        <div className="section-title">
          <Box size={16} />
          <span>{text(t.baseFrame, lang)}</span>
        </div>
        <div className="segmented">
          {(Object.keys(baseFrames) as SizeKey[]).map((key) => (
            <button className={config.size === key ? "active" : ""} key={key} onClick={() => setSize(key)} type="button">
              {text(baseFrames[key].label, lang)}
            </button>
          ))}
        </div>
      </section>

      <section className="control-section">
        <div className="section-title">
          <SwatchBook size={16} />
          <span>{text(t.material, lang)}</span>
        </div>
        <div className="material-grid">
          {(Object.keys(wallMaterials) as WallMaterial[]).map((key) => (
            <button
              className={`material-chip ${config.wallMaterial === key ? "active" : ""}`}
              key={key}
              onClick={() => setWallMaterial(key)}
              type="button"
            >
              <span className="swatch" style={{ background: wallMaterials[key].color }} />
              <span>{text(wallMaterials[key].label, lang)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="control-section addons">
        <div className="section-title">
          <DoorOpen size={16} />
          <span>{text(t.modules, lang)}</span>
        </div>
        {Object.entries(groupedAddons).map(([category, keys]) => (
          <div className="addon-group" key={category}>
            <p>{category}</p>
            {keys.map((key) => {
              const item = addons[key];
              const qty = config.addons[key];
              return (
                <div className="stepper-row" key={key}>
                  <div>
                    <strong>{text(item.label, lang)}</strong>
                    <small>{item.sku} / {text(t.max, lang)} {item.max}</small>
                  </div>
                  <div className="stepper">
                    <button aria-label={`Remove ${item.label.en}`} onClick={() => setAddonQty(key, qty - 1)} type="button">
                      <Minus size={14} />
                    </button>
                    <span>{qty}</span>
                    <button aria-label={`Add ${item.label.en}`} onClick={() => setAddonQty(key, qty + 1)} type="button">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <section className="view-actions">
        <button onClick={toggleDayMode} type="button">
          {config.dayMode === "day" ? <Moon size={17} /> : <Sun size={17} />}
          {config.dayMode === "day" ? text(t.night, lang) : text(t.day, lang)}
        </button>
        <button className={config.walkMode ? "active" : ""} onClick={toggleWalkMode} type="button">
          <DoorOpen size={17} />
          {text(t.walk, lang)}
        </button>
      </section>
    </aside>
  );
}
