import { useEffect } from 'react';

export function useKeyboardShortcuts({ onTogglePlayPause, onReset, onSkip, onSelectNoise }) {
  useEffect(() => {
    function handleKeyDown(e) {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onTogglePlayPause?.();
          break;
        case 'KeyR':
          onReset?.();
          break;
        case 'KeyS':
        case 'ArrowRight':
          onSkip?.();
          break;
        case 'Digit1':
          onSelectNoise?.('rain');
          break;
        case 'Digit2':
          onSelectNoise?.('cafe');
          break;
        case 'Digit3':
          onSelectNoise?.('fire');
          break;
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePlayPause, onReset, onSkip, onSelectNoise]);
}
