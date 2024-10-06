import { canvaSizeInterface, drawCircle } from "../functions/drawNode";
import { HallInterface, Position } from "./data";
import { Node } from "./Node";

export class Hall extends Node implements HallInterface {
  type: "hall";

  constructor(id: string, position: Position) {
    super(id, position); 
  this.type = "hall";
}


  drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ) => {
    drawCircle(ctx, this, canvasSize, debug);

  };
}
