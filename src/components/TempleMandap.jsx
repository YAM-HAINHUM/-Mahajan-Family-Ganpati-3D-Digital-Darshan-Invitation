import React from 'react';
import { motion } from 'framer-motion';

export default function TempleMandap({ children }) {
  // 4 Brass bells hanging from top with subtle pendulum sway
  const bells = [
    { left: '12%', delay: 0, duration: 4.2 },
    { left: '26%', delay: 1.2, duration: 4.8 },
    { right: '26%', delay: 0.6, duration: 4.5 },
    { right: '12%', delay: 1.8, duration: 5.0 },
  ];

  return (
    <div
      className="temple-mandap-sanctum"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '3rem 1rem',
      }}
    >
      {/* Top Sacred Arch / Toran with marigold garlands */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(180deg, rgba(30, 4, 8, 0.95) 0%, rgba(68, 9, 17, 0.4) 100%)',
          borderBottom: '2.5px solid #C99A3D',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          zIndex: 4,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        {/* Repeating Toran Marigold Garland Pattern */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: 0,
            right: 0,
            height: '14px',
            background: 'radial-gradient(circle at 50% 0%, #FFA726 4px, #FF7043 8px, transparent 10px)',
            backgroundSize: '24px 14px',
            opacity: 0.9,
          }}
        />
      </div>

      {/* Hanging Brass Temple Bells */}
      {bells.map((bell, idx) => (
        <motion.div
          key={idx}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{
            duration: bell.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: bell.delay,
          }}
          style={{
            position: 'absolute',
            top: '40px',
            left: bell.left,
            right: bell.right,
            transformOrigin: 'top center',
            zIndex: 5,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Brass Chain */}
          <div
            style={{
              width: '2px',
              height: '50px',
              background: 'repeating-linear-gradient(180deg, #E6C875 0px, #E6C875 4px, #7A5314 4px, #7A5314 8px)',
              boxShadow: '0 0 4px rgba(0,0,0,0.6)',
            }}
          />
          {/* Brass Bell Body */}
          <div
            style={{
              width: '22px',
              height: '24px',
              background: 'linear-gradient(180deg, #FFF3D1 0%, #E6C875 40%, #C99A3D 80%, #76584A 100%)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 85%, 90% 100%, 10% 100%, 0% 85%)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.7)',
              borderRadius: '2px 2px 8px 8px',
            }}
          />
        </motion.div>
      ))}

      {/* Carved Temple Pillars Left & Right */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          bottom: '10px',
          left: 'clamp(6px, 2.5vw, 36px)',
          width: 'clamp(14px, 2vw, 24px)',
          background: 'linear-gradient(90deg, #24060A 0%, #C99A3D 50%, #4D0911 100%)',
          border: '1px solid rgba(230, 200, 117, 0.4)',
          borderRadius: '4px',
          opacity: 0.5,
          boxShadow: '0 0 20px rgba(0,0,0,0.9)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30px',
          bottom: '10px',
          right: 'clamp(6px, 2.5vw, 36px)',
          width: 'clamp(14px, 2vw, 24px)',
          background: 'linear-gradient(90deg, #4D0911 0%, #C99A3D 50%, #24060A 100%)',
          border: '1px solid rgba(230, 200, 117, 0.4)',
          borderRadius: '4px',
          opacity: 0.5,
          boxShadow: '0 0 20px rgba(0,0,0,0.9)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Mandap Children */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
