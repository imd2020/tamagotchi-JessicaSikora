// dis how I can recall classes (how to use them); only works when the document ist in my script in index
// Date.now(); (for when I want to use time)
// timing event in js
let start = new StartScreen();

function setup() {
  frameRate(80);
  createCanvas(window.innerWidth/3, window.innerHeight/2);
  background(243,231,206);
  start.display();
  window.setInterval(checkStatus, 1000);
}

function checkStatus() {
  console.log(1);
}
