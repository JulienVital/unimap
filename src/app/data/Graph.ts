import { canvaSizeInterface } from "../functions/drawNode";
import { Classroom } from "./Classroom";
import {
  ClassroomInterface,
  DoorInterface,
  EdgeInterface,
  GraphInterface,
  GraphInterfaceRaw,
  HallInterface,
  RawEdge,
  rawNode,
} from "./data";
import { Door } from "./Door";
import { Edge } from "./Edge";
import { Hall } from "./Halll";

export class Graph implements GraphInterface {
  node: (ClassroomInterface | DoorInterface | HallInterface)[];
  edge: EdgeInterface[];

  constructor(json: GraphInterfaceRaw) {
    this.node = this.initNode(json.node);
    this.edge = this.initEdge(json.edges);
  }

  initNode(classroom: { [key: string]: rawNode }) {
    const node: (ClassroomInterface | DoorInterface | HallInterface)[] = [];
    for (const currentNodeId in classroom) {
      const currentNode = classroom[currentNodeId];
      // Vérifier si currentNode a une taille définie
      if (currentNode.size) {
        node.push(
          new Classroom(currentNode.id, currentNode.position, currentNode.size)
        );
      }
      if (currentNode.type === "door") {
        node.push(new Door(currentNode.id, currentNode.position));
      }
      if (currentNode.type === "hall") {
        node.push(new Hall(currentNode.id, currentNode.position));
      }
    }
    return node;
  }

  initEdge(edges: RawEdge[]): EdgeInterface[] {
    const edgesList: EdgeInterface[] = [];
    edges.forEach((currentEdge) => {
      const from = this.node.find((node) => currentEdge.from === node.id);
      const to = this.node.find((node) => currentEdge.to === node.id);
      if (!from || !to) {
        throw new Error(
          `Edge not found: from ${currentEdge.from} to ${currentEdge.to}`
        );
      }
      const edge = new Edge(from, to, currentEdge.weight);
      edgesList.push(edge);
      from.addEdge(edge);
      to.addEdge(edge);
    });
    return edgesList;
  }

  drawDebug(ctx: CanvasRenderingContext2D, canvasSize: canvaSizeInterface) {
    this.node.forEach((currentNode) => {
      if (currentNode.type === "classroom") {
        currentNode.drawSize(ctx, canvasSize, true);
      }
      currentNode.drawPosition(ctx, canvasSize, true);
    });
    this.edge.forEach((element) => {
      element.draw(ctx, canvasSize);
    });
  }
}
