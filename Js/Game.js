class Game {
  constructor(props) {
    this.maxWidth = windowWidth > props.maxWidth ? props.maxWidth : windowWidth;
    this.maxHeight = props.maxHeight;
    this.background = "#d3f7ff";
    this.cutSound = props.cutSound;
    this.tree = null;
    this.person = null;
    this.score = 0;
    this.time = 20; 
    this.maxTime = 30; 
    this.isPlaying = false;
    this.highScore = localStorage.getItem("highScore");
    this.isGameOver = false; 
    this.btnLeft = props.btnLeft;
    this.btnRight = props.btnRight;

  }

  init() {
    this.person = new Person(width, height);
    this.tree = new Tree(width, height/2);
    this.tree.init();
    this.listener();
  }

  drawBackground() {
    background(this.background);

     image(landImage, 100, height - 250, width-200, 200);
  }

  drawScore() {
    fill("#333");

    textFont("Arial");
    textSize(32);
    text(this.score, width/2, 100);

    textSize(24);
    text("Highscore", 80, 30);

    textSize(32);
    text(this.highScore, 80, 80);
  }

 drawTime() {
  const barWidth = (this.time / this.maxTime) * 200; 
  const barX = (width - 200) / 2; 
  const barY = 30;
  const barHeight = 20;
  const borderWidth = 2;
  const borderColor = "#333";


  stroke(borderColor);
  noFill();
  rect(barX, barY, 200, barHeight);


  fill("#333");
  noStroke();
  rect(barX, barY, barWidth, barHeight);


  fill("#333");
  textSize(24);
  textAlign(CENTER);
  text("Time", width / 2, 25);
}
  draw() {
    this.drawBackground();
    this.tree.draw();
    this.person.draw();
    this.drawScore();
    this.drawTime();
  }

  update() {
    if (this.isPlaying && !this.isGameOver) {
      this.time -= 0.1; 

      if (this.time <= 0) {

        this.gameOver();
      } else if (this.time > this.maxTime) {

        this.time = this.maxTime;
      }
    }
  }
  render() {
    this.draw();
    this.update();
  }

  move(direction) {
    if (!this.isPlaying) {
      this.isPlaying = true; 
    }
    this.person.characterPosition = direction;
    this.tree.trees.shift();
    this.tree.createNewTrunk();

    let audio = new Audio();
    audio.src = this.cutSound;
    audio.playbackRate = 1;
    audio.play();

    this.score++;


    if (
      (this.tree.trees[0].value == "left" &&
        this.person.characterPosition == "left") ||
      (this.tree.trees[0].value == "right" &&
        this.person.characterPosition == "right")
    ) {
      setTimeout(() => {
        this.gameOver();
      }, 100);
    } else {
      this.time += 5;
    }
  }
  gameOver() {
    if (this.score > localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", this.score);
    }
    this.isGameOver = true; 

    const highScore = localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : 0;
    alert(`Game Over\nYour Highscore: ${highScore}`);
    window.location.reload();
  }
  listener() {
    const handleKeyPress = (e) => {
      if (!this.isGameOver) {
        if (e.key == "ArrowLeft") this.move("left");
        else if ( e.key == "ArrowRight") {
          this.move("right")
        };
      }
    };

    window.addEventListener("keypress", handleKeyPress);

   this.btnLeft.mousePressed(() => {
      if (!this.isGameOver) {
        this.move("left");
      }
    });

    this.btnRight.mousePressed(() => {
      if (!this.isGameOver) {
        this.move("right");
      }
});

  }
}
