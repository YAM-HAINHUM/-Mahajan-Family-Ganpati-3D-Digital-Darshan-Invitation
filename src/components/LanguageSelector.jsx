import React from 'react';
import { motion } from 'framer-motion';

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <div className="curtain-center-seal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}
      >
        {/* Sacred Diya Emblem */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '64px', height: '64px', marginBottom: '0.25rem' }}
        >
          <img
            src="/assets/images/diya.svg"
            alt="Sacred Diya"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 0 16px rgba(230, 200, 117, 0.9))'
            }}
          />
        </motion.div>

        {/* Sacred Salutation */}
        <div style={{ textAlign: 'center' }}>
          <h1
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: '#FFF3D1',
              textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 25px rgba(230, 200, 117, 0.65)',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem'
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </h1>
          <p
            className="marathi-text"
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: '#E6C875',
              letterSpacing: '0.05em',
              opacity: 0.9
            }}
          >
            महाजन परिवाराचे डिजिटल गणेशोत्सव आमंत्रण
          </p>
        </div>

        {/* Decorative Gold Filigree Divider */}
        <div
          style={{
            width: '180px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C99A3D, #FFF3D1, #C99A3D, transparent)',
            margin: '0.5rem 0 1.25rem'
          }}
        />

        {/* Language Selection Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="gold-btn"
            onClick={() => onSelectLanguage('mr')}
            style={{ minWidth: '150px', fontSize: '1.1rem' }}
            aria-label="मराठी भाषा निवडा"
          >
            मराठी
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="gold-btn-outline"
            onClick={() => onSelectLanguage('en')}
            style={{ minWidth: '150px', fontSize: '1.05rem', letterSpacing: '0.05em' }}
            aria-label="Select English Language"
          >
            English
          </motion.button>
        </div>

        <p
          style={{
            fontSize: '0.8rem',
            color: '#C99A3D',
            marginTop: '0.5rem',
            opacity: 0.75,
            letterSpacing: '0.05em'
          }}
        >
          स्पर्शाने मंगल प्रवेश करा • Tap to enter mandap
        </p>
      </motion.div>
    </div>
  );
}
