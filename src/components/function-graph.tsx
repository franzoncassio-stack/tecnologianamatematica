import { useMemo, useState } from "react";

import { formatDecimal } from "@/lib/math-format";
import type { Point } from "@/lib/analysis";

interface FunctionGraphProps {
  evaluate: (x: number) => number | null;
  points?: Point[];
  verticalAsymptote?: number | null;
  horizontalAsymptote?: number | null;
  width?: number;
  height?: number;
}

export function FunctionGraph({
  evaluate,
  points = [],
  verticalAsymptote = null,
  horizontalAsymptote = null,
  width = 800,
  height = 500,
}: FunctionGraphProps) {
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
    const steps = 400;
    let d = "";
    let pen = false;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + ((xMax - xMin) * i) / steps;
      const y = evaluate(x);
      if (y === null || !Number.isFinite(y) || y < yMin - 40 || y > yMax + 40) {
        pen = false;
        continue;
      }
      d += `${pen ? "L" : "M"} ${toSvgX(x).toFixed(2)} ${toSvgY(y).toFixed(2)} `;
      pen = true;
    }
    return d;
  }, [evaluate]);

  const gridX: number[] = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) gridX.push(x);
  const gridY: number[] = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) gridY.push(y);

  const pointColor = (kind: Point["kind"]) =>
    kind === "root"
      ? "var(--brand-secondary)"
      : kind === "y"
        ? "var(--emerald-500)"
        : "var(--slate-900)";

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const x = xMin + (svgX - padding.left) / scaleX;
    const y = evaluate(x);
    if (y !== null && x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
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
        <clipPath id="graph-area">
          <rect x={padding.left} y={padding.top} width={graphWidth} height={graphHeight} />
        </clipPath>
      </defs>

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

      {horizontalAsymptote !== null && horizontalAsymptote >= yMin && horizontalAsymptote <= yMax && (
        <line
          x1={padding.left}
          y1={toSvgY(horizontalAsymptote)}
          x2={width - padding.right}
          y2={toSvgY(horizontalAsymptote)}
          stroke="var(--brand-secondary)"
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />
      )}

      {verticalAsymptote !== null && verticalAsymptote >= xMin && verticalAsymptote <= xMax && (
        <line
          x1={toSvgX(verticalAsymptote)}
          y1={padding.top}
          x2={toSvgX(verticalAsymptote)}
          y2={height - padding.bottom}
          stroke="var(--brand-secondary)"
          strokeWidth={1.5}
          strokeDasharray="6 6"
        />
      )}

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
        ) : null,
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
        ) : null,
      )}

      <path
        d={path}
        fill="none"
        stroke="var(--brand-primary)"
        strokeWidth={3}
        strokeLinecap="round"
        clipPath="url(#graph-area)"
      />

      <g clipPath="url(#graph-area)">
        {points.map((pt, i) =>
          Number.isFinite(pt.x) && Number.isFinite(pt.y) ? (
            <circle
              key={`${pt.kind}-${i}`}
              cx={toSvgX(pt.x)}
              cy={toSvgY(pt.y)}
              r={5}
              fill={pointColor(pt.kind)}
              stroke="white"
              strokeWidth={2}
            >
              <title>{pt.label}</title>
            </circle>
          ) : null,
        )}
      </g>

      {hoverPoint && (
        <g>
          <circle
            cx={toSvgX(hoverPoint.x)}
            cy={toSvgY(hoverPoint.y)}
            r={6}
            fill="white"
            stroke="var(--brand-primary)"
            strokeWidth={3}
          />
          <rect
            x={toSvgX(hoverPoint.x) + 12}
            y={toSvgY(hoverPoint.y) - 32}
            width={120}
            height={26}
            rx={8}
            fill="var(--slate-900)"
          />
          <text
            x={toSvgX(hoverPoint.x) + 72}
            y={toSvgY(hoverPoint.y) - 14}
            textAnchor="middle"
            className="text-xs fill-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            f({formatDecimal(hoverPoint.x, 1)}) = {formatDecimal(hoverPoint.y, 1)}
          </text>
        </g>
      )}
    </svg>
  );
}
