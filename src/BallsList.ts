import { Point } from "./interfaces";
import Ball from "./Ball";
import Board from "./Board";
import NextBalls from "./NextBalls";
import { dijkstra } from "./pathfinding";

class BallsList {
  private count: number = 3;
  private elements: Ball[] = [];
  private activeBall: Ball;
  private board: Board;
  private nextBalls: NextBalls = new NextBalls();
  private score: number = 0;
  constructor(board: Board) {
    this.board = board;
    this.init();
  }
  private init() {
    this.board.setScore(this.score);
    for (let i = 0; i < this.count; i++) {
      this.addNewBall();
    }
    this.board.root.onmousemove = this.handleMouseMove;
    let cells = document.querySelectorAll(".cell") as NodeList;
    cells.forEach((cell) => {
      cell.addEventListener("click", this.handleCellClick);
    });
  }
  /**
   * add new Ball to list
   */
  public addNewBall(color: string = null) {
    let size = this.board.getSize();
    let newBall: Ball;
    do {
      newBall = new Ball(size, this.setActiveBall);
      newBall.init();
    } while (this.checkIsAlone(newBall));
    newBall.render();
    color && newBall.setColor(color);
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
    this.activeBall && this.activeBall.deactivate();
    if (ball) {
      this.activeBall = ball;
    } else {
      this.activeBall = null;
    }
  };
  private handleCellClick = (e: Event) => {
    if (this.activeBall) {
      const target = e.target as HTMLDivElement;
      let end: Point = this.board.getIdFromCell(target);
      if (this.findPath(end)) {
        let activeball = this.activeBall;
        this.activeBall.move(end);
        this.board.clearOldPath();
        this.checkDestroy(activeball);
        // insert new balls
        this.insertNewBalls();
        this.checkDestroy(activeball);
      }
    }
  };
  private insertNewBalls() {
    // get data make new balls
    let colors: string[] = this.nextBalls.getData();
    colors.forEach((c) => this.addNewBall(c));
    if (this.elements.length >= 9 * 9) {
      this.lose();
    }
    this.nextBalls.destroy();
    this.nextBalls = new NextBalls();
  }
  private lose() {
    alert("To koniec, twój wynik to: " + this.score);
    location.reload();
  }
  private handleMouseMove = (e: Event) => {
    if (this.activeBall) {
      const target = e.target as HTMLDivElement;
      let end: Point = this.board.getIdFromCell(target);
      this.findPath(end);
    }
  };
  private findPath(end: Point) {
    this.board.clearOldPath();
    let start: Point = {
      x: this.activeBall.x,
      y: this.activeBall.y,
    };
    let currentBoard = Board.getBoard(this.elements);
    let path = dijkstra(currentBoard, start, end);
    if (path) {
      path.forEach((cell) => {
        let el = document.getElementById(`${cell.x}|${cell.y}`) as HTMLDivElement;
        el.classList.add("path");
      });
    }
    return path;
  }
  public checkDestroy(activeBall: Ball) {
    let onlyThisColor = this.elements.filter(({ color }) => color === activeBall.color);
    console.log(onlyThisColor);
    let vertical: number = this.countRow(activeBall, { x: 0, y: 1 }, onlyThisColor);
    vertical += this.countRow(activeBall, { x: 0, y: -1 }, onlyThisColor);
    console.log(vertical);
    if (vertical >= 4) {
      this.deleteRow(activeBall, { x: 0, y: 1 }, onlyThisColor);
      this.deleteRow(activeBall, { x: 0, y: -1 }, onlyThisColor);
    }
    let horizontal: number = this.countRow(activeBall, { x: 1, y: 0 }, onlyThisColor);
    horizontal += this.countRow(activeBall, { x: -1, y: 0 }, onlyThisColor);
    if (horizontal >= 4) {
      this.deleteRow(activeBall, { x: 1, y: 0 }, onlyThisColor);
      this.deleteRow(activeBall, { x: -1, y: 0 }, onlyThisColor);
    }
    let diagonal: number = this.countRow(activeBall, { x: 1, y: 1 }, onlyThisColor);
    diagonal += this.countRow(activeBall, { x: -1, y: -1 }, onlyThisColor);
    if (diagonal >= 4) {
      this.deleteRow(activeBall, { x: 1, y: 1 }, onlyThisColor);
      this.deleteRow(activeBall, { x: -1, y: -1 }, onlyThisColor);
    }

    let diagonal2: number = this.countRow(activeBall, { x: -1, y: 1 }, onlyThisColor);
    diagonal2 += this.countRow(activeBall, { x: 1, y: -1 }, onlyThisColor);
    if (diagonal2 >= 4) {
      this.deleteRow(activeBall, { x: -1, y: 1 }, onlyThisColor);
      this.deleteRow(activeBall, { x: 1, y: -1 }, onlyThisColor);
    }
    if (vertical >= 4 || horizontal >= 4 || diagonal >= 4 || diagonal2 >= 4) {
      activeBall.remove();
      this.elements = this.elements.filter(({ x, y }) => x !== activeBall.x || y !== activeBall.y);
      this.board.setScore(++this.score);
    }
  }
  private countRow(start: Ball, delta: Point, elements: Ball[]) {
    let { x, y } = delta;
    let i = 0;
    let isValid;
    do {
      i++;
      isValid = elements.find((b) => b.x === start.x + i * x && b.y === start.y + i * y);
    } while (isValid);
    return i - 1;
  }
  private deleteRow(start: Ball, delta: Point, elements: Ball[]) {
    let { x, y } = delta;
    let i = 0;
    let element;
    do {
      i++;
      element = elements.find((b) => b.x === start.x + i * x && b.y === start.y + i * y);
      if (element) {
        let el: Ball = this.elements.find(
          (b) => b.x === start.x + i * x && b.y === start.y + i * y
        );
        el.remove();
        this.elements = this.elements.filter(
          (b) => b.x !== start.x + i * x || b.y !== start.y + i * y
        );
        this.board.setScore(++this.score);
      }
    } while (element);
    return i - 1;
  }
}
export default BallsList;
