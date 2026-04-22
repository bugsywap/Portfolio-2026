import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';

interface HalideLandingProps {
  onViewProjects?: () => void;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&$%*";

const ScrambleLine: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const iterations = useRef(0);

  useEffect(() => {
    let timeout: any;
    let interval: any;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iterations.current) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iterations.current >= text.length) {
          clearInterval(interval);
        }

        iterations.current += 1 / 3;
      }, 30);
    };

    timeout = setTimeout(startScramble, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      iterations.current = 0;
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const Model = () => {
  const { scene } = useGLTF('/img/b26051cb-c759-4eee-9733-c7dcdcb248f3.glb');
  const headRef = useRef<THREE.Object3D | null>(null);
  const initialRotation = useRef<{x: number, y: number, z: number} | null>(null);

  useEffect(() => {
    let foundHead: THREE.Object3D | null = null;
    scene.traverse((node) => {
      if (!foundHead && (node as THREE.Bone).isBone) {
        const name = node.name.toLowerCase();
        // Look for common head or neck bone names
        if (name.includes('head') || name.includes('neck')) {
          foundHead = node;
        }
      }
    });

    if (foundHead) {
      headRef.current = foundHead;
      const fh = foundHead as any;
      initialRotation.current = {
        x: fh.rotation.x,
        y: fh.rotation.y,
        z: fh.rotation.z
      };
    } else {
      // Fallback: rotate the entire scene
      headRef.current = scene;
      initialRotation.current = {
        x: scene.rotation.x,
        y: scene.rotation.y,
        z: scene.rotation.z
      };
    }
  }, [scene]);

  useFrame((state) => {
    if (headRef.current && initialRotation.current) {
      // state.pointer is normalized between -1 and 1
      // We want to turn the head based on where the pointer is
      // targetX makes it look left/right (rotates around Y axis)
      const targetRotationY = initialRotation.current.y + (state.pointer.x * 0.8);
      // targetY makes it look up/down (rotates around X or Z depending on rig, assuming X for now)
      const targetRotationX = initialRotation.current.x - (state.pointer.y * 0.8); 

      // Smooth look at
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1);
    }
  });

  // EDIT ROTATIONS AND POSITION HERE:
  // group position={[x, y, z]} - [0, 0, 0] is Dead Center.
  // group rotation={[x, y, z]} - Math.PI is 180 degrees.
  return (
    <group position={[0, -0.2, 0]}>
      <Center>
        <group rotation={[0, -1.2, 0]}>
          <primitive object={scene} scale={2.8} />
        </group>
      </Center>
    </group>
  );
};

const HalideLanding: React.FC<HalideLandingProps> = ({ onViewProjects }) => {
  const titlePairs = [
    ["GABRIEL", "OLLERO"],
    ["WEB", "DESIGNER"],
    ["GRAPHIC", "DESIGNER"],
    ["AI CONTENT", "SPECIALIST"]
  ];
  
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titlePairs.length);
      setKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [titlePairs.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white text-black font-['Outfit']">
      <style>{`
        :root {
          --halide-bg: #ffffff;
          --halide-text: #000000;
          --halide-accent: #7e22ce;
          --halide-grain-opacity: 0.05;
        }

        .halide-container {
          background-color: var(--halide-bg);
          color: var(--halide-text);
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .halide-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          opacity: var(--halide-grain-opacity);
        }

        .viewport {
          width: 100%; 
          height: 100%;
          display: none; 
          align-items: center; 
          justify-content: center;
          overflow: hidden;
          position: absolute;
          inset: 0;
        }

        @media (min-width: 1024px) {
          .viewport {
            display: flex;
          }
        }

        .interface-grid {
          position: absolute;
          inset: 0;
          padding: 3rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 20;
          pointer-events: none;
        }

        .grid-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .grid-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(3.2rem, 15vw, 6.5rem);
          line-height: 0.85;
          letter-spacing: -0.06em;
          color: black;
          font-weight: 950;
          text-transform: uppercase;
          max-width: 800px;
          pointer-events: none;
        }

        .cta-button {
          pointer-events: auto;
          background: black;
          color: white;
          padding: 1.25rem 2.5rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
          display: inline-block;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover { 
          background: var(--halide-accent); 
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(126, 34, 206, 0.2);
        }

        .scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, black, transparent);
          animation: flow 2s infinite ease-in-out;
          z-index: 20;
        }

        @keyframes flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }

        @media (max-width: 1023px) {
          .interface-grid {
            padding: 2rem 1.5rem !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            gap: 2.5rem;
          }
          .grid-header {
            position: absolute;
            top: 3rem;
            left: 0;
            width: 100%;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 0 1.5rem;
          }
          .grid-header > div:last-child {
            text-align: center !important;
          }
          .grid-footer {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.5rem;
          }
          .cta-button {
            padding: 0.8rem 1.8rem !important;
            font-size: 0.7rem !important;
          }
          .hero-title {
            align-items: center !important;
            font-size: clamp(2.5rem, 12vw, 3.5rem) !important;
            line-height: 0.9 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="halide-container">
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="halide-grain" style={{ filter: 'url(#grain)' }}></div>

        <div className="interface-grid">
          <div className="grid-header">
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.1em' }}>GABRIEL_OLLERO</div>
            <div style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--halide-accent)', fontSize: '0.75rem' }}>
              <div>PORTFOLIO v1.0</div>
              <div>STATUS: ACTIVE</div>
            </div>
          </div>

          <h1 className="hero-title flex flex-col gap-2">
            <div className="min-h-[1em]">
              <ScrambleLine key={`l1-${key}`} text={titlePairs[index][0]} />
            </div>
            <div className="min-h-[1em] opacity-40">
              <ScrambleLine key={`l2-${key}`} text={titlePairs[index][1]} delay={200} />
            </div>
          </h1>

          <div className="grid-footer">
            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', maxWidth: '300px' }}>
              <p>[ ARCHIVE 2024-25 ]</p>
              <p>EXPLORING THE INTERSECTION OF DESIGN, AI, AND WEB DEVELOPMENT.</p>
            </div>
            <button onClick={onViewProjects} className="cta-button">VIEW PROJECTS</button>
          </div>
        </div>

        {/* 3D Viewport - Desktop Only */}
        <div className="viewport hidden lg:block">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, 10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Model />
              <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={6} blur={2.5} far={4} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="scroll-hint"></div>
      </div>
    </div>
  );
};

// Preload the specific model for faster loading
useGLTF.preload('/img/b26051cb-c759-4eee-9733-c7dcdcb248f3.glb');

export default HalideLanding;
