import { canvaSizeInterface, drawLine } from "../functions/drawNode";
import { EdgeInterface, NodeInterface } from "./data";

export class Edge implements EdgeInterface {
  from: NodeInterface;
  to: NodeInterface;
  weight: number;
  constructor(from: NodeInterface, to: NodeInterface, weight = 1) {
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
  swap = ()=>{
    return new Edge(this.to, this.from)
  }
}
