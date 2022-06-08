export interface CellProxy {
  rowID: number;
  colID: string;
}

export class Cell {
  readonly id: string;
  readonly el: HTMLElement;
  readonly rowID: number;
  readonly colID: string;
  readonly header: boolean;

  private occupied = false;

  constructor(row: number, col: string, header: boolean, el: HTMLElement) {
    this.header = header;
    this.rowID = row;
    this.colID = col;
    this.id = `${col}${row}`;
    this.el = el;
  }

  public getRef(): HTMLElement {
    return this.el;
  }

  public isOccupied(): boolean {
    const header = this.rowID === 0 || this.colID === "@";
    return header || this.occupied;
  }

  public setOccupied(o: boolean): void {
    this.occupied = o;
  }

  public getPosition(): any {
    const rect: DOMRect = this.el.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;

    return { left, top };
  }

  public getOffset(): any {
    return { left: this.el.offsetLeft, top: this.el.offsetTop };
  }

  public toString(): string {
    return `{ID: ${this.id}, Occupied: ${this.occupied}}`;
  }
}
