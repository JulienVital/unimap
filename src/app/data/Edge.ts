import { canvaSizeInterface, drawLine } from "../functions/drawNode";
import { EdgeInterface, Node } from "./data";

export class Edge implements EdgeInterface {
  from: Node;
  to: Node;
  weight: number;
  constructor(from: Node, to: Node, weight = 1) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
  draw = (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
  ) => {
    drawLine(ctx, this.from, this.to, canvasSize);
  };
}
