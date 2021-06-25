import Button from "./button.js";
export class EndScreen {
  constructor(endFunction, restartFunction) {
    this.buttonWidth = width / 8;
    this.buttonHeight = height / 9;
    this.buttonRestart = new Button(
      width / 2 - 1.5 * this.buttonWidth,
      4 * (height / 5) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight,
      "#F6E7CB",
      `Restart`,
      `#D4998a`,
      restartFunction
    );
    this.buttonMenu = new Button(
      width / 2 + 0.5 * this.buttonWidth,
      4 * (height / 5) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight,
      "#F6E7CB",
      `Menu`,
      `#D4998a`,
      endFunction
    );
    this.imgDed = loadImage("gamePics/blubsiDead.png");
  }
  display() {
    background("#F6E7CB");
    image(
      this.imgDed,
      width / 2 - width / 8,
      height / 2 - width / 8,
      width / 4,
      width / 4
    );
    fill("#D4998a");
    textSize(width / 8);
    textFont("Courier New");
    let endCall = "End";
    let len = textWidth(endCall);
    text(endCall, width / 2 - len / 2, height / 3);
    this.buttonRestart.display();
    this.buttonMenu.display();
  }
  hitTest(x, y) {
    this.buttonRestart.hitTest(x, y);
    this.buttonMenu.hitTest(x, y);
  }
  update() {
    this.buttonWidth = width / 8;
    this.buttonHeight = height / 9;
    this.buttonRestart.resize(
      width / 2 - 1.5 * this.buttonWidth,
      4 * (height / 5) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight
    );
    this.buttonMenu.resize(
      width / 2 + 0.5 * this.buttonWidth,
      4* (height / 5) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight
    );
  }
}
