import { GraphInterface, NodeInterface, EdgeInterface } from "@/app/data/data";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";

export class Bfs implements PathFindingAlgorithm {
  findShortestPath(
    graph: GraphInterface, 
    startId: string, 
    endId: string
  ): EdgeInterface[] | null {
    const startNode = graph.node.find(node => node.id === startId);
    const endNode = graph.node.find(node => node.id === endId);

    if (!startNode || !endNode) {
      throw new Error("Start or end node not found in the graph.");
    }

    // Initialisation des structures de données pour BFS
    const queue: NodeInterface[] = [startNode];
    const visited = new Set<NodeInterface>();  // Garde une trace des nœuds visités
    const previousEdge = new Map<NodeInterface, EdgeInterface | null>(); // Pour stocker l'arête utilisée pour atteindre chaque nœud

    // On marque le premier nœud comme visité et sans précédent (pas d'arête pour le premier nœud)
    visited.add(startNode);
    previousEdge.set(startNode, null);

    // Boucle principale de BFS
    while (queue.length > 0) {
      const currentNode = queue.shift()!; // Défilement du premier élément de la file d'attente

      // Si on atteint le nœud de destination
      if (currentNode === endNode) {
        return this.reconstructPath(previousEdge, endNode);
      }

      // Exploration des voisins (arêtes sortantes du nœud actuel)
      currentNode.edges.forEach(edge => {
        const neighbor = edge.to;

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          previousEdge.set(neighbor, edge); // On stocke l'arête utilisée pour atteindre ce voisin
          queue.push(neighbor);
        }
      });
    }

    // Si aucun chemin n'a été trouvé
    return null;
  }

  // Fonction pour reconstituer le chemin à partir de la map "previousEdge"
  private reconstructPath(
    previousEdge: Map<NodeInterface, EdgeInterface | null>, 
    endNode: NodeInterface
  ): EdgeInterface[] {
    const pathEdges: EdgeInterface[] = [];
    let currentNode: NodeInterface = endNode;

    while (previousEdge.get(currentNode)) {
      const edge = previousEdge.get(currentNode)!;
      pathEdges.unshift(edge); // Ajoute l'arête au début du tableau (on reconstruit à l'envers)
      currentNode = edge.from; // Remonte au nœud précédent
    }

    return pathEdges;
  }
}
