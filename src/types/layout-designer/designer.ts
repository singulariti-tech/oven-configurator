import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { Stage } from "./stage";
import { Cell } from "./cell";
import { Toolbox } from "./toolbox";
import { TileAndPrevDir, Tool, ToolDefinition } from "./tool";
import { Tile, TileStatus } from "./tile";
import { AccessWay, Direction, ModuleListRecord } from "./layout-types";
import { debug } from "./utils";
import { Ref } from "vue";

interface OffsetCoordinates {
  left: number;
  top: number;
}

export class LayoutDesigner {
  readonly containerThreshold: string = "70%";
  readonly tileThreshold: string = "50%";
  readonly cellSize: number = 45;
  readonly toolbox: Toolbox = new Toolbox();
  readonly stage: Stage = new Stage();
  readonly moduleListRecords: Ref<Array<ModuleListRecord>>;

  constructor(records: Ref<Array<ModuleListRecord>>) {
    this.moduleListRecords = records;
  }

  public getToolbox(): Toolbox {
    return this.toolbox;
  }

  public getStage(): Stage {
    return this.stage;
  }

  public addToolToStage(e: any, draggable: Draggable): void {
    if (draggable.hitTest(this.stage.getRef(), this.containerThreshold)) {
      const overlappingCells: Array<Cell> = [];
      const cellCount = this.stage.cells.size;
      const cells: Array<Cell> = this.stage.getCells();

      for (let i = 0; i < cellCount; i += 1) {
        // TODO This can be optimized. Why are we testing with whole grid?
        const cell: Cell = cells[i];
        const occupied: boolean = cell.isOccupied();
        const canDrop: boolean = occupied
          ? false
          : draggable.hitTest(cell.getRef(), this.tileThreshold);
        if (canDrop) {
          overlappingCells.push(cell);
        }
      }

      if (overlappingCells.length > 0) {
        const snapCell: Cell = this.getClosestCell(overlappingCells, draggable);
        const snapCellPos = snapCell.getPosition();

        const toolDef: ToolDefinition = this.toolbox.findDefinition(e.target.id);

        // clone & attach to stage
        const toolDefUI: HTMLElement = toolDef.getRef();
        const toolDefOffset: OffsetCoordinates = {
          left: snapCellPos.left,
          top: snapCellPos.top,
        };

        const tool: Tool = toolDef.createTool();
        tool.updateCellOccupancy(snapCell, this.stage, false);

        const newToolUI: HTMLElement = <HTMLElement>toolDefUI.cloneNode();
        tool.setRef(newToolUI);

        gsap.set(newToolUI, {
          x: toolDefOffset ? toolDefOffset.left : 0,
          y: toolDefOffset ? toolDefOffset.top : 0,
          opacity: 1,
        });

        gsap.to(newToolUI, {
          duration: 0.1,
          x: snapCellPos.left,
          y: snapCellPos.top,
          opacity: 1,
        });

        this.stage.getRef().append(newToolUI);
        e.target.style.opacity = 0;

        this.setupTileForDragging(newToolUI);

        newToolUI.addEventListener("click", () => {
          this.stage.toggleToolSelection(tool);
        });

        newToolUI.addEventListener("dblclick", e => {
          const confirmed = window.confirm("Do you really want to remove the component?");
          if (confirmed) {
            const el = newToolUI;
            const elID = el.id;
            const dTool: Tool | undefined = this.stage.getTool(elID);
            if (dTool) {
              this.stage.removeTool(tool);
            }
            newToolUI.remove();
          }
        });

        // return tool to its position in toolbox
        this.snapBack(e.target);
      } else {
        this.snapBack(e.target);
      }
    } else {
      this.snapBack(e.target);
    }
  }

  public turnLeft90(): void {
    if (!this.stage.isToolSelected()) {
      // TODO Show Toast
      //   this.showInfo(
      //     "Selection required",
      //     "Please select a tile in the layout grid"
      //   );
      return;
    }

    const tool: Tool | null = this.stage.getSelectedTool();
    if (tool) {
      if (!tool.isRotationPossible(-90, this.stage)) {
        // TODO Show Toast
        // this.showWarning(
        //   "Rotation not possible",
        //   "Rotation is not possible as the required positions are already occupied."
        // );
        return;
      }

      tool.turnLeft90(this.stage);
      const cell: Cell | null = tool.getOriginCell();
      if (!cell) {
        throw new Error(`Origin cell not found for tool ${tool.id}`);
      } else {
        const position: any = tool.getSnapPosition(cell, this.cellSize);
        gsap.to(tool.getRef(), {
          duration: 0.2,
          x: position.left,
          y: position.top,
        });
      }
    }
  }

  public turnRight90(): void {
    if (!this.stage.isToolSelected()) {
      // TODO Show Toast
      //   this.showInfo(
      // 	"Selection required",
      // 	"Please select a tile in the layout grid"
      //   );
      return;
    }

    const tool: Tool | null = this.stage.getSelectedTool();
    if (tool) {
      if (!tool.isRotationPossible(90, this.stage)) {
        // TODO Show Toast
        // this.showWarning(
        //   "Rotation not possible",
        //   "Rotation is not possible as the required positions are already occupied."
        // );
        return;
      }

      tool.turnRight90(this.stage);
      const cell: Cell | null = tool.getOriginCell();
      if (!cell) {
        throw new Error(`Origin cell not found for tool ${tool.id}`);
      } else {
        const position: any = tool.getSnapPosition(cell, this.cellSize);
        gsap.to(tool.getRef(), {
          duration: 0.2,
          x: position.left,
          y: position.top,
        });
      }
    }
  }

  public resetRotation(): void {
    if (!this.stage.isToolSelected()) {
      // TODO Show Toast
      //   this.showInfo(
      // 	"Selection required",
      // 	"Please select a tile in the layout grid"
      //   );
      return;
    }

    const tool: Tool | null = this.stage.getSelectedTool();
    if (tool) {
      tool.resetRotation(this.stage);
      const cell: Cell | null = tool.getOriginCell();
      if (!cell) {
        throw new Error(`Origin cell not found for tool ${tool.id}`);
      } else {
        const position: any = tool.getSnapPosition(cell, this.cellSize);
        gsap.to(tool.getRef(), {
          duration: 0.2,
          x: position.left,
          y: position.top,
        });
      }
    }
  }

  public destroy(): void {
    this.stage.getTools().forEach((tool: Tool) => {
      tool.getRef().remove();
    });

    this.stage.reInit();
    //TODO Clear module list
  }

  public resetToolPositions(): void {
    // in case event is fired on page load before stage is initialized
    if (this.stage) {
      // for each tool on grid, get origin cell and snap
      this.stage.getTools().forEach((tool: Tool) => {
        const origin: Cell | undefined = this.stage.getOriginCell(tool);
        if (origin) {
          const toolUI: HTMLElement = tool.getRef();
          const snapCellOffset = tool.getSnapPosition(origin, this.cellSize);
          gsap.to(toolUI, {
            duration: 0.1,
            x: snapCellOffset.left,
            y: snapCellOffset.top,
            opacity: 1,
          });
        }
      });
    }
  }

  public async validate(): Promise<void> {
    this.clearValidationResults();

    const stageClear: boolean = this.stage.isClear();
    if (stageClear) {
      // TODO
      // this.showWarning(
      // 	"Components not available",
      // 	"Components not available for a layout. Drag and drop a few components and try again."
      // );

      return;
    }

    const entrances: Array<Tile> = this.determineEntrances();
    if (entrances.length <= 0) {
      // TODO
      // this.showError("Invalid Layout", "Entrance not found");
      return;
    } else if (entrances.length > 1) {
      // TODO
      // this.showError("Invalid Layout", "More than 1 entrance found");
      return;
    }

    const exits: Array<Tile> = this.determineExits();
    if (exits.length <= 0) {
      // TODO
      // this.showError("Invalid Layout", "Exit not found");
      return;
    } else if (exits.length > 1) {
      // TODO
      // this.showError("Invalid Layout", "More than 1 exit found");
      return;
    }

    let finalStatus = true;
    const entrance: Tile = entrances[0];
    const validationStatuses1: Set<TileStatus> = this.validatePathStartingWith(
      entrance,
      Direction.NONE
    );

    debug("Validation Result: ", validationStatuses1);

    for (const status of validationStatuses1) {
      const tool: Tool | undefined = this.stage.getTool(status.tile?.parentID);
      await this.sleep(100);

      this.setToolValidity(status.status, tool);
      if (!status.status) {
        // TODO
        // this.showError("Invalid layout", status.message);
        finalStatus = false;
      }
    }

    const lastTileValidationResult: TileStatus = [...validationStatuses1][
      validationStatuses1.size - 1
    ];

    if (finalStatus && lastTileValidationResult.tile?.accessWay !== AccessWay.EXIT) {
      // TODO
      // this.showError("Invalid Layout", "Layout must end with an Exit");
      finalStatus = false;
    } else if (finalStatus) {
      if (validationStatuses1.size < this.stage.getTileCount()) {
        // TODO
        // this.showError(
        // 	"All components not used",
        // 	"All components on the Stage must be part of " +
        // 	"the layout. If you don't intend to use a component, please remove" +
        // 	" it from the stage."
        // );
      } else {
        // TODO
        // this.showSuccess("Validation complete", "Layout is valid");

        const tools: Array<Tool> = [];
        for (const status of validationStatuses1) {
          const tool: Tool | undefined = this.stage.getTool(status.tile?.parentID);

          if (tool && !tools.includes(tool)) {
            tools.push(tool);
          }
        }

        let count = 0;
        for (const tool of tools) {
          let cellString = "";
          const cells: Array<Cell> = tool.getOccupiedCells();
          cells.forEach(cell => {
            cellString += cell.id + " ";
          });

          const component: string | undefined | null = tool?.id;
          count += 1;

          this.moduleListRecords.value.push({
            count: count,
            component: component,
            cellID: cellString,
          });
        }

        console.log(this.moduleListRecords.value);
      }
    } else {
      console.error("Unknown use case. Have to study more.");
    }
  }

  public clearValidationResults(): void {
    this.moduleListRecords.value = [];
    this.stage.getTools().forEach(tool => {
      const classList = tool.getRef().classList;
      classList.remove("invalid");
      classList.remove("valid");
    });
    this.stage.toggleToolSelection(null);
  }

  /** Set target back at its original position */
  snapBack(target: gsap.TweenTarget): void {
    gsap.to(target, {
      duration: 0.2,
      x: 0,
      y: 0,
      opacity: 0,
    });
  }

  getClosestCell(overlappingCells: Array<Cell>, draggable: Draggable): Cell {
    const toolX: number = draggable.x;
    const toolY: number = draggable.y;

    let closestCell: Cell = overlappingCells[0];
    for (let index = 1; index < overlappingCells.length; index += 1) {
      const currentCell: Cell = overlappingCells[index];
      const closestCellOffset: OffsetCoordinates = {
        left: closestCell.getRef().offsetLeft,
        top: closestCell.getRef().offsetTop,
      };
      const currentCellOffset: OffsetCoordinates = {
        left: currentCell.getRef().offsetLeft,
        top: currentCell.getRef().offsetTop,
      };

      const dzXDiff = toolX - closestCellOffset.left;
      const dzYDiff = toolY - closestCellOffset.top;
      const cdzXDiff = toolX - currentCellOffset.left;
      const cdzYDiff = toolY - currentCellOffset.top;
      let xLess = false; // current el is less
      let yLess = false; // current el is less
      if (dzXDiff - cdzXDiff <= 0) {
        xLess = true;
      }

      if (dzYDiff - cdzYDiff <= 0) {
        yLess = true;
      }

      if (xLess && yLess) {
        closestCell = currentCell;
        break;
      }
    }

    if (closestCell == null) {
      // eslint-disable-next-line no-console
      console.log("Could not get a dropzone to snap to. Drag zones:");
      // eslint-disable-next-line no-console
      console.dir(overlappingCells);
      // eslint-disable-next-line no-console
      console.dir(draggable);
    }

    return closestCell;
  }

  setupTileForDragging(tileUI: HTMLElement): void {
    const draggable = Draggable.create(tileUI, {
      type: "x,y",
      bounds: this.stage.getRef(),
      onDragEnd: e => {
        this.snapTool(e, draggable[0]);
      },
    });
  }

  snapTool(e: any, draggable: Draggable): void {
    const overlappingCells: Array<Cell> = [];
    const cellCount = this.stage.cells.size;
    const cells: Array<Cell> = this.stage.getCells();
    for (let i = 0; i < cellCount; i += 1) {
      // TODO This can be optimized. Why are we testing with whole grid?
      const cell: Cell = cells[i];
      const occupied: boolean = cell.isOccupied();
      const canDrop: boolean = occupied
        ? false
        : draggable.hitTest(cell.getRef(), this.tileThreshold);
      if (canDrop) {
        overlappingCells.push(cell);
      }
    }

    const toolUI: any = e.target;
    const toolUIRef: HTMLElement = toolUI;
    const toolID: string | undefined = toolUIRef.id;
    if (!toolID) {
      throw new Error(`Tool with id ${toolID} not found`);
    }

    const tool: Tool | undefined = this.stage.getTool(toolID);
    if (!tool) {
      console.dir(this.stage);
      throw new Error(`Tool with id ${toolID} not found on stage`);
    }

    if (overlappingCells.length > 0) {
      const snapCell: Cell = this.getClosestCell(overlappingCells, draggable);
      const snapCellOffset = tool.getSnapPosition(snapCell, this.cellSize); //snapCell.getOffset();
      gsap.to(toolUIRef, {
        duration: "0.1",
        x: snapCellOffset ? snapCellOffset.left : 0,
        y: snapCellOffset ? snapCellOffset.top : 0,
      });

      // we have the tool, ensure cells and tiles are updated
      tool.updateCellOccupancy(snapCell, this.stage, false);
    } else {
      const origin: Cell | undefined = this.stage.getOriginCell(tool);
      if (!origin) {
        throw new Error(`Primary cell for tool ${tool.id} not found`);
      }

      const position: any = tool.getSnapPosition(origin, this.cellSize);
      gsap.to(toolUIRef, {
        duration: 0.2,
        x: position.left,
        y: position.top,
      });
    }
  }

  private determineEntrances(): Array<Tile> {
    return this.determineAccessWay(AccessWay.ENTRANCE);
  }

  private determineExits(): Array<Tile> {
    return this.determineAccessWay(AccessWay.EXIT);
  }

  private determineAccessWay(accessWay: AccessWay): Array<Tile> {
    const accessWays: Array<Tile> = [];
    this.stage.getTools().forEach(tool => {
      const tiles: Array<Tile> = tool.getTiles();
      tiles.forEach((tile: Tile) => {
        if (tile.accessWay === accessWay) {
          accessWays.push(tile);
        }
      });
    });

    return accessWays;
  }

  private validatePathStartingWith(tile: Tile, prevTileDirection: Direction): Set<TileStatus> {
    const tilesVisited: Set<string> = new Set();
    const tileStatuses: Set<TileStatus> = new Set();
    // since we are just starting we can assume that the first tile is valid
    let currentTile: Tile = tile;
    const currentCell: Cell | null = tile.getOccupiedCell();

    if (!currentCell) {
      tileStatuses.add({
        status: false,
        message: `Cannot find cell for Tile ${tile.id}`,
        tile: tile,
      });
    } else {
      let continueTracking = true;
      while (continueTracking) {
        // check if tile has already been visited if so fail
        if (tilesVisited.has(currentTile.id)) {
          continueTracking = false;
          tileStatuses.add({
            status: false,
            message: `Looping back from #${currentTile.id}`,
            tile: currentTile,
          });
        } else if (currentTile.accessWay === AccessWay.EXIT) {
          // we found an exit. we will assume this is the end
          // check if exit direction is same as prevTileDirection

          continueTracking = false;
          if (prevTileDirection === currentTile.getDirection()) {
            tileStatuses.add({
              status: true,
              message: `Found exit`,
              tile: currentTile,
            });
          } else {
            tileStatuses.add({
              status: false,
              message: `Exit not following the same direction as previous tile`,
              tile: currentTile,
            });
          }
        } else {
          const nextTileSearchResult: TileAndPrevDir = this.stage.getNextTile(
            currentTile,
            prevTileDirection
          );

          continueTracking = nextTileSearchResult.status;
          if (!nextTileSearchResult.status) {
            // failed to find tile
            tileStatuses.add({
              status: false,
              message: `Invalid component at ${nextTileSearchResult.cellID}`,
              tile: currentTile,
            });
          } else {
            tileStatuses.add({
              status: true,
              message: `Found next tile`,
              tile: currentTile,
            });

            if (nextTileSearchResult.tile) {
              tilesVisited.add(currentTile.id);
              prevTileDirection = nextTileSearchResult.dir;
              currentTile = nextTileSearchResult.tile;
            } else {
              throw new Error("Status is true but tile is empty");
            }
          }
        }
      }
    }

    return tileStatuses;
  }

  private setToolValidity(valid: boolean, tool: Tool | undefined): void {
    if (tool) {
      const currentClass: string = valid ? "valid" : "invalid";
      tool.getRef().classList.add(currentClass);
    }
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
