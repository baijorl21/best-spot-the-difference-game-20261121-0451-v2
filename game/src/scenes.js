// Scene painters for Second Look. Every picture is drawn from code — no image
// assets. Each painter draws the same scene twice; when `right` is true it
// applies that level's hidden differences. DIFFS lists where they are, in
// panel coordinates, so the game can hit-test clicks and ring found spots.
import { PANEL_W, PANEL_H } from './config.js';

function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function circle(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}
function tri(ctx, x1, y1, x2, y2, x3, y3, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}
function cloud(ctx, x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 14 * s, 0, Math.PI * 2);
  ctx.arc(x + 18 * s, y - 6 * s, 17 * s, 0, Math.PI * 2);
  ctx.arc(x + 38 * s, y, 13 * s, 0, Math.PI * 2);
  ctx.fill();
}
function tree(ctx, x, y, s, leaf) {
  rect(ctx, x - 4 * s, y, 8 * s, 34 * s, '#7a4a2b');
  circle(ctx, x, y - 18 * s, 24 * s, leaf);
  circle(ctx, x - 18 * s, y - 6 * s, 17 * s, leaf);
  circle(ctx, x + 18 * s, y - 6 * s, 17 * s, leaf);
}
function house(ctx, x, y, w, h, wall, roof, door) {
  rect(ctx, x, y, w, h, wall);
  tri(ctx, x - 8, y, x + w + 8, y, x + w / 2, y - h * 0.55, roof);
  rect(ctx, x + w * 0.38, y + h * 0.45, w * 0.24, h * 0.55, door);
  rect(ctx, x + w * 0.1, y + h * 0.25, w * 0.18, h * 0.22, '#cfe8ff');
  rect(ctx, x + w * 0.72, y + h * 0.25, w * 0.18, h * 0.22, '#cfe8ff');
}

function paintVillage(ctx, right) {
  rect(ctx, 0, 0, PANEL_W, PANEL_H, '#aee3ff');
  circle(ctx, 392, 52, 30, right ? '#ffb84d' : '#ffd93b'); // diff: sun colour
  cloud(ctx, 40, 48, 1, '#ffffff');
  cloud(ctx, right ? 250 : 210, 40, 0.8, '#ffffff'); // diff: cloud moved
  rect(ctx, 0, 250, PANEL_W, 90, '#7ec850');
  rect(ctx, 0, 300, PANEL_W, 40, '#68b73f');
  house(ctx, 40, 160, 110, 90, '#fff3d6', right ? '#3a7bd5' : '#d9534f', '#8a5a33'); // diff: roof colour
  house(ctx, 300, 175, 120, 80, '#ffe0e6', '#7a4a2b', right ? '#2e9e5b' : '#5b3a8a'); // diff: door colour
  tree(ctx, 200, 210, 1.1, '#3f9e4d');
  circle(ctx, 190, 185, 5, '#e23b3b');
  if (!right) circle(ctx, 215, 200, 5, '#e23b3b'); // diff: apple removed
  tree(ctx, 80, 260, 0.8, '#57b368');
  tree(ctx, 430, 265, 0.9, '#57b368');
  rect(ctx, 150, 285, 160, 10, '#d9c08a'); // path
  circle(ctx, 120, 310, 6, '#ff7eb6');
  circle(ctx, 140, 318, 5, '#ffd93b');
  circle(ctx, 330, 315, 6, '#ff7eb6');
  circle(ctx, 355, 308, 5, '#ffffff');
  // cat on the path
  if (!right) {
    circle(ctx, 250, 290, 9, '#f5a623');
    tri(ctx, 243, 284, 247, 276, 251, 284, '#f5a623');
    tri(ctx, 252, 284, 256, 276, 260, 284, '#f5a623');
  } // diff: cat removed
  rect(ctx, 18, 120, 4, 60, '#7a4a2b');
  circle(ctx, 20, 112, 10, '#ff7eb6');
}

function paintHarbor(ctx, right) {
  rect(ctx, 0, 0, PANEL_W, 190, '#bfe8ff');
  rect(ctx, 0, 190, PANEL_W, 150, '#2e7fc2');
  rect(ctx, 0, 190, PANEL_W, 10, '#57a8dd');
  circle(ctx, 60, 48, 24, '#ffd93b');
  cloud(ctx, 150, 44, 0.9, '#ffffff');
  cloud(ctx, 330, 60, 0.7, '#ffffff');
  // lighthouse
  rect(ctx, 380, 90, 34, 110, '#f2f2f2');
  rect(ctx, 380, 110, 34, 16, '#e23b3b');
  rect(ctx, 380, 142, 34, 16, '#e23b3b');
  if (!right) rect(ctx, 380, 174, 34, 16, '#e23b3b'); // diff: stripe removed
  rect(ctx, 376, 78, 42, 14, '#333333');
  circle(ctx, 397, 70, 7, '#ffe98a');
  // boat
  tri(ctx, 120, 235, 220, 235, 200, 262, '#8a5a33');
  rect(ctx, 166, 160, 5, 76, '#7a4a2b');
  tri(ctx, 171, 164, 171, 230, 215, 230, right ? '#3a7bd5' : '#ffffff'); // diff: sail colour
  tri(ctx, 166, 170, 166, 228, 132, 228, '#f2f2f2');
  if (!right) tri(ctx, 171, 160, 171, 172, 186, 166, '#e23b3b'); // diff: flag removed
  // second small boat
  tri(ctx, 280, 260, 340, 260, 328, 278, '#5b3a8a');
  rect(ctx, 306, 222, 4, 38, '#7a4a2b');
  tri(ctx, 310, 226, 310, 256, 334, 256, '#ffd93b');
  // gulls
  const gulls = right ? [[90, 90], [130, 110]] : [[90, 90], [130, 110], [250, 84]]; // diff: gull removed
  ctx.strokeStyle = '#33506b';
  ctx.lineWidth = 2;
  for (const [gx, gy] of gulls) {
    ctx.beginPath();
    ctx.arc(gx - 7, gy, 7, Math.PI * 1.15, Math.PI * 1.85);
    ctx.arc(gx + 7, gy, 7, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  }
  // crates on the dock
  rect(ctx, 0, 292, 180, 12, '#a97c50');
  rect(ctx, 20, 262, 30, 30, '#c99a63');
  rect(ctx, 54, 262, 30, 30, '#b98a55');
  if (right) rect(ctx, 54, 232, 30, 30, '#c99a63'); // diff: extra crate
  circle(ctx, 440, 300, 9, '#e23b3b'); // buoy
  rect(ctx, 436, 282, 8, 12, '#e23b3b');
  circle(ctx, right ? 320 : 300, 310, 6, '#ffffff'); // diff: foam moved
}

function paintGarden(ctx, right) {
  rect(ctx, 0, 0, PANEL_W, PANEL_H, '#1b2440');
  circle(ctx, 400, 50, 22, '#f5f0d0');
  if (right) circle(ctx, 410, 44, 18, '#1b2440'); // diff: moon becomes crescent
  const stars = [[40, 40], [110, 70], [200, 36], [280, 80], [330, 30], [70, 120], [160, 110]];
  for (const [sx, sy] of stars) circle(ctx, sx, sy, 2.5, '#ffffff');
  if (!right) circle(ctx, 240, 60, 2.5, '#ffffff'); // diff: star removed
  rect(ctx, 0, 270, PANEL_W, 70, '#24402e');
  // fence
  for (let i = 0; i < 11; i += 1) rect(ctx, 12 + i * 42, 232, 8, 44, '#6b4a2f');
  rect(ctx, 0, 244, PANEL_W, 6, '#6b4a2f');
  if (right) rect(ctx, 180, 232, 8, 44, '#8a6a45'); // diff: fence post recoloured (drawn over)
  // tree with owl
  tree(ctx, 90, 210, 1.2, '#2e6b45');
  circle(ctx, 90, 168, 11, '#a97c50');
  circle(ctx, 86, 166, 2.6, '#ffffff');
  circle(ctx, 94, 166, 2.6, '#ffffff');
  if (!right) { circle(ctx, 86, 166, 1.2, '#111111'); circle(ctx, 94, 166, 1.2, '#111111'); } // diff: owl eyes closed
  // mushrooms
  rect(ctx, 300, 288, 8, 16, '#f2e6d0');
  ctx.fillStyle = right ? '#3a7bd5' : '#e23b3b'; // diff: mushroom cap colour
  ctx.beginPath(); ctx.arc(304, 288, 14, Math.PI, 0); ctx.fill();
  rect(ctx, 340, 296, 6, 12, '#f2e6d0');
  ctx.fillStyle = '#e23b3b';
  ctx.beginPath(); ctx.arc(343, 296, 10, Math.PI, 0); ctx.fill();
  // flowers
  const flowers = [[150, 305], [190, 318], [240, 300], [390, 312], [420, 296]];
  for (const [fx, fy] of flowers) circle(ctx, fx, fy, 5, '#ff7eb6');
  circle(ctx, 215, 322, 5, right ? '#ffd93b' : '#ff7eb6'); // diff: flower colour
  // fireflies
  const flies = [[130, 190], [210, 160], [280, 200], [360, 170]];
  for (const [fx, fy] of flies) circle(ctx, fx, fy, 3, '#ffe98a');
  if (!right) circle(ctx, 320, 130, 3, '#ffe98a'); // diff: firefly removed
  // pond
  ctx.fillStyle = '#2e5f8a';
  ctx.beginPath(); ctx.ellipse(380, 322, 55, 13, 0, 0, Math.PI * 2); ctx.fill();
}

function paintMarket(ctx, right) {
  rect(ctx, 0, 0, PANEL_W, PANEL_H, '#ffe9c9');
  rect(ctx, 0, 280, PANEL_W, 60, '#e8cfa3');
  circle(ctx, 420, 42, 22, '#ffd93b');
  // stall 1
  rect(ctx, 30, 170, 150, 110, '#fff3d6');
  for (let i = 0; i < 5; i += 1) rect(ctx, 24 + i * 32, 140, 32, 30, i % 2 ? '#ffffff' : (right ? '#2e9e5b' : '#e23b3b')); // diff: awning colour
  rect(ctx, 36, 196, 138, 10, '#a97c50');
  const apples = right ? 4 : 6; // diff: fewer apples
  for (let i = 0; i < apples; i += 1) circle(ctx, 52 + i * 20, 190, 7, '#e23b3b');
  for (let i = 0; i < 4; i += 1) circle(ctx, 60 + i * 20, 222, 7, '#f5a623');
  // sign
  rect(ctx, 70, 238, 70, 24, '#7a4a2b');
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(right ? 'SALE' : 'FRESH', 105, 255); // diff: sign text
  // stall 2
  rect(ctx, 250, 180, 140, 100, '#ffe0e6');
  for (let i = 0; i < 5; i += 1) rect(ctx, 244 + i * 30, 152, 30, 28, i % 2 ? '#3a7bd5' : '#ffffff');
  rect(ctx, 256, 204, 128, 10, '#a97c50');
  for (let i = 0; i < 5; i += 1) circle(ctx, 272 + i * 22, 198, 8, '#8a5a33'); // bread
  if (!right) circle(ctx, 330, 232, 8, '#57b368'); // diff: melon removed
  circle(ctx, 290, 232, 8, '#57b368');
  // balloon
  circle(ctx, right ? 180 : 210, 80, 15, '#ff7eb6'); // diff: balloon moved
  ctx.strokeStyle = '#888888';
  ctx.beginPath(); ctx.moveTo(right ? 180 : 210, 95); ctx.lineTo(200, 150); ctx.stroke();
  // barrel
  rect(ctx, 412, 238, 30, 42, '#a97c50');
  rect(ctx, 412, 250, 30, 5, '#7a4a2b');
  if (right) rect(ctx, 412, 264, 30, 5, '#7a4a2b'); // diff: extra barrel band
  // lantern
  rect(ctx, 196, 116, 3, 18, '#555555');
  circle(ctx, 197, 142, 9, right ? '#3a7bd5' : '#ffb84d'); // diff: lantern colour
  // cat under stall
  circle(ctx, 120, 296, 8, '#333333');
  tri(ctx, 114, 290, 117, 283, 121, 290, '#333333');
  tri(ctx, 122, 290, 125, 283, 129, 290, '#333333');
}

const PAINTERS = {
  village: paintVillage,
  harbor: paintHarbor,
  garden: paintGarden,
  market: paintMarket,
};

// Difference spots per level, panel coordinates with a generous hit radius.
export const DIFFS = {
  village: [
    { x: 392, y: 52, r: 34 },
    { x: 228, y: 40, r: 34 },
    { x: 95, y: 140, r: 40 },
    { x: 360, y: 212, r: 30 },
    { x: 215, y: 200, r: 22 },
    { x: 250, y: 290, r: 24 },
  ],
  harbor: [
    { x: 397, y: 182, r: 24 },
    { x: 190, y: 196, r: 36 },
    { x: 178, y: 166, r: 20 },
    { x: 250, y: 84, r: 24 },
    { x: 69, y: 247, r: 26 },
    { x: 310, y: 310, r: 22 },
  ],
  garden: [
    { x: 402, y: 48, r: 28 },
    { x: 240, y: 60, r: 18 },
    { x: 184, y: 254, r: 22 },
    { x: 90, y: 166, r: 20 },
    { x: 304, y: 284, r: 24 },
    { x: 215, y: 322, r: 18 },
    { x: 320, y: 130, r: 18 },
  ],
  market: [
    { x: 105, y: 155, r: 40 },
    { x: 140, y: 190, r: 26 },
    { x: 105, y: 250, r: 30 },
    { x: 330, y: 232, r: 22 },
    { x: 195, y: 80, r: 30 },
    { x: 427, y: 266, r: 22 },
    { x: 197, y: 142, r: 22 },
  ],
};

export function paintScene(ctx, levelId, right) {
  const painter = PAINTERS[levelId] || paintVillage;
  painter(ctx, right);
}
