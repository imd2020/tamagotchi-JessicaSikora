import Button from "./button.js";
export default class StartScreen {
  constructor(startFunction) {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 7;
    this.buttonStart = new Button(
      width / 2 - this.buttonWidth / 2,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight,
      "#DD9787",
      "Start",
      "#F6E7CB",
      startFunction
    );
  }
  display() {
    background(243, 231, 206);
    fill("#678D58");
    textSize(width / 8);
    textFont("Courier New");
    let name = "Blubsigotchi";
    let len = textWidth(name);
    text(name, width / 2 - len / 2, height / 3);
    this.buttonStart.display();
  }
  hitTest(x, y) {
    this.buttonStart.hitTest(x, y);
  }

  update() {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 7;
    this.buttonStart.resize(
      width / 2 - this.buttonWidth / 2,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight
    );
  }
}

