import { motion } from 'framer-motion';
import { Particles } from './Particles';

const gradients = {
  focus: {
    background: `
      radial-gradient(ellipse at 20% 20%, rgba(88, 28, 135, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(30, 10, 60, 0.3) 0%, transparent 50%),
      linear-gradient(160deg, #12061f 0%, #0a0a14 50%, #08060e 100%)
    `,
  },
  break: {
    background: `
      radial-gradient(ellipse at 30% 30%, rgba(13, 115, 119, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(20, 160, 133, 0.15) 0%, transparent 50%),
      linear-gradient(160deg, #071e2e 0%, #0a2d3f 40%, #0a3d42 100%)
    `,
  },
};

export function Background({ mode }) {
  return (
    <motion.div
      className="fixed inset-0 -z-10 noise-overlay"
      animate={gradients[mode]}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top-left soft light */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.025) 0%, transparent 55%)',
        }}
      />
      {/* Bottom-right vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 75% 85%, rgba(0,0,0,0.2) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  );
}
