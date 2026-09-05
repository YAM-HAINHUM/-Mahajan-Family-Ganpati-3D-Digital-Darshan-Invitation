import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      // Very subtle breathing pulse (1.000 -> 1.005)
      const t = state.clock.getElapsedTime();
      const scalePulse = 1 + 0.005 * Math.sin(t * 1.2);
      modelRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      
      // Extremely subtle dignified sway
      modelRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      position={[0, -1.6, 0]} 
      scale={[1, 1, 1]} 
    />
  );
}

export default function Ganpati3D({ modelUrl = "/assets/ganpati/ganpati.glb", mousePos = { x: 0, y: 0 } }) {
  return (
    <div style={{ width: '100%', height: '520px', position: 'relative' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={38} />
        
        {/* Divine Temple Lighting */}
        <ambientLight intensity={0.8} color="#FFF5DB" />
        <pointLight position={[0, 2, 3]} intensity={2.2} color="#FFE6A3" distance={10} />
        <spotLight 
          position={[0, 4, 4]} 
          angle={0.45} 
          penumbra={0.8} 
          intensity={3.0} 
          color="#FFDF85" 
          castShadow 
        />
        <pointLight position={[-2, -1, 1]} intensity={0.6} color="#FF7A00" />
        <pointLight position={[2, -1, 1]} intensity={0.6} color="#FF7A00" />

        <React.Suspense fallback={null}>
          <Model url={modelUrl} />
        </React.Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxAzimuthAngle={0.25}
          minAzimuthAngle={-0.25}
        />
      </Canvas>
    </div>
  );
}
