"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type GeometryMode = "torus-knot" | "geodesic" | "hyper-cube";

interface NeuralCore3DProps {
  className?: string;
  onToggleView?: () => void;
  showTogglePhoto?: boolean;
}

export function NeuralCore3D({
  className,
  onToggleView,
  showTogglePhoto = true,
}: NeuralCore3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [geometryMode, setGeometryMode] = useState<GeometryMode>("torus-knot");
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // References to keep Three.js instances across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const mainMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const ringsRef = useRef<THREE.Group[]>([]);
  const satellitesRef = useRef<THREE.Mesh[]>([]);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);

  // Interaction coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, lastX: 0, lastY: 0 });
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Switch geometry helper
  const updateGeometry = (mode: GeometryMode, wireframe: boolean) => {
    if (!mainMeshRef.current || !wireMeshRef.current) return;

    let newGeo: THREE.BufferGeometry;
    switch (mode) {
      case "geodesic":
        newGeo = new THREE.IcosahedronGeometry(1.35, 2);
        break;
      case "hyper-cube":
        newGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6, 3, 3, 3);
        break;
      case "torus-knot":
      default:
        // Rare mathematical (3, 7) Torus Knot representing high-dimensional latent space
        newGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 128, 32, 3, 7);
        break;
    }

    mainMeshRef.current.geometry.dispose();
    wireMeshRef.current.geometry.dispose();

    mainMeshRef.current.geometry = newGeo;
    wireMeshRef.current.geometry = newGeo;

    if (mainMeshRef.current.material instanceof THREE.Material) {
      mainMeshRef.current.visible = !wireframe;
    }
  };

  useEffect(() => {
    updateGeometry(geometryMode, wireframeOnly);
  }, [geometryMode, wireframeOnly]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // 2. Renderer with Antialias & Alpha Transparency & WebGL detection
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x10b981, 2.5); // Emerald key
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Cyan rim
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(0x34d399, 2.0, 8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);
    coreLightRef.current = coreLight;

    // 4. Root Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    coreGroupRef.current = coreGroup;

    // 5. Central Mathematical Manifold
    const initialGeo = new THREE.TorusKnotGeometry(1.15, 0.32, 128, 32, 3, 7);

    // Solid core with obsidian glass/metal sheen
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.92,
    });
    const mainMesh = new THREE.Mesh(initialGeo, solidMat);
    coreGroup.add(mainMesh);
    mainMeshRef.current = mainMesh;

    // Glowing Emerald Wireframe Overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(initialGeo, wireMat);
    coreGroup.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // Central pulsing seed node
    const seedGeo = new THREE.OctahedronGeometry(0.35, 0);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    coreGroup.add(seedMesh);

    // 6. Tri-Axial Gyroscopic Quantum Orbital Rings
    const ringRadii = [1.9, 2.2, 2.5];
    const ringColors = [0x10b981, 0x06b6d4, 0x3b82f6];
    ringsRef.current = [];
    satellitesRef.current = [];

    ringRadii.forEach((radius, i) => {
      const ringGroup = new THREE.Group();

      // Ring wire line
      const ringGeo = new THREE.BufferGeometry();
      const points: number[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
      }
      ringGeo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

      const ringMat = new THREE.LineBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.35 - i * 0.05,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringGroup.add(ringLine);

      // Orbiting Satellite
      const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      ringGroup.add(sat);
      satellitesRef.current.push(sat);

      // Distinct initial Euler rotations
      if (i === 0) ringGroup.rotation.x = Math.PI / 4;
      if (i === 1) ringGroup.rotation.y = Math.PI / 3;
      if (i === 2) ringGroup.rotation.z = Math.PI / 6;

      scene.add(ringGroup);
      ringsRef.current.push(ringGroup);
    });

    // 7. Synaptic Latent Point Cloud (Ambient Particle Field)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const r = 2.4 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[p * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[p * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[p * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const pointCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(pointCloud);
    pointCloudRef.current = pointCloud;

    // 8. Viewport Resize & Intersection Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    // 9. Mouse / Pointer Interaction Listeners
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        mouseRef.current.targetY += deltaX * 0.008;
        mouseRef.current.targetX += deltaY * 0.008;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      } else {
        mouseRef.current.targetX = normY * 0.45;
        mouseRef.current.targetY = normX * 0.55;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      setIsInteracting(true);
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      mouseRef.current.isDragging = false;
      setIsInteracting(false);
      try {
        (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    // 10. Animation Loop using performance.now()
    const startTime = performance.now();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth inertia rotation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      if (coreGroup) {
        // Continuous subtle mathematical rotation combined with mouse influence
        coreGroup.rotation.x = mouseRef.current.x + Math.sin(elapsedTime * 0.4) * 0.15;
        coreGroup.rotation.y = elapsedTime * 0.22 + mouseRef.current.y;
        coreGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;
      }

      // Pulse seed node & core light
      const pulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.18;
      seedMesh.scale.set(pulse, pulse, pulse);
      seedMesh.rotation.y = -elapsedTime * 0.8;
      if (coreLightRef.current) {
        coreLightRef.current.intensity = 1.8 + Math.sin(elapsedTime * 3) * 0.8;
      }

      // Rotate gyroscopic rings at irrational gear ratios
      ringsRef.current.forEach((ring, idx) => {
        const speed = (0.28 + idx * 0.12) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.x += speed * 0.012;
        ring.rotation.y += speed * 0.016;

        // Position satellite along ring perimeter
        const sat = satellitesRef.current[idx];
        if (sat) {
          const r = ringRadii[idx];
          const satAngle = elapsedTime * (0.8 + idx * 0.35);
          sat.position.set(Math.cos(satAngle) * r, 0, Math.sin(satAngle) * r);
        }
      });

      // Slowly rotate particle field
      if (pointCloud) {
        pointCloud.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);

      renderer.dispose();
      initialGeo.dispose();
      solidMat.dispose();
      wireMat.dispose();
      seedGeo.dispose();
      seedMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="flex h-64 w-64 items-center justify-center rounded-2xl border border-border/80 bg-card p-4 text-center text-xs text-muted-foreground">
        WebGL not supported in this environment.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-b from-card/80 to-background/90 p-2 shadow-2xl backdrop-blur-xl transition-all hover:border-emerald-500/40 select-none",
        className
      )}
    >
      {/* Top Header Badge */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-[11px] font-medium text-emerald-300 backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono tracking-wider">3D TENSOR CORE</span>
        </div>

        {showTogglePhoto && onToggleView && (
          <button
            onClick={onToggleView}
            className="cursor-pointer rounded-full border border-border/70 bg-card/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-foreground"
            title="Switch back to portrait photo"
          >
            Show Portrait ↗
          </button>
        )}
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 cursor-grab active:cursor-grabbing touch-none",
          isInteracting && "cursor-grabbing"
        )}
        title="Click and drag to rotate the 3D tensor manifold"
      >
        <canvas ref={canvasRef} className="h-full w-full block" />
      </div>

      {/* Bottom Interactive Controls */}
      <div className="z-10 flex w-full flex-wrap items-center justify-between gap-1.5 border-t border-border/60 pt-2 px-1 text-[11px]">
        {/* Geometry switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-background/80 p-0.5 font-mono text-[10px]">
          <button
            onClick={() => setGeometryMode("torus-knot")}
            className={cn(
              "cursor-pointer rounded px-2 py-0.5 transition-all",
              geometryMode === "torus-knot"
                ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Torus Knot (p=3, q=7) Latent Manifold"
          >
            Knot
          </button>
          <button
            onClick={() => setGeometryMode("geodesic")}
            className={cn(
              "cursor-pointer rounded px-2 py-0.5 transition-all",
              geometryMode === "geodesic"
                ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Geodesic Icosahedral Lattice"
          >
            Geodesic
          </button>
          <button
            onClick={() => setGeometryMode("hyper-cube")}
            className={cn(
              "cursor-pointer rounded px-2 py-0.5 transition-all",
              geometryMode === "hyper-cube"
                ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Hyperdimensional Tesseract Matrix"
          >
            Tesseract
          </button>
        </div>

        {/* Wireframe toggle */}
        <button
          onClick={() => setWireframeOnly(!wireframeOnly)}
          className={cn(
            "cursor-pointer rounded-lg border border-border/50 bg-background/80 px-2 py-1 font-mono text-[10px] transition-colors hover:border-border",
            wireframeOnly ? "border-emerald-500/40 text-emerald-300" : "text-muted-foreground"
          )}
          title="Toggle wireframe topology view"
        >
          {wireframeOnly ? "Wire: ON" : "Wire: OFF"}
        </button>
      </div>

      {/* Drag instruction caption */}
      <span className="pt-1 text-[10px] text-muted-foreground/70 font-mono tracking-tight">
        Drag to inspect 360° • Gyro Telemetry Active
      </span>
    </div>
  );
}
