import React from 'react';
import { Volume2, Globe, Mail, BookOpen } from 'lucide-react';

export default function FloatingControls({ onToggleMusic, onToggleLang, lang, t }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Floating devotional controls"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '20px',
        zIndex: 85,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(38, 5, 10, 0.92)',
        border: '1.5px solid #C99A3D',
        borderRadius: '30px',
        padding: '6px 12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.8), 0 0 15px rgba(201, 154, 61, 0.25)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Music Toggle Button */}
      <button
        onClick={onToggleMusic}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFF3D1',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-marathi)',
        }}
        title={lang === 'mr' ? 'संगीत (Music)' : 'Music'}
      >
        <Volume2 size={16} color="#E6C875" />
        <span className="hide-on-mobile">{lang === 'mr' ? 'संगीत' : 'Music'}</span>
      </button>

      <span style={{ color: 'rgba(201, 154, 61, 0.4)' }}>|</span>

      {/* Language Toggle */}
      <button
        onClick={() => onToggleLang(lang === 'mr' ? 'en' : 'mr')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFF3D1',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-marathi)',
        }}
        title={lang === 'mr' ? 'भाषा बदला (Switch Language)' : 'Switch Language'}
      >
        <Globe size={15} color="#E6C875" />
        <span>{lang === 'mr' ? 'EN' : 'मराठी'}</span>
      </button>

      <span style={{ color: 'rgba(201, 154, 61, 0.4)' }}>|</span>

      {/* Jump to Invitation */}
      <button
        onClick={() => scrollTo('card-section')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFF3D1',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-marathi)',
        }}
        title={lang === 'mr' ? 'आमंत्रण पत्रिका (Invitation)' : 'Invitation' }
      >
        <Mail size={15} color="#E6C875" />
        <span className="hide-on-mobile">{lang === 'mr' ? 'पत्रिका' : 'Invitation'}</span>
      </button>

      <span style={{ color: 'rgba(201, 154, 61, 0.4)' }}>|</span>

      {/* Jump to Aarti */}
      <button
        onClick={() => scrollTo('aarti-section')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#FFF3D1',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-marathi)',
        }}
        title={lang === 'mr' ? 'आरती संग्रह (Aarti)' : 'Aarti'}
      >
        <BookOpen size={15} color="#E6C875" />
        <span className="hide-on-mobile">{lang === 'mr' ? 'आरती' : 'Aarti'}</span>
      </button>
    </aside>
  );
}
