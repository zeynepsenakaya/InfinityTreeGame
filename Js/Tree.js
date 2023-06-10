class Tree {
    constructor(startX, startY) {
      this.startX = startX;
      this.startY = startY;
      this.width = 100;
      this.height = 180;
      this.trees = [];
      this.treesPossibility = [0, "left", "right"];
       this.trunkImage = trunkImage;
      this.branchImage = branchImage;
      this.stemWidth = 200;
      this.stemHeight = 100;
      this.starterTree = 5;
    }
  
    init() {
      for (let i = 1; i <= this.starterTree; i++) {
        let newTrunk = 0;
        let color = i % 2 ? "#a17438" : "#cc8e35";
        newTrunk = this.treesPossibility[Math.floor(random(2))];
        this.trees.push({
          value: newTrunk,
          color,
        });
      }
    }
  
    createNewTrunk() {
      let color =
        this.trees[this.trees.length - 1].color == "#a17438"
          ? "#cc8e35"
          : "#a17438";
      let newTrunk = this.treesPossibility[Math.floor(random(3))];
      this.trees.push({
        value: newTrunk,
        color,
      });
    }
  
    draw() {
      let x = width / 2 - this.width / 2;
      this.trees.forEach((tree, index) => {
        fill(tree.color);
        image(
          this.trunkImage,
          x,
          this.startY - index * this.height,
          this.width,
          this.height
        );
  
        if (tree.value == "left") {
          push();
          scale(-1, 1); 
          image(
            this.branchImage,
            -x - 225 + this.stemWidth,
            this.startY - (index * this.height + 80) + this.height / 2,
            this.stemWidth,
            this.stemHeight
          );
          pop();
        }
        if (tree.value == "right") {
          image(
            this.branchImage,
            x - 25 + this.width,
            this.startY - (index * this.height + 80) + this.height / 2,
            this.stemWidth,
            this.stemHeight
          );
        }
      });
      fill("#676C6D");
      rect(x - 10, this.startY + this.height - 10, 50, 30);
      
      fill("#95a5a6");
      rect(x + 20, this.startY + this.height - 10, 80, 30);
    }
  }