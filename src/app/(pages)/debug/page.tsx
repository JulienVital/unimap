"use client";
import Plan from "@/app/component/plan";
import { graph } from "@/app/data/data";
import { handleCanvasClick } from "@/app/functions/debug/utils";
import {
  drawDoor,
  drawClassroom,
  drawCircle,
  drawSquare,
} from "@/app/functions/drawNode";

import { useEffect, useRef, useState } from "react";
export default function DebugPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  interface canvaSizeInterface {
    width: number;
    height: number;
  }
  const [canvasSize, setCanvasSize] = useState<canvaSizeInterface>({
    width: 0,
    height: 0,
  });
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
    console.log("draw");
    for (const currentNode in graph.node) {
      drawClassroom(ctx, graph.node[currentNode].size, canvasSize);
      // await sleep(500);
      drawCircle(ctx, graph.node[currentNode], canvasSize, true);
    }
    for (const currentNode in graph.door) {
      drawSquare(ctx, graph.door[currentNode], canvasSize, true);
    }
  };
  // Gestionnaire d'événement de clic
  const handleCanvasClickInternal = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    handleCanvasClick(event, canvasRef);
  };
  const handleCanvasResize = (size: { width: number; height: number }) => {
    setCanvasSize(size);
  };
  return (
    <>
      <main>
        <Plan
          canvasRef={canvasRef}
          onCanvasClick={handleCanvasClickInternal}
          onCanvasResize={handleCanvasResize} // Recevoir la taille ici
        />
      </main>
      <footer></footer>
    </>
  );
}
