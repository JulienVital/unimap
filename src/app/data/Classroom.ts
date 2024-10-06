import {
  canvaSizeInterface,
  drawCircle,
  drawClassroom,
} from "../functions/drawNode";
import { ClassroomInterface, Position, SizeNode } from "./data";
import { Node } from "./Node";

export class Classroom extends Node implements ClassroomInterface {
  type: "classroom";
  size: SizeNode;

  constructor(id: string, position: Position, size: SizeNode) {
    super(id, position);
    this.type = "classroom";
    this.size = size;
  }
  drawPosition = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ) => {
    drawCircle(ctx, this, canvasSize, debug);
  };
  drawSize = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface
  ) => {
    drawClassroom(ctx, this.size, canvasSize);
  };
}
