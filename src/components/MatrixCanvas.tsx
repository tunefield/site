import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type NodeData = {
  position: [number, number, number];
  size: number;
  hue: number;
  colorHex: string;
  bpm: number;
  key: string;
  mood: string;
  id: number;
};

const CAMELOT = ["1A","2A","3A","4A","5A","6A","7A","8A","9A","10A","11A","12A","1B","8B","5B","9B"];
const MOODS = ["Deep","Driving","Euphoric","Dark","Hypnotic","Warm","Cold","Lush"];
const CAMELOT_PALETTE = [
  "#FF3B6F","#FF8533","#FFD23F","#B8E04A","#4CD964","#1FD6B0",
  "#1FB5D6","#3D8BFD","#7B5BFF","#BD52FF","#FF52DC","#FF3B95",
];

export type MatrixStage = "position" | "color" | "edges" | "highvis";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function buildNodes(count: number): NodeData[] {
  const r = rng(7);
  const nodes: NodeData[] = [];
  for (let i = 0; i < count; i++) {
    const radius = 1.2 + r() * 3.4;
    const theta = r() * Math.PI * 2;
    const phi = Math.acos(2 * r() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    const colorHex = CAMELOT_PALETTE[Math.floor(r() * CAMELOT_PALETTE.length)];
    nodes.push({
      position: [x, y, z],
      size: 0.06 + r() * 0.14,
      hue: r(),
      colorHex,
      bpm: Math.round(95 + r() * 55),
      key: CAMELOT[Math.floor(r() * CAMELOT.length)],
      mood: MOODS[Math.floor(r() * MOODS.length)],
      id: i,
    });
  }
  return nodes;
}

function Edges({
  nodes,
  stage,
  selectedId,
  threshold = 1.5,
}: {
  nodes: NodeData[];
  stage?: MatrixStage;
  selectedId: number;
  threshold?: number;
}) {
  const geom = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].position;
        const b = nodes[j].position;
        const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        if (d < threshold) {
          if (stage === "highvis" && nodes[i].id !== selectedId && nodes[j].id !== selectedId) continue;
          positions.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes, threshold, stage, selectedId]);
  const opacity =
    stage === "edges" ? 0.8 :
    stage === "highvis" ? 0.7 :
    stage === "position" ? 0.06 :
    0.2;
  const color = stage === "highvis" ? "#F5B3D1" : "#E8DCC2";
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

function Spheres({
  nodes,
  onHover,
  hoveredId,
  stage,
}: {
  nodes: NodeData[];
  onHover: (n: NodeData | null, screen?: { x: number; y: number }) => void;
  hoveredId: number | null;
  stage?: MatrixStage;
}) {
  const group = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const selectedId = useMemo(() => nodes[Math.floor(Math.random() * nodes.length)].id, [nodes]);
  const connected = useMemo(() => {
    const set = new Set<number>([selectedId]);
    const sel = nodes.find((n) => n.id === selectedId)!;
    nodes.forEach((n) => {
      if (n.id === selectedId) return;
      const d = Math.hypot(
        n.position[0] - sel.position[0],
        n.position[1] - sel.position[1],
        n.position[2] - sel.position[2],
      );
      if (d < 1.5) set.add(n.id);
    });
    return set;
  }, [nodes, selectedId]);
  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.05;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.12, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * 0.08, 0.04);
  });
  return (
    <group ref={group}>
      <Edges nodes={nodes} stage={stage} selectedId={selectedId} />
      {nodes.map((n) => {
        const isHovered = hoveredId === n.id;
        const isSelected = stage === "highvis" && n.id === selectedId;
        const isFaded = stage === "highvis" && !connected.has(n.id);
        const baseColor = new THREE.Color(n.colorHex);
        const color = isHovered || isSelected ? new THREE.Color("#F5B3D1") : baseColor;
        const emissiveColor = isHovered || isSelected ? "#F5B3D1" : n.colorHex;
        const emissiveIntensity = isHovered
          ? 1.2
          : isSelected
            ? 1.6
            : stage === "color"
              ? 0.95
              : stage === "position"
                ? 0.15
                : stage === "edges"
                  ? 0.3
                  : isFaded
                    ? 0
                    : 0.4;
        const opacity = isFaded ? 0.08 : 1;
        const scale = isHovered ? n.size * 1.6 : isSelected ? n.size * 1.9 : n.size;
        return (
          <mesh
            key={n.id}
            position={n.position}
            scale={scale}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(n, { x: e.clientX, y: e.clientY });
            }}
            onPointerMove={(e) => {
              onHover(n, { x: e.clientX, y: e.clientY });
            }}
            onPointerOut={() => onHover(null)}
          >
            <sphereGeometry args={[1, 18, 18]} />
            <meshStandardMaterial
              color={color}
              emissive={emissiveColor}
              emissiveIntensity={emissiveIntensity}
              transparent
              opacity={opacity}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function MatrixCanvas({
  count = 80,
  showTooltip = true,
  className = "",
  stage,
}: {
  count?: number;
  showTooltip?: boolean;
  className?: string;
  stage?: MatrixStage;
}) {
  const [hover, setHover] = useState<{ node: NodeData; x: number; y: number } | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const nodes = useMemo(() => buildNodes(count), [count]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={0.8} color="#F5B3D1" />
        <pointLight position={[-6, -4, -2]} intensity={0.6} color="#11A5B3" />
        <Spheres
          nodes={nodes}
          hoveredId={hoveredId}
          stage={stage}
          onHover={(n, s) => {
            if (n && s) {
              setHover({ node: n, x: s.x, y: s.y });
              setHoveredId(n.id);
            } else {
              setHover(null);
              setHoveredId(null);
            }
          }}
        />
      </Canvas>
      {showTooltip && hover && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-pink/40 bg-charcoal/90 backdrop-blur px-3 py-2 font-mono text-[11px] text-cream shadow-lg"
          style={{ left: hover.x + 14, top: hover.y + 14 }}
        >
          <div className="text-pink">Track #{hover.node.id.toString().padStart(3, "0")}</div>
          <div className="text-cream/80">
            {hover.node.bpm} BPM · {hover.node.key} · {hover.node.mood}
          </div>
        </div>
      )}
    </div>
  );
}

export default MatrixCanvas;