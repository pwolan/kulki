import BallsList from "./BallsList";
import Ball from "./Ball";
class Board {
  public boardTab: number[][] = [];
  public root = document.getElementById("board") as HTMLDivElement;
  constructor(private size: number) {
    this.render();
  }
  private render() {
    this.buildCells();
    // this.renderBalls();
  }
  private buildCells() {
    const { size } = this;
    for (let i = 0; i < size; i++) {
      const row: HTMLDivElement = document.createElement("div");
      row.classList.add("row");
      this.boardTab[i] = [];
      for (let j = 0; j < size; j++) {
        const cell: HTMLDivElement = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${j}|${i}`;
        row.appendChild(cell);
        this.boardTab[i][j] = 0;
      }
      this.root.appendChild(row);
    }
  }
  getSize = () => this.size;

  getBoard(ballsList: Ball[]): number[][] {
    let tab: number[][] = [];
    for (let i = 0; i < this.size; i++) {
      tab[i] = [];
      for (let j = 0; j < this.size; j++) {
        tab[i][j] = 0;
      }
    }
    for (let ball of ballsList) {
      let { x, y } = ball;
      tab[y][x] = 1;
    }
    return tab;
  }
}

export default Board;
