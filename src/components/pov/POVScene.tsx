"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function CarInterior() {
  const meshRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Floor */}
      <mesh position={[0, -0.8, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.05, 6]} />
        <meshStandardMaterial color="#1a1209" roughness={0.8} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.4, 0.06, 5.8]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-1.72, 0.2, 0]}>
        <boxGeometry args={[0.05, 2, 5.8]} />
        <meshStandardMaterial color="#0d0a05" roughness={0.7} />
      </mesh>
      {/* Right wall */}
      <mesh position={[1.72, 0.2, 0]}>
        <boxGeometry args={[0.05, 2, 5.8]} />
        <meshStandardMaterial color="#0d0a05" roughness={0.7} />
      </mesh>
      {/* Front seat */}
      <mesh position={[0, -0.3, -1.8]} castShadow>
        <boxGeometry args={[3.2, 0.8, 0.6]} />
        <meshStandardMaterial color="#1a1209" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Rear seat */}
      <mesh position={[0, -0.3, 1.5]} castShadow>
        <boxGeometry args={[3.2, 0.8, 0.7]} />
        <meshStandardMaterial color="#1a1209" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Gold trim strips */}
      {[-1.65, 1.65].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0]}>
          <boxGeometry args={[0.04, 0.04, 5.4]} />
          <meshStandardMaterial color="#C9A765" metalness={0.9} roughness={0.1} emissive="#C9A765" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* LED strip lights */}
      {[[-1.6, 1.1, 0] as [number,number,number], [1.6, 1.1, 0] as [number,number,number]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.03, 0.03, 5.4]} />
          <meshStandardMaterial color="#C9A765" emissive="#C9A765" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Center console */}
      <mesh position={[0, -0.6, -0.3]}>
        <boxGeometry args={[0.5, 0.4, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Windows */}
      {[
        { pos: [-1.71, 0.3, -0.5] as [number,number,number], size: [0.01, 0.7, 1.8] as [number,number,number] },
        { pos: [-1.71, 0.3, 1.5] as [number,number,number], size: [0.01, 0.7, 1.4] as [number,number,number] },
        { pos: [1.71, 0.3, -0.5] as [number,number,number], size: [0.01, 0.7, 1.8] as [number,number,number] },
        { pos: [1.71, 0.3, 1.5] as [number,number,number], size: [0.01, 0.7, 1.4] as [number,number,number] },
      ].map(({ pos, size }, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={size} />
          <meshStandardMaterial color="#1a3a5c" transparent opacity={0.4} roughness={0.1} metalness={0.0} />
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

export default function POVScene() {
  const [activeVehicle, setActiveVehicle] = useState<"limo" | "exotic" | "tour">("limo");

  const vehicles = [
    { id: "limo" as const, label: "Limousine Interior" },
    { id: "exotic" as const, label: "Exotic Car Cockpit" },
    { id: "tour" as const, label: "Tour Vehicle" },
  ];

  return (
    <div className="w-full">
      {/* Vehicle selector */}
      <div className="flex justify-center gap-3 mb-6">
        {vehicles.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveVehicle(id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeVehicle === id
                ? "bg-gold text-black"
                : "border border-white/20 text-cream/60 hover:border-gold/40 hover:text-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-gold" style={{ height: "60vh" }}>
        <Canvas
          camera={{ position: [0, 0.1, 0.8], fov: 75 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }}
          shadows
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[-1.5, 1, 0]} color="#C9A765" intensity={2} distance={4} decay={2} />
          <pointLight position={[1.5, 1, 0]} color="#C9A765" intensity={2} distance={4} decay={2} />
          <pointLight position={[0, 0.8, -2]} color="#ffffff" intensity={0.3} />

          <Environment preset="night" />
          <Stars radius={100} depth={50} count={2000} factor={2} saturation={0} />

          <CarInterior />
          <CameraController />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.7}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            dampingFactor={0.08}
            enableDamping
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} intensity={0.5} />
            <Vignette offset={0.3} darkness={0.7} />
          </EffectComposer>
        </Canvas>

        {/* HUD overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-xs font-semibold">LIVE INTERIOR VIEW</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2">
            <span className="text-cream/60 text-xs">Drag to explore · Scroll to look around</span>
          </div>
        </div>
      </div>
    </div>
  );
}
