export const handleCanvasClick = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const rect = canvasRef.current?.getBoundingClientRect();
  if (rect) {
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    console.log(`
          "position": {
          "top": ${y.toFixed(2)},
          "left": ${x.toFixed(2)}
        },
        `);
  }
};
