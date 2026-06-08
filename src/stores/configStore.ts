import { create } from "zustand";
import { addons, type AddonKey, type DayMode, type Language, type SizeKey, type WallMaterial } from "../domain/catalog";

export type HouseConfig = {
  size: SizeKey;
  wallMaterial: WallMaterial;
  addons: Record<AddonKey, number>;
  dayMode: DayMode;
  walkMode: boolean;
  language: Language;
};

type ConfigStore = {
  config: HouseConfig;
  setSize: (size: SizeKey) => void;
  setWallMaterial: (material: WallMaterial) => void;
  setAddonQty: (key: AddonKey, qty: number) => void;
  setLanguage: (language: Language) => void;
  toggleDayMode: () => void;
  toggleWalkMode: () => void;
};

const initialAddons: Record<AddonKey, number> = {
  doorMain: 1,
  windowStandard: 5,
  balcony: 1,
  bathroomSuite: 1,
  toilet: 1,
  shower: 1,
  vanity: 1,
  kitchen: 1,
  stove: 1,
  sink: 1,
  fridge: 1,
  bedroom: 1,
  queenBed: 1,
  wardrobe: 1,
  sofa: 1,
  desk: 1,
  airConditioner: 1,
  smartHome: 1,
  solarRoof: 1,
  waterHeater: 1,
  floorHeating: 1,
};

export const useConfigStore = create<ConfigStore>((set) => ({
  config: {
    size: "9x3",
    wallMaterial: "rockwool",
    addons: initialAddons,
    dayMode: "day",
    walkMode: false,
    language: "en",
  },
  setSize: (size) => set((state) => ({ config: { ...state.config, size } })),
  setWallMaterial: (wallMaterial) =>
    set((state) => ({ config: { ...state.config, wallMaterial } })),
  setAddonQty: (key, qty) =>
    set((state) => {
      const limit = addons[key].max;
      return {
        config: {
          ...state.config,
          addons: { ...state.config.addons, [key]: Math.min(limit, Math.max(0, qty)) },
        },
      };
    }),
  toggleDayMode: () =>
    set((state) => ({
      config: { ...state.config, dayMode: state.config.dayMode === "day" ? "night" : "day" },
    })),
  toggleWalkMode: () =>
    set((state) => ({ config: { ...state.config, walkMode: !state.config.walkMode } })),
  setLanguage: (language) => set((state) => ({ config: { ...state.config, language } })),
}));
