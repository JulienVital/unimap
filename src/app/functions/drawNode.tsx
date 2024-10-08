import { NodeInterface, SizeNode } from "@/app/data/data";
export interface canvaSizeInterface {
  width: number;
  height: number;
}

export const drawClassroom = (
  ctx: CanvasRenderingContext2D,
  size: SizeNode,
  canvasSize: canvaSizeInterface,
  color?: string
) => {
  if(!color){
    color = "rgba(0, 0, 255, 0.5)";
  }
  const left = (size.left / 100) * canvasSize.width;
  const top = (size.top / 100) * canvasSize.height;
  const width = (size.width / 100) * canvasSize.width;
  const height = (size.height / 100) * canvasSize.height;
  ctx.beginPath();
  ctx.rect(left, top, width, height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();
};

export const drawDoor = (
  ctx: CanvasRenderingContext2D,
  node: NodeInterface,
  canvasSize: canvaSizeInterface,
  debug?: boolean
) => {
  const doorColor = "rgba(0, 255, 0)";

  drawRectangle(ctx, node, canvasSize, doorColor, debug);
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  node: NodeInterface,
  canvasSize: canvaSizeInterface,
  color: string,
  debug?: boolean
) => {
  if (node.size) {
    const left = (node.size.left / 100) * canvasSize.width;
    const top = (node.size.top / 100) * canvasSize.height;
    const width = (node.size.width / 100) * canvasSize.width;
    const height = (node.size.height / 100) * canvasSize.height;
    ctx.beginPath();
    ctx.rect(left, top, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    if (debug) {
      ctx.fillStyle = "white";
      ctx.font = " 8px Helvetica"; // Appliquer le style en gras

      ctx.fillText(node.id, left + width / 2, top + height / 2);
    }
  }
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  node: NodeInterface,
  canvasSize: canvaSizeInterface,
  debug?: boolean
) => {
  // Calculer les positions en fonction de la taille du canevas
  const left = (node.position.left / 100) * canvasSize.width;
  const top = (node.position.top / 100) * canvasSize.height;

  // Dessine le cercle
  ctx.beginPath(); // Commence un nouveau chemin
  ctx.arc(left, top, 5, 0, Math.PI * 2); // Dessine un cercle avec un rayon de 5
  ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Couleur de remplissage
  ctx.fill(); // Remplit le cercle
  ctx.strokeStyle = "red"; // Couleur du contour
  ctx.stroke(); // Trace le contour

  // Si le mode debug est activé
  if (debug) {
    ctx.fillStyle = "black"; // Couleur du texte
    ctx.font = "8px Helvetica"; // Police
    ctx.textAlign = "center"; // Alignement du texte
    ctx.textBaseline = "middle"; // Alignement vertical du texte
    ctx.fillText(node.id, left, top); // Dessine le texte centré sur la position
  }
};

export const drawSquare = (
  ctx: CanvasRenderingContext2D,
  node: NodeInterface,
  canvasSize: canvaSizeInterface,
  color: string,
  debug?: boolean
) => {
  // Calculer les positions en fonction de la taille du canevas
  const left = (node.position.left / 100) * canvasSize.width;
  const top = (node.position.top / 100) * canvasSize.height;

  const squareSize = 15;
  const halfSize = squareSize / 2; // Pour centrer le carré
  const squareLeft = left - halfSize;
  const squareTop = top - halfSize;

  // Dessiner le carré
  ctx.fillStyle = color;
  ctx.fillRect(squareLeft, squareTop, squareSize * 2, squareSize); // Remplit le carré

  // Si le mode debug est activé
  if (debug) {
    ctx.fillStyle = "white"; // Couleur du texte
    ctx.font = "bold 8px Helvetica"; // Police
    ctx.textAlign = "center"; // Alignement du texte
    ctx.textBaseline = "middle"; // Alignement vertical du texte
    ctx.fillText(node.id, left + 8, top); // Dessine le texte centré sur la position
  }
};

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  nodeFrom: NodeInterface,
  nodeTo: NodeInterface,
  canvasSize: canvaSizeInterface
) => {
  const leftFrom = nodeFrom.position.left * (canvasSize.width / 100);
  const topFrom = nodeFrom.position.top * (canvasSize.height / 100);
  ctx.beginPath();
  ctx.moveTo(leftFrom, topFrom); // Point A

  const leftTo = nodeTo.position.left * (canvasSize.width / 100);
  const topTo = nodeTo.position.top * (canvasSize.height / 100); // Correction ici
  ctx.lineTo(leftTo, topTo); // Point B
  ctx.strokeStyle = "red"; // Couleur du tracé
  ctx.lineWidth = 3; // Épaisseur du trait
  ctx.stroke();
};
