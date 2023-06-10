let treeImage, branchImage, characterImage, landImage;
let tree, person, game;

function preload() {
  trunkImage = loadImage("images/trunk.png");
  branchImage = loadImage("images/branch.png");
  characterImage = loadImage("images/character.png");
  landImage = loadImage("images/land.png");
}
function setup() {
  createCanvas(700, windowHeight);
  btnLeft = select("#move-left");
  btnRight = select("#move-right");

  game = new Game({
    maxWidth: windowWidth,
    cutSound: "audio/cut.mp3",
    maxHeight: windowHeight,
    btnLeft,
    btnRight,
  });
  game.init();
  game.listener();

}
function draw() {
  game.render();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game.move("left");
  } else if (keyCode === RIGHT_ARROW) {
    game.move("right");
  }
}