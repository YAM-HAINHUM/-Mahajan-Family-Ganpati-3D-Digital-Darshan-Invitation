import React from 'react';

export default function DecorativeDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center my-10 relative ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2.5rem 0', position: 'relative' }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '28px',
          background: 'radial-gradient(ellipse at center, rgba(230, 200, 117, 0.45) 0%, rgba(201, 154, 61, 0.2) 50%, transparent 80%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, #C99A3D)' }} />
        <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#E6C875', fontSize: '10px' }}>◆</span>
          <img src="/assets/images/diya.svg" alt="Diya" style={{ width: '22px', height: '22px', filter: 'drop-shadow(0 0 6px rgba(230, 200, 117, 0.7))' }} />
          <span style={{ color: '#E6C875', fontSize: '10px' }}>◆</span>
        </div>
        <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, #C99A3D, transparent)' }} />
      </div>
    </div>
  );
}
