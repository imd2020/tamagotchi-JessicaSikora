 class Button {
    constructor(x, y, width, height, state) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.state = stateGame;
    }
    hitTest(x, y) {
      if (
        (x - this.x) * (x - (this.x + this.width)) <= 0 &&
        (y - this.y) * (y - (this.y + this.height)) <= 0
      ){}
    }
    display(){}
  }
  