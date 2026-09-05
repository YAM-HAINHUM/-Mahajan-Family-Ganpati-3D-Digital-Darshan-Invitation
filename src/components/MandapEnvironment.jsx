import React from 'react';

export default function MandapEnvironment({ children }) {
  return (
    <div 
      className="mandap-environment"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2rem 1rem',
      }}
    >
      {/* Traditional Temple Arch Framing Top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(960px, 95vw)',
          height: '48px',
          borderBottom: '2px solid #C99A3D',
          borderRadius: '0 0 50% 50% / 0 0 100% 100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), inset 0 -2px 10px rgba(230, 200, 117, 0.4)',
          background: 'linear-gradient(180deg, rgba(42, 23, 18, 0.8) 0%, rgba(101, 15, 24, 0.4) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Flanking Mandap Pillars (Left & Right subtle vertical pillars) */}
      <div
        style={{
          position: 'absolute',
          top: '2%',
          bottom: '2%',
          left: 'clamp(8px, 3vw, 40px)',
          width: 'clamp(14px, 2vw, 24px)',
          background: 'linear-gradient(90deg, #2A1712 0%, #C99A3D 50%, #4D0911 100%)',
          border: '1px solid rgba(230, 200, 117, 0.3)',
          borderRadius: '4px',
          opacity: 0.4,
          boxShadow: '0 0 15px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '2%',
          bottom: '2%',
          right: 'clamp(8px, 3vw, 40px)',
          width: 'clamp(14px, 2vw, 24px)',
          background: 'linear-gradient(90deg, #4D0911 0%, #C99A3D 50%, #2A1712 100%)',
          border: '1px solid rgba(230, 200, 117, 0.3)',
          borderRadius: '4px',
          opacity: 0.4,
          boxShadow: '0 0 15px rgba(0,0,0,0.8)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Children content (The Darshan Idol + Lights + Pedestal) */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}
