import Ball from "./Ball";
import { cube, invert } from "./decorators";
class QueueBall extends Ball {
  public ballDiv: HTMLDivElement = document.createElement("div");
  constructor(root: HTMLDivElement) {
    super(9, null);
    this.init();
    this.renderQ(root);
  }
  // @cube
  // @invert(70)
  public renderQ(root: HTMLDivElement) {
    this.ballDiv.classList.add("ball");
    this.ballDiv.classList.add("next");
    this.color = this.randomColor();
    this.ballDiv.style.backgroundColor = this.color;
    root.appendChild(this.ballDiv);
  }
}

export default QueueBall;
