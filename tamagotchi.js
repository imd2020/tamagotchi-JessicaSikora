// dis how I can recall classes (how to use them); only works when the document ist in my script in index
// Date.now(); (for when I want to use time)
// timing event in js
// import gsap from "./gsap.min.js";
import Blubsi from "./blubsi.js";
import Button from "./button.js";
import StartScreen from "./startScreen.js";
import PauseScreen from "./pauseScreen.js";
import { EndScreen } from "./endScreen.js";

let startFunction,
  // esc = {
  //   y:height/2,
  // };
  endFunction,
  restartFunciton,
  pauseFunction,
  continueFunction,
  startScreen,
  pauseScreen,
  endScreen,
  inStart,
  running,
  inPause,
  inEnd,
  blubsi,
  img1 = loadImage("gamePics/funLight.png"),
  img2 = loadImage("gamePics/hungryLight.png"),
  img3 = loadImage("gamePics/sleepLight.png"),
  img4 = loadImage("gamePics/thirstLight.png");
function setup() {
  frameRate(80);
  createCanvas(window.innerWidth / 3, window.innerHeight / 2);
  fillVariables();
  window.setInterval(checkStatus, 1000);
}

// function escabe(){
//   fill(0);
//   textSize(60);
//   text("press esc to pause", width/5, esc.y);
// }

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
}

function windowResized() {
  resizeCanvas(window.innerWidth / 3, window.innerHeight / 2);
  startScreen.update();
  endScreen.update();
  blubsi.update();
  
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
  image(img1, width / 60, height / 4, height / 4, height / 4);
  image(img2, width / 60, (2 * height) / 4, height / 4, height / 4);
  image(img3, width / 60, (3 * height) / 4, height / 4, height / 4);
  image(img4, width / 60, (4 * height) / 4, height / 4, height / 4);
}

function draw() {
  if (inStart) {
    clear();
    startScreen.display();
    // escabe();
    // gsap.to(esc,{
    //   duration:2,
    //   y: height/2,
    //   onComplete:() => {
    //     gsap.to(esc,{
    //       duration:1,
    //       y:height/3,
    //     })
    //   }
    // })
  } else if (running) {
    blubsi.display();
    icons();
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
