"use client";
import Plan from "@/app/component/plan";
import { GraphInterfaceRaw } from "@/app/data/data";
import graphJson from "@/app/data/data.json";
import { Graph } from "@/app/data/Graph";
import { useEffect, useRef, useState } from "react";
import { Bfs } from "@/app/functions/find/bfs";
import { useSearchParams } from "next/navigation"; // Importer useSearchParams
import Link from "next/link"; // Importer Link

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

  const searchParams = useSearchParams(); // Utilisation de useSearchParams
  const startId = searchParams.get("startId") || ""; // Valeur par défaut vide
  const endId = searchParams.get("endId") || ""; // Valeur par défaut vide

  useEffect(() => {
    // S'assurer que les paramètres de recherche sont présents avant de dessiner
    if (canvasRef.current && canvasSize.width > 0 && canvasSize.height > 0 && startId && endId) {
      draw(
        canvasRef.current.getContext("2d") as CanvasRenderingContext2D,
        canvasSize,
        startId,
        endId
      );
    }
  }, [startId, endId, canvasSize]); // On écoute les changements dans les search params et la taille du canvas

  const draw = async (
    ctx: CanvasRenderingContext2D,
    canvasSize: canvaSizeInterface,
    startId: string,
    endId: string
  ) => {
    const graph = new Graph(graphJson as GraphInterfaceRaw);
    const algo = new Bfs();
    const finded = algo.findShortestPath(graph, startId, endId); // Utilisation des paramètres startId et endId

    if (finded?.length) {
      finded.pop()
      // Parcourir les arêtes trouvées et les dessiner une par une avec un délai
      const start = graph.node.find(classroom => classroom.id == startId);
      if (start?.type === "classroom") {
        start.drawSize(ctx, canvasSize,'rgba(255, 120, 0, 0.51)');
      }
      for (const edge of finded) {
        edge.draw(ctx, canvasSize);
        await sleep(500); // Pause de 500ms avant de tracer la prochaine arête
      }
      const end = graph.node.find(classroom => classroom.id == endId);
      if (end?.type === "classroom") {
        end.drawSize(ctx, canvasSize);
      }
    }
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleCanvasResize = (size: { width: number; height: number }) => {
    setCanvasSize(size);
  };

  return (
    <>
      <main className="relative h-screen">
        <Plan
          canvasRef={canvasRef}
          onCanvasResize={handleCanvasResize} // Recevoir la taille ici
        />
        <footer className="absolute bottom-0 left-0 right-0 flex justify-center p-4 bg-gray-800 bg-opacity-75">
          <Link href="/">
            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Je suis encore perdu
            </button>
          </Link>
        </footer>
      </main>
    </>
  );
}
