// Screenshot staging behind ?shot=play|harbor|garden|win&seed=1. Each scene
// starts a real level through the game's own rules and marks some differences
// found, so the frame is what mid-play really looks like — deterministic for
// a given seed.
import { startLevel } from './game.js';
import { DIFFS } from './scenes.js';
import { makeRng } from './rng.js';

export function stageShot(state, shot, seed) {
  const rng = makeRng(seed || 1);
  if (shot === 'play') {
    startLevel(state, 0);
    markSome(state, 3, rng);
    state.timeLeft = 96;
    state.score = 300;
  } else if (shot === 'harbor') {
    startLevel(state, 1);
    markSome(state, 2, rng);
    state.timeLeft = 118;
    state.score = 700;
  } else if (shot === 'garden') {
    startLevel(state, 2);
    markSome(state, 4, rng);
    state.timeLeft = 74;
    state.score = 1100;
  } else if (shot === 'win') {
    startLevel(state, 3);
    markSome(state, DIFFS[state.level.id].length, rng);
    state.timeLeft = 52;
    state.score = 1950;
    state.stars = 3;
    state.screen = 'done';
  }
}

function markSome(state, count, rng) {
  const diffs = DIFFS[state.level.id];
  const order = diffs.map((d, i) => i);
  // Deterministic shuffle so the same seed stages the same finds.
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  order.slice(0, count).forEach((i) => state.found.add(i));
}
