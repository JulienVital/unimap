import { canvaSizeInterface, drawSquare } from "../functions/drawNode";
import { DoorInterface, Position } from "./data";
import { Node } from "./Node";

export class Door extends Node implements DoorInterface {
  type: "door";
  constructor(id: string, position: Position) {
      super(id, position); 
    this.type = "door";
  }

  drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ) => {
    const doorColor = "rgba(0, 255, 0)";
    drawSquare(ctx, this, canvasSize, doorColor, debug);
  };
}
