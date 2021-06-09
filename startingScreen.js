let xButton = 500;
let yButton = 200;

let textOne = "Easy";
let textTwo = "Medium";
let textThree = "Hard";

function startscreen(xButton, yButton) {
  background(35, 0, 30);

  noStroke();
  fill(32, 163, 158);
  rect(xButton, yButton, 200, 100, 50);
  fill(255, 186, 73);
  textSize(70);
  textFont("Gill Sans MT Condensed");
  text(textOne, xButton + 50, yButton + 70);

  noStroke();
  fill(50, 10, 40);
  rect(xButton, yButton + 150, 200, 100, 50);
  fill(255, 186, 73);
  textSize(70);
  textFont("Gill Sans MT Condensed");
  text(textTwo, xButton + 30, yButton + 220);

  noStroke();
  fill(37, 168, 17);
  rect(xButton, yButton + 300, 200, 100, 50);
  fill(255, 186, 73);
  textSize(70);
  textFont("Gill Sans MT Condensed");
  text(textThree, xButton + 50, yButton + 370);
}

startscreen(xButton, yButton);
