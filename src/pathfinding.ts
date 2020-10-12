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
