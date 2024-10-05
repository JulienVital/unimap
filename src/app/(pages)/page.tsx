"use client"
import Plan from "@/app/component/plan"
import { useRef } from "react";
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <>
      <main >
        <Plan canvasRef={canvasRef} />

      </main>
      <footer >
      </footer>
    </>
  );
}
