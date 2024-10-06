"use client";
import Plan from "@/app/component/plan";
import { GraphInterfaceRaw } from "@/app/data/data";
import graphJson from "@/app/data/data.json";
import { Graph } from "@/app/data/Graph";
import { useEffect, useRef, useState } from "react";
import { Bfs } from "../functions/find/bfs";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  interface canvaSizeInterface {
    width: number;
    height: number;
  }
  const [canvasSize, setCanvasSize] = useState<canvaSizeInterface>({
    width: 0,
    height: 0,
  });


  useEffect(() => {
    if (canvasRef.current && canvasSize) {
      draw(
        canvasRef.current.getContext("2d") as CanvasRenderingContext2D,
        canvasSize
      );
    }
  });
  const draw = async (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface
  ) => {
    const graph = new Graph(graphJson as GraphInterfaceRaw)
    const algo = new Bfs()
    const finded = algo.findShortestPath(graph, 'porteA', 'porteH')
    if(finded?.length){
      finded.forEach(edge => {
          edge.draw(ctx, canvasSize)
      });
    }
  };

  const handleCanvasResize = (size: { width: number; height: number }) => {
    setCanvasSize(size);
  };
  return (
    <>
      <main >
      <Plan
          canvasRef={canvasRef}
          onCanvasResize={handleCanvasResize} // Recevoir la taille ici
        />

      </main>
      <footer >
      </footer>
    </>
  );
}
