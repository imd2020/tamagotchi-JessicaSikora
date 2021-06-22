// dis how I can recall classes (how to use them); only works when the document ist in my script in index
// Date.now(); (for when I want to use time)
// timing event in js
import Blubsi from "./blubsi.js";
import Button from "./button.js";
import StartScreen from "./startScreen.js";
import PauseScreen from "./pauseScreen.js";
import { EndScreen } from "./endScreen.js";

let startFunction,
  endFunction,
  restartFunciton,
  pauseFunction,
  buttonPause,
  continueFunction,
  startScreen,
  pauseScreen,
  endScreen,
  inStart,
  running,
  inPause,
  inEnd,
  blubsi;

function setup() {
  frameRate(80);
  createCanvas(window.innerWidth / 3, window.innerHeight / 2);
  fillVariables();
  window.setInterval(checkStatus, 1000);
}

function fillVariables() {
  startFunction = start;
  continueFunction = continuee;
  restartFunciton = restart;
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
  buttonPause = new Button(
    (width * 8) / 10,
    height / 10,
    width / 10,
    height / 10,
    "#DD9787",
    `⏸`,
    `#F6E7CB`,
    pauseFunction
  );
}

function windowResized() {
  resizeCanvas(window.innerWidth / 3, window.innerHeight / 2);
  startScreen.update();
  endScreen.update();
  blubsi.update();
  buttonPause.resize((width * 8) / 10, height / 10, width / 10, height / 10);
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

function draw() {
  if (inStart) {
    startScreen.display();
  } else if (running) {
    blubsi.display();
    buttonPause.display();
    // implement what the game does when it's running
  } else if (inPause) {
    pauseScreen.display();
    // insert pause screen
  } else if (inEnd) {
    endScreen.display();

    // insert end screen
  }
}

function mousePressed() {
  if (inStart) {
    startScreen.hitTest(mouseX, mouseY);
  } else if (running) {
    buttonPause.hitTest(mouseX, mouseY);
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
