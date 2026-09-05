import React from 'react';
import { motion } from 'framer-motion';

export default function GoldenAura({ intensity = 1, rotationSpeed = 120 }) {
  return (
    <div 
      className="golden-aura-wrapper"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(320px, 75vw, 680px)',
        height: 'clamp(320px, 75vw, 680px)',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Warm Radial Glow */}
      <div
        className="golden-aura"
        style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(circle at center, rgba(255, 235, 160, 0.45) 0%, rgba(230, 200, 117, 0.28) 35%, rgba(142, 27, 35, 0.12) 65%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(35px)',
          opacity: intensity,
        }}
      />

      {/* Subtle Rotating Sunburst / Light Rays */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: rotationSpeed, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-10%',
          opacity: 0.22 * intensity,
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 243, 209, 0.5) 15deg,
            transparent 30deg,
            rgba(230, 200, 117, 0.4) 45deg,
            transparent 60deg,
            rgba(255, 243, 209, 0.5) 75deg,
            transparent 90deg,
            rgba(230, 200, 117, 0.4) 105deg,
            transparent 120deg,
            rgba(255, 243, 209, 0.5) 135deg,
            transparent 150deg,
            rgba(230, 200, 117, 0.4) 165deg,
            transparent 180deg,
            rgba(255, 243, 209, 0.5) 195deg,
            transparent 210deg,
            rgba(230, 200, 117, 0.4) 225deg,
            transparent 240deg,
            rgba(255, 243, 209, 0.5) 255deg,
            transparent 270deg,
            rgba(230, 200, 117, 0.4) 285deg,
            transparent 300deg,
            rgba(255, 243, 209, 0.5) 315deg,
            transparent 330deg,
            rgba(230, 200, 117, 0.4) 345deg,
            transparent 360deg
          )`,
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
        }}
      />

      {/* Rotating Sacred Mandala Backdrop */}
      <img
        src="/assets/images/mandala.svg"
        alt="Sacred Mandala"
        className="mandala-spin"
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '90%',
          height: '90%',
          opacity: 0.38,
          filter: 'drop-shadow(0 0 18px rgba(230, 200, 117, 0.45))',
        }}
      />
    </div>
  );
}
