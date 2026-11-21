// Mouse and keyboard input: click to guess, arrows move a ring cursor,
// Enter guesses at the cursor, H asks for a hint.
import { CANVAS_W, CANVAS_H } from './config.js';
import { guessAt, useHint, advance } from './game.js';
import { ensureAudio } from './audio.js';

const CURSOR_STEP = 14;

export function attachInput(canvas, state, toCanvasPoint) {
  canvas.addEventListener('pointerdown', (event) => {
    ensureAudio();
    const p = toCanvasPoint(event);
    state.cursor.visible = false;
    if (state.screen === 'play') guessAt(state, p.x, p.y, performance.now());
    else advance(state);
  });

  window.addEventListener('keydown', (event) => {
    const c = state.cursor;
    if (event.key === 'ArrowLeft') { c.x = Math.max(8, c.x - CURSOR_STEP); c.visible = true; event.preventDefault(); }
    else if (event.key === 'ArrowRight') { c.x = Math.min(CANVAS_W - 8, c.x + CURSOR_STEP); c.visible = true; event.preventDefault(); }
    else if (event.key === 'ArrowUp') { c.y = Math.max(8, c.y - CURSOR_STEP); c.visible = true; event.preventDefault(); }
    else if (event.key === 'ArrowDown') { c.y = Math.min(CANVAS_H - 8, c.y + CURSOR_STEP); c.visible = true; event.preventDefault(); }
    else if (event.key === 'Enter' || event.key === ' ') {
      ensureAudio();
      if (state.screen === 'play') guessAt(state, c.x, c.y, performance.now());
      else advance(state);
      event.preventDefault();
    } else if (event.key === 'h' || event.key === 'H') {
      useHint(state, performance.now());
    }
  });
}
