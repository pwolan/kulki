import { Point } from "./interfaces";
import Ball from "./Ball";
import Board from "./Board";
import { dijkstra } from "./pathfinding";

class BallsList {
  private count: number = 3;
  private elements: Ball[] = [];
  private activeBall: Ball;
  private board: Board;
  constructor(board: Board) {
    this.board = board;
    this.init();
  }
  private init() {
    for (let i = 0; i < this.count; i++) {
      this.addNewBall();
    }
    this.board.root.onmousemove = this.handleMouseMove;
  }
  /**
   * add new Ball to list
   */
  public addNewBall() {
    let size = this.board.getSize();
    let newBall: Ball;
    do {
      newBall = new Ball(size, this.setActiveBall);
    } while (this.checkIsAlone(newBall));
    this.elements.push(newBall);
  }
  private checkIsAlone(ball: Ball): boolean {
    for (let el of this.elements) {
      if (ball.checkCollision(el)) {
        return true;
      }
    }
    return false;
  }
  private setActiveBall = (ball: Ball) => {
    console.log(this);
    this.activeBall && this.activeBall.deactivate();
    if (ball) {
      this.activeBall = ball;
    } else {
      this.activeBall = null;
    }
  };

  private handleMouseMove = (e: Event) => {
    if (this.activeBall) {
      const target = e.target as HTMLDivElement;
      let id: string;
      if (target.id) {
        id = target.id;
      } else {
        id = target.parentElement.id;
      }
      console.log(id);
      let end: Point = {
        x: parseInt(id.split("|")[0]),
        y: parseInt(id.split("|")[1]),
      };
      this.findPath(end);
    }
  };
  private findPath(end: Point) {
    let oldPath = document.querySelectorAll(".path");
    oldPath.forEach((el) => el.classList.remove("path"));
    let start: Point = {
      x: this.activeBall.x,
      y: this.activeBall.y,
    };
    let path = dijkstra(this.board.boardTab, start, end);
    console.log(path);
    path.forEach((cell) => {
      let el = document.getElementById(`${cell.x}|${cell.y}`) as HTMLDivElement;
      el.classList.add("path");
    });
  }
}
export default BallsList;
