import { useState, useRef, useCallback, useEffect } from 'react';

const FADE_DURATION = 800;

export const NOISE_OPTIONS = [
  { id: 'rain', label: '下雨声', file: '/audio/rain.mp3' },
  { id: 'cafe', label: '咖啡馆', file: '/audio/cafe.mp3' },
  { id: 'fire', label: '深夜篝火', file: '/audio/fire.mp3' },
];

export function useAudio() {
  const [activeNoise, setActiveNoise] = useState(null);
  const [volume, setVolumeState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lofi-settings'))?.volume ?? 0.6;
    } catch {
      return 0.6;
    }
  });

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeTo = useCallback((audio, targetVolume, onComplete) => {
    clearFade();
    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    if (Math.abs(diff) < 0.01) {
      audio.volume = targetVolume;
      onComplete?.();
      return;
    }
    const steps = Math.ceil(FADE_DURATION / 30);
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.min(1, Math.max(0, startVolume + diff * eased));

      if (step >= steps) {
        clearFade();
        audio.volume = targetVolume;
        onComplete?.();
      }
    }, 30);
  }, [clearFade]);

  const stopCurrent = useCallback(() => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        const audio = audioRef.current;
        fadeTo(audio, 0, () => {
          audio.pause();
          audio.src = '';
          audioRef.current = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }, [fadeTo]);

  const playNoise = useCallback(async (noiseId) => {
    const noise = NOISE_OPTIONS.find(n => n.id === noiseId);
    if (!noise) return;

    if (activeNoise === noiseId) {
      await stopCurrent();
      setActiveNoise(null);
      return;
    }

    await stopCurrent();

    const audio = new Audio(noise.file);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    try {
      await audio.play();
      fadeTo(audio, volumeRef.current);
      setActiveNoise(noiseId);
    } catch (err) {
      console.warn('Audio playback failed:', err);
      setActiveNoise(noiseId);
    }
  }, [activeNoise, stopCurrent, fadeTo]);

  const setVolume = useCallback((newVol) => {
    setVolumeState(newVol);
    if (audioRef.current && activeNoise) {
      fadeTo(audioRef.current, newVol);
    }
  }, [activeNoise, fadeTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFade();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [clearFade]);

  return {
    activeNoise,
    playNoise,
    stopCurrent,
    volume,
    setVolume,
  };
}
