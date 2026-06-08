import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ConfiguratorPanel } from "./components/ConfiguratorPanel";
import { QuotePanel } from "./components/QuotePanel";
import { text, ui } from "./domain/i18n";
import { useConfigStore } from "./stores/configStore";
import { HouseScene } from "./three/HouseScene";

export function App() {
  const language = useConfigStore((state) => state.config.language);

  return (
    <>
      <main className="app-shell">
        <ConfiguratorPanel />
        <section className="scene-shell">
          <div className="scene-status">
            <span>{text(ui.scene.preview, language)}</span>
            <strong>{text(ui.scene.hint, language)}</strong>
          </div>
          <Canvas camera={{ position: [8, 5.2, 8], fov: 43 }} dpr={[1, 1.75]} shadows>
            <Suspense fallback={null}>
              <HouseScene />
            </Suspense>
          </Canvas>
        </section>
        <QuotePanel />
      </main>
      <Loader />
    </>
  );
}
