import { cube, invert } from "./decorators";
import { COLORS } from "./colors";
import { IBall, Point } from "./interfaces";
class Ball implements IBall {
  public x: number;
  public y: number;
  public color: string;
  public isActive = false;
  readonly ballDiv: HTMLDivElement;
  constructor(private size: number, private setActiveBall: Function) {
    this.color = this.randomColor();
    this.ballDiv = document.createElement("div") as HTMLDivElement;
  }
  public init() {
    this.x = this.randomPostion(this.size);
    this.y = this.randomPostion(this.size);
  }
  // @cube
  // @invert(100)
  public render() {
    let { ballDiv } = this;
    const cell = document.getElementById(`${this.x}|${this.y}`) as HTMLDivElement;
    ballDiv.classList.add("ball");
    ballDiv.onclick = this.handleClick;
    ballDiv.style.backgroundColor = this.color;
    cell.appendChild(ballDiv);
  }
  public getBallDiv = () => this.ballDiv;
  protected randomPostion(max: number) {
    let randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
  }

  protected randomColor(): any {
    let index: number = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
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
  public move(to: Point) {
    if (this.x === to.x && this.y === to.y) return;
    this.x = to.x;
    this.y = to.y;
    this.render();
    this.deactivate();
    this.setActiveBall(null);
  }
  public setColor(color: string) {
    this.color = color;
    this.ballDiv.style.backgroundColor = color;
  }
  public remove() {
    this.ballDiv.remove();
  }
}
export default Ball;
