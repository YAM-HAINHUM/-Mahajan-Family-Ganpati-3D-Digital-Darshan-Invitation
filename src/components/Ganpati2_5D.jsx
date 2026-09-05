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
        {/* Incense sticks and slow-rising fragrance smoke around the idol */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-12% -25% -2%',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {[-1, 1].map((side) => (
            <div
              key={side}
              style={{
                position: 'absolute',
                [side === -1 ? 'left' : 'right']: '2%',
                bottom: '8%',
                width: '34px',
                height: '58px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: '24px',
                  height: '11px',
                  transform: 'translateX(-50%)',
                  borderRadius: '50% 50% 35% 35%',
                  background: 'linear-gradient(180deg, #E6C875, #7A5314)',
                  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.55)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  width: '3px',
                  height: '45px',
                  transform: `translateX(-50%) rotate(${side * 9}deg)`,
                  transformOrigin: 'bottom center',
                  background: 'linear-gradient(180deg, #7B4B28, #D09B54)',
                  borderRadius: '4px',
                }}
              />
              {[0, 1].map((smokeIndex) => (
                <motion.span
                  key={smokeIndex}
                  animate={{
                    y: [-2, -32, -58],
                    x: [0, side * (smokeIndex ? 9 : -7), side * (smokeIndex ? -5 : 8)],
                    scale: [0.55, 1, 1.35],
                    opacity: [0, 0.58, 0],
                  }}
                  transition={{
                    duration: 3.8 + smokeIndex * 0.7,
                    repeat: Infinity,
                    delay: smokeIndex * 1.7 + (side === 1 ? 0.8 : 0),
                    ease: 'easeOut',
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '49px',
                    width: '30px',
                    height: '30px',
                    transform: 'translateX(-50%)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 243, 209, 0.7), rgba(205, 188, 170, 0.16) 68%, transparent 72%)',
                    filter: 'blur(4px)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Subtle breathing scale (1.000 -> 1.006 -> 1.000) over 7 seconds */}
        <motion.div
          animate={{ scale: [1.0, 1.006, 1.0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            zIndex: 2,
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
