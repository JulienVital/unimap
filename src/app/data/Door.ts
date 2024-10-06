import { canvaSizeInterface, drawSquare } from "../functions/drawNode";
import { DoorInterface, Position } from "./data";

export class Door implements DoorInterface {
  type: "door";
  id: string;
  position: Position;
  constructor(id: string, position: Position) {
    this.type = "door";
    this.id = id;
    this.position = position;
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
