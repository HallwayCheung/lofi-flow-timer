import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export function Controls({ isRunning, onStart, onPause, onReset, onSkip }) {
  return (
    <motion.div
      className="flex items-center gap-4 sm:gap-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Reset */}
      <motion.button
        className="glass-btn w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white/45 hover:text-white/75 cursor-pointer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={onReset}
        aria-label="重置"
      >
        <RotateCcw size={16} strokeWidth={1.8} />
      </motion.button>

      {/* Play / Pause — hero button */}
      <motion.button
        className="relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-full flex items-center justify-center cursor-pointer border-0 outline-none text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.04) inset,
            0 1px 2px rgba(255,255,255,0.06) inset,
            0 8px 24px -6px rgba(0,0,0,0.3),
            0 0 40px -10px rgba(167,139,250,0.15)
          `,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.06) inset,
            0 1px 2px rgba(255,255,255,0.08) inset,
            0 12px 32px -6px rgba(0,0,0,0.35),
            0 0 50px -10px rgba(167,139,250,0.25)
          `,
        }}
        whileTap={{ scale: 0.94 }}
        onClick={isRunning ? onPause : onStart}
        aria-label={isRunning ? '暂停' : '播放'}
      >
        {isRunning ? (
          <Pause size={22} strokeWidth={2} />
        ) : (
          <Play size={22} strokeWidth={2} className="ml-0.5" />
        )}
      </motion.button>

      {/* Skip */}
      <motion.button
        className="glass-btn w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white/45 hover:text-white/75 cursor-pointer"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={onSkip}
        aria-label="跳过"
      >
        <SkipForward size={16} strokeWidth={1.8} />
      </motion.button>
    </motion.div>
  );
}
