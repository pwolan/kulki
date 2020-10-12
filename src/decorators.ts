import Ball from "./Ball";

export function cube(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    originalMethod.apply(this, args);
    let ballDiv: HTMLDivElement = this.ballDiv;
    ballDiv.style.borderRadius = "0";
  };
}

export function invert(num: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      originalMethod.apply(this, args);
      let ballDiv: HTMLDivElement = this.ballDiv;
      ballDiv.style.filter = `invert(${num}%)`;
    };
  };
}
