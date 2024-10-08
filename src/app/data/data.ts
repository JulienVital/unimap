import { canvaSizeInterface } from "../functions/drawNode";

// Définir l'interface pour la taille d'une salle de classe
export interface SizeNode {
  top: number;
  left: number;
  width: number;
  height: number;
}
export interface NodeInterface {
  id: string;
  position: Position;
  edges: EdgeInterface[];
  size?: SizeNode;
  type?: string
  drawPosition: (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    debug?: boolean
  ) => void;

  addEdge: (edge: EdgeInterface) => void; // Signature de la méthode
}

export type rawNode = Omit<NodeInterface, 'drawPosition' | 'edges' |'addEdge'>;

// Interface pour une salle de classe
export interface ClassroomInterface extends NodeInterface {
  type: "classroom";
  size: SizeNode;
  drawSize : (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    color?:string,
    debug?: boolean
  )=>void
}
export interface DoorInterface extends NodeInterface {
  type: "door";
}
export interface HallInterface extends NodeInterface {
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
  from: NodeInterface;
  to: NodeInterface;
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