import { useMemo, useState } from "react";

interface FunctionGraphProps {
  a: number;
  b: number;
  width?: number;
  height?: number;
}

export function FunctionGraph({ a, b, width = 800, height = 500 }: FunctionGraphProps) {
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number } | null>(null);

  const padding = { top: 24, right: 40, bottom: 40, left: 56 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xMin = -6;
  const xMax = 6;
  const yMin = -8;
  const yMax = 8;

  const scaleX = graphWidth / (xMax - xMin);
  const scaleY = graphHeight / (yMax - yMin);

  const toSvgX = (x: number) => padding.left + (x - xMin) * scaleX;
  const toSvgY = (y: number) => height - padding.bottom - (y - yMin) * scaleY;

  const path = useMemo(() => {
    const steps = 200;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = xMin + (xMax - xMin) * t;
      const y = a * x + b;
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      d += `${i === 0 ? "M" : "L"} ${sx.toFixed(2)} ${sy.toFixed(2)}`;
    }
    return d;
  }, [a, b]);

  const gridX = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    gridX.push(x);
  }

  const gridY = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    gridY.push(y);
  }

  const rootX = b !== 0 ? -b / a : null;
  const rootInRange = rootX !== null && rootX >= xMin && rootX <= xMax;
  const yIntercept = b;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const x = xMin + (svgX - padding.left) / scaleX;
    const y = a * x + b;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      setHoverPoint({ x, y });
    } else {
      setHoverPoint(null);
    }
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPoint(null)}
    >
      <defs>
        <pattern id="grid" width={scaleX} height={scaleY} patternUnits="userSpaceOnUse">
          <path d={`M ${scaleX} 0 L 0 0 0 ${scaleY}`} fill="none" stroke="var(--slate-200)" strokeWidth={1} />
        </pattern>
        <clipPath id="graph-area">
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} />
        </clipPath>
      </defs>

      <rect
        x={padding.left}
        y={padding.top}
        width={graphWidth}
        height={graphHeight}
        fill="url(#grid)"
      />

      {gridX.map((x) => (
        <line
          key={`vx-${x}`}
          x1={toSvgX(x)}
          y1={padding.top}
          x2={toSvgX(x)}
          y2={height - padding.bottom}
          stroke="var(--slate-200)"
          strokeWidth={1}
        />
      ))}

      {gridY.map((y) => (
        <line
          key={`hy-${y}`}
          x1={padding.left}
          y1={toSvgY(y)}
          x2={width - padding.right}
          y2={toSvgY(y)}
          stroke="var(--slate-200)"
          strokeWidth={1}
        />
      ))}

      <line
        x1={toSvgX(0)}
        y1={padding.top}
        x2={toSvgX(0)}
        y2={height - padding.bottom}
        stroke="var(--slate-400)"
        strokeWidth={2}
      />
      <line
        x1={padding.left}
        y1={toSvgY(0)}
        x2={width - padding.right}
        y2={toSvgY(0)}
        stroke="var(--slate-400)"
        strokeWidth={2}
      />

      {gridX.map((x) =>
        x !== 0 ? (
          <text
            key={`xt-${x}`}
            x={toSvgX(x)}
            y={height - padding.bottom + 18}
            textAnchor="middle"
            className="text-xs fill-slate-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {x}
          </text>
        ) : null
      )}

      {gridY.map((y) =>
        y !== 0 ? (
          <text
            key={`yt-${y}`}
            x={padding.left - 10}
            y={toSvgY(y) + 4}
            textAnchor="end"
            className="text-xs fill-slate-400"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {y}
          </text>
        ) : null
      )}

      <path d={path} fill="none" stroke="var(--brand-primary)" strokeWidth={3} strokeLinecap="round" />

      {rootInRange && (
        <circle cx={toSvgX(rootX)} cy={toSvgY(0)} r={5} fill="var(--brand-secondary)" stroke="white" strokeWidth={2}>
          <title>Raiz: ({rootX.toFixed(2)}, 0)</title>
        </circle>
      )}

      <circle cx={toSvgX(0)} cy={toSvgY(yIntercept)} r={5} fill="var(--emerald-500)" stroke="white" strokeWidth={2}>
        <title>Interseção Y: (0, {yIntercept.toFixed(2)})</title>
      </circle>

      {hoverPoint && (
        <g>
          <circle cx={toSvgX(hoverPoint.x)} cy={toSvgY(hoverPoint.y)} r={6} fill="white" stroke="var(--brand-primary)" strokeWidth={3} />
          <rect
            x={toSvgX(hoverPoint.x) + 12}
            y={toSvgY(hoverPoint.y) - 32}
            width={110}
            height={26}
            rx={8}
            fill="var(--slate-900)"
          />
          <text
            x={toSvgX(hoverPoint.x) + 67}
            y={toSvgY(hoverPoint.y) - 14}
            textAnchor="middle"
            className="text-xs fill-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            f({hoverPoint.x.toFixed(1)}) = {hoverPoint.y.toFixed(1)}
          </text>
        </g>
      )}
    </svg>
  );
}
