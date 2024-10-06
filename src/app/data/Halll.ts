import { canvaSizeInterface, drawCircle } from "../functions/drawNode";
import { HallInterface, Position } from "./data";

export class Hall implements HallInterface {
  type: "hall";
  id: string;
  position: Position;
  constructor(id: string, position: Position) {
    this.type = "hall";
    this.id = id;
    this.position = position;
  }

  drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ) => {
    drawCircle(ctx, this, canvasSize, debug);

  };
}
