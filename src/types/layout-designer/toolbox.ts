import { ToolDefinition } from "./tool";

export class Toolbox {
  private _el: HTMLElement | null = null;
  private _tools: Map<string, ToolDefinition> = new Map();

  public setEl(e: HTMLElement) {
    this._el = e;
  }

  public getRef(): HTMLElement {
    if (!this._el) {
      throw new Error("Toolbox ref is not set");
    }

    const el = this._el;
    return el;
  }

  public addDefinition(tool: ToolDefinition): void {
    this._tools.set(tool.getID(), tool);
  }

  public findDefinition(id: string): ToolDefinition {
    const t: ToolDefinition | undefined = this._tools.get(id);
    if (t) {
      const tool: ToolDefinition = t;
      return tool;
    }

    throw new Error(`ToolDefinition ${id} not found`);
  }
}
