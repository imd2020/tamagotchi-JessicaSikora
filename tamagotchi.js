// only whay I got the animation to work is like this
// dis how I can recall classes (how to use them); only works when the document ist in my script in index
// Date.now(); (for when I want to use time)
// timing event in js
import ImageButton from "./imageButton.js";
import Blubsi from "./blubsi.js";
import Needs from "./needs.js";
import Button from "./button.js";
import StartScreen from "./startScreen.js";
import PauseScreen from "./pauseScreen.js";
import { EndScreen } from "./endScreen.js";

let startFunction;
let endFunction;
let restartFunction;
let pauseFunction;
let continueFunction;
let buttonSleep;
let buttonFun;
let buttonFood;
let buttonThirst;

let startScreen;
let pauseScreen;
let endScreen;
let inStart;
let inPause;
let inEnd;
let running;
let blubsi;
let interval;
let food = { times: 0, cooldown: null };
let thirst = { times: 0, cooldown: null };
let fun = { times: 0, cooldown: null };

let funLight = loadImage("gamePics/funLight.png");
let hungryLight = loadImage("gamePics/hungryLight.png");
let sleepLight = loadImage("gamePics/sleepLight.png");
let thirstLight = loadImage("gamePics/thirstLight.png");

let funDark = loadImage("gamePics/funDark.png");
let hungryDark = loadImage("gamePics/hungryDark.png");
let sleepDark = loadImage("gamePics/sleepDark.png");
let thirstDark = loadImage("gamePics/thirstDark.png");

/**
 * creates Canvas and fill with inital configuration
 */
function setup() {
  frameRate(80);
  createCanvas(window.innerWidth / 3, window.innerHeight / 2);
  fillVariables();
}

/**
 * fill / sets all variables
 */
function fillVariables() {
  startFunction = start;
  continueFunction = continuee;
  restartFunction = restart;
  pauseFunction = pause;
  endFunction = menu;
  // dont make sense
  endScreen = new EndScreen(endFunction, restartFunction);
  pauseScreen = new PauseScreen();
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
    width - height / 4,
    height / 2,
    height / 4,
    height / 4,
    sleepFunction,
    loadImage("gamePics/LampLight.png"),
    loadImage("gamePics/LampDark.png")
  );
  buttonFood = new ImageButton(
    blubsi,
    width - height / 4,
    0,
    height / 4,
    height / 4,
    foodFunction,
    loadImage("gamePics/forkLight.png"),
    loadImage("gamePics/forkDark.png")
  );
  buttonThirst = new ImageButton(
    blubsi,
    width - height / 4,
    height / 4,
    height / 4,
    height / 4,
    thirstFunction,
    loadImage("gamePics/dropLight.png"),
    loadImage("gamePics/dropDark.png")
  );
  buttonFun = new ImageButton(
    blubsi,
    width - height / 4,
    (3 * height) / 4,
    height / 4,
    height / 4,
    funFunction,
    loadImage("gamePics/heartLight.png"),
    loadImage("gamePics/heartDark.png")
  );
}

/**
 * resizes canvas and elements on it
 */
function windowResized() {
  resizeCanvas(window.innerWidth / 3, window.innerHeight / 2);
  startScreen.update();
  endScreen.update();
  blubsi.update();
  buttonSleep.resize(width - height / 4, height / 2, height / 4, height / 4);
  buttonFood.resize(width - height / 4, 0, height / 4, height / 4);
  buttonThirst.resize(width - height / 4, height / 4, height / 4, height / 4);
  buttonFun.resize(
    width - height / 4,
    (3 * height) / 4,
    height / 4,
    height / 4
  );
}

/**
 * checks status of creature
 * updated it after a set timeinterval (interval defined in different function)
 *  updates cookies
 */
function checkStatus() {
  blubsi.updateStatus();
  if (blubsi.ded) {
    running = false;
    inEnd = true;
    clearInterval(interval);
    eatCookie();
  } else {
    bakeCookie(blubsi.becomeCookie());
  }
}

/**
 * creates cookie
 * @param {Object} value information stored in cookie
 */
function bakeCookie(value) {
  let cookie = ["blubsi", "=", JSON.stringify(value)].join("");
  document.cookie = cookie;
}

/**
 * looks up cookie named blubsi (just looks at it, nothing more)
 * @returns a blubsi cookie (odd flavour though)
 */
function readCookie() {
  let result = document.cookie.match(new RegExp("blubsi=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
}

/**
 * set cookie named blubsi in past so its not valid anymore (basically delete cookie)
 */
function eatCookie() {
  document.cookie = ["blubsi=; expires=Thu, 01-Jan-1970 00:00:01 GMT;"];
}

/**
 * draws icons used for needs and visual need values
 */
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

/**
 * the heart of the game when it comes to visuals
 */
function draw() {
  if (inStart) {
    clear();
    startScreen.display();
  } else if (running) {
    blubsi.display();
    icons();
    buttonSleep.display();
    buttonFood.display();
    buttonThirst.display();
    buttonFun.display();
    fill(!blubsi.isSleeping() ? "#D4998a" : "#F6E7CB");
    textSize(width / 30);
    if (food.cooldown !== null && food.cooldown < Date.now()) {
      food.cooldown = null;
    }
    let textFood =
      food.cooldown !== null
        ? Math.floor((food.cooldown - Date.now()) / 1000)
        : 5 - food.times;
    text(
      textFood,
      width - height / 4 - textWidth(textFood),
      width / 60 + height / 8
    );
    if (thirst.cooldown !== null && thirst.cooldown < Date.now()) {
      thirst.cooldown = null;
    }
    let textThirst =
      thirst.cooldown !== null
        ? Math.floor((thirst.cooldown - Date.now()) / 1000)
        : 5 - thirst.times;
    text(
      textThirst,
      width - height / 4 - textWidth(textThirst),
      width / 60 + (3 * height) / 8
    );
    if (fun.cooldown !== null && fun.cooldown < Date.now()) {
      fun.cooldown = null;
    }
    let textFun =
      fun.cooldown !== null
        ? Math.floor((fun.cooldown - Date.now()) / 1000)
        : 5 - fun.times;
    text(
      textFun,
      width - height / 4 - textWidth(textFun),
      width / 60 + (7 * height) / 8
    );
    // implement what the game does when it's running
  } else if (inPause) {
    pauseScreen.display();
    // insert pause screen
  } else if (inEnd) {
    endScreen.display();

    // insert end screen
  }
}

/**
 * so pause Key (esc) works
 */
function keyPressed() {
  if (running && keyCode === 27) {
    pause();
  } else if (pause && keyCode === 27) {
    continuee();
  }
}

/**
 * for player interaction (makes button go vrrrr)
 */
function mousePressed() {
  if (inStart) {
    startScreen.hitTest(mouseX, mouseY);
  } else if (running) {
    buttonSleep.hitTest(mouseX, mouseY);
    buttonFood.hitTest(mouseX, mouseY);
    buttonThirst.hitTest(mouseX, mouseY);
    buttonFun.hitTest(mouseX, mouseY);
    // implement what the game does when it's running
  } else if (inPause) {
    // insert pause screen
  } else if (inEnd) {
    endScreen.hitTest(mouseX, mouseY);
    // insert end screen
  }
}

/**
 * changes from start to gameScreen and starts checkStatus timer
 * (every second)
 */
function start() {
  inStart = false;
  running = true;
  interval = window.setInterval(checkStatus, 1000);
  // write what happens here
}

/**
 * changes from game to pause screen
 */
function pause() {
  running = false;
  inPause = true;
}

/**
 * and now from pause to game screen *exciting*
 */
function continuee() {
  inPause = false;
  running = true;
}

/**
 * restarts game once you end on the end screen, generates a new blob with a new checkStatus timer
 * (every second, it didn´t change)
 * null because we want no cookies
 */
function restart() {
  running = true;
  inEnd = false;
  food = { times: 0, cooldown: null };
  thirst = { times: 0, cooldown: null };
  fun = { times: 0, cooldown: null };
  blubsi = new Blubsi(null);
  interval = window.setInterval(checkStatus, 1000);
}

/**
 * from end to menu, a one way street, with the plus of a new blob
 * also no cookies wanted (null)
 */
function menu() {
  inEnd = false;
  inStart = true;
  blubsi = new Blubsi(null);
}

/**
 * toggle sleep, as often as you want
 */
function sleepFunction() {
  blubsi.sleep();
}

/**
 * attemps to give food, only successful a few times in a row, after that you have to wait (cooldown)
 */
function foodFunction() {
  let item = ["hunger", Math.random() * 20];
  if (food.cooldown !== null && food.cooldown > Date.now()) {
  } else {
    blubsi.giveItem(item);
    food.times += 1;
    if (food.times === 5) {
      food.times = 0;
      food.cooldown = Date.now() + 1000 * 60 * 15;
    }
  }
}

/**
 * also tries to give some water, the successrate isn´t any better than before
 */
function thirstFunction() {
  let item = ["thirst", Math.random() * 20];
  if (thirst.cooldown !== null && thirst.cooldown > Date.now()) {
  } else {
    blubsi.giveItem(item);
    thirst.times += 1;
    if (thirst.times === 5) {
      thirst.times = 0;
      thirst.cooldown = Date.now() + 1000 * 60 * 5;
    }
  }
}

/**
 * it doesn´t get better with this one
 */
function funFunction() {
  let item = ["fun", Math.random() * 10];
  if (fun.cooldown !== null && fun.cooldown > Date.now()) {
  } else {
    blubsi.giveItem(item);
    fun.times += 1;
    if (fun.times === 5) {
      fun.times = 0;
      fun.cooldown = Date.now() + 1000 * 60 * 10;
    }
  }
}

window.draw = draw;
window.setup = setup;
window.mousePressed = mousePressed;
window.onresize = windowResized;
window.keyPressed = keyPressed;
