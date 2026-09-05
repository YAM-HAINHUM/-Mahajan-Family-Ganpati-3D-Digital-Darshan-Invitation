import React from 'react';
import { motion } from 'framer-motion';

const openingFlowers = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: 3 + ((index * 37) % 94),
  drift: (index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 7),
  size: 9 + (index % 4) * 3,
  delay: (index % 7) * 0.08,
  duration: 1.8 + (index % 6) * 0.14,
  rotate: (index * 47) % 360,
  color: index % 3 === 0 ? '#FF7043' : '#FFA726',
}));

export default function OpeningFlowerShower() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {openingFlowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{
            top: '-8%',
            left: `${flower.left}%`,
            x: 0,
            rotate: flower.rotate,
            opacity: 0,
          }}
          animate={{
            top: '112%',
            left: `${flower.left}%`,
            x: flower.drift,
            rotate: flower.rotate + 460,
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            ease: 'easeIn',
          }}
          style={{
            position: 'absolute',
            width: `${flower.size}px`,
            height: `${flower.size * 1.35}px`,
            borderRadius: '55% 55% 55% 8%',
            background: `radial-gradient(circle at 30% 25%, #FFE082, ${flower.color} 72%)`,
            boxShadow: '0 2px 7px rgba(75, 20, 4, 0.45)',
          }}
        />
      ))}
    </div>
  );
}
