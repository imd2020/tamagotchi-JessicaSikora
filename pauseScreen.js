class PauseScreen {
  constructor(pauseFunction) {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 7;
    this.buttonContinue = new Button(
      width / 2 - this.buttonWidth / 2,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight,
      `#DD9787`,
      `continue`,
      `#F6E7CB`,
      continueFunction
    );
  }
  display() {
    background(`#F6E7CB`);
    fill(`#678D58`);
    textSize(width / 8);
    textFont("Courier New");
    let namePause = "Paused";
    let len = textWidth(namePause);
    text(namePause, width / 2 - len / 2, height / 3);
    this.buttonContinue.display();
  }
  hitTest(x, y) {
    this.buttonContinue.hitTest(x, y);
  }
  update() {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 2;
    this.buttonContinue.resize(
      width / 2 - this.buttonWidth / 2,
      2 * (heigth / 3) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight
    );
  }
}
