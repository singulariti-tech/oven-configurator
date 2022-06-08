import { Cell, CellProxy } from "./cell";
import { Direction } from "./layout-types";
import { Tile } from "./tile";
import { Tool } from "./tool";
import { debug, StageUtils } from "./utils";

export interface TileAndPrevDir {
  status: boolean;
  dir: Direction;
  tile: Tile | null;
  cellID: string;
}

export interface StageMembers {
  el: HTMLElement;
  cells: Array<Cell>;
}

export class Stage {
  _id = "";
  _el: HTMLElement | null = null;
  readonly cells: Map<string, Cell> = new Map();
  readonly tools: Map<string, Tool> = new Map();
  readonly occupancy: Map<Tool, Cell> = new Map();

  private selectedTool: Tool | null;
  private wideLayout = false;

  constructor() {
    this.selectedTool = null;
  }

  static getNextColID(colID: string): string | null {
    const ch: string = colID.toUpperCase();
    const charCode: number = ch.charCodeAt(0);
    if (charCode >= 65 && charCode < 90) {
      return String.fromCharCode(charCode + 1);
    }
    return null;
  }

  static getPrevColID(colID: string): string | null {
    const ch: string = colID.toUpperCase();
    const charCode: number = ch.charCodeAt(0);
    if (charCode > 65 && charCode <= 90) {
      return String.fromCharCode(charCode - 1);
    }
    return null;
  }

  public reInit(): void {
    this.selectedTool = null;
    this.wideLayout = false;
    this.tools.clear();
    this.occupancy.clear();
  }

  public get id(): string {
    return this._id;
  }

  public set ref(v: HTMLElement) {
    this._el = v;
    this._id = v.id;
  }

  public getRef(): HTMLElement {
    if (this._el === null) {
      throw new Error("Stage ref is null");
    }

    const el: HTMLElement = this._el;
    return el;
  }

  public isWideLayout(): boolean {
    const toolIterator: IterableIterator<Tool> = this.tools.values();
    let result = toolIterator.next();
    let count = 0;
    while (!result.done) {
      const tool: Tool = result.value;
      if (tool.wideLayout) {
        count += 1;
      }

      result = toolIterator.next();
    }

    this.wideLayout = count > 0;
    return this.wideLayout;
  }

  public getTileCount(): number {
    let count = 0;
    const tools: Array<Tool> = this.getTools();
    tools.forEach((tool: Tool) => {
      count += tool.getTileCount();
    });

    return count;
  }

  public toggleToolSelection(tool: Tool | null): void {
    const prevID: string | undefined = this.selectedTool?.getRef().id;
    const currentID: string | undefined = tool?.getRef().id;
    if (currentID === prevID) {
      this.selectedTool?.getRef().classList.toggle("selected");
      if (!this.selectedTool?.getRef().classList.contains("selected")) {
        this.selectedTool = null;
      }
    } else {
      this.selectedTool?.getRef().classList.remove("selected");
      this.selectedTool = tool;
      this.selectedTool?.getRef().classList.toggle("selected");
    }
  }

  public isClear(): boolean {
    return this.tools.size <= 0;
  }

  public isToolSelected(): boolean {
    return this.selectedTool != null;
  }

  public getSelectedTool(): Tool | null {
    return this.selectedTool;
  }

  public getCellRef(rowID: number, colID: string): HTMLElement {
    const cellID = `${colID}${rowID}`;
    const cell = this.getCellByID(cellID);
    if (!cell) {
      throw new Error(`Could not find cell with ID: ${cellID}`);
    } else {
      return cell.el;
    }
  }

  public getCell(rowID: number, colID: string): Cell | null {
    const cellID = `${colID}${rowID}`;
    const cell: Cell | undefined = this.cells.get(cellID);
    return cell ? cell : null;
  }

  public getCellByID(cellID: string): Cell | null {
    const cell: Cell | undefined = this.cells.get(cellID);
    return cell ? cell : null;
  }

  public getCells(): Array<Cell> {
    return Array.from(this.cells.values());
  }

  public getTool(id: string | undefined): Tool | undefined {
    return id ? this.tools.get(id) : undefined;
  }

  public getTools(): Array<Tool> {
    return Array.from(this.tools.values());
  }

  public addCell(cell: Cell): void {
    this.cells.set(cell.id, cell);
  }

  public addTool(tool: Tool, originCell: Cell): void {
    this.tools.set(tool.id, tool);
    this.occupancy.set(tool, originCell);
  }

  public removeTool(tool: Tool): void {
    tool.getTiles().forEach((tile: Tile) => {
      const cell: Cell | null = tile.getOccupiedCell();
      if (cell) {
        cell.setOccupied(false);
        tile.setOccupiedCell(null);
      } else {
        // should have cell since it is on the stage
        throw new Error(`Cell occupied by tile ${tile.id} of tool ${tool.id} is not available`);
      }
    });

    this.occupancy.delete(tool);
    this.tools.delete(tool.id);
    debug("Post delete: ", this);
  }

  public getOriginCell(tool: Tool): Cell | undefined {
    return this.occupancy.get(tool);
  }

  public getNextTile(tile: Tile, prevDir: Direction): TileAndPrevDir {
    const cell: Cell | null = tile.getOccupiedCell();
    if (!cell) {
      throw new Error(`Tile ${tile.id} does not have cell information`);
    } else {
      let tileDir: Direction = tile.getDirection();
      // if tile is bidirectional use prev direction
      if (
        tileDir === Direction.HORIZONTAL &&
        (prevDir === Direction.LEFT || prevDir === Direction.RIGHT)
      ) {
        tileDir = prevDir;
      } else if (
        tileDir === Direction.VERTICAL &&
        (prevDir === Direction.TOP || prevDir === Direction.BOTTOM)
      ) {
        tileDir = prevDir;
      }

      const cellProxy: CellProxy = StageUtils.getCellByDirectionRelativeTo(tileDir, cell);

      if (cellProxy.colID === "@" || cellProxy.rowID === -1) {
        return {
          status: false,
          dir: tileDir,
          tile: null,
          cellID: `${cell.colID}${cell.rowID}`,
        };
      } else {
        const tile: Tile | null = this.getTileOccupyingCell(cellProxy.rowID, cellProxy.colID);

        if (tile) {
          return {
            status: true,
            dir: tileDir,
            tile: tile,
            cellID: `${cellProxy.colID}${cellProxy.rowID}`,
          };
        } else {
          return {
            status: false,
            dir: tileDir,
            tile: null,
            cellID: `${cellProxy.colID}${cellProxy.rowID}`,
          };
        }
      }
    }
  }

  private getTileOccupyingCell(rowID: number, colID: string): Tile | null {
    const foundCell: Cell | null = this.getCell(rowID, colID);

    if (!foundCell) {
      throw new Error(`No cell found with row ${rowID} & col ${colID}`);
    } else {
      for (const tile of this.getTiles()) {
        const tileCell: Cell | null = tile.getOccupiedCell();
        if (!tileCell) {
          throw new Error(`Tile ${tile.id} does not have occupied cell information`);
        } else if (foundCell.id === tileCell.id) {
          return tile;
        }
      }
    }

    return null;
  }

  public getCellForTile(tile: Tile): Cell | null {
    return tile.getOccupiedCell();
  }

  public getTiles(): Array<Tile> {
    const map: Array<Tile> = [];
    this.tools.forEach(tool => {
      tool.getTiles().forEach((tile: Tile) => {
        map.push(tile);
      });
    });
    return map;
  }
}
