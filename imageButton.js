export default class ImageButton {
  constructor(blubsi, x, y, width, height, hit, img, imgDark) {
    this.blubsi = blubsi;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.imgDark = imgDark;
    this.whenPushed = hit;
  }

  display() {
    image(
      !this.blubsi.isSleeping() ? this.img : this.imgDark,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  hitTest(x, y) {
    if (
      (x - this.x) * (x - (this.x + this.width)) <= 0 &&
      (y - this.y) * (y - (this.y + this.height)) <= 0
    ) {
      this.whenPushed();
    }
  }

  resize(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
