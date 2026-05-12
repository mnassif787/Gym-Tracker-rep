// Utilities — haptics, audio chime, helpers

export const Haptic = {
  light: () => { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} },
  tap:   () => { try { navigator.vibrate && navigator.vibrate(15); } catch (e) {} },
  done:  () => { try { navigator.vibrate && navigator.vibrate([20, 40, 60]); } catch (e) {} },
};

let _audioCtx: AudioContext | null = null;

export function chime() {
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = _audioCtx;
    const now = ctx.currentTime;
    [0, 0.16].forEach((dt, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = i === 0 ? 880 : 1175;
      o.type = 'sine';
      g.gain.setValueAtTime(0.0001, now + dt);
      g.gain.exponentialRampToValueAtTime(0.18, now + dt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dt + 0.28);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(now + dt);
      o.stop(now + dt + 0.3);
    });
  } catch (e) {}
}

export function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}