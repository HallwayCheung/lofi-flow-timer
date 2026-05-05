import { motion } from 'framer-motion';

const RADIUS = 138;
const STROKE = 2;
const VIEWBOX = 320;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressRing({ progress, mode }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));
  const color = mode === 'focus' ? '#a78bfa' : '#5eead4';
  const glowColor = mode === 'focus' ? 'rgba(167,139,250,0.2)' : 'rgba(94,234,212,0.2)';

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="w-full h-full"
      style={{ transform: 'rotate(-90deg)' }}
    >
      <defs>
        <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="ring-gradient-focus" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="ring-gradient-break" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#99f6e4" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>

      {/* Background track — subtle dashes */}
      <circle
        cx={VIEWBOX / 2}
        cy={VIEWBOX / 2}
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={STROKE}
        strokeDasharray="4 8"
      />

      {/* Progress arc — gradient + glow */}
      <motion.circle
        cx={VIEWBOX / 2}
        cy={VIEWBOX / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE + 0.5}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        filter="url(#ring-glow)"
        animate={{
          stroke: mode === 'focus' ? 'url(#ring-gradient-focus)' : 'url(#ring-gradient-break)',
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Endpoint dot */}
      {progress > 0.01 && (
        <motion.circle
          cx={VIEWBOX / 2 + RADIUS * Math.cos(2 * Math.PI * progress - Math.PI / 2 + Math.PI / 2)}
          cy={VIEWBOX / 2 + RADIUS * Math.sin(2 * Math.PI * progress - Math.PI / 2 + Math.PI / 2)}
          r={3}
          fill={color}
          filter="url(#ring-glow)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'rotate(90deg)', transformOrigin: `${VIEWBOX / 2}px ${VIEWBOX / 2}px` }}
        />
      )}
    </svg>
  );
}
