/**
 * nothing much happens, only a pause screen
 */
export default class PauseScreen {
  constructor() {}
  display() {
    background(`#F6E7CB`);
    fill(`#678D58`);
    textSize(width / 8);
    textFont("Courier New");
    let namePause = "Paused";
    let len = textWidth(namePause);
    text(namePause, width / 2 - len / 2, height / 2);
  }
}
