// ### types
interface CellPosition {
  x: number;
  y: number;
}

type Board = Array<Array<number>>;
type LocationsList = Array<NodeLocation>;
type PositionsList = Array<CellPosition>;

// ### NodeCell Class
class NodeLocation {
  public x: number;
  public y: number;

  constructor(public position: CellPosition, public path: PositionsList = []) {
    this.x = position.x;
    this.y = position.y;
  }

  public isEqual(other: NodeLocation) {
    return this.x === other.x && this.y === other.y;
  }
}
function getValidLocations(Location: NodeLocation, board: Board): LocationsList {
  let adjacentSquares: PositionsList = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];
  let currentPath: PositionsList = Location.path;
  let validPositions: PositionsList = adjacentSquares.filter(({ x, y }) => {
    x = x + Location.x;
    y = y + Location.y;
    // check if outside of board
    if (y > board.length - 1 || y < 0 || x > board[0].length - 1 || x < 0) {
      return false;
    }
    // check is wall
    if (board[y][x] === 1) {
      return false;
    }
    // check if already visited
    if (board[y][x] === 2) {
      return false;
    }
    return true;
  });
  return validPositions.map((pos) => {
    let newPos: CellPosition = {
      x: Location.x + pos.x,
      y: Location.y + pos.y,
    };
    let newPath: PositionsList = [...currentPath, newPos];
    return new NodeLocation(newPos, newPath);
  });
}
// ### dijkstra function
export function dijkstra(board: Board, start: CellPosition, end: CellPosition) {
  // clean "visited" flags
  let boardCopy = board.map((arr) => arr.map((c) => (c === 2 ? 0 : c)));

  // TODO if start===end

  let startLocation = new NodeLocation(start, [start]);
  let Queue: LocationsList = [];
  Queue.push(startLocation);
  while (Queue.length > 0) {
    let currentLocation: NodeLocation = Queue.shift();
    let locations: LocationsList = getValidLocations(currentLocation, boardCopy);
    for (let { x, y, path } of locations) {
      // mark valid fields as visited
      boardCopy[y][x] = 2;
      // check if reached end
      if (end.x === x && end.y === y) {
        return path;
      }
    }
    // add valid fields to queue
    Queue = [...Queue, ...locations];
  }
}

// #### UI interaction

// const board: Board = [
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
//   [1, 1, 0, 0, 1, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
//   [0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
//   [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 1, 0, 1, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
// ];

// const start: CellPosition = { x: 0, y: 0 };
// let end: CellPosition = { x: 5, y: 9 };

// function renderUI() {
//   const root = document.getElementById("root") as HTMLDivElement;
//   board.forEach((row, i) => {
//     const rowDiv = document.createElement("div") as HTMLDivElement;
//     rowDiv.classList.add("row");
//     row.forEach((cell, j) => {
//       const cellDiv = document.createElement("div") as HTMLDivElement;
//       cellDiv.classList.add("cell");
//       cellDiv.innerText = cell.toString();
//       cellDiv.classList.add(`${cell === 1 && "wall"}`);
//       cellDiv.id = `${i}|${j}`;
//       cellDiv.addEventListener("mouseover", handleMouseOver);
//       rowDiv.appendChild(cellDiv);
//     });
//     root.appendChild(rowDiv);
//   });
//   const startDiv = document.getElementById(`${start.y}|${start.x}`) as HTMLDivElement;
//   console.log(startDiv);
//   startDiv.classList.add("start");
//   const endDiv = document.getElementById(`${end.y}|${end.x}`) as HTMLDivElement;
//   endDiv.classList.add("end");
// }

// renderUI();

// function renderAlg() {
//   let path = dijkstra(board, start, end);
//   console.log(path);
//   if (path) {
//     path.forEach((cell: CellPosition, i: number) => {
//       const pathDiv = document.getElementById(`${cell.y}|${cell.x}`) as HTMLDivElement;
//       pathDiv.classList.add("path");
//       pathDiv.innerText = i.toString();
//     });
//   }
// }
// renderAlg();

// function handleMouseOver(e: MouseEvent) {
//   const target = e.target as HTMLDivElement;
//   const prevPathDivs = document.querySelectorAll(".path");
//   prevPathDivs.forEach((el) => {
//     el.classList.remove("path");
//     el.classList.remove("end");
//     el.textContent = "0";
//   });
//   target.classList.add("end");
//   const id: string = target.id;
//   let end: CellPosition = { x: parseInt(id.split("|")[1]), y: parseInt(id.split("|")[0]) };
//   let path = dijkstra(board, start, end);
//   if (path) {
//     path.forEach((cell: CellPosition, i: number) => {
//       const pathDiv = document.getElementById(`${cell.y}|${cell.x}`) as HTMLDivElement;
//       pathDiv.classList.add("path");
//       pathDiv.innerText = i.toString();
//     });
//   }
//  }
