import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';

import { useTimer } from './hooks/useTimer';
import { useAudio } from './hooks/useAudio';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

import { Background } from './components/Background';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { NoiseMenu } from './components/NoiseMenu';
import { ModeSwitcher } from './components/ModeSwitcher';
import { SessionDots } from './components/SessionDots';
import { QuoteDisplay } from './components/QuoteDisplay';
import { CompletionEffect } from './components/CompletionEffect';
import { KeyboardHints } from './components/KeyboardHints';
import { Settings } from './components/Settings';

function playCompletionChime(volume) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.connect(gain);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(volume * 0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1);
      osc.start(t);
      osc.stop(t + 1);
    });
  } catch {
    // AudioContext not available
  }
}

function App() {
  const {
    mode, isRunning, isLongBreak, minutes, seconds,
    progress, settings, updateSettings,
    sessionsCompleted, totalFocusMinutes, sessionInCycle,
    startTimer, pauseTimer, resetTimer, skipTimer,
    setOnComplete, setMode,
  } = useTimer();

  const { activeNoise, playNoise, volume, setVolume } = useAudio();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [completionTrigger, setCompletionTrigger] = useState(0);

  useEffect(() => {
    setOnComplete(() => {
      setCompletionTrigger(t => t + 1);
      if (settings.soundEnabled) {
        playCompletionChime(volume);
      }
    });
  }, [setOnComplete, settings.soundEnabled, volume]);

  const handleToggle = useCallback(() => {
    isRunning ? pauseTimer() : startTimer();
  }, [isRunning, pauseTimer, startTimer]);

  useKeyboardShortcuts({
    onTogglePlayPause: handleToggle,
    onReset: resetTimer,
    onSkip: skipTimer,
    onSelectNoise: playNoise,
  });

  const handleSwitchMode = useCallback((m) => {
    if (isRunning) pauseTimer();
    setMode(m);
  }, [isRunning, pauseTimer, setMode]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      <Background mode={mode} />

      {/* Top-right toolbar */}
      <motion.div
        className="fixed top-5 right-5 sm:top-8 sm:right-8 z-20 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <NoiseMenu
          activeNoise={activeNoise}
          onSelectNoise={playNoise}
          volume={volume}
          onVolumeChange={setVolume}
        />
        <motion.button
          className="glass-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 cursor-pointer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setSettingsOpen(true)}
          aria-label="设置"
        >
          <SettingsIcon size={15} strokeWidth={1.8} />
        </motion.button>
      </motion.div>

      <Settings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        sessionsCompleted={sessionsCompleted}
        totalFocusMinutes={totalFocusMinutes}
      />

      {/* Main content */}
      <main className="flex flex-col items-center gap-6 sm:gap-8 z-10 px-4">
        {/* Glassmorphism card */}
        <motion.div
          className="glass-card relative flex flex-col items-center gap-5 sm:gap-6 px-8 sm:px-12 py-8 sm:py-10 rounded-3xl"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ModeSwitcher
            mode={mode}
            onSwitchMode={handleSwitchMode}
            isLongBreak={isLongBreak}
          />
          <Timer
            minutes={minutes}
            seconds={seconds}
            isRunning={isRunning}
            mode={mode}
            progress={progress}
            isLongBreak={isLongBreak}
          />
          <SessionDots
            sessionInCycle={sessionInCycle}
            sessionsCompleted={sessionsCompleted}
          />
          <CompletionEffect trigger={completionTrigger} mode={mode} />
        </motion.div>

        {/* Controls */}
        <Controls
          isRunning={isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onSkip={skipTimer}
        />

        {/* Quote */}
        <QuoteDisplay sessionIndex={sessionsCompleted} />

        {/* Keyboard hints */}
        <div className="mt-2">
          <KeyboardHints />
        </div>
      </main>
    </div>
  );
}

export default App;
