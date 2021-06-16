class EndScreen {
  constructor(endFunction, menuFunction) {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 7;
    this.buttonRestart = new Button(
      width / 4 - this.buttonWidth / 3,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth / 2,
      this.buttonHeight,
      '#DD9787',
      `Restart`,
      `#F6E7CB`,
      endFunction
    );
    this.buttonMenu = new Button(
      width  - this.buttonWidth ,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth / 2,
      this.buttonHeight,
      '#DD9787',
      `Menu`,
      `#F6E7CB`
    //   menuFunction doesnt work?
    );
  }
  display() {
    background("#678D58");
    fill(243, 231, 206);
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
  }
  update() {
    this.buttonWidth = width / 3;
    this.buttonHeight = height / 7;
    this.buttonRestart.resize(
      width / 2 - this.buttonWidth / 2,
      2 * (height / 3) - this.buttonHeight / 2,
      this.buttonWidth,
      this.buttonHeight
    );
  }
}
