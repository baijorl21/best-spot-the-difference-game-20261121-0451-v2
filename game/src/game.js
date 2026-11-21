// Game state and rules for Second Look: level flow, timer, scoring, hints.
import { LEVELS, WRONG_PENALTY_SECONDS, FIND_POINTS, TIME_BONUS_PER_SECOND } from './config.js';
import { DIFFS } from './scenes.js';
import { LEFT_X, RIGHT_X, PANEL_Y } from './draw.js';
import { PANEL_W, PANEL_H } from './config.js';
import { playFind, playMiss, playHint, playWin, playLose } from './audio.js';

export function newGame() {
  return {
    screen: 'title',
    levelIndex: 0,
    level: LEVELS[0],
    found: new Set(),
    timeLeft: LEVELS[0].time,
    score: 0,
    hintsLeft: LEVELS[0].hints,
    hintIndex: -1,
    hintUntil: 0,
    missAt: null,
    stars: 0,
    cursor: { x: 200, y: 240, visible: false },
    lastTick: 0,
  };
}

export function startLevel(state, index) {
  state.levelIndex = index;
  state.level = LEVELS[index];
  state.found = new Set();
  state.timeLeft = state.level.time;
  state.hintsLeft = state.level.hints;
  state.hintIndex = -1;
  state.hintUntil = 0;
  state.missAt = null;
  state.screen = 'play';
}

export function panelPoint(state, x, y) {
  // Returns panel-local coordinates, or null when outside both panels.
  const py = y - PANEL_Y;
  if (py < 0 || py > PANEL_H) return null;
  if (x >= LEFT_X && x <= LEFT_X + PANEL_W) return { px: x - LEFT_X, py };
  if (x >= RIGHT_X && x <= RIGHT_X + PANEL_W) return { px: x - RIGHT_X, py };
  return null;
}

export function guessAt(state, x, y, now) {
  if (state.screen !== 'play') return;
  const point = panelPoint(state, x, y);
  if (!point) return;
  const diffs = DIFFS[state.level.id];
  // Clicking a spot already ringed is a no-op, never a miss.
  for (let i = 0; i < diffs.length; i += 1) {
    if (!state.found.has(i)) continue;
    const d = diffs[i];
    if (Math.hypot(point.px - d.x, point.py - d.y) <= d.r) return;
  }
  for (let i = 0; i < diffs.length; i += 1) {
    if (state.found.has(i)) continue;
    const d = diffs[i];
    const dist = Math.hypot(point.px - d.x, point.py - d.y);
    if (dist <= d.r) {
      state.found.add(i);
      state.score += FIND_POINTS;
      playFind();
      if (state.found.size === diffs.length) finishLevel(state);
      return;
    }
  }
  state.timeLeft = Math.max(0, state.timeLeft - WRONG_PENALTY_SECONDS);
  state.missAt = { x, y, t: now };
  playMiss();
}

function finishLevel(state) {
  const bonus = Math.floor(state.timeLeft) * TIME_BONUS_PER_SECOND;
  state.score += bonus;
  const frac = state.timeLeft / state.level.time;
  state.stars = frac > 0.45 ? 3 : frac > 0.2 ? 2 : 1;
  state.screen = state.levelIndex >= LEVELS.length - 1 ? 'done' : 'clear';
  playWin();
}

export function useHint(state, now) {
  if (state.screen !== 'play' || state.hintsLeft <= 0) return;
  const diffs = DIFFS[state.level.id];
  const remaining = diffs.map((d, i) => i).filter((i) => !state.found.has(i));
  if (!remaining.length) return;
  state.hintIndex = remaining[Math.floor(Math.random() * remaining.length)];
  state.hintUntil = now + 1600;
  state.hintsLeft -= 1;
  playHint();
}

export function advance(state) {
  // Click / Enter on title, clear, over and done screens.
  if (state.screen === 'title') startLevel(state, state.levelIndex);
  else if (state.screen === 'clear') startLevel(state, state.levelIndex + 1);
  else if (state.screen === 'over') startLevel(state, state.levelIndex);
  else if (state.screen === 'done') {
    state.score = 0;
    startLevel(state, 0);
  }
}

export function tick(state, now) {
  if (state.screen !== 'play') {
    state.lastTick = now;
    return;
  }
  if (state.lastTick) {
    state.timeLeft -= (now - state.lastTick) / 1000;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      state.screen = 'over';
      playLose();
    }
  }
  state.lastTick = now;
}
