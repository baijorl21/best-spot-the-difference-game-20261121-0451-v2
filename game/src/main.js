// Second Look boot: size the canvas, wire input, run the frame loop and
// honour ?shot= staging for screenshots.
import { CANVAS_W, CANVAS_H } from './config.js';
import { newGame, tick } from './game.js';
import { drawGame } from './draw.js';
import { attachInput } from './input.js';
import { stageShot } from './shots.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;

const state = newGame();

const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
if (shot) {
  stageShot(state, shot, Number(params.get('seed') || 1));
  state.lastTick = performance.now();
}

function toCanvasPoint(event) {
  const r = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - r.left) / r.width) * CANVAS_W,
    y: ((event.clientY - r.top) / r.height) * CANVAS_H,
  };
}

attachInput(canvas, state, toCanvasPoint);

const status = document.getElementById('status');
let lastStatus = '';
function announce() {
  const text = state.screen + ' ' + state.found.size + ' ' + Math.ceil(state.timeLeft);
  if (text !== lastStatus) {
    lastStatus = text;
    if (status) status.textContent = 'Level ' + state.level.name + ', ' + state.found.size + ' found, ' + Math.ceil(state.timeLeft) + ' seconds left.';
  }
}

function frame(now) {
  tick(state, now);
  drawGame(ctx, state, now);
  announce();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
