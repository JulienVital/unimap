"use client"
import Plan from "@/app/component/plan"
import { handleCanvasClick } from "@/app/functions/debug/utils";

import { useRef } from "react";
export default function DebugPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gestionnaire d'événement de clic
  const handleCanvasClickInternal = (event: React.MouseEvent<HTMLCanvasElement>) => {
    handleCanvasClick(event, canvasRef)
  };
  return (
    <>
      <main >
      <Plan canvasRef={canvasRef} onCanvasClick={handleCanvasClickInternal} />

      </main>
      <footer >
      </footer>
    </>
  );
}
