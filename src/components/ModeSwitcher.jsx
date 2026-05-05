import { motion } from 'framer-motion';

export function ModeSwitcher({ mode, onSwitchMode, isLongBreak }) {
  const breakLabel = isLongBreak ? '长休息' : '休息';

  return (
    <div className="flex rounded-full p-1 gap-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}>
      {[
        { key: 'focus', label: '专注' },
        { key: 'break', label: breakLabel },
      ].map(tab => (
        <button
          key={tab.key}
          className="relative px-5 sm:px-6 py-1.5 text-[11px] sm:text-xs font-medium rounded-full cursor-pointer border-0 outline-none transition-colors"
          style={{
            background: 'transparent',
            color: mode === tab.key ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
          }}
          onClick={() => onSwitchMode(tab.key)}
        >
          {mode === tab.key && (
            <motion.div
              layoutId="mode-pill"
              className="absolute inset-0 rounded-full pill-active"
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
