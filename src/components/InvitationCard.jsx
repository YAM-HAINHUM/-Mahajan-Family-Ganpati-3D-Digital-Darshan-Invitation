import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Share2, Download, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventData } from '../data/eventData';

export default function InvitationCard({ t, lang = 'mr', onScrollToDownload }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shared, setShared] = useState(false);

  const handleToggleCard = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      // Golden celebratory burst when card unfolds!
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#E6C875', '#FFF3D1', '#FFA726', '#8E1B23'],
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.card.insideTop + ' ' + eventData.familyName,
          text: t.heroInviteText,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <section
      id="card-section"
      style={{
        position: 'relative',
        padding: '4rem 1rem 5rem',
        zIndex: 10,
      }}
    >
      <div className="mandap-container">
        {/* Section Heading */}
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
            {lang === 'mr' ? '✦ पारंपरिक आमंत्रण पत्रिका ✦' : '✦ Traditional Invitation Card ✦'}
          </span>
          <h2
            className="marathi-text"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#FFF3D1',
              fontWeight: 700,
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {t.invitationHeading}
          </h2>
          <p className="marathi-text" style={{ color: '#E6C875', fontSize: '1rem', opacity: 0.9 }}>
            {t.invitationSubheading}
          </p>
        </div>

        {/* Physical 3D Card Envelope Wrapper */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            perspective: '1400px',
            position: 'relative',
          }}
        >
          {/* Closed Envelope View */}
          {!isOpen ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="gold-card"
              onClick={handleToggleCard}
              style={{
                background: 'linear-gradient(145deg, #4A0810 0%, #290407 100%)',
                border: '3px double #C99A3D',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 0 0 30px rgba(201, 154, 61, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner Ornaments */}
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Envelope Flap Fold Line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  height: '40px',
                  borderBottom: '1px solid rgba(230, 200, 117, 0.3)',
                  borderLeft: '1px dashed rgba(230, 200, 117, 0.2)',
                  borderRight: '1px dashed rgba(230, 200, 117, 0.2)',
                  borderRadius: '0 0 50% 50%',
                  pointerEvents: 'none',
                }}
              />

              {/* Central Embossed Gold Ganesha Seal */}
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  margin: '1.5rem auto 1.5rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #E6C875 0%, #C99A3D 60%, #7A5314 100%)',
                  border: '2px solid #FFF3D1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.7), 0 0 25px rgba(230, 200, 117, 0.5)',
                }}
              >
                <img
                  src="/assets/images/diya.svg"
                  alt="Diya Seal"
                  style={{ width: '46px', height: '46px', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))' }}
                />
              </div>

              <h3
                className="marathi-text"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: '#FFF8E8',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(230, 200, 117, 0.4)',
                  marginBottom: '0.5rem',
                }}
              >
                {t.card.closedTitle}
              </h3>

              <p
                className="marathi-text"
                style={{
                  fontSize: '1rem',
                  color: '#E6C875',
                  letterSpacing: '0.06em',
                  marginBottom: '2rem',
                }}
              >
                {t.card.closedSub}
              </p>

              {/* Action Button to Open */}
              <button
                className="gold-btn"
                style={{
                  fontSize: '1.1rem',
                  padding: '0.9rem 2.2rem',
                  letterSpacing: '0.04em',
                }}
              >
                <MailOpen size={20} />
                {t.card.openBtn}
              </button>
            </motion.div>
          ) : (
            /* Open Card View */
            <motion.div
              initial={{ rotateX: -30, opacity: 0, scale: 0.96 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="gold-card"
              id="printable-invitation-card"
              style={{
                background: 'linear-gradient(165deg, #4A0810 0%, #2A0408 50%, #1A0205 100%)',
                border: '3px double #E6C875',
                borderRadius: '12px',
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                textAlign: 'center',
                boxShadow: '0 30px 70px rgba(0,0,0,0.9), inset 0 0 50px rgba(201, 154, 61, 0.25)',
                position: 'relative',
              }}
            >
              {/* Corner Ornaments */}
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Top Invocation */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img
                  src="/assets/images/diya.svg"
                  alt="Diya"
                  style={{ width: '42px', height: '42px', filter: 'drop-shadow(0 0 10px rgba(230, 200, 117, 0.8))' }}
                />
              </div>

              <h2
                className="marathi-text"
                style={{
                  fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#FFF8E8',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(230, 200, 117, 0.6)',
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                }}
              >
                {t.card.insideTop}
              </h2>

              <p
                className="marathi-text"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#F8F0DC',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                {t.card.insideSub}
              </p>

              {/* Family Highlight Box */}
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(201, 154, 61, 0.15)',
                  border: '1.5px solid #E6C875',
                  borderRadius: '8px',
                  padding: '0.6rem 2rem',
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  className="marathi-text"
                  style={{
                    fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                    color: '#FFF3D1',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  {lang === 'mr' ? eventData.familyNameMr : eventData.familyName}
                </span>
              </div>

              <p
                className="marathi-text"
                style={{
                  fontSize: '1.1rem',
                  color: '#F8F0DC',
                  marginBottom: '2rem',
                }}
              >
                {t.card.insideInvite}
              </p>

              {/* Ornamental Gold Divider */}
              <div
                style={{
                  width: '200px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #E6C875, transparent)',
                  margin: '0 auto 2rem',
                }}
              />

              {/* Event Timings in Card */}
              <div
                style={{
                  background: 'rgba(26, 4, 7, 0.7)',
                  border: '1px solid rgba(230, 200, 117, 0.3)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  maxWidth: '480px',
                  margin: '0 auto 2rem',
                }}
              >
                <div
                  className="marathi-text"
                  style={{
                    fontSize: '1.15rem',
                    color: '#FFF8E8',
                    fontWeight: 600,
                    marginBottom: '0.6rem',
                  }}
                >
                  🌸 {t.card.insideSthapana}
                </div>
              </div>

              {/* Heartfelt Note */}
              <p
                className="marathi-text"
                style={{
                  fontSize: '1.05rem',
                  color: '#FFF3D1',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                "{t.card.insideBlessing}"
              </p>

              <div
                className="marathi-text"
                style={{
                  fontSize: '1.4rem',
                  color: '#E6C875',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  marginBottom: '2.5rem',
                }}
              >
                {t.card.insideMorya}
              </div>

              {/* Card Action Controls */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: 'center',
                }}
              >
                <button onClick={handleToggleCard} className="gold-btn-outline">
                  <Mail size={18} />
                  {t.card.closeBtn}
                </button>

                <button onClick={onScrollToDownload} className="gold-btn">
                  <Download size={18} />
                  {t.download.title}
                </button>

                <button onClick={handleShare} className="gold-btn-outline">
                  {shared ? <Check size={18} color="#4ADE80" /> : <Share2 size={18} />}
                  {shared ? t.linkCopied : t.shareBtn}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
