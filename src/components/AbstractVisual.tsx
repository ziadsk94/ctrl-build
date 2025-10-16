'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSprings, useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

// Constants
const NUM_POINTS = 60; // Reduced for cleaner visual
const POINT_COLOR = '#1E1E1E'; // Charcoal
const LINE_COLOR = '#3A4B40'; // Studio Green
const CUSTOM_EASING = (t: number) => 1 - Math.pow(1 - t, 4); // Ease-out quart
const ANIMATION_DURATION = 600; // 600ms as specified

// Generate target positions for each state
const generatePositions = () => {
  // State 1: Scattered dots (Discover) - Raw data, potential, unorganized ideas
  const discover = new Array(NUM_POINTS).fill(0).map(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 3
  ]);

  // State 2: 2D Grid (Design) - Structured wireframe, bringing order
  const design = [];
  const gridSize = Math.ceil(Math.sqrt(NUM_POINTS));
  const spacing = 1.2;
  
  for (let i = 0; i < NUM_POINTS; i++) {
    const x = (i % gridSize) * spacing - (gridSize - 1) * spacing / 2;
    const y = Math.floor(i / gridSize) * spacing - (gridSize - 1) * spacing / 2;
    design.push([x, y, 0]);
  }

  // State 3: 3D Structure (Build) - Stable geometric form, solid construction
  const build = [];
  const icosahedron = new THREE.IcosahedronGeometry(2.5, 0);
  const vertices = icosahedron.attributes.position.array;
  
  for (let i = 0; i < NUM_POINTS; i++) {
    const vertexIndex = (i % (vertices.length / 3)) * 3;
    build.push([
      vertices[vertexIndex],
      vertices[vertexIndex + 1],
      vertices[vertexIndex + 2]
    ]);
  }

  return { discover, design, build };
};

const positions = generatePositions();

// Points component with spring animations
function Points({ pillar }: { pillar: string }) {
  const pointGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 8, 8), []);
  const pointMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: POINT_COLOR }), []);

  const [springs, api] = useSprings(NUM_POINTS, (i) => ({
    position: positions.discover[i],
    config: { duration: ANIMATION_DURATION, easing: CUSTOM_EASING },
  }));

  useEffect(() => {
    api.start((i) => ({ position: positions[pillar as keyof typeof positions][i] }));
  }, [pillar, api]);

  return (
    <>
      {springs.map((props, i) => (
        <a.mesh 
          key={i} 
          {...props} 
          geometry={pointGeometry} 
          material={pointMaterial}
          position={props.position as unknown as [number, number, number]}
        />
      ))}
    </>
  );
}

// Lines component for grid and 3D structure
function Lines({ pillar }: { pillar: string }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { opacity } = useSpring({
    opacity: pillar === 'discover' ? 0 : 1,
    config: { duration: ANIMATION_DURATION },
  });

  // Generate line connections based on current state
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const pointPositions = pillar === 'design' ? positions.design : positions.build;
    const vertices: number[] = [];

    if (pillar === 'design') {
      // Grid connections
      const gridSize = Math.ceil(Math.sqrt(NUM_POINTS));
      for (let i = 0; i < NUM_POINTS; i++) {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);
        
        // Horizontal lines
        if (x < gridSize - 1 && i + 1 < NUM_POINTS) {
          const current = pointPositions[i];
          const right = pointPositions[i + 1];
          if (current && right) {
            vertices.push(current[0], current[1], current[2]);
            vertices.push(right[0], right[1], right[2]);
          }
        }
        
        // Vertical lines
        if (y < gridSize - 1 && i + gridSize < NUM_POINTS) {
          const current = pointPositions[i];
          const below = pointPositions[i + gridSize];
          if (current && below) {
            vertices.push(current[0], current[1], current[2]);
            vertices.push(below[0], below[1], below[2]);
          }
        }
      }
    } else if (pillar === 'build') {
      // Icosahedron edges
      const icosahedron = new THREE.IcosahedronGeometry(3, 0);
      const indices = icosahedron.index?.array;
      const positionArray = icosahedron.attributes.position.array;
      
      if (indices && positionArray) {
        for (let i = 0; i < indices.length; i += 3) {
          const a = indices[i] * 3;
          const b = indices[i + 1] * 3;
          const c = indices[i + 2] * 3;
          
          // Add triangle edges
          vertices.push(positionArray[a], positionArray[a + 1], positionArray[a + 2]);
          vertices.push(positionArray[b], positionArray[b + 1], positionArray[b + 2]);
          vertices.push(positionArray[b], positionArray[b + 1], positionArray[b + 2]);
          vertices.push(positionArray[c], positionArray[c + 1], positionArray[c + 2]);
          vertices.push(positionArray[c], positionArray[c + 1], positionArray[c + 2]);
          vertices.push(positionArray[a], positionArray[a + 1], positionArray[a + 2]);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, [pillar]);

  const lineMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({ 
      color: LINE_COLOR, 
      linewidth: 1,
      transparent: true,
      opacity: opacity.get()
    }), [opacity]
  );

  return (
    <a.lineSegments
      ref={lineRef}
      geometry={lineGeometry}
      material={lineMaterial}
    />
  );
}

// Main scene component
function Scene({ pillar }: { pillar: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (pillar === 'build' && groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <Points pillar={pillar} />
      <Lines pillar={pillar} />
    </group>
  );
}

// Main component
export default function AbstractVisual({ pillar }: { pillar: string }) {
  return (
    <div className="w-full h-64" data-cursor-hide>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 15], zoom: 50 }}
        style={{ background: 'transparent', cursor: 'none' }}
        onPointerMissed={() => {}}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <Scene pillar={pillar} />
      </Canvas>
    </div>
  );
}
