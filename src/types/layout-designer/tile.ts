import { AccessWay, Position, Direction } from "./layout-types";
import { Cell } from "./cell";
import { TileUtils } from "./utils";

export interface TileDefinition {
  position: Position;
  direction: Direction;
  accessWay?: AccessWay;
}

export interface TileStatus {
  status: boolean;
  message: string;
  tile: Tile | null | undefined;
}

/**
 * Represents a virtual instance of a 1x1 tile
 * on the Stage. Is always a child of Tool.
 */
export class Tile {
  private static CURRENT_ID = 1;

  readonly id: string;
  readonly parentID: string;
  readonly accessWay: AccessWay;

  private readonly definedDirection: Direction;
  private readonly definedPosition: Position = Position.ORIGIN;
  private customDirection: Direction = Direction.NONE;
  private occupiedCell: Cell | null = null;
  private occupiedPosition: Position | null = null;

  constructor(parentID: string, pos: Position, dir: Direction, accessWay: AccessWay | undefined) {
    this.id = Tile.generateID();
    this.definedPosition = pos;
    this.definedDirection = dir;
    this.parentID = parentID;
    this.accessWay = accessWay !== undefined ? accessWay : AccessWay.NONE;
  }

  static generateID(): string {
    const id: number = Tile.CURRENT_ID;
    Tile.CURRENT_ID += 1;
    return `T${id}`;
  }

  public toString(): string {
    return `
			ID: ${this.id},
			Access Way: ${this.accessWay},
			Position: [Defined: ${this.definedPosition}] [Occupied: ${this.getPosition()}]
			Direction: [Defined: ${this.definedDirection}] [Current: ${this.getDirection()}],
			Cell: ${this.occupiedCell}
	  `;
  }

  public resetDirection(): void {
    this.customDirection = Direction.NONE;
  }

  public getDirection(): Direction {
    if (this.customDirection !== Direction.NONE) {
      return this.customDirection;
    }

    return this.definedDirection;
  }

  public getPosition(): Position {
    if (this.occupiedPosition !== null) {
      return this.occupiedPosition;
    }

    return this.definedPosition;
  }

  public getDefinedPosition(): Position {
    return this.definedPosition;
  }

  public getOccupiedCell(): Cell | null {
    return this.occupiedCell;
  }

  public setOccupiedCell(cell: Cell | null): void {
    // clear previous cell
    if (this.occupiedCell) {
      this.occupiedCell.setOccupied(false);
    }

    // update new cell
    this.occupiedCell = cell;
    if (this.occupiedCell) {
      this.occupiedCell.setOccupied(true);
    }
  }

  public setOccupiedPosition(pos: Position): void {
    this.occupiedPosition = pos;
  }

  public rotate(angle: number): void {
    const dirAtZero: Direction = this.definedDirection;
    const rot: number = TileUtils.getEquivalentRotation(angle);
    switch (rot) {
      case 0:
        this.setDirection(Direction.NONE);
        break;
      case 90:
        if (dirAtZero === Direction.TOP) {
          this.setDirection(Direction.RIGHT);
        } else if (dirAtZero === Direction.RIGHT) {
          this.setDirection(Direction.BOTTOM);
        } else if (dirAtZero === Direction.BOTTOM) {
          this.setDirection(Direction.LEFT);
        } else if (dirAtZero === Direction.LEFT) {
          this.setDirection(Direction.TOP);
        } else if (dirAtZero === Direction.VERTICAL) {
          this.setDirection(Direction.HORIZONTAL);
        } else if (dirAtZero === Direction.HORIZONTAL) {
          this.setDirection(Direction.VERTICAL);
        }
        break;
      case 180:
        if (dirAtZero === Direction.TOP) {
          this.setDirection(Direction.BOTTOM);
        } else if (dirAtZero === Direction.RIGHT) {
          this.setDirection(Direction.LEFT);
        } else if (dirAtZero === Direction.BOTTOM) {
          this.setDirection(Direction.TOP);
        } else if (dirAtZero === Direction.LEFT) {
          this.setDirection(Direction.RIGHT);
        } else if (dirAtZero === Direction.VERTICAL) {
          this.setDirection(Direction.VERTICAL);
        } else if (dirAtZero === Direction.HORIZONTAL) {
          this.setDirection(Direction.HORIZONTAL);
        }
        break;
      case 270:
        if (dirAtZero === Direction.TOP) {
          this.setDirection(Direction.LEFT);
        } else if (dirAtZero === Direction.RIGHT) {
          this.setDirection(Direction.TOP);
        } else if (dirAtZero === Direction.BOTTOM) {
          this.setDirection(Direction.RIGHT);
        } else if (dirAtZero === Direction.LEFT) {
          this.setDirection(Direction.BOTTOM);
        } else if (dirAtZero === Direction.VERTICAL) {
          this.setDirection(Direction.HORIZONTAL);
        } else if (dirAtZero === Direction.HORIZONTAL) {
          this.setDirection(Direction.VERTICAL);
        }
        break;
    }
  }

  private setDirection(dir: Direction): void {
    this.customDirection = dir;
  }
}
