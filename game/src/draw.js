// Rendering for Second Look: both panels, found rings, hint pulse, keyboard
// cursor and end-of-level overlays.
import { CANVAS_W, CANVAS_H, PANEL_W, PANEL_H, PANEL_GAP, HUD_H, FRAME_PAD } from './config.js';
import { paintScene, DIFFS } from './scenes.js';
import { drawHud } from './hud.js';

export const LEFT_X = FRAME_PAD;
export const RIGHT_X = FRAME_PAD + PANEL_W + PANEL_GAP;
export const PANEL_Y = HUD_H + FRAME_PAD;

function panelFrame(ctx, x) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - 4, PANEL_Y - 4, PANEL_W + 8, PANEL_H + 8);
  ctx.strokeStyle = '#33506b';
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 4, PANEL_Y - 4, PANEL_W + 8, PANEL_H + 8);
}

function ring(ctx, cx, cy, r, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

export function drawGame(ctx, state, now) {
  ctx.fillStyle = '#22314a';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  drawHud(ctx, state);

  panelFrame(ctx, LEFT_X);
  panelFrame(ctx, RIGHT_X);

  ctx.save();
  ctx.translate(LEFT_X, PANEL_Y);
  paintScene(ctx, state.level.id, false);
  ctx.restore();
  ctx.save();
  ctx.translate(RIGHT_X, PANEL_Y);
  paintScene(ctx, state.level.id, true);
  ctx.restore();

  const diffs = DIFFS[state.level.id];
  diffs.forEach((d, i) => {
    if (!state.found.has(i)) return;
    // White halo under the pink ring keeps it readable on busy scenes.
    ring(ctx, LEFT_X + d.x, PANEL_Y + d.y, d.r * 0.75, '#ffffff', 6);
    ring(ctx, RIGHT_X + d.x, PANEL_Y + d.y, d.r * 0.75, '#ffffff', 6);
    ring(ctx, LEFT_X + d.x, PANEL_Y + d.y, d.r * 0.75, '#ff3b6b', 3.5);
    ring(ctx, RIGHT_X + d.x, PANEL_Y + d.y, d.r * 0.75, '#ff3b6b', 3.5);
  });

  if (state.hintUntil > now && state.hintIndex >= 0) {
    const d = diffs[state.hintIndex];
    const pulse = 1 + 0.18 * Math.sin(now / 140);
    ring(ctx, LEFT_X + d.x, PANEL_Y + d.y, d.r * pulse, '#ffd93b', 3);
    ring(ctx, RIGHT_X + d.x, PANEL_Y + d.y, d.r * pulse, '#ffd93b', 3);
  }

  if (state.missAt && now - state.missAt.t < 450) {
    const m = state.missAt;
    ctx.strokeStyle = '#ff5252';
    ctx.lineWidth = 3;
    const s = 10;
    ctx.beginPath();
    ctx.moveTo(m.x - s, m.y - s); ctx.lineTo(m.x + s, m.y + s);
    ctx.moveTo(m.x + s, m.y - s); ctx.lineTo(m.x - s, m.y + s);
    ctx.stroke();
  }

  if (state.cursor.visible) {
    ring(ctx, state.cursor.x, state.cursor.y, 14, '#ffd93b', 2.5);
    ctx.fillStyle = '#ffd93b';
    ctx.beginPath();
    ctx.arc(state.cursor.x, state.cursor.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state.screen === 'title') drawTitle(ctx, state);
  if (state.screen === 'clear') drawClear(ctx, state);
  if (state.screen === 'over') drawOver(ctx, state);
  if (state.screen === 'done') drawDone(ctx, state);
}

function overlay(ctx, title, lines) {
  ctx.fillStyle = 'rgba(20,28,44,0.78)';
  ctx.fillRect(0, HUD_H, CANVAS_W, CANVAS_H - HUD_H);
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = 'bold 44px system-ui, sans-serif';
  ctx.fillText(title, CANVAS_W / 2, 190);
  ctx.font = '19px system-ui, sans-serif';
  lines.forEach((line, i) => ctx.fillText(line, CANVAS_W / 2, 235 + i * 30));
}

function drawTitle(ctx, state) {
  overlay(ctx, 'Second Look', [
    'Spot every difference between the two pictures.',
    'Click a difference in either picture to ring it on both.',
    'Wrong clicks cost 5 seconds. Press H for a hint.',
    'Keyboard: arrow keys move the ring, Enter guesses.',
    '',
    'Click or press Enter to start — ' + state.level.name,
  ]);
}

function drawClear(ctx, state) {
  const stars = '★'.repeat(state.stars) + '☆'.repeat(3 - state.stars);
  overlay(ctx, 'Level clear! ' + stars, [
    'Score: ' + state.score,
    'Click or press Enter for the next picture.',
  ]);
}

function drawOver(ctx, state) {
  overlay(ctx, 'Time up!', [
    'You found ' + state.found.size + ' of ' + DIFFS[state.level.id].length + '.',
    'Click or press Enter to try again.',
  ]);
}

function drawDone(ctx, state) {
  overlay(ctx, 'All pictures solved!', [
    'Final score: ' + state.score,
    'Click or press Enter to play again.',
  ]);
}
