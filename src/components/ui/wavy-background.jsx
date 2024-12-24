"use client";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = 1,
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  let w, h, cx, cy, canvas, ctx, points, animationFrameId;
  const canvasRef = useRef(null);

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    resizeCanvas();
    initPoints();
    animationFrameId = requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cx = w / 2;
    cy = h / 2;
  };

  const initPoints = () => {
    points = [];
    const rows = Math.round(h / waveWidth);
    const cols = Math.round(w / waveWidth);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        points.push({
          x: j * waveWidth,
          y: i * waveWidth,
          originX: j * waveWidth,
          originY: i * waveWidth,
        });
      }
    }
  };

  const animate = (t) => {
    ctx.clearRect(0, 0, w, h);
    points.forEach((point) => {
      const nX = noise(point.x * 0.003, point.y * 0.003, t * 0.0003) * 50;
      const nY = noise(point.x * 0.003, point.y * 0.003, t * 0.0003) * 50;
      point.x = point.originX + nX;
      point.y = point.originY + nY;
    });

    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      if (i % Math.round(w / waveWidth) === Math.round(w / waveWidth) - 1) continue;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${waveOpacity})`;
      ctx.stroke();
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={containerClassName}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={className}>{children}</div>
    </div>
  );
}; 