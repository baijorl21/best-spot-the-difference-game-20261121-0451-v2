// Tiny synthesized sound effects with WebAudio — no audio files needed.
let audioCtx = null;

export function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, start, dur, type, gain) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const amp = audioCtx.createGain();
  const t0 = audioCtx.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  amp.gain.setValueAtTime(gain, t0);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(amp).connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + dur);
}

export function playFind() {
  ensureAudio();
  tone(880, 0, 0.12, 'sine', 0.18);
  tone(1320, 0.07, 0.16, 'sine', 0.15);
}

export function playMiss() {
  ensureAudio();
  tone(160, 0, 0.18, 'square', 0.08);
}

export function playHint() {
  ensureAudio();
  tone(660, 0, 0.1, 'triangle', 0.12);
  tone(990, 0.09, 0.14, 'triangle', 0.1);
}

export function playWin() {
  ensureAudio();
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, 'sine', 0.16));
}

export function playLose() {
  ensureAudio();
  [392, 330, 262].forEach((f, i) => tone(f, i * 0.14, 0.2, 'triangle', 0.12));
}
