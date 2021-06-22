import Needs from "./needs.js";
export default class Blubsi {
  constructor(cookie) {
    this.update();
    this.imgAlive1 = loadImage(`gamePics/blubsiAlive1.png`);
    this.imgAlive2 = loadImage(`gamePics/blubsiAlive2.png`);
    this.imgNearDeath1 = loadImage(`gamePics/blubsiNearDeath1.png`);
    this.imgNearDeath2 = loadImage(`gamePics/blubsiNearDeath2.png`);
    this.imgDeath = loadImage(`gamePics/blubsDeath.png`);
    this.needs =
      cookie !== null
        ? cookie.needs.map((x) => new Needs(x))
        : [
            new Needs(null, "hunger", 2,50),
            new Needs(null, "thirst", 5,50),
            new Needs(null, "sleep", 1, 100),
            new Needs(null, "fun", 1,50),
          ];
    this.inventory = cookie !== null ? cookie.inventory : [];
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

  /**
   *
   * @returns {[String, Number]} (new and changed (old list still available)) list of all names and values of needs; old list = this.needs
   */
  updateStatus() {
    let newList = [];
    for (let i = 0; i < this.needs.length; i++) {
      newList.push([this.needs[i].needName, this.needs[i].updateNeed()]);
    }
    return newList;
  }
  checkInventory() {
    return this.inventory;
  }
  addToInv(item) {
    this.inventory.push(item);
  }
  giveItem(item) {
    if (!this.inventory.includes(item)) {
      throw "cannot give item that is not in posession";
    } else {
      item.needs.forEach((key, value) =>
        this.needs.filter((y) => y.needName === key)[0].changeNeedValue(value)
      );
    }
  }
  becomeCookie() {
    return {
      needs: this.needs,
      inventory: this.inventory,
    };
  }
}
