import { canvaSizeInterface, drawCircle, drawClassroom } from "../functions/drawNode";
import { ClassroomInterface, Position, SizeNode } from "./data";

export class Classroom implements ClassroomInterface {
    type: "classroom";
    id: string;
    position: Position;
    size: SizeNode;
    constructor(id: string, position : Position, size : SizeNode) {
        this.type = "classroom";
        this.id = id;
        this.position = position;
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
        canvasSize: canvaSizeInterface,
      ) => {
        drawClassroom(ctx, this.size, canvasSize);
      };
  }