import { ContactShadows, OrbitControls, PerspectiveCamera, RoundedBox, Text } from "@react-three/drei";
import { useMemo } from "react";
import { CanvasTexture, DoubleSide, RepeatWrapping, SRGBColorSpace } from "three";
import { baseFrames, wallMaterials } from "../domain/catalog";
import { useConfigStore, type HouseConfig } from "../stores/configStore";

function makePanelTexture(base: string, line: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = line;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 2;
  for (let y = 64; y < canvas.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.08;
  for (let x = 0; x < canvas.width; x += 17) {
    ctx.fillStyle = x % 34 === 0 ? "#ffffff" : "#000000";
    ctx.fillRect(x, 0, 1, canvas.height);
  }
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 1400; i += 1) {
    const shade = Math.random() > 0.55 ? "#ffffff" : "#000000";
    ctx.fillStyle = shade;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3.2, 1.4);
  return texture;
}

function makeWoodTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#b89668";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y += 42) {
    ctx.fillStyle = y % 84 === 0 ? "#c7a87b" : "#a87e53";
    ctx.fillRect(0, y, canvas.width, 40);
    ctx.strokeStyle = "rgba(79, 54, 34, 0.35)";
    ctx.beginPath();
    ctx.moveTo(0, y + 40);
    ctx.lineTo(canvas.width, y + 40);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.16;
  for (let x = 8; x < canvas.width; x += 34) {
    ctx.strokeStyle = "#3f2d1e";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 18, 120, x - 16, 260, x + 9, canvas.height);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

function makeGroundTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#6b6f5f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 9000; i += 1) {
    const tone = Math.floor(72 + Math.random() * 66);
    ctx.fillStyle = `rgb(${tone}, ${tone + 8}, ${Math.max(44, tone - 18)})`;
    ctx.globalAlpha = 0.12 + Math.random() * 0.24;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

export function HouseScene() {
  const config = useConfigStore((state) => state.config);
  const frame = baseFrames[config.size];
  const showDimensions = config.walkMode;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={config.walkMode ? [0, 1.65, frame.depth * 0.25] : [frame.width * 0.88, 4.8, 7.8]}
        fov={config.walkMode ? 65 : 34}
      />
      <OrbitControls
        makeDefault
        enableDamping
        enablePan={!config.walkMode}
        maxDistance={config.walkMode ? 2.2 : 16}
        minDistance={config.walkMode ? 0.5 : 4}
        target={config.walkMode ? [0.2, 1.55, -0.2] : [0, 1.35, 0]}
      />
      <LightingRig mode={config.dayMode} />
      <ShowroomStage />
      <ContactShadows blur={4.2} far={13} opacity={0.34} position={[0, -0.005, 0]} scale={18} />
      <group>
        <HouseShell config={config} />
        <Openings config={config} />
        <InteriorModules config={config} />
        <RoofSystems config={config} />
        {showDimensions && <DimensionLabels width={frame.width} depth={frame.depth} height={frame.height} />}
      </group>
    </>
  );
}

function LightingRig({ mode }: { mode: HouseConfig["dayMode"] }) {
  const isDay = mode === "day";

  return (
    <>
      <color attach="background" args={[isDay ? "#c8d4da" : "#12181d"]} />
      <hemisphereLight color={isDay ? "#f4f0e4" : "#b8c3cf"} groundColor={isDay ? "#677060" : "#1d2325"} intensity={isDay ? 0.72 : 0.28} />
      <ambientLight intensity={isDay ? 0.24 : 0.12} />
      <directionalLight
        castShadow
        intensity={isDay ? 2.15 : 0.42}
        position={isDay ? [6.2, 8.8, 5.4] : [-4, 5, -3]}
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight angle={0.55} color="#fff3d7" intensity={isDay ? 0.36 : 0.95} penumbra={0.85} position={[0, 5.8, 4.2]} />
      {!isDay && (
        <>
          <pointLight color="#f5d7a4" intensity={0.62} position={[0, 2.65, 0]} />
        </>
      )}
    </>
  );
}

function ShowroomStage() {
  const groundTexture = useMemo(() => makeGroundTexture(), []);

  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.075, 0]}>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#6f7363" map={groundTexture} roughness={0.94} />
      </mesh>
      <mesh receiveShadow position={[0, -0.045, 0]}>
        <boxGeometry args={[13.2, 0.09, 5.55]} />
        <meshStandardMaterial color="#b5b1a7" roughness={0.82} />
      </mesh>
      <mesh receiveShadow position={[0, -0.015, 0]}>
        <boxGeometry args={[12.6, 0.04, 4.92]} />
        <meshStandardMaterial color="#c4c0b6" roughness={0.76} />
      </mesh>
    </group>
  );
}

function HouseShell({ config }: { config: HouseConfig }) {
  const frame = baseFrames[config.size];
  const wall = wallMaterials[config.wallMaterial];
  const wallTexture = useMemo(() => makePanelTexture(wall.color, wall.trim), [wall.color, wall.trim]);
  const floorTexture = useMemo(() => makeWoodTexture(), []);
  const wallMaterial = useMemo(
    () => ({ color: wall.color, map: wallTexture, roughness: wall.roughness, metalness: wall.metalness }),
    [wall, wallTexture],
  );

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1.52, -frame.depth / 2]}>
        <boxGeometry args={[frame.width, frame.height, 0.12]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh castShadow receiveShadow position={[-frame.width / 2, 1.52, 0]}>
        <boxGeometry args={[0.12, frame.height, frame.depth]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh castShadow receiveShadow position={[frame.width / 2, 1.52, 0]}>
        <boxGeometry args={[0.12, frame.height, frame.depth]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 3.08, 0]}>
        <boxGeometry args={[frame.width + 0.2, 0.18, frame.depth + 0.22]} />
        <meshStandardMaterial color={wall.trim} roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh receiveShadow position={[0, 0.03, 0]}>
        <boxGeometry args={[frame.width + 0.24, 0.16, frame.depth + 0.26]} />
        <meshStandardMaterial color="#4a4f50" roughness={0.88} />
      </mesh>
      <mesh receiveShadow position={[0, 0.105, 0]}>
        <boxGeometry args={[frame.width - 0.28, 0.035, frame.depth - 0.28]} />
        <meshStandardMaterial color="#c2a983" map={floorTexture} roughness={0.66} />
      </mesh>
      <mesh renderOrder={1} position={[0, 1.52, frame.depth / 2 + 0.01]}>
        <boxGeometry args={[frame.width, frame.height, 0.05]} />
        <meshBasicMaterial color="#dfe7e5" depthWrite={false} opacity={0.12} side={DoubleSide} transparent />
      </mesh>
      {Array.from({ length: Math.floor(frame.width / 1.2) }).map((_, index) => {
        const x = -frame.width / 2 + 0.75 + index * 1.2;
        return (
          <mesh key={`front-rib-${index}`} position={[x, 1.56, frame.depth / 2 + 0.07]}>
            <boxGeometry args={[0.035, frame.height - 0.36, 0.035]} />
            <meshStandardMaterial color={wall.trim} metalness={0.16} roughness={0.58} />
          </mesh>
        );
      })}
      {[-frame.width / 2 + 1.1, 0, frame.width / 2 - 1.1].map((x) => (
        <mesh castShadow key={`support-${x}`} position={[x, -0.24, 0]}>
          <boxGeometry args={[0.18, 0.42, 0.18]} />
          <meshStandardMaterial color="#565b5d" roughness={0.68} metalness={0.16} />
        </mesh>
      ))}
      <CornerTrim width={frame.width} depth={frame.depth} height={frame.height} color={wall.trim} />
    </group>
  );
}

function CornerTrim({ width, depth, height, color }: { width: number; depth: number; height: number; color: string }) {
  const positions = [
    [-width / 2, height / 2, -depth / 2],
    [width / 2, height / 2, -depth / 2],
    [-width / 2, height / 2, depth / 2],
    [width / 2, height / 2, depth / 2],
  ];

  return (
    <>
      {positions.map((position, index) => (
        <mesh castShadow key={index} position={position as [number, number, number]}>
          <boxGeometry args={[0.16, height + 0.14, 0.16]} />
          <meshStandardMaterial color={color} roughness={0.38} metalness={0.42} />
        </mesh>
      ))}
    </>
  );
}

function Openings({ config }: { config: HouseConfig }) {
  const frame = baseFrames[config.size];
  const standardWindows = Array.from({ length: config.addons.windowStandard });
  const doorCount = config.addons.doorMain;
  const livingDoorX = Math.min(frame.width / 2 - 2.2, Math.max(-0.25, -frame.width / 2 + 4.15));

  return (
    <group>
      {Array.from({ length: doorCount }).map((_, index) => (
        <group key={`door-${index}`} position={[livingDoorX + index * 0.92, 1.12, frame.depth / 2 + 0.08]}>
          <RoundedBox args={[0.9, 2.2, 0.16]} castShadow radius={0.035} smoothness={5}>
            <meshStandardMaterial color="#1f2a31" roughness={0.34} metalness={0.18} />
          </RoundedBox>
          <RoundedBox args={[0.66, 1.9, 0.12]} position={[0, 0, 0.035]} radius={0.025} smoothness={4}>
            <meshStandardMaterial color="#26313a" roughness={0.45} metalness={0.12} />
          </RoundedBox>
          <mesh renderOrder={2} position={[0.18, 0.32, 0.105]}>
            <boxGeometry args={[0.22, 0.95, 0.025]} />
            <meshBasicMaterial color="#d8e3e6" depthWrite={false} opacity={0.32} transparent />
          </mesh>
          <mesh position={[0.29, 0.06, 0.075]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#d7b46a" metalness={0.75} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {standardWindows.map((_, index) => {
        const bedroomWindowX = -frame.width / 2 + 1.35 + index * 0.95;
        const livingWindowX = livingDoorX + 1.35 + (index - 2) * 0.9;
        const x = index < 2 ? bedroomWindowX : Math.min(frame.width / 2 - 1.4, livingWindowX);
        return (
          <WindowModule
            key={`standard-${index}`}
            position={[x, 1.8, frame.depth / 2 + 0.09]}
            size={[0.95, 0.82, 0.1]}
          />
        );
      })}

      {config.addons.balcony > 0 && (
        <group position={[0, 0.14, frame.depth / 2 + 0.78]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[Math.min(3.25, frame.width - 0.8), 0.16, 1.36]} />
            <meshStandardMaterial color="#6b5c4c" roughness={0.56} metalness={0.08} />
          </mesh>
          <mesh position={[0, 0.08, -0.72]}>
            <boxGeometry args={[Math.min(3.1, frame.width - 1), 0.08, 0.2]} />
            <meshStandardMaterial color="#7a858b" roughness={0.48} metalness={0.2} />
          </mesh>
          <mesh renderOrder={2} position={[0, 0.76, 0.62]}>
            <boxGeometry args={[Math.min(3.25, frame.width - 0.8), 1.12, 0.08]} />
            <meshBasicMaterial color="#d9e6e7" depthWrite={false} opacity={0.3} transparent />
          </mesh>
          {[0.22, 0.58, 0.94].map((y) => (
            <mesh key={`rail-${y}`} position={[0, y, 0.62]}>
              <boxGeometry args={[Math.min(3.25, frame.width - 0.8), 0.045, 0.055]} />
          <meshStandardMaterial color="#687077" metalness={0.22} roughness={0.5} />
            </mesh>
          ))}
          {[-1.45, 1.45].map((x) => (
            <mesh key={`side-${x}`} position={[x, 0.76, 0]}>
              <boxGeometry args={[0.08, 1.12, 1.28]} />
              <meshStandardMaterial color="#687077" metalness={0.2} roughness={0.54} />
            </mesh>
          ))}
          {[-1.45, 1.45].flatMap((x) => [-0.42, 0.58].map((z) => (
            <mesh key={`post-${x}-${z}`} position={[x, 0.38, z]}>
              <boxGeometry args={[0.09, 0.72, 0.09]} />
              <meshStandardMaterial color="#687077" metalness={0.2} roughness={0.54} />
            </mesh>
          )))}
        </group>
      )}
    </group>
  );
}

function WindowModule({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <group position={position}>
      <RoundedBox args={[size[0] + 0.16, size[1] + 0.16, size[2] + 0.04]} castShadow radius={0.035} smoothness={5}>
        <meshStandardMaterial color="#26313a" roughness={0.38} metalness={0.3} />
      </RoundedBox>
      <mesh renderOrder={2} position={[0, 0, 0.02]}>
        <boxGeometry args={size} />
        <meshBasicMaterial color="#d9e7e8" depthWrite={false} opacity={0.34} side={DoubleSide} transparent />
      </mesh>
      <mesh position={[-size[0] * 0.22, size[1] * 0.18, 0.08]}>
        <boxGeometry args={[size[0] * 0.36, 0.035, 0.025]} />
        <meshStandardMaterial color="#ffffff" opacity={0.16} transparent />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.035, size[1], 0.035]} />
        <meshStandardMaterial color="#34404a" />
      </mesh>
    </group>
  );
}

function InteriorModules({ config }: { config: HouseConfig }) {
  const frame = baseFrames[config.size];
  const hasBathroomShell = config.addons.bathroomSuite > 0;
  const hasKitchenBase = config.addons.kitchen > 0;
  const hasBedroomZone = config.addons.bedroom > 0 || config.addons.queenBed > 0 || config.addons.wardrobe > 0;
  const bathroomCenterX = frame.width / 2 - 1.05;
  const bedroomCenterX = -frame.width / 2 + 1.85;
  const kitchenCenterX = Math.max(-0.3, -frame.width / 2 + 4.25);

  return (
    <group>
      {hasBathroomShell && (
        <group position={[bathroomCenterX, 1.08, 0]}>
        <RoundedBox args={[1.7, 2.15, frame.depth - 0.34]} castShadow receiveShadow radius={0.04} smoothness={5}>
          <meshStandardMaterial color="#e9e5dd" opacity={0.88} transparent roughness={0.74} />
          </RoundedBox>
          <mesh position={[-0.02, -1.01, 0]}>
            <boxGeometry args={[1.55, 0.035, frame.depth - 0.5]} />
            <meshStandardMaterial color="#d8d6d0" roughness={0.48} />
          </mesh>
          <mesh position={[-0.88, 0.04, frame.depth / 2 - 0.66]}>
            <boxGeometry args={[0.08, 1.68, 0.62]} />
            <meshStandardMaterial color="#9bc8df" opacity={0.58} transparent />
          </mesh>
          <mesh position={[-0.9, -1.0, 0]}>
            <boxGeometry args={[0.08, 0.12, frame.depth - 0.34]} />
            <meshStandardMaterial color="#d7d1c7" roughness={0.62} />
          </mesh>
          {config.addons.toilet > 0 && (
            <group position={[0.32, -0.54, frame.depth / 2 - 0.62]} rotation={[0, Math.PI, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.18, 0.2, 0.28, 24]} />
                <meshStandardMaterial color="#f8faf9" roughness={0.42} />
              </mesh>
              <mesh position={[0, 0.22, -0.08]}>
                <boxGeometry args={[0.36, 0.32, 0.12]} />
                <meshStandardMaterial color="#f8faf9" roughness={0.42} />
              </mesh>
            </group>
          )}
          {config.addons.shower > 0 && (
            <group position={[0.25, 0.08, -frame.depth / 2 + 0.55]}>
              <mesh>
                <boxGeometry args={[0.68, 1.58, 0.72]} />
                <meshStandardMaterial color="#d7e4e6" depthWrite={false} metalness={0} opacity={0.28} roughness={0.62} transparent />
              </mesh>
              <mesh position={[0, 0.72, -0.32]}>
                <sphereGeometry args={[0.055, 16, 16]} />
                <meshStandardMaterial color="#8f9aa1" metalness={0.7} roughness={0.2} />
              </mesh>
            </group>
          )}
          {config.addons.vanity > 0 && (
            <group position={[-0.36, -0.42, -0.18]}>
              <mesh castShadow>
                <boxGeometry args={[0.62, 0.48, 0.28]} />
                <meshStandardMaterial color="#d8d2c5" roughness={0.48} />
              </mesh>
              <mesh position={[0, 0.29, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.22]} />
                <meshStandardMaterial color="#eff6f7" roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {hasKitchenBase && (
        <group position={[kitchenCenterX, 0.72, -frame.depth / 2 + 0.24]}>
          <RoundedBox args={[Math.min(2.15, frame.width * 0.25), 0.85, 0.48]} castShadow radius={0.035} smoothness={5}>
            <meshStandardMaterial color="#7c6f61" roughness={0.54} />
          </RoundedBox>
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[Math.min(2.15, frame.width * 0.25), 0.08, 0.54]} />
            <meshStandardMaterial color="#ded8cb" roughness={0.35} />
          </mesh>
          {config.addons.sink > 0 && (
            <mesh position={[-0.55, 0.57, 0]}>
              <boxGeometry args={[0.5, 0.035, 0.34]} />
              <meshStandardMaterial color="#9fb7bf" metalness={0.45} roughness={0.25} />
            </mesh>
          )}
          {config.addons.stove > 0 && (
            <group position={[0.48, 0.58, 0]}>
              <mesh>
                <boxGeometry args={[0.56, 0.035, 0.34]} />
                <meshStandardMaterial color="#1f2933" roughness={0.2} />
              </mesh>
              {[-0.16, 0.16].map((x) => (
                <mesh key={x} position={[x, 0.025, 0]}>
                  <torusGeometry args={[0.09, 0.008, 10, 28]} />
                  <meshStandardMaterial color="#596773" />
                </mesh>
              ))}
            </group>
          )}
          {config.addons.fridge > 0 && (
            <RoundedBox args={[0.58, 1.62, 0.52]} castShadow position={[1.28, 0.1, 0.02]} radius={0.035} smoothness={5}>
              <meshStandardMaterial color="#eef2f3" roughness={0.36} metalness={0.12} />
            </RoundedBox>
          )}
        </group>
      )}

      {hasBedroomZone && (
        <group position={[bedroomCenterX, 0, 0]}>
          {config.addons.bedroom > 0 && (
            <RoundedBox args={[0.08, 2.1, frame.depth - 0.45]} position={[1.15, 1.1, 0]} radius={0.03} smoothness={5}>
              <meshStandardMaterial color="#d4cbc0" opacity={0.8} transparent roughness={0.58} />
            </RoundedBox>
          )}
          {config.addons.queenBed > 0 && (
            <group position={[0, 0.38, 0.15]}>
              <RoundedBox args={[1.9, 0.32, 1.32]} castShadow radius={0.06} smoothness={8}>
                <meshStandardMaterial color="#6f513f" roughness={0.62} />
              </RoundedBox>
              <RoundedBox args={[1.76, 0.2, 1.15]} position={[0, 0.24, 0.04]} radius={0.08} smoothness={8}>
                <meshStandardMaterial color="#e8edf0" roughness={0.72} />
              </RoundedBox>
              <RoundedBox args={[1.76, 0.08, 0.54]} position={[0, 0.37, 0.32]} radius={0.06} smoothness={8}>
                <meshStandardMaterial color="#b7c2c8" roughness={0.68} />
              </RoundedBox>
              {[-0.45, 0.45].map((x) => (
                <RoundedBox args={[0.48, 0.14, 0.32]} key={x} position={[x, 0.46, -0.42]} radius={0.06} smoothness={8}>
                  <meshStandardMaterial color="#f3f5f4" roughness={0.62} />
                </RoundedBox>
              ))}
              <mesh position={[0, 0.58, -0.68]}>
                <boxGeometry args={[1.9, 0.72, 0.08]} />
                <meshStandardMaterial color="#775f4f" roughness={0.55} />
              </mesh>
            </group>
          )}
          {Array.from({ length: config.addons.wardrobe }).map((_, index) => (
            <RoundedBox args={[0.45, 1.8, 0.42]} castShadow key={index} position={[-0.72 - index * 0.5, 0.92, -frame.depth / 2 + 0.32]} radius={0.035} smoothness={5}>
              <meshStandardMaterial color="#6d5b49" roughness={0.52} />
            </RoundedBox>
          ))}
        </group>
      )}

      <mesh position={[0, 2.85, -frame.depth / 2 + 0.12]}>
        <boxGeometry args={[frame.width - 0.7, 0.045, 0.045]} />
        <meshStandardMaterial color="#f2ead5" emissive="#f0d28f" emissiveIntensity={config.dayMode === "night" ? 0.62 : 0.08} roughness={0.48} />
      </mesh>

      {config.addons.sofa > 0 && (
        <group position={[Math.min(0.4, frame.width / 2 - 3), 0.46, frame.depth / 2 - 0.52]}>
          <RoundedBox args={[1.55, 0.42, 0.66]} castShadow radius={0.08} smoothness={8}>
            <meshStandardMaterial color="#4d6671" roughness={0.72} />
          </RoundedBox>
          <RoundedBox args={[1.55, 0.52, 0.18]} position={[0, 0.32, -0.22]} radius={0.07} smoothness={8}>
            <meshStandardMaterial color="#425963" roughness={0.72} />
          </RoundedBox>
        </group>
      )}

      {config.addons.desk > 0 && (
        <group position={[Math.min(0.4, frame.width / 2 - 2.3), 0.56, 0.52]}>
          <RoundedBox args={[1.05, 0.08, 0.54]} castShadow radius={0.025} smoothness={5}>
            <meshStandardMaterial color="#856b4f" roughness={0.45} />
          </RoundedBox>
          {[-0.42, 0.42].map((x) => (
            <mesh key={x} position={[x, -0.28, 0.18]}>
              <boxGeometry args={[0.06, 0.58, 0.06]} />
              <meshStandardMaterial color="#5a4635" />
            </mesh>
          ))}
        </group>
      )}

      {config.addons.smartHome > 0 && (
        <group position={[-frame.width / 2 + 0.12, 1.62, 0.72]}>
          <mesh>
            <boxGeometry args={[0.08, 0.56, 0.38]} />
            <meshStandardMaterial color="#1e272b" emissive="#6f8f88" emissiveIntensity={0.16} roughness={0.42} />
          </mesh>
          <pointLight color="#d9c79b" intensity={0.08} position={[0.2, 0.1, 0]} />
        </group>
      )}

      {Array.from({ length: config.addons.airConditioner }).map((_, index) => (
        <RoundedBox args={[0.82, 0.28, 0.18]} key={`ac-${index}`} position={[-frame.width / 2 + 1.2 + index * 1.2, 2.38, -frame.depth / 2 + 0.1]} radius={0.035} smoothness={5}>
          <meshStandardMaterial color="#f4f7f8" roughness={0.36} />
        </RoundedBox>
      ))}

      {config.addons.waterHeater > 0 && (
        <mesh position={[bathroomCenterX + 0.66, 2.0, -frame.depth / 2 + 0.52]}>
          <cylinderGeometry args={[0.18, 0.18, 0.72, 28]} />
          <meshStandardMaterial color="#d7dde2" roughness={0.32} metalness={0.12} />
        </mesh>
      )}

      {config.addons.floorHeating > 0 && (
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[frame.width - 0.55, 0.018, frame.depth - 0.55]} />
          <meshStandardMaterial color="#b98268" emissive="#b98268" emissiveIntensity={0.03} opacity={0.2} transparent roughness={0.82} />
        </mesh>
      )}
    </group>
  );
}

function RoofSystems({ config }: { config: HouseConfig }) {
  const frame = baseFrames[config.size];
  if (config.addons.solarRoof <= 0) return null;

  return (
    <group position={[0, 3.22, 0]}>
      {[-1, 0, 1].map((slot) => (
        <RoundedBox args={[1.1, 0.055, frame.depth - 0.55]} castShadow key={slot} position={[slot * 1.25, 0, 0]} radius={0.035} rotation={[0.08, 0, 0]} smoothness={5}>
          <meshStandardMaterial color="#202832" metalness={0.18} roughness={0.42} />
        </RoundedBox>
      ))}
      {[-1, 0, 1].map((slot) => (
        <mesh key={`solar-line-${slot}`} position={[slot * 1.25, 0.04, 0]}>
          <boxGeometry args={[0.025, 0.01, frame.depth - 0.7]} />
          <meshStandardMaterial color="#718291" metalness={0.1} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function DimensionLabels({ width, depth, height }: { width: number; depth: number; height: number }) {
  return (
    <group>
      <Text color="#314047" fontSize={0.18} position={[0, 0.04, depth / 2 + 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        {width.toFixed(1)}m
      </Text>
      <Text color="#314047" fontSize={0.18} position={[-width / 2 - 0.72, 0.04, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        {depth.toFixed(1)}m
      </Text>
      <Text color="#314047" fontSize={0.18} position={[-width / 2 - 0.34, height / 2, -depth / 2 - 0.28]} rotation={[0, -Math.PI / 2, 0]}>
        {height.toFixed(1)}m
      </Text>
      <mesh position={[-width / 2 - 0.18, height / 2, -depth / 2 - 0.2]}>
        <boxGeometry args={[0.035, height, 0.035]} />
        <meshStandardMaterial color="#314047" />
      </mesh>
      <mesh position={[-width / 2 - 0.18, 0.05, 0]}>
        <boxGeometry args={[0.035, 0.035, depth]} />
        <meshStandardMaterial color="#314047" />
      </mesh>
    </group>
  );
}
