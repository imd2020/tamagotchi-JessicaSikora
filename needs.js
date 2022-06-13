export default class Needs {
  // min and max of how much or little it can achieve
  static MAX_VALUE = 200;
  static MIN_VALUE = 0;

  /**
   *
   * @param {*} cookie takes the information the cookie has and if there isn´t any, makes a new need
   * @param {String} needName
   * @param {Number} whenDed withing what timeslot is need depleated; unit: h
   * @param {Number} needValue start value
   */
  constructor(cookie, needName,  whenDed, needValue ) {
    if (cookie === null) {
      this.needName = needName;
      this.needValue = needValue;
      this.lastChecked = Date.now();
      this.whenDed =
        (Needs.MAX_VALUE - Needs.MIN_VALUE) /
        (whenDed*60 * 60 * 1000);
    }else {
        Object.assign(this, cookie);
    }
  }

  /**
   * updates state since last update
   * difT= changed value of need value derived using time difference
   * @returns {Number} new needValue
   */
  updateNeed() {
    let now = Date.now();
    let difT = (now - this.lastChecked) * this.whenDed;
    this.lastChecked = now;
    // if new value smaller than min then its min
    this.needValue =
      this.needValue - difT  < Needs.MIN_VALUE
        ? Needs.MIN_VALUE
        : this.needValue - difT;
    return this.needValue;
  }

  checkNeed() {
    return this.needValue;
  }

  /**
   *
   * @param {Number} change
   */
  //   IDE only accepts numbers
  changeNeedValue(change) {
    this.needValue += change;
    
    this.checkNeed();
  }
}
