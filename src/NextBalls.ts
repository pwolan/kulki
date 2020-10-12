import QueueBall from "./QueueBall";

class NextBalls {
  public elements: QueueBall[] = [];
  private root: HTMLDivElement = document.getElementById("next") as HTMLDivElement;
  constructor() {
    this.renderElements();
  }
  private renderElements() {
    for (let i = 0; i < 3; i++) {
      let newBall = new QueueBall(this.root);
      this.elements.push(newBall);
    }
  }
  public getData() {
    return this.elements.map(({ color }) => color);
  }
  public destroy() {
    this.elements = [];
    this.root.innerHTML = "";
  }
}
export default NextBalls;
