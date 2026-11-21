// Second Look — shared layout constants and level table.
export const PANEL_W = 460;
export const PANEL_H = 340;
export const PANEL_GAP = 24;
export const HUD_H = 64;
export const FRAME_PAD = 16;

export const CANVAS_W = PANEL_W * 2 + PANEL_GAP + FRAME_PAD * 2;
export const CANVAS_H = HUD_H + PANEL_H + FRAME_PAD * 2;

export const WRONG_PENALTY_SECONDS = 5;
export const FIND_POINTS = 100;
export const TIME_BONUS_PER_SECOND = 2;

export const LEVELS = [
  { id: 'village', name: 'Sunny Village', time: 150, hints: 3 },
  { id: 'harbor', name: 'Harbor Morning', time: 150, hints: 3 },
  { id: 'garden', name: 'Night Garden', time: 140, hints: 3 },
  { id: 'market', name: 'Market Day', time: 140, hints: 2 },
];
