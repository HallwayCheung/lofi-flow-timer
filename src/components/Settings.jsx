import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

const FOCUS_OPTIONS = [
  { label: '15', value: 15 * 60 },
  { label: '25', value: 25 * 60 },
  { label: '30', value: 30 * 60 },
  { label: '45', value: 45 * 60 },
  { label: '60', value: 60 * 60 },
];

const BREAK_OPTIONS = [
  { label: '5', value: 5 * 60 },
  { label: '10', value: 10 * 60 },
  { label: '15', value: 15 * 60 },
];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-[13px] text-white/50 group-hover:text-white/65 transition-colors font-light">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-[22px] rounded-full transition-all cursor-pointer border-0 outline-none ${
          checked ? 'toggle-active' : 'bg-white/[0.08]'
        }`}
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <motion.div
          className="absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
          animate={{ x: checked ? 18 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </label>
  );
}

function PillGroup({ options, value, onChange, suffix }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            className={`px-3 py-1.5 rounded-lg text-[13px] cursor-pointer border-0 outline-none transition-all font-light ${
              active
                ? 'pill-active text-white'
                : 'text-white/35 hover:text-white/55'
            }`}
            style={active ? {} : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}{suffix}
          </button>
        );
      })}
    </div>
  );
}

export function Settings({ isOpen, onClose, settings, onUpdateSettings, sessionsCompleted, totalFocusMinutes }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-[340px] z-50 overflow-y-auto"
            style={{
              background: 'rgba(8, 8, 16, 0.92)',
              backdropFilter: 'blur(40px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.3)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className="p-6 sm:p-8 flex flex-col gap-7">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-white/80 tracking-wide">设置</h2>
                <motion.button
                  className="glass-btn w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  <X size={15} strokeWidth={1.8} />
                </motion.button>
              </div>

              {/* Focus Duration */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/22">专注时长</span>
                <PillGroup
                  options={FOCUS_OPTIONS}
                  value={settings.focusDuration}
                  onChange={(v) => onUpdateSettings({ focusDuration: v })}
                  suffix=" 分钟"
                />
              </div>

              {/* Break Duration */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/22">休息时长</span>
                <PillGroup
                  options={BREAK_OPTIONS}
                  value={settings.breakDuration}
                  onChange={(v) => onUpdateSettings({ breakDuration: v })}
                  suffix=" 分钟"
                />
              </div>

              {/* Volume */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/22">音量</span>
                <div className="flex items-center gap-3">
                  {settings.volume > 0 ? (
                    <Volume2 size={15} className="text-white/30 shrink-0" />
                  ) : (
                    <VolumeX size={15} className="text-white/30 shrink-0" />
                  )}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.volume}
                    onChange={(e) => onUpdateSettings({ volume: parseFloat(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-[11px] text-white/25 w-8 text-right tabular-nums font-light">
                    {Math.round(settings.volume * 100)}%
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-4">
                <Toggle
                  checked={settings.autoStart}
                  onChange={(v) => onUpdateSettings({ autoStart: v })}
                  label="自动开始下一轮"
                />
                <Toggle
                  checked={settings.soundEnabled}
                  onChange={(v) => onUpdateSettings({ soundEnabled: v })}
                  label="完成提示音"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.04]" />

              {/* Stats */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/22">今日统计</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div
                    className="flex flex-col items-center py-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span className="text-xl font-extralight text-white/80 tabular-nums">{sessionsCompleted}</span>
                    <span className="text-[10px] text-white/20 mt-1 font-light">番茄完成</span>
                  </div>
                  <div
                    className="flex flex-col items-center py-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <span className="text-xl font-extralight text-white/80 tabular-nums">{totalFocusMinutes}</span>
                    <span className="text-[10px] text-white/20 mt-1 font-light">专注分钟</span>
                  </div>
                </div>
              </div>

              {/* Keyboard shortcuts */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/22">快捷键</span>
                <div className="grid grid-cols-2 gap-y-2.5 text-[11px]">
                  {[
                    { key: 'Space', label: '播放 / 暂停' },
                    { key: 'R', label: '重置' },
                    { key: 'S', label: '跳过' },
                    { key: '1-3', label: '白噪音' },
                  ].map(item => (
                    <span key={item.key} className="flex items-center gap-2 text-white/30 font-light">
                      <kbd
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}
                      >
                        {item.key}
                      </kbd>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
