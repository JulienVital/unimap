import { canvaSizeInterface } from "../functions/drawNode";
import { Position, EdgeInterface, NodeInterface } from "./data"; // Assurez-vous que ces importations sont correctes

export abstract class Node implements NodeInterface {
  id: string;
  position: Position;
  edges: EdgeInterface[];

  constructor(id: string, position: Position) {
    this.id = id;
    this.position = position;
    this.edges = [];
  }

  addEdge(edge: EdgeInterface) {
    this.edges.push(edge);
  }

  abstract drawPosition(
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ): void; // Méthode abstraite à implémenter dans les sous-classes
}
