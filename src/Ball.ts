import { COLORS } from "./colors";
import { IBall } from "./interfaces";
class Ball implements IBall {
  public x: number;
  public y: number;
  public color: COLORS;
  public isActive = false;
  public ballDiv: HTMLDivElement;
  constructor(size: number, private setActiveBall: Function) {
    this.x = this.randomPostion(size);
    this.y = this.randomPostion(size);
    this.color = this.randomColor();
    this.ballDiv = document.createElement("div") as HTMLDivElement;
    this.render();
  }
  private render() {
    let { ballDiv } = this;
    const cell = document.getElementById(`${this.x}|${this.y}`) as HTMLDivElement;
    ballDiv.classList.add("ball");
    ballDiv.onclick = this.handleClick;
    ballDiv.style.backgroundColor = this.color;
    cell.appendChild(ballDiv);
  }
  private randomPostion(max: number) {
    let randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
  }
  private randomColor() {
    // let len = Object.keys(COLORS).length;
    // let enumValues = Object.keys(COLORS).map((val) => val);
    return COLORS.BLUE;
  }
  public activate() {
    this.isActive = true;
    this.ballDiv.classList.add("active");
  }
  public deactivate() {
    this.isActive = false;
    this.ballDiv.classList.remove("active");
  }
  private handleClick = () => {
    if (this.isActive) {
      this.deactivate();
      this.setActiveBall(null);
    } else {
      this.activate();
      this.setActiveBall(this);
    }
  };
  /**
   * checkCollision with other ball
   */
  public checkCollision(ball: Ball): boolean {
    let { x, y } = this;
    return ball.x === x && ball.y === y;
  }
}
export default Ball;