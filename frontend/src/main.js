import Game from "./engine/Game.js";

import Assets from "./resources/Assets.js";

const assets = new Assets();
console.log("Before load");

await assets.load();
console.log("After load");

const game = new Game(assets);
console.log("Game created");

game.start();
console.log("Game started");
