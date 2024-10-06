// /app/components/CanvasPlan.tsx
"use client";
import React, { forwardRef, useEffect } from "react";

interface CanvasPlanProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const CanvasPlan = forwardRef<HTMLCanvasElement, CanvasPlanProps>(
  ({ onClick, ...rest }, ref) => {
    useEffect(() => {
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (canvas.current) {
        const updateCanvasSize = () => {
          if(  canvas.current){
            const footerHeight = 64; // Remplacez ceci par la hauteur de votre footer
            canvas.current.height = window.innerHeight - footerHeight; // Ajustez la hauteur
            canvas.current.width = window.innerWidth; // Largeur totale de la fenêtre
          }
        };

        updateCanvasSize(); // Ajustez la taille initiale

        window.addEventListener("resize", updateCanvasSize); // Écoutez les redimensionnements

        return () => {
          window.removeEventListener("resize", updateCanvasSize); // Nettoyez l'écouteur
        };
      }
    }, [ref]);

    return (
      <canvas
        ref={ref}
        onClick={onClick}
        {...rest}
        style={{
          display: "block",
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    );
  }
);

CanvasPlan.displayName = "CanvasPlan";

export default CanvasPlan;
