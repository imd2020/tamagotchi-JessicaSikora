import Needs from "./needs.js";
export default class Blubsi {
/**
 * all the parts that form blubsi (pictures, needs)
 * @param {Object, null} cookie generates new blob with given cookie, with null it generates a new one
 */
  constructor(cookie) {
    this.ded = false;
    this.update();
    this.imgAlive1 = loadImage(`gamePics/blubsiAlive1.png`);
    this.imgAlive2 = loadImage(`gamePics/blubsiAlive2.png`);
    this.imgNearDeath1 = loadImage(`gamePics/blubsiNearDeath1.png`);
    this.imgNearDeath2 = loadImage(`gamePics/blubsiNearDeath2.png`);
    this.blubsiSleep = loadImage("gamePics/blubsiSleep2.png");
    this.imgDeath = loadImage(`gamePics/blubsiDead.png`);
    this.needs =
      cookie !== null && typeof cookie !== "undefined"
        ? cookie.needs.map((x) => new Needs(x))
        : [
            new Needs(null, "hunger", 2, 50),
            new Needs(null, "thirst", 5, 50),
            new Needs(null, "sleep", 1, 100),
            new Needs(null, "fun", 1, 50),
          ];
    this.bedTime =
      cookie !== null && typeof cookie !== "undefined" ? cookie.bedTime : null;
  }

  /**
   * visualizes how the ambiance changes when it sleeps or almost dies or just exists
   */
  display() {
    if (this.isSleeping()) {
      background("#D4998a");
      image(this.blubsiSleep, this.x, this.y, this.width, this.height);
    } else {
      let oneOrTwo = Math.floor(Date.now() / 1000) % 2;
      if (oneOrTwo) {
        background(`#F6E7CB`);
        image(
          !this.isNearDeath() ? this.imgAlive1 : this.imgNearDeath1,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else {
        background(`#F6E7CB`);
        image(
          !this.isNearDeath() ? this.imgAlive2 : this.imgNearDeath2,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
    }
  }

  /**
   * just views if the vitals are good 
   * @returns {Boolean} true if almost dead
   */
  isNearDeath() {
    for (let i = 0; i < this.needs.length; i++) {
      if (
        this.needs[i].needValue < (Needs.MAX_VALUE - Needs.MIN_VALUE) * 0.2 ||
        this.needs[i].needValue > (Needs.MAX_VALUE - Needs.MIN_VALUE) * 0.8
      )
        return true;
    }
    return false;
  }

  /**
   * updates position of blob
   */
  update() {
    this.x = width / 2 - width / 8;
    this.y = height / 2 - width / 8;
    this.width = width / 4;
    this.height = width / 4;
  }

  /**
   * how toggle sleep is built 
   * -> to bed when he´s awake
   * -> wakes it up when he´s asleep (like a mom)
   */
  sleep() {
    if (this.bedTime === null) {
      this.bedTime = Date.now();
      let sleepNeed = this.needs.filter((x) => x.needName === "sleep")[0];
      this.sleepTimer = setInterval(
        (_) => sleepNeed.changeNeedValue(1.8),
        60000
      );
    } else {
      this.bedTime = null;
      clearInterval(this.sleepTimer);
    }
  }

  /**
   * 
   * @returns {Boolean} true if he´s sleeping
   */
  isSleeping() {
    return this.bedTime !== null;
  }

  /**
   *
   * @returns {[String, Number]} (new and changed (old list still available)) list of all names and values of needs; old list = this.needs
   */
  updateStatus() {
    let newList = [];
    for (let i = 0; i < this.needs.length; i++) {
      newList.push([this.needs[i].needName, this.needs[i].updateNeed()]);
      if (
        this.needs[i].needValue === Needs.MIN_VALUE ||
        this.needs[i].needValue >= Needs.MAX_VALUE
      ) {
        this.ded = true;
      }
    }
    return newList;
  }

  /**
   * 
   * @returns {[Number]} all needs that exist are mapped to their need values
   */
  checkStatus() {
    return this.needs.map((x) => x.needValue);
  }

  giveItem(item) {
    if (item[0] === "hunger") {
      this.needs[0].changeNeedValue(item[1]);
    } else if (item[0] === "thirst") {
      this.needs[1].changeNeedValue(item[1]);
    } else if (item[0] === "fun") {
      this.needs[3].changeNeedValue(item[1]);
    }
  }

  becomeCookie() {
    return {
      needs: this.needs,
      bedTime: this.bedTime,
    };
  }
}
