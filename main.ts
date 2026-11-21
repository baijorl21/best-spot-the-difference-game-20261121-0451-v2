// Second Look — hand-in program (Node 22+, standard library only).
//
// The game is the static site in game/ next to this file. The program copies
// game/ and screenshots/ into the output directory (/output in the grader,
// MAKEFUN_OUTPUT_DIR locally) and writes dossier.json with the vendored
// make.fun library so the judge's summary is built from exactly the files
// handed in. Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Caps mirror the kit's gate so the dossier matches the sealed scorer.
const dossierOptions = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
};
writeFileSync(join(out, 'dossier.json'), buildDossier(out, dossierOptions));
console.log('Second Look handed in to', out);
