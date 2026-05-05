import { useRef } from 'react';
import { motion } from 'framer-motion';

function createParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 14,
    opacity: 0.02 + Math.random() * 0.05,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * -25,
    driftX: -20 + Math.random() * 40,
    driftY: -30 + Math.random() * -60,
  }));
}

export function Particles({ mode }) {
  const particles = useRef(createParticles(18)).current;

  const getColor = (opacity) => {
    return mode === 'focus'
      ? `rgba(167, 139, 250, ${opacity})`
      : `rgba(94, 234, 212, ${opacity})`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${getColor(p.opacity)} 0%, transparent 70%)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
