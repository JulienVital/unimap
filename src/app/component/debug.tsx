"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import floorPlan from "@/app/image.svg"; // Assurez-vous que le chemin d'importation est correct
import { graph } from "./node"; // Assurez-vous que le chemin d'importation est correct
import { drawRectangle } from "../functions/DrawClassRoom";
import { handleCanvasClick } from "../functions/debug/utils";

// Fonction pour ajouter un délai
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const FloorPlanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Fonction principale de dessin asynchrone avec délai
  const drawWithDelay = async (ctx: CanvasRenderingContext2D) => {
    // Effacer le canevas
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    // Dessiner l'image
    ctx.drawImage(imgRef.current!, 0, 0, canvasSize.width, canvasSize.height);

    // Dessiner un exemple de tracé
    ctx.beginPath();
    ctx.moveTo(
      22 * (canvasSize.width / 100),
      16 * (canvasSize.height / 100)
    ); // Point A

    // Dessin des points avec un délai
    for (const currentNode in graph.point) {
      const top = graph.point[currentNode].position.top * (canvasSize.height / 100);
      const left = graph.point[currentNode].position.left * (canvasSize.width / 100);

      // Dessiner une ligne vers le prochain point
      ctx.lineTo(left, top);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Attendre 500ms avant de continuer
      await sleep(500);
    }

    // Dessiner les rectangles des salles avec délai
    for (const currentNode in graph.classroom) {
      drawRectangle(
        ctx,
        graph.classroom[currentNode].size.left,
        graph.classroom[currentNode].size.top,
        graph.classroom[currentNode].size.width,
        graph.classroom[currentNode].size.height,
        canvasSize.width,
        canvasSize.height
      );
      
      // Attendre 500ms avant de continuer
      await sleep(500);
    }

    // Dessiner le texte avec un délai
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    for (const currentNode in graph.point) {
      const top = graph.point[currentNode].position.top * (canvasSize.height / 100);
      const left = graph.point[currentNode].position.left * (canvasSize.width / 100);

      ctx.fillText(currentNode, left, top);

      // Attendre 500ms avant de continuer
      await sleep(500);
    }
  };

  useEffect(() => {
    if (imgLoaded && canvasRef.current && imgRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        // Lancer le dessin avec des délais
        drawWithDelay(ctx);
      }
    }
  }, [imgLoaded, canvasSize]);

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    if (canvas && img) {
      const imageRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = window.innerWidth / window.innerHeight;

      let newWidth, newHeight;

      if (screenRatio > imageRatio) {
        // Limiter par la hauteur de l'écran
        newHeight = window.innerHeight;
        newWidth = newHeight * imageRatio;
      } else {
        // Limiter par la largeur de l'écran
        newWidth = window.innerWidth;
        newHeight = newWidth / imageRatio;
      }

      setCanvasSize({ width: newWidth, height: newHeight });
      canvas.width = newWidth;
      canvas.height = newHeight;

      setImgLoaded(true);
    }
  };



  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        ref={imgRef}
        src={floorPlan}
        alt="Plan d'étage"
        priority
        style={{ display: "none" }}
        onLoad={handleImageLoad}
      />
      <canvas
        ref={canvasRef}
        onClick={(event) => handleCanvasClick(event, canvasRef)}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default FloorPlanCanvas;
