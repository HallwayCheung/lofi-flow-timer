import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function createBurst(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 50 + Math.random() * 80;
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      size: 2 + Math.random() * 3,
      duration: 0.5 + Math.random() * 0.4,
      delay: Math.random() * 0.08,
    };
  });
}

export function CompletionEffect({ trigger, mode }) {
  const particles = useMemo(() => createBurst(14), []);
  const color = mode === 'focus' ? '#a78bfa' : '#5eead4';

  return (
    <AnimatePresence>
      {trigger > 0 && (
        <motion.div
          key={trigger}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Ring pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 160,
              height: 160,
              border: `1px solid ${color}`,
              opacity: 0.3,
            }}
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Soft glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
            }}
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: color,
                boxShadow: `0 0 6px ${color}80`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              transition={{ duration: p.duration, ease: 'easeOut', delay: p.delay }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
