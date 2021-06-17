export default class Blubsi {
  constructor() {
    this.update();
    this.imgAlive1 = loadImage(`gamePics/blubsiAlive1.png`);
    this.imgAlive2 = loadImage(`gamePics/blubsiAlive2.png`);
    this.imgNearDeath1 = loadImage(`gamePics/blubsiNearDeath1.png`);
    this.imgNearDeath2 = loadImage(`gamePics/blubsiNearDeath2.png`);
    this.imgDeath = loadImage(`gamePics/blubsDeath.png`);
  }
  display() {
    let oneOrTwo = Math.floor(Date.now() / 1000) % 2;
    if (oneOrTwo) {
      background(`#F6E7CB`);
      image(this.imgAlive1, this.x, this.y, this.width, this.height);
    } else {
      background(`#F6E7CB`);
      image(this.imgAlive2, this.x, this.y, this.width, this.height);
    }
  }
  update() {
    this.x = width / 2 - width / 8;
    this.y = height / 2 - width / 8;
    this.width = width / 4;
    this.height = width / 4;
  }
}
