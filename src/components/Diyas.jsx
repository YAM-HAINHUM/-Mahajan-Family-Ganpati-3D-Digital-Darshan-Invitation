import React from 'react';
import { motion } from 'framer-motion';

export default function Diyas({ count = 4, className = "" }) {
  const diyaPositions = [
    { left: '8%', bottom: '15px', size: 48, delay: 0 },
    { left: '22%', bottom: '25px', size: 40, delay: 0.6 },
    { right: '22%', bottom: '25px', size: 40, delay: 1.2 },
    { right: '8%', bottom: '15px', size: 48, delay: 0.3 },
  ];

  return (
    <div 
      className={`diyas-container ${className}`}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible'
      }}
    >
      {diyaPositions.slice(0, count).map((diya, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: diya.left,
            right: diya.right,
            bottom: diya.bottom,
            width: `${diya.size}px`,
            height: `${diya.size}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Warm Base Ambient Halo */}
          <motion.div
            animate={{
              opacity: [0.75, 1, 0.8],
              scale: [0.96, 1.06, 0.98],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: diya.delay,
            }}
            style={{
              position: 'absolute',
              top: '-15%',
              left: '-20%',
              width: '140%',
              height: '140%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 180, 50, 0.45) 0%, rgba(230, 90, 20, 0.2) 45%, transparent 75%)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />

          {/* Diya SVG with Animated Flame */}
          <img
            src="/assets/images/diya.svg"
            alt="Diya Lamp"
            className="diya-flame"
            style={{
              width: '100%',
              height: '100%',
              animationDelay: `${diya.delay}s`,
              filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7))',
            }}
          />
        </div>
      ))}
    </div>
  );
}
