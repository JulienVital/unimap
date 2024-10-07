// /app/components/CanvasPlan.tsx
"use client";
import React, { forwardRef, useEffect } from "react";

interface CanvasPlanProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const CanvasPlan = forwardRef<HTMLCanvasElement, CanvasPlanProps>(
  ({ onClick, ...rest }, ref) => {

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
