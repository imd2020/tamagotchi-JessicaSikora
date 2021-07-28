function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}
/**
 * when window resized, canvas is resized
 * addEventListener: gives signal for resize
 */
window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;
