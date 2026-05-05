import { motion } from 'framer-motion';

export function SessionDots({ sessionInCycle, sessionsCompleted }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3].map(i => {
          const filled = i < sessionInCycle;
          return (
            <motion.div
              key={i}
              className="rounded-full relative"
              style={{ width: 9, height: 9 }}
              animate={{
                scale: filled ? [1, 1.3, 1.1] : 1,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Glow layer */}
              {filled && (
                <motion.div
                  className="absolute inset-[-4px] rounded-full"
                  style={{ background: 'rgba(167, 139, 250, 0.25)', filter: 'blur(4px)' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {/* Dot */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: filled
                    ? 'linear-gradient(135deg, #c4b5fd, #a78bfa)'
                    : 'rgba(255,255,255,0.06)',
                  border: filled ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              />
            </motion.div>
          );
        })}
      </div>
      {sessionsCompleted > 0 && (
        <motion.span
          className="text-[10px] tracking-widest text-white/20 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          已完成 {sessionsCompleted} 个番茄
        </motion.span>
      )}
    </div>
  );
}
