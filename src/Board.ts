import { Point } from "./interfaces";
import Ball from "./Ball";
class Board {
  readonly root = document.getElementById("board") as HTMLDivElement;
  constructor(private size: number) {
    this.buildCells();
  }
  private buildCells() {
    const { size } = this;
    for (let i = 0; i < size; i++) {
      const row: HTMLDivElement = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < size; j++) {
        const cell: HTMLDivElement = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${j}|${i}`;
        row.appendChild(cell);
      }
      this.root.appendChild(row);
    }
  }
  getSize = () => this.size;

  static getBoard(ballsList: Ball[]): number[][] {
    let tab: number[][] = [];
    for (let i = 0; i < 9; i++) {
      tab[i] = [];
      for (let j = 0; j < 9; j++) {
        tab[i][j] = 0;
      }
    }
    for (let ball of ballsList) {
      let { x, y } = ball;
      tab[y][x] = 1;
    }
    return tab;
  }
  public clearOldPath() {
    let oldPath = document.querySelectorAll(".path");
    oldPath.forEach((el) => el.classList.remove("path"));
  }
  public getIdFromCell(cell: HTMLDivElement): Point {
    let id: string;
    if (cell.id) {
      id = cell.id;
    } else {
      id = cell.parentElement.id;
    }
    let end: Point = {
      x: parseInt(id.split("|")[0]),
      y: parseInt(id.split("|")[1]),
    };
    return end;
  }
  public setScore(num: number) {
    let scoreDiv = document.getElementById("score") as HTMLDivElement;
    scoreDiv.textContent = num.toString();
  }
}

export default Board;
