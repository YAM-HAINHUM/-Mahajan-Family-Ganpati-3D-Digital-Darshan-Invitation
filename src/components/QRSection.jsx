import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QRSection({ t, lang = 'mr' }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [shared, setShared] = useState(false);
  const [qrDownloaded, setQrDownloaded] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E6C875', '#FFA726', '#8E1B23', '#FFF3D1'],
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: '॥ श्री गणेशाय नमः ॥ महाजन परिवार गणेशोत्सव आमंत्रण २०२६',
          text: 'आमचे घर, आपली उपस्थिती — श्री गणपती बाप्पांच्या दर्शनासाठी सस्नेह आमंत्रण.',
          url: currentUrl || window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard?.writeText(currentUrl || window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    const image = qrRef.current?.querySelector('img');
    if (image) {
      const link = document.createElement('a');
      link.download = 'Mahajan_Family_Ganpati_QR.png';
      link.href = image.src;
      link.click();
      setQrDownloaded(true);
      setTimeout(() => setQrDownloaded(false), 2500);
    }
  };

  return (
    <section
      id="qr-section"
      style={{
        position: 'relative',
        padding: '3rem 1rem 4rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              color: '#C99A3D',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-marathi)',
            }}
          >
            {lang === 'mr' ? '✦ डिजिटल आमंत्रण ✦' : '✦ Digital Invitation ✦'}
          </span>
          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#FFF3D1',
              fontWeight: 700,
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {t.qrTitle}
          </h2>
          <p
            className="marathi-text"
            style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}
          >
            {t.qrSub}
          </p>
        </div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="gold-card"
          style={{
            maxWidth: '440px',
            margin: '0 auto',
            borderRadius: '12px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Gold Framed Canvas */}
          <div
            ref={qrRef}
            style={{
              padding: '16px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '3px solid #C99A3D',
              boxShadow: '0 8px 30px rgba(0,0,0,0.8), 0 0 25px rgba(230, 200, 117, 0.4)',
              position: 'relative',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ position: 'absolute', top: '-14px', left: '-14px' }}>
              <img src="/assets/images/diya.svg" alt="diya" style={{ width: '28px', height: '28px' }} />
            </div>
            <div style={{ position: 'absolute', top: '-14px', right: '-14px' }}>
              <img src="/assets/images/diya.svg" alt="diya" style={{ width: '28px', height: '28px' }} />
            </div>

            <img
              src="/assets/images/maps.png"
              alt="QR code for the Ganpati invitation location"
              width="200"
              height="200"
              style={{ display: 'block', objectFit: 'contain' }}
            />
          </div>

          <p className="marathi-text" style={{ fontSize: '0.9rem', color: '#FFF3D1', marginBottom: '1.5rem', opacity: 0.9 }}>
              {lang === 'mr' ? 'स्मार्टफोनच्या कॅमेऱ्याने स्कॅन करा' : 'Scan with your smartphone camera'}
          </p>

          {/* Action Buttons: Share & Download QR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>
            <button onClick={handleShare} className="gold-btn">
              {shared ? <Check size={18} color="#2A1712" /> : <Share2 size={18} />}
              {shared ? t.linkCopied : t.shareBtn}
            </button>

            <button onClick={handleDownloadQR} className="gold-btn-outline">
              {qrDownloaded ? <Check size={18} color="#4ADE80" /> : <Download size={18} />}
              {qrDownloaded ? (lang === 'mr' ? 'QR डाऊनलोड झाला!' : 'QR downloaded!') : t.downloadQrBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
