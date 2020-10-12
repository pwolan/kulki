import Ball from "./Ball";
export interface IBall {
  x: number;
  y: number;
  color: string;
  isActive: boolean;
  ballDiv: HTMLDivElement;
  init: Function;
  render: Function;
  activate: Function;
  deactivate: Function;
  checkCollision: (ball: Ball) => boolean;
  move: Function;
  setColor: Function;
  remove: Function;
}
export interface Point {
  x: number;
  y: number;
}
