class Person {
    constructor(maxWidth, maxHeight) {
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
      this.characterPosition = "right";
      this.characterPositions = {
        left: {
          x: this.maxWidth / 2 - 140,
          y: this.maxHeight - 290,
        },
        right: {
          x: this.maxWidth / 2 + 130,
          y: this.maxHeight - 290,
        },
      };
      this.characterWidth = 70;
      this.characterHeight = 120;
      this.character = characterImage;
    }
    draw() {
      this.drawCharacter();
    }
  
     drawCharacter() {
    let characterPosition = this.characterPositions[this.characterPosition];
    push();
    translate(characterPosition.x, characterPosition.y);
    if (this.characterPosition === 'right') {
      scale(-1, 1);
    }
    image(
      this.character,
      0,
      0,
      this.characterWidth,
      this.characterHeight
    );
    pop();
  }
    moveLeft() {
      this.characterPosition = "left";
      this.drawCharacter();
    }
  
    moveRight() {
      this.characterPosition = "right";
      this.drawCharacter();
    }
  }