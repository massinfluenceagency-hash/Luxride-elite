"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── LIMOUSINE INTERIOR ────────────────────────────────────────────────
function LimoInterior() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, -0.8, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.05, 7]} />
        <meshStandardMaterial color="#1a1209" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[3.4, 0.06, 6.8]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
      </mesh>
      <mesh position={[-1.72, 0.2, 0]}>
        <boxGeometry args={[0.05, 2.1, 6.8]} />
        <meshStandardMaterial color="#0d0a05" roughness={0.7} />
      </mesh>
      <mesh position={[1.72, 0.2, 0]}>
        <boxGeometry args={[0.05, 2.1, 6.8]} />
        <meshStandardMaterial color="#0d0a05" roughness={0.7} />
      </mesh>
      {/* Rear bench seat */}
      <mesh position={[0, -0.25, 2.2]} castShadow>
        <boxGeometry args={[3.2, 0.8, 0.7]} />
        <meshStandardMaterial color="#1a1209" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Side seats */}
      {[-1.3, 1.3].map((x, i) => (
        <mesh key={i} position={[x, -0.3, -0.2]}>
          <boxGeometry args={[0.6, 0.7, 2.5]} />
          <meshStandardMaterial color="#1a1209" roughness={0.6} metalness={0.1} />
        </mesh>
      ))}
      {/* Gold trim strips */}
      {[-1.65, 1.65].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]}>
          <boxGeometry args={[0.04, 0.04, 6.4]} />
          <meshStandardMaterial color="#C9A765" metalness={0.9} roughness={0.1} emissive="#C9A765" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* LED strip lights */}
      {([-1.6, 1.6] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 1.2, 0]}>
          <boxGeometry args={[0.03, 0.03, 6.4]} />
          <meshStandardMaterial color="#C9A765" emissive="#C9A765" emissiveIntensity={2.5} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Champagne bar / center console */}
      <mesh position={[0, -0.5, -0.2]}>
        <boxGeometry args={[0.6, 0.5, 1.8]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Windows */}
      {[
        { pos: [-1.71, 0.35, -0.5] as [number,number,number], size: [0.01, 0.8, 2.0] as [number,number,number] },
        { pos: [-1.71, 0.35, 1.8] as [number,number,number], size: [0.01, 0.8, 1.6] as [number,number,number] },
        { pos: [1.71, 0.35, -0.5] as [number,number,number], size: [0.01, 0.8, 2.0] as [number,number,number] },
        { pos: [1.71, 0.35, 1.8] as [number,number,number], size: [0.01, 0.8, 1.6] as [number,number,number] },
      ].map(({ pos, size }, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="#1a3a5c" transparent opacity={0.35} roughness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

// ─── EXOTIC CAR COCKPIT ────────────────────────────────────────────────
function ExoticInterior() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.015;
  });
  return (
    <group ref={ref}>
      {/* Floor — low, wide, aggressive */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 3.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Ceiling — low & curved feel */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.9, 0.04, 3.3]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* Side walls — tight */}
      <mesh position={[-0.97, 0.05, 0]}>
        <boxGeometry args={[0.04, 1.4, 3.3]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>
      <mesh position={[0.97, 0.05, 0]}>
        <boxGeometry args={[0.04, 1.4, 3.3]} />
        <meshStandardMaterial color="#111" roughness={0.6} />
      </mesh>
      {/* Two bucket seats */}
      {[-0.4, 0.4].map((x, i) => (
        <group key={i} position={[x, -0.3, 0.3]}>
          {/* Seat base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.55, 0.15, 0.65]} />
            <meshStandardMaterial color="#1a0a0a" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Seat back */}
          <mesh position={[0, 0.45, 0.28]}>
            <boxGeometry args={[0.52, 0.75, 0.1]} />
            <meshStandardMaterial color="#1a0a0a" roughness={0.5} metalness={0.2} />
          </mesh>
          {/* Red seat stitching stripe */}
          <mesh position={[0, 0.45, 0.235]}>
            <boxGeometry args={[0.02, 0.6, 0.005]} />
            <meshStandardMaterial color="#ff0020" emissive="#ff0020" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
      {/* Dashboard */}
      <mesh position={[0, 0.05, -1.4]}>
        <boxGeometry args={[1.85, 0.55, 0.25]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Steering wheel */}
      <mesh position={[-0.4, 0.18, -1.1]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 12, 40]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Center tunnel */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.3, 0.35, 3.2]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Carbon fiber trim */}
      {([-0.9, 0.9] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.72, 0]}>
          <boxGeometry args={[0.04, 0.02, 3.0]} />
          <meshStandardMaterial color="#C9A765" metalness={0.95} roughness={0.05} emissive="#C9A765" emissiveIntensity={0.6} />
        </mesh>
      ))}
      {/* Windows — wider, lower */}
      {[
        { pos: [-0.96, 0.2, -0.2] as [number,number,number], size: [0.01, 0.55, 1.6] as [number,number,number] },
        { pos: [0.96, 0.2, -0.2] as [number,number,number], size: [0.01, 0.55, 1.6] as [number,number,number] },
      ].map(({ pos, size }, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="#0a2040" transparent opacity={0.4} roughness={0.05} />
        </mesh>
      ))}
      {/* Instrument cluster glow */}
      <mesh position={[-0.4, 0.2, -1.28]}>
        <boxGeometry args={[0.4, 0.2, 0.01]} />
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// ─── TOUR SUV INTERIOR ─────────────────────────────────────────────────
function TourInterior() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
  });
  return (
    <group ref={ref}>
      {/* Floor */}
      <mesh position={[0, -0.9, 0]} receiveShadow>
        <boxGeometry args={[3.0, 0.05, 5.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Ceiling — taller than limo */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[2.9, 0.06, 5.3]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* Walls */}
      <mesh position={[-1.47, 0.25, 0]}>
        <boxGeometry args={[0.05, 2.3, 5.3]} />
        <meshStandardMaterial color="#151515" roughness={0.7} />
      </mesh>
      <mesh position={[1.47, 0.25, 0]}>
        <boxGeometry args={[0.05, 2.3, 5.3]} />
        <meshStandardMaterial color="#151515" roughness={0.7} />
      </mesh>
      {/* Row 1 — front seats */}
      {[-0.6, 0.6].map((x, i) => (
        <group key={i} position={[x, -0.4, -1.5]}>
          <mesh><boxGeometry args={[0.65, 0.12, 0.7]} /><meshStandardMaterial color="#1a1a1a" roughness={0.6} /></mesh>
          <mesh position={[0, 0.45, 0.28]}><boxGeometry args={[0.62, 0.82, 0.1]} /><meshStandardMaterial color="#1a1a1a" roughness={0.6} /></mesh>
        </group>
      ))}
      {/* Row 2 — middle bench */}
      <mesh position={[0, -0.35, 0.2]}>
        <boxGeometry args={[2.7, 0.12, 0.75]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 0.54]}>
        <boxGeometry args={[2.7, 0.85, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {/* Row 3 — rear bench */}
      <mesh position={[0, -0.35, 1.9]}>
        <boxGeometry args={[2.7, 0.12, 0.75]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.15, 2.24]}>
        <boxGeometry args={[2.7, 0.85, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {/* Gold accent trim */}
      {([-1.4, 1.4] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0]}>
          <boxGeometry args={[0.03, 0.03, 5.0]} />
          <meshStandardMaterial color="#C9A765" metalness={0.9} roughness={0.1} emissive="#C9A765" emissiveIntensity={0.35} />
        </mesh>
      ))}
      {/* Overhead console */}
      <mesh position={[0, 1.3, -0.5]}>
        <boxGeometry args={[1.2, 0.08, 0.6]} />
        <meshStandardMaterial color="#C9A765" metalness={0.7} roughness={0.2} emissive="#C9A765" emissiveIntensity={0.2} />
      </mesh>
      {/* Large panoramic windows */}
      {[
        { pos: [-1.46, 0.4, -0.4] as [number,number,number], size: [0.01, 1.0, 1.8] as [number,number,number] },
        { pos: [-1.46, 0.4, 1.5] as [number,number,number], size: [0.01, 1.0, 1.6] as [number,number,number] },
        { pos: [1.46, 0.4, -0.4] as [number,number,number], size: [0.01, 1.0, 1.8] as [number,number,number] },
        { pos: [1.46, 0.4, 1.5] as [number,number,number], size: [0.01, 1.0, 1.6] as [number,number,number] },
      ].map(({ pos, size }, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="#1a3a5c" transparent opacity={0.3} roughness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.y = 0.1 + Math.sin(t * 0.5) * 0.04;
    camera.position.z = 0.2 + Math.sin(t * 0.3) * 0.05;
  });
  return null;
}

// ─── MAIN SCENE ────────────────────────────────────────────────────────
export default function POVScene() {
  const [activeVehicle, setActiveVehicle] = useState<"limo" | "exotic" | "tour">("limo");

  const vehicles = [
    { id: "limo" as const, label: "Limousine Interior" },
    { id: "exotic" as const, label: "Exotic Car Cockpit" },
    { id: "tour" as const, label: "Tour Vehicle" },
  ];

  const cameraByVehicle = {
    limo:   { position: [0, 0.1, 0.8] as [number, number, number], fov: 75 },
    exotic: { position: [0, 0.05, 0.5] as [number, number, number], fov: 80 },
    tour:   { position: [0, 0.15, 1.0] as [number, number, number], fov: 70 },
  };

  return (
    <div className="w-full">
      {/* Vehicle selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {vehicles.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveVehicle(id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeVehicle === id
                ? "bg-gold text-black shadow-gold"
                : "border border-white/20 text-cream/60 hover:border-gold/40 hover:text-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div
        className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-gold"
        style={{ height: "60vh" }}
      >
        <Canvas
          key={activeVehicle}
          camera={cameraByVehicle[activeVehicle]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          shadows
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.08} />
          <pointLight position={[-1.5, 1, 0]} color="#C9A765" intensity={2.5} distance={5} decay={2} />
          <pointLight position={[1.5, 1, 0]} color="#C9A765" intensity={2.5} distance={5} decay={2} />
          <pointLight position={[0, 0.8, -2]} color="#ffffff" intensity={0.4} />

          <Environment preset="night" />
          <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} />

          {activeVehicle === "limo"   && <LimoInterior />}
          {activeVehicle === "exotic" && <ExoticInterior />}
          {activeVehicle === "tour"   && <TourInterior />}

          <CameraController />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.7}
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 3}
            dampingFactor={0.08}
            enableDamping
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.6} />
            <Vignette offset={0.3} darkness={0.7} />
          </EffectComposer>
        </Canvas>

        {/* HUD overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">
              {vehicles.find((v) => v.id === activeVehicle)?.label}
            </span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2">
            <span className="text-cream/60 text-xs">Drag to explore · 360° view</span>
          </div>
        </div>
      </div>
    </div>
  );
}
