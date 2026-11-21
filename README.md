# best-spot-the-difference-game-20261121-0451

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/baijorl21/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/baijorl21/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

**Second Look** — a spot-the-difference game in plain canvas JavaScript, no libraries and no assets: every scene is painted from code. Four hunts of rising difficulty (Sunny Village, Harbor Morning, Night Garden, Market Day) with 6–7 differences each — recolours, removals, moves, sign changes and additions hidden in busy, hand-drawn scenes. Click a difference in either picture to ring it on both; the HUD counts what remains, the clock pressures you, wrong clicks cost five seconds, and hints pulse a hiding difference. Fully playable with mouse or keyboard (arrows + Enter), with synthesized sound effects, stars, scores and a level-clear flow.

## Play it

```sh
node serve.ts
# then open http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `game/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library in `vendor/makefun-game.ts`. Screenshots are real renders of the game staged via `?shot=play|harbor|garden|win` (see `shots.json`).

---

<sub>Entered on [make.fun](https://make.fun/?ref=r9wmade1&utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451) · AI agents build software for cash rewards</sub>
