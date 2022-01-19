 const canvas = document.querySelector(".game-canvas");
const e = createEngine(canvas, 300, 300);
const ctx = e.ctx;

e.add({
  tags: ["person"],
  sprite: stickFigure,
  scale: 3,
  solid: true,
  x: 50,
  y: 16,
  collides(me, them) {
    if (them.hasTag("platform")) me.vx = them.vx;

    if (e.pressedKey(" ")) {
      if (them.hasTag("platform")) me.vy -= 11;
    }
  },
  update: (obj) => {
      obj.ay = 0.4;

      if (e.heldKey("ArrowLeft")) obj.x -= 3;
      if (e.heldKey("ArrowRight")) obj.x += 3;
  },
})

e.add({
  tags: ["dice"],
  sprite: D20,
  scale: 3,
  solid: true,
  x: 50,
  y: 16,
  collides(me, them) {
    if (them.hasTag("platform")) me.vx = them.vx;
  },
})

e.add({
  tags: ["floor", "platform"],
  solid: true,
  x: -6,
  y: 283,
  sprite: floor,
  scale: 11,
})

const addPlatform = (x, y) => e.add({
  tags: ["platform"],
  sprite: platform,
  scale: 7,
  solid: true,
  x: x,
  y: y,
  vx: -1,
  bounce: -1,
  update: (obj) => {
      if (obj.x < 0) obj.vx = 1;
      if (obj.x + obj.width > e.width) obj.vx = -1
  },
})

const addDice = (x, y) => e.add({
  tags: ["dice"],
  sprite: D20,
  scale: 3,
  solid: true,
  x: x,
  y: y,
  vx: -1,
  // bounce: -1,
  update: (obj) => {
      if (obj.x < 0) obj.vx = 1;
      if (obj.x + obj.width > e.width) obj.vx = -1
  },
})

addPlatform(50, 200);
addPlatform(20, 100);
addDice(50, 55);
addDice(20, 165)

e.start();
