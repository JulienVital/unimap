export const  drawRectangle = (
    ctx: CanvasRenderingContext2D,
    xPercent: number,
    yPercent: number,
    widthPercent: number,
    heightPercent: number,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const x = (xPercent / 100) * canvasWidth;
    const y = (yPercent / 100) * canvasHeight;
    const width = (widthPercent / 100) * canvasWidth;
    const height = (heightPercent / 100) * canvasHeight;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'; 
    ctx.fill();
    ctx.strokeStyle = "black"; 
    ctx.lineWidth = 1;
    ctx.stroke();
  };