import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Maximize2, Music } from 'lucide-react';
import { aartiData } from '../data/aartiData';

export default function MusicPlayer({ currentTrackIndex = 0, isPlaying, onTogglePlay, onSelectTrack, isOpeningAudioSequence = false, onMinimizedChange, t, lang = 'mr' }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [minimized, setMinimized] = useState(false);

  const currentTrack = aartiData[currentTrackIndex] || aartiData[0];

  useEffect(() => {
    onMinimizedChange?.(minimized);
  }, [minimized, onMinimizedChange]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log('Audio playback prevented:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % aartiData.length;
    onSelectTrack(nextIdx);
  };

  const handleTrackEnded = () => {
    if (isOpeningAudioSequence && currentTrackIndex === 0) {
      onSelectTrack(1, { automatic: true });
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + aartiData.length) % aartiData.length;
    onSelectTrack(prevIdx);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && duration > 0) {
      setProgress((audioRef.current.currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = pos * duration;
      setProgress(pos * 100);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 85,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc}
        loop={isOpeningAudioSequence && currentTrackIndex === 1}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
      />

      <AnimatePresence>
        {minimized ? (
          /* Minimized Diya Pill */
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setMinimized(false)}
              role="button"
              tabIndex={0}
              aria-label="Open music player"
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setMinimized(false);
              }}
              style={{
                background: 'linear-gradient(135deg, #4A0810 0%, #240509 100%)',
                border: '1.5px solid #C99A3D',
                borderRadius: '24px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.8), 0 0 15px rgba(201, 154, 61, 0.3)',
              }}
            >
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ width: '19px', height: '19px' }}
              >
                <img src="/assets/images/diya.svg" alt="Diya" style={{ width: '100%', height: '100%' }} />
              </motion.div>
              <span className="marathi-text" style={{ maxWidth: '150px', fontSize: '0.76rem', color: '#FFF8E8', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lang === 'mr' ? currentTrack.titleMr : currentTrack.titleEn}
              </span>
              <Maximize2 size={14} color="#E6C875" />
            </motion.div>
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              style={{
                width: '32px',
                height: '32px',
                padding: 0,
                borderRadius: '50%',
                border: '1.5px solid #C99A3D',
                background: 'linear-gradient(180deg, #E6C875 0%, #C99A3D 100%)',
                color: '#2A0408',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 5px 12px rgba(0,0,0,0.65)',
              }}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '1px' }} />}
            </button>
          </div>
        ) : (
          /* Full Devotional Player */
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            style={{
              background: 'linear-gradient(145deg, rgba(62, 9, 16, 0.96) 0%, rgba(32, 5, 8, 0.98) 100%)',
              border: '2px solid #C99A3D',
              borderRadius: '12px',
              padding: '10px 12px',
              width: 'clamp(250px, 78vw, 290px)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.9), 0 0 25px rgba(201, 154, 61, 0.25)',
              backdropFilter: 'blur(10px)',
              color: '#FFF8E8',
              position: 'relative',
            }}
          >
            {/* Top Bar: Now Playing & Minimize Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: '#E6C875', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {isPlaying ? '▶ NOW PLAYING' : '⏸ PAUSED'}
                </span>
              </div>
              <button
                onClick={() => setMinimized(true)}
                style={{ background: 'transparent', border: 'none', color: '#C99A3D', cursor: 'pointer', padding: '2px' }}
                aria-label="Minimize Player"
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Track Title */}
            <div style={{ marginBottom: '10px' }}>
              <h4
                className="marathi-text"
                style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF3D1', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {lang === 'mr' ? currentTrack.titleMr : currentTrack.titleEn}
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#C99A3D', opacity: 0.85 }}>
                {currentTrack.category}
              </span>
            </div>

            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              style={{
                width: '100%',
                height: '5px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
                cursor: 'pointer',
                marginBottom: '12px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #C99A3D 0%, #FFF3D1 100%)',
                  borderRadius: '3px',
                }}
              />
            </div>

            {/* Player Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                style={{ background: 'transparent', border: 'none', color: isMuted ? '#8E1B23' : '#E6C875', cursor: 'pointer' }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Playback Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={handlePrev}
                  style={{ background: 'transparent', border: 'none', color: '#FFF3D1', cursor: 'pointer' }}
                  aria-label="Previous Chant"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  onClick={onTogglePlay}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #E6C875 0%, #C99A3D 100%)',
                    border: '1px solid #FFF3D1',
                    color: '#2A0408',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                  }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                <button
                  onClick={handleNext}
                  style={{ background: 'transparent', border: 'none', color: '#FFF3D1', cursor: 'pointer' }}
                  aria-label="Next Chant"
                >
                  <SkipForward size={18} />
                </button>
              </div>

              {/* Diya Icon */}
              <img src="/assets/images/diya.svg" alt="Diya" style={{ width: '22px', height: '22px' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
