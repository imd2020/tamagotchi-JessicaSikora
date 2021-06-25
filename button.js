export default class Button {
  constructor(x, y, width, height, colour, text, textColour, hit) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.whenPushed = hit;
    this.colour = colour;
    this.text = text;
    this.textColour = textColour;
    // this.state = stateGame;
  }

  hitTest(x, y) {
    if (
      (x - this.x) * (x - (this.x + this.width)) <= 0 &&
      (y - this.y) * (y - (this.y + this.height)) <= 0
    ) {
      this.whenPushed();
    }
  }

  display() {
    noStroke();
    fill(this.colour);
    rect(this.x, this.y, this.width, this.height);
    fill(this.textColour);
    textSize(this.width / 5);
    textFont("Courier New");
    let len = textWidth(this.text);
    text(
      this.text,
      this.x + this.width / 2 - len / 2,
      this.y + this.height / 2 + this.width / 15
    );
  }

  resize(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
// higher order function (function that gets a functions as an argument / variable)
