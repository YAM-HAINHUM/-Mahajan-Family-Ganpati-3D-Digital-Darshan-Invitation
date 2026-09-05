import React from 'react';

export default function FloatingLanguage({ currentLang, onToggle }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 90,
        background: 'rgba(53, 7, 12, 0.85)',
        border: '1.5px solid #C99A3D',
        borderRadius: '20px',
        padding: '4px 10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 15px rgba(201, 154, 61, 0.25)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-marathi)',
      }}
    >
      <button
        onClick={() => onToggle('mr')}
        style={{
          background: currentLang === 'mr' ? 'rgba(230, 200, 117, 0.25)' : 'transparent',
          border: 'none',
          color: currentLang === 'mr' ? '#FFF3D1' : '#C99A3D',
          fontWeight: currentLang === 'mr' ? 700 : 500,
          padding: '3px 8px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          transition: 'var(--transition-smooth)',
        }}
      >
        मराठी
      </button>

      <span style={{ color: 'rgba(201, 154, 61, 0.5)', fontSize: '0.8rem' }}>|</span>

      <button
        onClick={() => onToggle('en')}
        style={{
          background: currentLang === 'en' ? 'rgba(230, 200, 117, 0.25)' : 'transparent',
          border: 'none',
          color: currentLang === 'en' ? '#FFF3D1' : '#C99A3D',
          fontWeight: currentLang === 'en' ? 700 : 500,
          padding: '3px 8px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          transition: 'var(--transition-smooth)',
        }}
      >
        EN
      </button>
    </div>
  );
}
