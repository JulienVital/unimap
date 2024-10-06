import { Classroom } from "./Classroom";
import {
  ClassroomInterface,
  DoorInterface,
  EdgeInterface,
  GraphInterface,
  GraphInterfaceRaw,
  RawEdge,
  rawNode,
} from "./data";
import { Door } from "./Door";
import { Edge } from "./Edge";

export class Graph implements GraphInterface {
  node: (ClassroomInterface | DoorInterface)[];
  edge: EdgeInterface[];

  constructor(json: GraphInterfaceRaw) {
    this.node = this.initNode(json.node);
    this.edge = this.initEdge(json.edges);
  }

  initNode(classroom: { [key: string]: rawNode }): (ClassroomInterface | DoorInterface)[] {
    const node: (ClassroomInterface | DoorInterface)[] = [];
    for (const currentNodeId in classroom) {
      const currentNode = classroom[currentNodeId];
      // Vérifier si currentNode a une taille définie
      if (currentNode.size) {
        node.push(
          new Classroom(currentNode.id, currentNode.position, currentNode.size)
        );
      } else {
        node.push(new Door(currentNode.id, currentNode.position));
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
      edgesList.push(new Edge(from, to, currentEdge.weight));
    });
    return edgesList;
  }
}
