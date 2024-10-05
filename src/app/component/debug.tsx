"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import floorPlan from "@/app/image.svg"; // Assurez-vous que le chemin d'importation est correct
import {graph } from "./node"; // Assurez-vous que le chemin d'importation est correct
import { drawRectangle } from "../functions/DrawClassRoom";

const FloorPlanCanvas: React.FC = () => {
  // Références pour le canevas et l'image
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // État pour les dimensions de l'image
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Utiliser useEffect pour dessiner sur le canevas une fois l'image chargée
  useEffect(() => {
    if (imgLoaded && canvasRef.current && imgRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        // Effacer le canevas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Dessiner l'image en maintenant les proportions
        ctx.drawImage(
          imgRef.current,
          0,
          0,
          canvasSize.width,
          canvasSize.height
        );

        // Dessiner un exemple de tracé
        ctx.beginPath();
        ctx.moveTo(
          22 * (canvasSize.width / 100),
          16 * (canvasSize.height / 100)
        ); // Point A
        for (const currentNode in graph.point) {
          const top =
            graph.point[currentNode].position.top *
            (canvasSize.height / 100);
          const left =
            graph.point[currentNode].position.left *
            (canvasSize.width / 100);
          ctx.lineTo(left, top); // Point B
        }
        ctx.strokeStyle = "red"; // Couleur du tracé
        ctx.lineWidth = 1; // Épaisseur du trait
        ctx.stroke();
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
          // ctx.lineTo(left, top); // Point B
        }

        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        for (const currentNode in graph.point) {
          const top =
            graph.point[currentNode].position.top *
            (canvasSize.height / 100);
          const left =
            graph.point[currentNode].position.left *
            (canvasSize.width / 100);
          ctx.fillText(currentNode, left, top);
        }
      }
    }
  }, [imgLoaded, canvasSize]); // Dépendance sur imgLoaded et la taille du canevas

  // Calculer les dimensions du canevas pour maintenir le ratio de l'image
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

      // Ajuster les dimensions du canevas
      setCanvasSize({ width: newWidth, height: newHeight });
      canvas.width = newWidth;
      canvas.height = newHeight;

      setImgLoaded(true); // Indique que l'image est chargée
    }
  };

  // Fonction pour gérer le clic sur le canevas
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((event.clientX - rect.left) / rect.width) * 100; // Calculer le pourcentage x
      const y = ((event.clientY - rect.top) / rect.height) * 100; // Calculer le pourcentage y
      console.log(`Coordonnées: left: ${x.toFixed(2)}%, top: ${y.toFixed(2)}%`); // Afficher les coordonnées en console
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
      {/* Image pour charger le plan d'étage */}
      <Image
        ref={imgRef}
        src={floorPlan}
        alt="Plan d'étage"
        priority
        style={{ display: "none" }} // Cacher l'image
        onLoad={handleImageLoad} // Appeler la fonction lorsque l'image est chargée
      />
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick} // Ajouter le gestionnaire de clic
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }} // Ajuster le canevas pour qu'il ne dépasse pas les limites de l'écran
      />
    </div>
  );
};

export default FloorPlanCanvas;
