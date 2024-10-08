"use client";
import React, { ForwardedRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import floorPlan from "@/app/image.svg"; // Assurez-vous que le chemin d'importation est correct
import CanvasPlan from "./canvasPlan"; // Assurez-vous que le chemin d'importation est correct

interface FloorPlanCanvasProps {
  canvasRef: ForwardedRef<HTMLCanvasElement>;
  onCanvasClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onCanvasResize?: (size: { width: number; height: number }) => void; // Callback pour la taille
}

const FloorPlanCanvas: React.FC<FloorPlanCanvasProps> = ({
  canvasRef,
  onCanvasClick,
  onCanvasResize
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Lorsque l'image est chargée et que les dimensions du canvas sont connues
    if (imgLoaded && canvasRef && 'current' in canvasRef && canvasRef.current && imgRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          imgRef.current,
          0,
          0,
          canvasSize.width,
          canvasSize.height
        );
      }
    }
  }, [imgLoaded, canvasSize, canvasRef]); // Dépendances

  // Calculer les dimensions du canevas pour maintenir le ratio de l'image
  const handleImageLoad = () => {
    if (canvasRef && 'current' in canvasRef) {
      const canvas = canvasRef.current;
      const img = imgRef.current;

      if (canvas && img) {
        const imageRatio = img.naturalWidth / img.naturalHeight;
        const footerHeight = 64; // Assurez-vous que cette valeur correspond à la hauteur de votre footer
        const screenHeight = window.innerHeight - footerHeight; // Hauteur de l'écran moins la hauteur du footer
        const screenRatio = window.innerWidth / screenHeight;

        let newWidth, newHeight;

        if (screenRatio > imageRatio) {
          // Limiter par la hauteur de l'écran
          newHeight = screenHeight;
          newWidth = newHeight * imageRatio;
        } else {
          // Limiter par la largeur de l'écran
          newWidth = window.innerWidth;
          newHeight = newWidth / imageRatio;
        }

        // Ajuster les dimensions du canevas
        setCanvasSize({ width: newWidth, height: newHeight });
        canvas.width = newWidth;
        canvas.height = newHeight;

        setImgLoaded(true); // Indique que l'image est chargée
        if (onCanvasResize) {
          onCanvasResize({ width: newWidth, height: newHeight });
        }
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // Prenez toute la hauteur de la fenêtre
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
      <CanvasPlan ref={canvasRef} onClick={onCanvasClick} />
    </div>
  );
};

export default FloorPlanCanvas;
