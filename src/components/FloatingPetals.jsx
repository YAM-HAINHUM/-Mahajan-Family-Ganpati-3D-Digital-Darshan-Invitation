import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingPetals({ count: propCount }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const count = propCount ?? (isMobile ? 8 : 16);

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      xStart: Math.random() * 92 + 4, // 4% to 96%
      xEnd: (Math.random() * 92 + 4) + (Math.random() * 16 - 8),
      size: Math.random() * 8 + 10, // 10px to 18px
      duration: Math.random() * 8 + 10, // 10s to 18s drift
      delay: Math.random() * 10,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 720,
      color: Math.random() > 0.4 ? '#FFA726' : '#FF7043', // Marigold orange and saffron
      opacity: Math.random() * 0.4 + 0.45,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            top: '-5%',
            left: `${petal.xStart}%`,
            rotate: petal.rotateStart,
            opacity: 0,
          }}
          animate={{
            top: '105%',
            left: `${petal.xEnd}%`,
            rotate: petal.rotateEnd,
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            borderRadius: '50% 50% 50% 0',
            background: `radial-gradient(circle at 30% 30%, #FFE082, ${petal.color})`,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            filter: 'blur(0.4px)',
          }}
        />
      ))}
    </div>
  );
}
