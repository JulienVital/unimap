import { canvaSizeInterface } from "../functions/drawNode";

// Définir l'interface pour la taille d'une salle de classe
export interface SizeNode {
  top: number;
  left: number;
  width: number;
  height: number;
}
export interface Node {
  position: Position;
  id: string;
  type: 'classroom'|'door'|'hall'
  size?: SizeNode;
  drawPosition : (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  )=>void
}
export type rawNode = Omit<Node, 'drawPosition'>;

// Interface pour une salle de classe
export interface ClassroomInterface extends Node {
  type: "classroom";
  size: SizeNode;
  drawSize : (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  )=>void
}
export interface DoorInterface extends Node {
  type: "door";
}
export interface HallInterface extends Node {
  type: "hall";
}
// Interface pour la position d'un noeud (point)
export interface Position {
  top: number;
  left: number;
}

// Structure principale du graphe
export interface GraphInterface {
  node: (ClassroomInterface|DoorInterface|HallInterface)[];
}

export interface GraphInterfaceRaw {
  node: { [key: string]: rawNode };
  edges: RawEdge[];
}
export interface EdgeInterface {
  from: Node;
  to: Node;
  weight: number;
  draw : (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
  )=>void
}
export interface RawEdge {
  from: string;
  to: string;
  weight: number;
}