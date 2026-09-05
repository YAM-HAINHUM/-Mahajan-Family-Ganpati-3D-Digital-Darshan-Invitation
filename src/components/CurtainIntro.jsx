import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

export default function CurtainIntro({ onEntered }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleLanguageSelect = (lang) => {
    setIsOpen(true);
    // Persist language selection
    try {
      localStorage.setItem('language', lang);
    } catch {
      // ignore
    }
    // Notify parent to start audio, scroll to top, and set language
    onEntered(lang);

    // After animation finishes (2.2s), remove curtain from DOM so it doesn't block scroll
    setTimeout(() => {
      setIsRemoved(true);
    }, 2300);
  };

  if (isRemoved) return null;

  return (
    <AnimatePresence>
      <div className="curtain-wrapper" aria-hidden={isOpen}>
        {/* Warm Golden Light Burst during opening transition */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.65, 0] }}
            transition={{ duration: 1.8, times: [0, 0.35, 1], ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'radial-gradient(circle at 50% 40%, rgba(255, 243, 209, 0.85) 0%, rgba(230, 200, 117, 0.5) 45%, rgba(142, 27, 35, 0.2) 75%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 104,
            }}
          />
        )}

        {/* Top Decorative Toran / Pelmet */}
        <motion.div 
          className="curtain-pelmet"
          animate={isOpen ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#E6C875', fontSize: '12px' }}>🪔</span>
            <span className="marathi-text" style={{ color: '#FFF3D1', fontSize: '15px', letterSpacing: '0.1em', fontWeight: 600 }}>
              ॥ मंगलमूर्ती मोरया ॥
            </span>
            <span style={{ color: '#E6C875', fontSize: '12px' }}>🪔</span>
          </div>
        </motion.div>

        {/* Center Seal / Language Selector */}
        {!isOpen && (
          <LanguageSelector onSelectLanguage={handleLanguageSelect} />
        )}

        {/* Left Curtain */}
        <motion.div
          className="curtain-panel curtain-left"
          initial={{ transform: 'perspective(1400px) rotateY(0deg) translateX(0%) scale(1)' }}
          animate={
            isOpen
              ? {
                  transform: 'perspective(1400px) rotateY(-42deg) translateX(-108%) scale(1.06)',
                  opacity: [1, 0.95, 0.85, 0],
                }
              : { transform: 'perspective(1400px) rotateY(0deg) translateX(0%) scale(1)', opacity: 1 }
          }
          transition={{
            duration: 2.2,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <div className="curtain-folds" />
          <div className="curtain-texture" />
          {/* Subtle bottom golden fringe */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '14px',
              background: 'repeating-linear-gradient(90deg, #C99A3D 0px, #C99A3D 6px, #42080E 6px, #42080E 10px)',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.6)'
            }} 
          />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          className="curtain-panel curtain-right"
          initial={{ transform: 'perspective(1400px) rotateY(0deg) translateX(0%) scale(1)' }}
          animate={
            isOpen
              ? {
                  transform: 'perspective(1400px) rotateY(42deg) translateX(108%) scale(1.06)',
                  opacity: [1, 0.95, 0.85, 0],
                }
              : { transform: 'perspective(1400px) rotateY(0deg) translateX(0%) scale(1)', opacity: 1 }
          }
          transition={{
            duration: 2.2,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          <div className="curtain-folds" />
          <div className="curtain-texture" />
          {/* Subtle bottom golden fringe */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '14px',
              background: 'repeating-linear-gradient(90deg, #C99A3D 0px, #C99A3D 6px, #42080E 6px, #42080E 10px)',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.6)'
            }} 
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
