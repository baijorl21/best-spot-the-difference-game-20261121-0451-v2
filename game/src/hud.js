// The HUD bar: level name, differences remaining, clock, score and hints.
import { CANVAS_W, HUD_H, FRAME_PAD } from './config.js';
import { DIFFS } from './scenes.js';

export function formatClock(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  return m + ':' + String(s % 60).padStart(2, '0');
}

export function drawHud(ctx, state) {
  ctx.fillStyle = '#16233a';
  ctx.fillRect(0, 0, CANVAS_W, HUD_H);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText('Second Look — ' + state.level.name, FRAME_PAD, 28);

  const total = DIFFS[state.level.id].length;
  const left = total - state.found.size;
  ctx.font = '16px system-ui, sans-serif';
  ctx.fillText('Found ' + state.found.size + ' / ' + total + '   ·   ' + left + ' to go', FRAME_PAD, 52);

  ctx.textAlign = 'right';
  const lowTime = state.timeLeft <= 20 && state.screen === 'play';
  ctx.fillStyle = lowTime ? '#ff8a8a' : '#ffffff';
  ctx.font = 'bold 22px system-ui, sans-serif';
  ctx.fillText('⏱ ' + formatClock(state.timeLeft), CANVAS_W - FRAME_PAD, 28);
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px system-ui, sans-serif';
  ctx.fillText('Score ' + state.score + '   ·   Hints ' + state.hintsLeft, CANVAS_W - FRAME_PAD, 52);
}
