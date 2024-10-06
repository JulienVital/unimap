import { EdgeInterface, GraphInterface } from "@/app/data/data";

export interface PathFindingAlgorithm {
    findShortestPath(
      graph: GraphInterface, 
      startId: string, 
      endId: string
    ): EdgeInterface[] | null;
  }
  