export default class ImagePause {
  constructor(img, x, y, width, height, hit) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = loadImage("gamePics/pauseLight");
    this.imgPauseDark = loadImage("gamePics/pauseDark");
  }
  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x = (width * 8) / 10;
    this.y = height / 10;
    this.width = width / 10;
    this.height = height / 10;
  }
}
