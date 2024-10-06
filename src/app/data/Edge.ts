import { canvaSizeInterface } from "../functions/drawNode";
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
//   drawLine = (
//     ctx: CanvasRenderingContext2D,
//     canvasSize: canvaSizeInterface,
//     debug?: boolean
//   ) => {
//     drawLine(ctx, this, canvasSize);
//   };
}
