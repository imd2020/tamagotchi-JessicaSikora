// date:25.06.2021: animation with gsap unsuccessful due to unexplained error "Uncaught SyntaxError: import not found: default tamagotchi.js:4:7 (now moved due to comment tamagotchi.js:7:7)"
// let esc and escabe uncommented but available, solution 404

// dis how I can recall classes (how to use them); only works when the document ist in my script in index
// Date.now(); (for when I want to use time)
// timing event in js
// import gsap from "./gsap.min.js";
import ImageButton from "./imageButton.js";
import Blubsi from "./blubsi.js";
import Needs from "./needs.js";
import Button from "./button.js";
import StartScreen from "./startScreen.js";
import PauseScreen from "./pauseScreen.js";
import { EndScreen } from "./endScreen.js";

let startFunction;
let endFunction;
let pauseFunction;
let restartFunction;
let continueFunction;
let buttonSleep;
let startScreen;
let pauseScreen;
let endScreen;
let inStart;
let inPause;
let inEnd;
let running;
let blubsi;

let funLight = loadImage("gamePics/funLight.png");
let hungryLight = loadImage("gamePics/hungryLight.png");
let sleepLight = loadImage("gamePics/sleepLight.png");
let thirstLight = loadImage("gamePics/thirstLight.png");
let funDark = loadImage("gamePics/funDark.png");
let hungryDark = loadImage("gamePics/hungryDark.png");
let sleepDark = loadImage("gamePics/sleepDark.png");
let thirstDark = loadImage("gamePics/thirstDark.png");

function setup() {
  frameRate(80);
  createCanvas(window.innerWidth / 3, window.innerHeight / 2);
  fillVariables();
  window.setInterval(checkStatus, 1000);
}

function fillVariables() {
  startFunction = start;
  continueFunction = continuee;
  restartFunction = restart;
  pauseFunction = pause;

  // dont make sense
  endScreen = new EndScreen(endFunction);
  pauseScreen = new PauseScreen(continueFunction);
  startScreen = new StartScreen(startFunction);
  inStart = true;
  running = false;
  inPause = false;
  inEnd = false;
  let cookie = readCookie();
  blubsi = new Blubsi(cookie);
  // x, y, width, height, colour, text, textColour, hit
  buttonSleep = new ImageButton(
    blubsi,
    (width * 8) / 10,
    height / 10,
    width / 10,
    height / 10,
    sleepFunction
  );
}

function windowResized() {
  resizeCanvas(window.innerWidth / 3, window.innerHeight / 2);
  startScreen.update();
  endScreen.update();
  blubsi.update();
  buttonSleep.resize((width * 8) / 10, height / 10, width / 10, height / 10);
}

function checkStatus() {
  blubsi.updateStatus();
  bakeCookie(blubsi.becomeCookie());
}

function bakeCookie(value) {
  let cookie = ["blubsi", "=", JSON.stringify(value)].join("");
  document.cookie = cookie;
}

function readCookie() {
  let result = document.cookie.match(new RegExp("blubsi=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
}
function icons() {
  image(
    !blubsi.isSleeping() ? hungryLight : hungryDark,
    0,
    0,
    height / 4,
    height / 4
  );
  image(
    !blubsi.isSleeping() ? thirstLight : thirstDark,
    0,
    height / 4,
    height / 4,
    height / 4
  );
  image(
    !blubsi.isSleeping() ? sleepLight : sleepDark,
    0,
    (2 * height) / 4,
    height / 4,
    height / 4
  );
  image(
    !blubsi.isSleeping() ? funLight : funDark,
    0,
    (3 * height) / 4,
    height / 4,
    height / 4
  );
  let status = blubsi.checkStatus();
  fill(!blubsi.isSleeping() ? "#D4998a" : "#F6E7CB");
  for (let i = 0; i < 4; i++) {
    rect(
      height / 4,
      ((i * 4 + 1.5) * height) / 16,
      (status[i] * width) / (8 * (Needs.MAX_VALUE - Needs.MIN_VALUE)),
      height / 16
    );
  }
}

function sleepFunction() {
  blubsi.sleep();
}

function draw() {
  if (inStart) {
    clear();
    startScreen.display();
  } else if (running) {
    blubsi.display();
    icons();
    buttonSleep.display();
    // implement what the game does when it's running
  } else if (inPause) {
    pauseScreen.display();
    // insert pause screen
  } else if (inEnd) {
    endScreen.display();

    // insert end screen
  }
}

function keyPressed() {
  if (running && keyCode === 27) {
    pause();
  } else if (pause && keyCode === 27) {
    continuee();
  }
}

function mousePressed() {
  if (inStart) {
    startScreen.hitTest(mouseX, mouseY);
  } else if (running) {
    buttonSleep.hitTest(mouseX, mouseY);
    // implement what the game does when it's running
  } else if (inPause) {
    pauseScreen.hitTest(mouseX, mouseY);
    // insert pause screen
  } else if (inEnd) {
    endScreen.hitTest(mouseX, mouseY);
    // insert end screen
  }
}

function start() {
  console.log("start");
  inStart = false;
  running = true;
  // write what happens here
}

function pause() {
  running = false;
  inPause = true;
  console.log("pause");
}

function continuee() {
  inPause = false;
  running = true;
}

function restart() {
  running = true;
  inEnd = false;
  blubsi = new Blubsi();
}

window.draw = draw;
window.setup = setup;
window.mousePressed = mousePressed;
window.onresize = windowResized;
window.keyPressed = keyPressed;
