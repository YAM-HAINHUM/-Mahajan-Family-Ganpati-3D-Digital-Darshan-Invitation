import React, { useState, useEffect } from 'react';
import CurtainIntro from './components/CurtainIntro';
import HeaderNav from './components/HeaderNav';
import GanpatiDarshan from './components/GanpatiDarshan';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import InvitationCard from './components/InvitationCard';
import EventTimeline from './components/EventTimeline';
import InvitationMessage from './components/InvitationMessage';
import AartiSection from './components/AartiSection';
import PreviousYearsCarousel from './components/PreviousYearsCarousel';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import QRSection from './components/QRSection';
import BlessingsSection from './components/BlessingsSection';
import FloatingControls from './components/FloatingControls';
import MusicPlayer from './components/MusicPlayer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FloatingPetals from './components/FloatingPetals';
import OpeningFlowerShower from './components/OpeningFlowerShower';
import { translations } from './data/translations';
import { aartiData } from './data/aartiData';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('language') || 'mr';
    } catch {
      return 'mr';
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isOpeningAudioSequence, setIsOpeningAudioSequence] = useState(false);
  const [isMusicMinimized, setIsMusicMinimized] = useState(false);

  const t = translations[lang] || translations.mr;

  const handleMandapEntered = (selectedLang) => {
    setLang(selectedLang);
    setHasEntered(true);
    setIsPlaying(true);
    setIsOpeningAudioSequence(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('language', newLang);
    } catch {
      // ignore
    }
  };

  const handleToggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSelectTrack = (index, { automatic = false } = {}) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    if (!automatic) setIsOpeningAudioSequence(false);
  };

  return (
    <div className="min-h-screen relative" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 1. 3D Velvet Curtains Opening Stage */}
      <CurtainIntro onEntered={handleMandapEntered} />

      {/* 2. Sticky Traditional Header Navigation */}
      {hasEntered && (
        <HeaderNav
          lang={lang}
          onToggleLang={handleToggleLang}
          t={t}
          isPlaying={isPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}

      {/* 3. Ambient Floating Marigold Petals */}
      <FloatingPetals />
      {hasEntered && <OpeningFlowerShower />}

      {/* 4. Floating Devotional Controls & Persistent Music Player */}
      {hasEntered && (
        <>
          <FloatingControls
            onToggleMusic={handleToggleMusic}
            onToggleLang={handleToggleLang}
            lang={lang}
            t={t}
          />
          <MusicPlayer
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            onTogglePlay={handleToggleMusic}
            onSelectTrack={handleSelectTrack}
            isOpeningAudioSequence={isOpeningAudioSequence}
            onMinimizedChange={setIsMusicMinimized}
            t={t}
            lang={lang}
          />
          <FloatingWhatsApp lang={lang} isMusicMinimized={isMusicMinimized} />
        </>
      )}

      {/* 5. Main Digital Darshan & Invitation Journey */}
      <main id="main-content" tabIndex="-1">
        {/* Phase 1 & 2: Divine Ganpati Darshan with Mandap */}
        <GanpatiDarshan lang={lang} t={t} />

        {/* Phase 3: Hero Ceremonial Welcome */}
        <Hero t={t} lang={lang} />

        {/* Phase 4: Auspicious Key Ceremony Highlights */}
        <Invitation t={t} lang={lang} />

        {/* Phase 5: Interactive 3D Foldable Physical Invitation Card */}
        <InvitationCard
          t={t}
          lang={lang}
        />

        {/* Phase 6: Sacred Moments & Temple Ritual Timeline */}
        <EventTimeline t={t} lang={lang} />

        {/* Phase 8: Heartfelt Personal Message from Mahajan Family */}
        <InvitationMessage t={t} />

        {/* Phase 9: Sacred Aarti & Stotra Sangrah with Dual-Text Reader */}
        <AartiSection
          t={t}
          lang={lang}
          onSelectTrack={handleSelectTrack}
        />

        {/* Phase 10: Sacred Celebration Gallery and Previous Years Darshan */}
        <PreviousYearsCarousel lang={lang} />

        {/* Phase 11: Mandap Residence Location & Directions */}
        <LocationSection t={t} lang={lang} />

        {/* Phase 12: Family Contacts (Call, WhatsApp, Email) */}
        <ContactSection t={t} lang={lang} />

        {/* Phase 13: Dynamic QR Code & Download QR */}
        <QRSection t={t} lang={lang} />

        {/* Phase 14: Final Emotional Darshan & Closing Blessings */}
        <BlessingsSection t={t} lang={lang} />
      </main>
    </div>
  );
}
