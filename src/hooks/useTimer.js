import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_SETTINGS = {
  focusDuration: 25 * 60,
  breakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  autoStart: true,
  volume: 0.6,
  soundEnabled: true,
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getTotalDuration(mode, isLongBreak, settings) {
  if (isLongBreak) return settings.longBreakDuration;
  return mode === 'focus' ? settings.focusDuration : settings.breakDuration;
}

export function useTimer() {
  const [settings, setSettings] = useLocalStorage('lofi-settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage('lofi-stats', {
    date: getToday(),
    sessionsCompleted: 0,
    totalFocusMinutes: 0,
  });
  const [mode, setMode] = useState('focus');
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [sessionInCycle, setSessionInCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);
  const onCompleteRef = useRef(null);

  // Daily reset
  useEffect(() => {
    if (stats.date !== getToday()) {
      setStats({ date: getToday(), sessionsCompleted: 0, totalFocusMinutes: 0 });
    }
  }, [stats.date, setStats]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    endTimeRef.current = null;
  }, []);

  const totalDuration = getTotalDuration(mode, isLongBreak, settings);
  const progress = totalDuration > 0 ? 1 - timeLeft / totalDuration : 0;

  const sessionsCompleted = stats.sessionsCompleted;
  const totalFocusMinutes = stats.totalFocusMinutes;

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    endTimeRef.current = Date.now() + timeLeft * 1000;

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearTimer();
        setIsRunning(false);
        onCompleteRef.current?.();
        setMode(prev => {
          if (prev === 'focus') {
            return 'break';
          }
          return 'focus';
        });
      }
    }, 200);
  }, [timeLeft, clearTimer]);

  const pauseTimer = useCallback(() => {
    clearTimer();
    if (endTimeRef.current !== null) {
      setTimeLeft(Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000)));
    }
    setIsRunning(false);
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(getTotalDuration(mode, isLongBreak, settings));
  }, [mode, isLongBreak, settings, clearTimer]);

  const skipTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    onCompleteRef.current?.();
    setMode(prev => (prev === 'focus' ? 'break' : 'focus'));
  }, [clearTimer]);

  // Mode change effect: set new time, handle session tracking, auto-start
  useEffect(() => {
    if (mode === 'focus') {
      // Coming from a break — not a long break anymore
      setIsLongBreak(false);
      setSessionInCycle(0);
      setTimeLeft(settings.focusDuration);
    } else {
      // mode === 'break': a focus session just completed
      setStats(prev => {
        const today = getToday();
        if (prev.date !== today) {
          return {
            date: today,
            sessionsCompleted: 1,
            totalFocusMinutes: Math.round(settings.focusDuration / 60),
          };
        }
        return {
          ...prev,
          sessionsCompleted: prev.sessionsCompleted + 1,
          totalFocusMinutes: prev.totalFocusMinutes + Math.round(settings.focusDuration / 60),
        };
      });

      setSessionInCycle(prev => {
        const next = prev + 1;
        if (next >= 4) {
          setIsLongBreak(true);
          setTimeLeft(settings.longBreakDuration);
          return 0;
        }
        setTimeLeft(settings.breakDuration);
        return next;
      });
    }

    if (settings.autoStart) {
      const t = setTimeout(() => {
        const dur = mode === 'focus'
          ? settings.focusDuration
          : (isLongBreak ? settings.longBreakDuration : settings.breakDuration);
        setTimeLeft(dur);
        setIsRunning(true);
        endTimeRef.current = Date.now() + dur * 1000;

        intervalRef.current = setInterval(() => {
          const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
          setTimeLeft(remaining);
          if (remaining <= 0) {
            clearTimer();
            setIsRunning(false);
            onCompleteRef.current?.();
            setMode(prev => (prev === 'focus' ? 'break' : 'focus'));
          }
        }, 200);
      }, 600);

      return () => {
        clearTimeout(t);
        clearTimer();
      };
    } else {
      clearTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Cleanup on unmount
  useEffect(() => () => clearTimer(), [clearTimer]);

  // Document title
  useEffect(() => {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    const modeLabel = mode === 'focus' ? '专注中' : (isLongBreak ? '长休息' : '休息中');

    if (isRunning) {
      document.title = `(${mins}:${secs}) ${modeLabel}... | Lofi Flow Timer`;
    } else if (timeLeft === 0) {
      document.title = `${modeLabel} | Lofi Flow Timer`;
    } else {
      document.title = `${mins}:${secs} | Lofi Flow Timer`;
    }
  }, [timeLeft, mode, isRunning, isLongBreak]);

  const updateSettings = useCallback((partial) => {
    setSettings(prev => {
      const next = { ...prev, ...(typeof partial === 'function' ? partial(prev) : partial) };
      return next;
    });
  }, [setSettings]);

  const setOnComplete = useCallback((fn) => {
    onCompleteRef.current = fn;
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return {
    mode,
    isRunning,
    isLongBreak,
    timeLeft,
    totalDuration,
    progress,
    minutes,
    seconds,
    settings,
    updateSettings,
    sessionsCompleted,
    totalFocusMinutes,
    sessionInCycle,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    setOnComplete,
    setMode: (m) => {
      clearTimer();
      setIsRunning(false);
      setIsLongBreak(false);
      setMode(m);
    },
  };
}
