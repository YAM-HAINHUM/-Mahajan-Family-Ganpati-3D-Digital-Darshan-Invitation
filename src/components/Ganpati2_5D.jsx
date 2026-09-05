import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import GoldenAura from './GoldenAura';
import Diyas from './Diyas';

export default function Ganpati2_5D({ mousePos = { x: 0, y: 0 }, isMobile = false }) {
  const containerRef = useRef(null);

  // Parallax calculations based on desktop mouse movements
  const mouseXOffset = isMobile ? 0 : mousePos.x * 12;
  const mouseYOffset = isMobile ? 0 : mousePos.y * 8;

  // Scroll animations for Darshan approach and departure
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Stage 1 -> 2 -> 3 -> 4
  const idolScale = useTransform(smoothProgress, [0, 0.25, 0.5, 0.8, 1], [0.94, 1.0, 1.04, 1.02, 0.96]);
  const idolOpacity = useTransform(smoothProgress, [0, 0.18, 0.85, 1], [0.3, 1, 1, 0.4]);
  const idolY = useTransform(smoothProgress, [0, 0.5, 1], [25, 0, -25]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {/* Layer 1: Golden Aura & Rotating Sacred Mandala */}
      <motion.div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          x: `calc(-50% + ${mouseXOffset * -0.4}px)`,
          y: `calc(-50% + ${mouseYOffset * -0.4}px)`,
          zIndex: 1,
        }}
      >
        <GoldenAura intensity={1} />
      </motion.div>

      {/* Layer 2: Main Ganpati Sacred Image */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          scale: idolScale,
          opacity: idolOpacity,
          y: idolY,
          x: mouseXOffset * 0.5,
          filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.85)) drop-shadow(0 0 25px rgba(201, 154, 61, 0.35))',
          willChange: 'transform, opacity',
        }}
      >
        {/* Subtle breathing scale (1.000 -> 1.006 -> 1.000) over 7 seconds */}
        <motion.div
          animate={{ scale: [1.0, 1.006, 1.0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(230, 200, 117, 0.35)',
            boxShadow: '0 0 40px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.6)',
          }}
        >
          {/* Inner Golden Border Frame */}
          <div
            style={{
              position: 'absolute',
              inset: '6px',
              border: '1px solid rgba(255, 243, 209, 0.3)',
              borderRadius: '10px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          <img
            src="/assets/images/ganpati.jpg"
            alt="Shri Ganpati Bappa"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '440px',
              height: 'auto',
              maxHeight: '68vh',
              objectFit: 'cover',
            }}
            loading="eager"
          />

          {/* Bottom Shadow Gradient to ground the idol into the mandap */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '90px',
              background: 'linear-gradient(to top, rgba(26, 8, 10, 0.95) 0%, rgba(42, 23, 18, 0.4) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Layer 3: Flanking Brass Diyas */}
      <Diyas count={4} />
    </div>
  );
}
