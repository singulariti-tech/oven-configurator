import { Direction, Position } from "./layout-types";
import { CellProxy, Cell } from "./cell";

const mode = process.env.NODE_ENV;

export function debug(message: string, o: any) {
  if (mode !== "production") {
    console.log(message);
    console.dir(o);
  }
}

export class TileUtils {
  static EQUIVALENT_ROTATIONS: Map<number, number> = new Map([
    [0, 0],
    [360, 0],
    [-360, 0],
    [90, 90],
    [-270, 90],
    [270, 270],
    [-90, 270],
    [180, 180],
    [-180, 180],
  ]);

  static ROTATION_POSITION: any = {
    0: {
      "1x1": {
        ORIGIN: Position.ORIGIN,
      },
      "1x2": {
        ORIGIN: Position.ORIGIN,
        BOTTOM: Position.BOTTOM,
        RIGHT: Position.RIGHT,
      },
      "2x1": {
        ORIGIN: Position.ORIGIN,
        RIGHT: Position.RIGHT,
        BOTTOM: Position.BOTTOM,
      },
      "2x2": {
        ORIGIN: Position.ORIGIN,
        RIGHT: Position.RIGHT,
        BOTTOM_RIGHT: Position.BOTTOM_RIGHT,
        BOTTOM: Position.BOTTOM,
      },
    },
    90: {
      "1x1": {
        ORIGIN: Position.ORIGIN,
      },
      "1x2": {
        ORIGIN: Position.RIGHT,
        BOTTOM: Position.ORIGIN,
        RIGHT: Position.BOTTOM,
      },
      "2x1": {
        ORIGIN: Position.ORIGIN,
        RIGHT: Position.BOTTOM,
        BOTTOM: Position.ORIGIN,
      },
      "2x2": {
        ORIGIN: Position.RIGHT,
        RIGHT: Position.BOTTOM_RIGHT,
        BOTTOM_RIGHT: Position.BOTTOM,
        BOTTOM: Position.ORIGIN,
      },
    },
    180: {
      "1x1": {
        ORIGIN: Position.ORIGIN,
      },
      "1x2": {
        ORIGIN: Position.BOTTOM,
        BOTTOM: Position.ORIGIN,
        RIGHT: Position.RIGHT,
      },
      "2x1": {
        ORIGIN: Position.RIGHT,
        RIGHT: Position.BOTTOM,
        BOTTOM: Position.ORIGIN,
      },
      "2x2": {
        ORIGIN: Position.BOTTOM_RIGHT,
        RIGHT: Position.BOTTOM,
        BOTTOM_RIGHT: Position.ORIGIN,
        BOTTOM: Position.RIGHT,
      },
    },
    270: {
      "1x1": {
        ORIGIN: Position.ORIGIN,
      },
      "1x2": {
        ORIGIN: Position.ORIGIN,
        BOTTOM: Position.RIGHT,
        RIGHT: Position.RIGHT,
      },
      "2x1": {
        ORIGIN: Position.BOTTOM,
        RIGHT: Position.ORIGIN,
        BOTTOM: Position.ORIGIN,
      },
      "2x2": {
        ORIGIN: Position.BOTTOM,
        RIGHT: Position.ORIGIN,
        BOTTOM_RIGHT: Position.RIGHT,
        BOTTOM: Position.BOTTOM_RIGHT,
      },
    },
  };

  public static getPositionUpdateAtRotation(
    rotation: number,
    position: Position,
    tileType: string
  ): Position {
    const rot: number = this.getEquivalentRotation(rotation);
    const tiles: any = TileUtils.ROTATION_POSITION[rot];
    const positionsAtRotation: any = tiles[tileType];
    return positionsAtRotation[position];
  }

  public static getEquivalentRotation(rotation: number): number {
    const val: number | undefined = TileUtils.EQUIVALENT_ROTATIONS.get(rotation);
    if (val === undefined) {
      console.warn(`Base rotation for ${rotation} not available`);
    }
    return val === undefined ? 0 : val;
  }
}

export class StageUtils {
  public static getCellAtPositionRelativeToOrigin(
    position: Position,
    origin: Cell
  ): CellProxy | null {
    let colID = "@";
    let rowID = -1;
    switch (position) {
      case Position.TOP_LEFT:
        // prev row & prev col
        rowID = StageUtils.getPrevRowID(origin.rowID);
        colID = StageUtils.getPrevColID(origin.colID);
        break;
      case Position.TOP:
        // prev row & same col
        rowID = StageUtils.getPrevRowID(origin.rowID);
        colID = origin.colID;
        break;
      case Position.TOP_RIGHT:
        // prev row & next col
        rowID = StageUtils.getPrevRowID(origin.rowID);
        colID = StageUtils.getNextColID(origin.colID);
        break;
      case Position.LEFT:
        // same row & prev col
        rowID = origin.rowID;
        colID = StageUtils.getPrevColID(origin.colID);
        break;
      case Position.ORIGIN:
        // same cell
        rowID = origin.rowID;
        colID = origin.colID;
        break;
      case Position.RIGHT:
        // same row & next col
        rowID = origin.rowID;
        colID = StageUtils.getNextColID(origin.colID);
        break;
      case Position.BOTTOM_LEFT:
        // next row & prev col
        rowID = StageUtils.getNextRowID(origin.rowID);
        colID = StageUtils.getPrevColID(origin.colID);
        break;
      case Position.BOTTOM:
        // next row & same col
        rowID = StageUtils.getNextRowID(origin.rowID);
        colID = origin.colID;
        break;
      case Position.BOTTOM_RIGHT:
        // next row & next col
        rowID = StageUtils.getNextRowID(origin.rowID);
        colID = StageUtils.getNextColID(origin.colID);
        break;
    }

    if (rowID === -1 || colID === "@") {
      console.debug("null cellproxy");
      return null;
    }

    console.debug({ rowID: rowID, colID: colID });
    return { rowID: rowID, colID: colID };
  }

  public static getCellByDirectionRelativeTo(tileDirection: Direction, cell: Cell): CellProxy {
    // if tile dir changes axis
    const cellRowID = cell.rowID;
    const cellColID = cell.colID;
    let requiredColID = "@";
    let requiredRowID = -1;
    let requiredCell: CellProxy = {
      rowID: requiredRowID,
      colID: requiredColID,
    };

    switch (tileDirection) {
      case Direction.LEFT:
        // find prev col in same row
        requiredColID = StageUtils.getPrevColID(cellColID);
        requiredCell = { rowID: cellRowID, colID: requiredColID };
        break;
      case Direction.RIGHT:
        // find next col in same row
        requiredColID = StageUtils.getNextColID(cellColID);
        requiredCell = { rowID: cellRowID, colID: requiredColID };
        break;
      case Direction.TOP:
        // find prev row in same col
        requiredRowID = StageUtils.getPrevRowID(cellRowID);
        requiredCell = { rowID: requiredRowID, colID: cellColID };
        break;
      case Direction.BOTTOM:
        // find next row in same col
        requiredRowID = StageUtils.getNextRowID(cellRowID);
        requiredCell = { rowID: requiredRowID, colID: cellColID };
        break;
      default:
        console.warn(`Tiles with direction ${tileDirection} not supported yet`);
    }

    return requiredCell;
  }

  static getNextColID(colID: string): string {
    const ch: string = colID.toUpperCase();
    const charCode: number = ch.charCodeAt(0);
    if (charCode >= 65 && charCode < 90) {
      return String.fromCharCode(charCode + 1);
    }
    return "@";
  }

  static getPrevColID(colID: string): string {
    const ch: string = colID.toUpperCase();
    const charCode: number = ch.charCodeAt(0);
    if (charCode > 65 && charCode <= 90) {
      return String.fromCharCode(charCode - 1);
    }
    return "@";
  }

  static getNextRowID(rowID: number): number {
    // NOTE: max row ID can be used from a config parameter
    if (rowID > 0 && rowID < 15) {
      return rowID + 1;
    }
    return -1;
  }

  static getPrevRowID(rowID: number): number {
    // NOTE: max row ID can be used from a config parameter
    if (rowID > 0 && rowID <= 15) {
      return rowID - 1;
    }
    return -1;
  }
}
