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
  continueFunction = pause;
  restartFunciton = restart;
  // dont make sense
  endScreen = new EndScreen(endFunction);
  pauseScreen = new PauseScreen(continueFunction);
  startScreen = new StartScreen(startFunction);
  inStart = true;
  running = false;
  inPause = false;
  inEnd = false;
  blubsi = new Blubsi();
}

function windowResized() {
  resizeCanvas(window.innerWidth / 3, window.innerHeight / 2);
  startScreen.update();
  endScreen.update();
  blubsi.update();
}

function checkStatus() {}

function draw() {
  if (inStart) {
    startScreen.display();
  } else if (running) {
    buttonPause = new Button(i )
    blubsi.display();
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
    // implement what the game does when it's running
  } else if (inPause) {
    pause.Screen.hitTest(mouseX, mouseY);
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
  console.log("pause");
}

function restart(){
  running  = true;
  inEnd = false;
  blubsi = new Blubsi();
}

window.draw = draw;
window.setup = setup;
window.mousePressed = mousePressed;
window.onresize = windowResized;
