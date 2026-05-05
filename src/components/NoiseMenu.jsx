import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, X } from 'lucide-react';
import { NOISE_OPTIONS } from '../hooks/useAudio';

export function NoiseMenu({ activeNoise, onSelectNoise, volume, onVolumeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        className={`glass-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center cursor-pointer ${
          activeNoise ? 'text-white' : 'text-white/40 hover:text-white/70'
        }`}
        style={activeNoise ? {
          background: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.12)',
        } : undefined}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="白噪音"
      >
        {isOpen ? <X size={15} strokeWidth={1.8} /> : <Music size={15} strokeWidth={1.8} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-full mt-3 w-52 rounded-2xl overflow-hidden glass-panel"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-1.5">
              <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/20 px-3 pt-2.5 pb-1.5">
                白噪音
              </p>
              {NOISE_OPTIONS.map((noise) => {
                const active = activeNoise === noise.id;
                return (
                  <motion.button
                    key={noise.id}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] cursor-pointer border-0 outline-none transition-all ${
                      active
                        ? 'text-white'
                        : 'text-white/45 hover:text-white/70'
                    }`}
                    style={active ? { background: 'rgba(255,255,255,0.08)' } : { background: 'transparent' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectNoise(noise.id)}
                  >
                    {active ? (
                      <Volume2 size={13} className="text-white/60 shrink-0" />
                    ) : (
                      <div className="w-3 h-3 shrink-0 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                    )}
                    <span>{noise.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Volume */}
            <div className="mx-3 border-t border-white/[0.05]" />
            <div className="p-3 px-4 flex items-center gap-2.5">
              {volume > 0 ? (
                <Volume2 size={13} className="text-white/25 shrink-0" />
              ) : (
                <VolumeX size={13} className="text-white/25 shrink-0" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-[9px] text-white/20 w-7 text-right tabular-nums font-light">
                {Math.round(volume * 100)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
