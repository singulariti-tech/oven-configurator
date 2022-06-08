export enum AccessWay {
  ENTRANCE,
  EXIT,
  NONE,
}

export enum Position {
  ORIGIN = "ORIGIN",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
  TOP_LEFT = "TOP_LEFT",
  TOP_RIGHT = "TOP_RIGHT",
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
  NONE = "NONE",
}

export interface ModuleListRecord {
  count: number;
  cellID: string;
  component: string;
}
