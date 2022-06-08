import gsap from "gsap";
import { Cell, CellProxy } from "./cell";
import { TileDefinition, Tile } from "./tile";
import { Direction, Position } from "./layout-types";
import { Stage } from "./stage";
import { TileUtils, debug, StageUtils } from "./utils";

export interface TileAndPrevDir {
  status: boolean;
  dir: Direction;
  tile: Tile | null;
  cellID: string;
}

export interface ToolDefinitionData {
  id: string;
  w: number;
  h: number;
  tiles: Set<TileDefinition>;
  el: HTMLElement;
}

export class ToolDefinition {
  private id: string;
  private el: HTMLElement;
  private tiles: Set<TileDefinition> = new Set();

  readonly width: number;
  readonly height: number;

  constructor(arg: ToolDefinitionData) {
    this.width = arg.w || 1;
    this.height = arg.h || 1;

    arg.tiles.forEach((td: TileDefinition) => {
      this.tiles.add(td);
    });

    this.el = arg.el;
    this.id = arg.el.id;
  }

  public getID(): string {
    return this.id;
  }

  public getRef(): HTMLElement {
    return this.el;
  }

  public createTool(): Tool {
    if (this.width === 1 && this.height === 1) {
      const tool: AbstractTool = new UnitTool(AbstractTool.generateID(), this.el);
      this.tiles.forEach((td: TileDefinition) => {
        const t: Tile = new Tile(tool.id, td.position, td.direction, td.accessWay);
        tool.addTile(t);
      });
      return tool;
    } else if (this.width === 2 && this.height === 2) {
      const tool: AbstractTool = new BiUnitTool(AbstractTool.generateID(), this.el);
      this.tiles.forEach((td: TileDefinition) => {
        const t: Tile = new Tile(tool.id, td.position, td.direction, td.accessWay);
        tool.addTile(t);
      });
      return tool;
    } else if (this.width === 2 && this.height === 1) {
      const tool: AbstractTool = new TwoXOneUnitTool(AbstractTool.generateID(), this.el);
      this.tiles.forEach((td: TileDefinition) => {
        const t: Tile = new Tile(tool.id, td.position, td.direction, td.accessWay);
        tool.addTile(t);
      });
      return tool;
    } else if (this.width === 1 && this.height === 2) {
      const tool: AbstractTool = new OneXTwoUnitTool(AbstractTool.generateID(), this.el);
      this.tiles.forEach((td: TileDefinition) => {
        const t: Tile = new Tile(tool.id, td.position, td.direction, td.accessWay);
        tool.addTile(t);
      });
      return tool;
    } else {
      throw new Error(`Unsupported Tool Type - Width:${this.width}, Height:${this.height}`);
    }
  }
}

export interface Tool {
  id: string;
  width: number;
  height: number;
  type: string;
  wideLayout: boolean;

  setRef(r: HTMLElement): void;
  getRef(): HTMLElement;
  getShadowRef(): HTMLElement;
  getTiles(): Array<Tile>;
  getTileCount(): number;
  setRotation(angle: number): void;
  getRotation(): number;
  turnRight90(stage: Stage): void;
  turnLeft90(stage: Stage): void;
  resetRotation(stage: Stage): void;
  getSnapPosition(cell: Cell | undefined, cellSize: number): any;
  isRotationPossible(rotation: number, stage: Stage): boolean;

  getOccupiedCells(): Array<Cell>;
  getOccupiedPositions(): Array<Position>;
  updateCellOccupancy(originCell: Cell, stage: Stage, rotate: boolean): void;
  getOriginCell(): Cell | null;
}

export abstract class AbstractTool implements Tool {
  private static CURRENT_ID = 1;

  private readonly DURATION: number = 0.2;
  private el: HTMLElement | null = null;

  readonly id: string;
  readonly defEl: HTMLElement | null = null;
  readonly width: number;
  readonly height: number;
  readonly type: string;
  readonly positions: Array<Position> = [];
  readonly tiles: Set<Tile> = new Set();
  readonly wideLayout: boolean;

  protected originCell: Cell | null = null;

  private rotation = 0;

  /**
   *
   * @param id Tool id
   * @param el Tile definition shadow element ref
   * @param width
   * @param height
   */
  constructor(id: string, el: HTMLElement, width: number, height: number) {
    this.id = id;
    this.defEl = el;
    this.width = width;
    this.height = height;
    this.initPositions();
    this.wideLayout = this.width === 2 && this.height === 2;
    this.type = `${this.width}x${this.height}`;
  }

  static generateID(): string {
    const id: number = AbstractTool.CURRENT_ID;
    AbstractTool.CURRENT_ID += 1;
    return `TL${id}`;
  }

  protected abstract initPositions(): void;
  public abstract getSnapPosition(cell: Cell, cellSize: number): any;
  public abstract isRotationPossible(rotation: number, stage: Stage): boolean;

  public toString(): string {
    let tiles = "";
    this.tiles.forEach((tile: Tile) => {
      tiles += "\n\t" + tile.toString();
    });

    let cells = "";
    this.getOccupiedCells().forEach((cell: Cell) => {
      cells += "\n\t" + cell.toString();
    });

    let positions = "";
    this.getOccupiedPositions().forEach((position: Position) => {
      positions += position + " ";
    });

    return `
			  ID: ${this.el?.id}
			  Rotation: ${this.getRotation()}
			  Positions: ${positions}
			  Cells: ${cells}
			  Tiles: ${tiles}
			`;
  }

  public addTile(tile: Tile): void {
    this.tiles.add(tile);
  }

  public setRotation(angle: number): void {
    this.rotation = angle;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public setRef(e: HTMLElement): void {
    this.el = e;
    this.el.id = this.id;
  }

  public getShadowRef(): HTMLElement {
    if (this.defEl) {
      return this.defEl;
    }

    throw new Error(`Tool def ref not available`);
  }

  public getRef(): HTMLElement {
    if (this.el) {
      return this.el;
    }

    throw new Error(`Tool ref not available`);
  }

  public getTiles(): Tile[] {
    return Array.from(this.tiles.values());
  }

  public getTileCount(): number {
    return this.tiles.size;
  }

  public getOccupiedCells(): Cell[] {
    const cells: Array<Cell> = [];
    this.tiles.forEach((tile: Tile) => {
      const cell: Cell | null = tile.getOccupiedCell();
      if (!cell) {
        throw new Error(`Tile ${tile.id} does not have occupied cell information`);
      } else {
        cells.push(cell);
      }
    });
    return cells;
  }

  public getOccupiedPositions(): Position[] {
    const positions: Position[] = [];
    const rot: number = this.getRotation();
    this.positions.forEach(position => {
      // get position based on rotation
      const posAtRot = TileUtils.getPositionUpdateAtRotation(rot, position, this.type);
      positions.push(posAtRot);
    });
    return positions;
  }

  public getOriginCell(): Cell | null {
    return this.originCell;
  }

  public updateCellOccupancy(originCell: Cell, stage: Stage, rotateOperation = false): void {
    debug(`Updating occupancy of tool: ${this.el?.id}`, "");
    this.originCell = originCell;
    debug("Origin cell", originCell);
    const currentRotation: number = this.getRotation();

    debug("Rotation: ", currentRotation);
    // get positions & consequently cells based on rotation
    this.tiles.forEach(tile => {
      const definedPosition: Position = tile.getDefinedPosition();
      let positionAtRotation = definedPosition;
      if (rotateOperation || currentRotation !== 0) {
        positionAtRotation = TileUtils.getPositionUpdateAtRotation(
          currentRotation,
          definedPosition,
          this.type
        );
      }

      debug(
        "Tile Position: ",
        `${tile.id} Defined: ${definedPosition} At Rotation (${currentRotation}): ${positionAtRotation}`
      );

      if (this.originCell) {
        const cellProxy: CellProxy | null = StageUtils.getCellAtPositionRelativeToOrigin(
          positionAtRotation,
          this.originCell
        );

        if (!cellProxy) {
          throw new Error(`Tool ${this.el?.id} cannot be placed at this location`);
        } else {
          const cell: Cell | null = stage.getCell(cellProxy.rowID, cellProxy.colID);
          tile.setOccupiedCell(cell);
          tile.setOccupiedPosition(positionAtRotation);
        }
      } else {
        throw new Error("Origin cell is null");
      }
    });

    stage.addTool(this, originCell);
  }

  public turnLeft90(stage: Stage): void {
    this.turnUILeft90();
    this.rotateTiles();
    if (!this.originCell) {
      throw new Error(
        `Origin cell not found for tile ${this.el?.id}: ${this.width}x${this.height}, ${this.el?.id}`
      );
    } else {
      this.updateCellOccupancy(this.originCell, stage, true);
    }
  }

  public turnRight90(stage: Stage): void {
    this.turnUIRight90();
    this.rotateTiles();
    if (!this.originCell) {
      throw new Error(
        `Origin cell not found for tile ${this.el?.id}: ${this.width}x${this.height}, ${this.el?.id}`
      );
    } else {
      this.updateCellOccupancy(this.originCell, stage, true);
    }
  }

  public resetRotation(stage: Stage): void {
    this.rotation = 0;
    this.resetUIRotation();
    this.rotateTiles();
    if (!this.originCell) {
      throw new Error(
        `Origin cell not found for tile ${this.el?.id}: ${this.width}x${this.height}, ${this.el?.id}`
      );
    } else {
      this.updateCellOccupancy(this.originCell, stage, true);
    }
  }

  protected turnUILeft90(): void {
    const nextAngle = this.rotation - 90;
    this.rotation = nextAngle;
    if (this.rotation === -360) {
      this.rotation = 0;
    }
    gsap.to(this.getRef(), {
      rotation: this.rotation,
      duration: this.DURATION,
    });
  }

  protected turnUIRight90(): void {
    const nextAngle = this.rotation + 90;
    this.rotation = nextAngle;
    if (this.rotation === 360) {
      this.rotation = 0;
    }
    gsap.to(this.getRef(), {
      rotation: this.rotation,
      duration: this.DURATION,
    });
  }

  protected resetUIRotation(): void {
    gsap.to(this.getRef(), {
      rotation: this.rotation,
      duration: this.DURATION,
    });
  }

  protected rotateTiles(): void {
    this.tiles.forEach((tile: Tile) => {
      tile.rotate(this.getRotation());
    });
  }
}

abstract class MultiUnitTool extends AbstractTool {
  constructor(id: string, el: HTMLElement, w: number, h: number) {
    super(id, el, w, h);
  }

  protected abstract initPositions(): void;
  public abstract isRotationPossible(rotation: number, stage: Stage): boolean;
}

export class UnitTool extends AbstractTool {
  constructor(id: string, el: HTMLElement) {
    super(id, el, 1, 1);
  }

  protected initPositions(): void {
    this.positions.push(Position.ORIGIN);
  }

  public getSnapPosition(cell: Cell): any {
    return cell.getPosition();
  }

  public isRotationPossible(_rotation: number, _stage: Stage): boolean {
    return true;
  }
}

export class BiUnitTool extends MultiUnitTool {
  constructor(id: string, el: HTMLElement) {
    super(id, el, 2, 2);
  }

  protected initPositions(): void {
    this.positions.push(Position.ORIGIN);
    this.positions.push(Position.RIGHT);
    this.positions.push(Position.BOTTOM);
    this.positions.push(Position.BOTTOM_RIGHT);
  }

  public getSnapPosition(cell: Cell, _cellSize: number): any {
    return cell.getPosition();
  }

  public isRotationPossible(_rotation: number, _stage: Stage): boolean {
    return true;
  }
}

export class TwoXOneUnitTool extends MultiUnitTool {
  constructor(id: string, el: HTMLElement) {
    super(id, el, 2, 1);
  }

  protected initPositions(): void {
    this.positions.push(Position.ORIGIN);
    this.positions.push(Position.RIGHT);
  }

  public getSnapPosition(cell: Cell, cellSize: number): any {
    const position: any = cell.getPosition();
    const rotation: number = this.getRotation();
    if (rotation === 90 || rotation === -270) {
      return {
        left: position.left - cellSize / 2,
        top: position.top + cellSize / 2,
      };
    } else if (rotation === -90 || rotation === 270) {
      return {
        left: position.left - cellSize / 2,
        top: position.top + cellSize / 2,
      };
    } else if (rotation === 180 || rotation === -180) {
      return position;
    }

    return position;
  }

  public isRotationPossible(rotation: number, stage: Stage): boolean {
    const currentRotation: number = this.getRotation();
    const requestedRotation: number = currentRotation + rotation;
    const normalizedRotation: number = TileUtils.getEquivalentRotation(requestedRotation);
    const originCell: Cell | null = this.getOriginCell();
    switch (normalizedRotation) {
      case 0:
      case 180:
        // required positions origin, bottom
        // get bottom position
        // check its occupancy
        if (originCell) {
          const bCellProxy: CellProxy | null = StageUtils.getCellAtPositionRelativeToOrigin(
            Position.RIGHT,
            originCell
          );

          if (bCellProxy) {
            const cell: Cell | null = stage.getCell(bCellProxy?.rowID, bCellProxy?.colID);

            if (cell) {
              return !cell.isOccupied();
            }
          }
        } else {
          throw new Error(`Origin cell not available for tool ${this.getRef()?.id}`);
        }
        break;
      case 90:
      case 270:
        // required positions origin, right
        // get right position
        // check its occupancy
        if (originCell) {
          const rCellProxy: CellProxy | null = StageUtils.getCellAtPositionRelativeToOrigin(
            Position.BOTTOM,
            originCell
          );

          if (rCellProxy) {
            const cell: Cell | null = stage.getCell(rCellProxy?.rowID, rCellProxy?.colID);

            if (cell) {
              return !cell.isOccupied();
            }
          }
        } else {
          throw new Error(`Origin cell not available for tool ${this.getRef()?.id}`);
        }
        break;
    }

    return false;
  }
}

export class OneXTwoUnitTool extends MultiUnitTool {
  constructor(id: string, el: HTMLElement) {
    super(id, el, 1, 2);
  }

  public initPositions(): void {
    this.positions.push(Position.ORIGIN);
    this.positions.push(Position.BOTTOM);
  }

  public getSnapPosition(cell: Cell, cellSize: number): any {
    const position: any = cell.getPosition();
    const rotation: number = this.getRotation();
    if (rotation === 90 || rotation === -270) {
      return {
        left: position.left + cellSize / 2,
        top: position.top - cellSize / 2,
      };
    } else if (rotation === -90 || rotation === 270) {
      return {
        left: position.left + cellSize / 2,
        top: position.top - cellSize / 2,
      };
    } else if (rotation === 180 || rotation === -180) {
      return position;
    }

    return position;
  }

  public isRotationPossible(rotation: number, stage: Stage): boolean {
    const currentRotation: number = this.getRotation();
    const requestedRotation: number = currentRotation + rotation;
    const normalizedRotation: number = TileUtils.getEquivalentRotation(requestedRotation);
    const originCell: Cell | null = this.getOriginCell();

    switch (normalizedRotation) {
      case 0:
      case 180:
        // required positions origin, bottom
        // get bottom position
        // check its occupancy
        if (originCell) {
          const bCellProxy: CellProxy | null = StageUtils.getCellAtPositionRelativeToOrigin(
            Position.BOTTOM,
            originCell
          );

          if (bCellProxy) {
            const cell: Cell | null = stage.getCell(bCellProxy?.rowID, bCellProxy?.colID);

            if (cell) {
              return !cell.isOccupied();
            }
          }
        } else {
          throw new Error(`Origin cell not available for tool ${this.getRef()?.id}`);
        }
        break;
      case 90:
      case 270:
        // required positions origin, right
        // get right position
        // check its occupancy
        if (originCell) {
          const rCellProxy: CellProxy | null = StageUtils.getCellAtPositionRelativeToOrigin(
            Position.RIGHT,
            originCell
          );

          if (rCellProxy) {
            const cell: Cell | null = stage.getCell(rCellProxy?.rowID, rCellProxy?.colID);

            if (cell) {
              return !cell.isOccupied();
            }
          }
        } else {
          throw new Error(`Origin cell not available for tool ${this.getRef()?.id}`);
        }
        break;
    }

    return false;
  }
}
