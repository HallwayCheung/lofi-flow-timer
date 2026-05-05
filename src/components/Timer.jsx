import { motion } from 'framer-motion';
import { ProgressRing } from './ProgressRing';

export function Timer({ minutes, seconds, isRunning, mode, progress, isLongBreak }) {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
      {/* Progress ring — fixed size container */}
      <div className="absolute inset-0">
        <ProgressRing progress={progress} mode={mode} />
      </div>

      {/* Timer content — centered inside ring */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={
          isRunning
            ? { scale: [1, 1.012, 1] }
            : { scale: 1 }
        }
        transition={
          isRunning
            ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5, ease: 'easeOut' }
        }
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          key={mode}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-[5.5rem] sm:text-[6.5rem] md:text-[7.5rem] font-extralight tracking-tight leading-none text-white select-none tabular-nums"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {minutes}<span className="opacity-30">:</span>{seconds}
          </span>

          <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] uppercase text-white/30 mt-2">
            {isLongBreak ? '长休息' : mode === 'focus' ? '专注时间' : '休息一下'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
