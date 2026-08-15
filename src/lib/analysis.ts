import { formatDecimal } from "./math-format";
import type { FunctionDef, Params } from "./functions";

export interface Point {
  x: number;
  y: number;
  kind: "root" | "y" | "vertex";
  label: string;
}

export interface StepBlock {
  title: string;
  badge: string;
  intro: string;
  lines: string[];
  result: string;
}

export interface Analysis {
  stats: { label: string; value: string }[];
  blocks: StepBlock[];
  points: Point[];
}

const f = (n: number, d = 2) => formatDecimal(n, d);

export function analyze(def: FunctionDef, p: Params): Analysis {
  const points: Point[] = [];
  const blocks: StepBlock[] = [];
  const stats: { label: string; value: string }[] = [];

  if (def.id === "afim") {
    const isConstant = p.a === 0;
    const root = isConstant ? null : -p.b / p.a;
    points.push({ x: 0, y: p.b, kind: "y", label: `Interseção Y: (0, ${f(p.b)})` });
    if (root !== null) points.push({ x: root, y: 0, kind: "root", label: `Raiz: (${f(root)}, 0)` });

    stats.push({ label: "Raiz da função", value: root !== null ? `x = ${f(root, 1)}` : "—" });
    stats.push({
      label: "Crescimento",
      value: isConstant ? "Constante" : p.a > 0 ? "Crescente" : "Decrescente",
    });
    stats.push({ label: "Interseção Y", value: `(0, ${f(p.b, 1)})` });

    blocks.push({
      title: "Interseção com o eixo Y",
      badge: "Y",
      intro: "No eixo Y o valor de x é sempre zero. Basta substituir x = 0.",
      lines: [`f(0) = ${f(p.a, 1)}·0 + ${f(p.b, 1)}`, `f(0) = ${f(p.b, 1)}`],
      result: `Ponto: (0, ${f(p.b, 1)})`,
    });
    blocks.push({
      title: "Interseção com o eixo X (raiz)",
      badge: "X",
      intro: isConstant
        ? "Com a = 0 a função é constante: a reta é horizontal e só toca o eixo X se b = 0."
        : "No eixo X temos f(x) = 0. Resolvemos ax + b = 0.",
      lines: isConstant
        ? [`f(x) = ${f(p.b, 1)}`, p.b === 0 ? "f(x) = 0 para todo x" : "Não existe raiz"]
        : [
            `${f(p.a, 1)}x + ${f(p.b, 1)} = 0`,
            `${f(p.a, 1)}x = ${f(-p.b, 1)}`,
            `x = ${f(-p.b, 1)} / ${f(p.a, 1)}`,
            `x = ${f(root!)}`,
          ],
      result: isConstant
        ? p.b === 0
          ? "A reta coincide com o eixo X"
          : "Reta paralela ao eixo X"
        : `Ponto: (${f(root!)}, 0)`,
    });
  }

  if (def.id === "quadratica") {
    const degenerate = p.a === 0;
    const delta = p.b * p.b - 4 * p.a * p.c;
    const roots: number[] = [];
    if (!degenerate && delta >= 0) {
      roots.push((-p.b + Math.sqrt(delta)) / (2 * p.a));
      if (delta > 0) roots.push((-p.b - Math.sqrt(delta)) / (2 * p.a));
    } else if (degenerate && p.b !== 0) {
      roots.push(-p.c / p.b);
    }
    const vx = degenerate ? null : -p.b / (2 * p.a);
    const vy = vx === null ? null : p.a * vx * vx + p.b * vx + p.c;

    points.push({ x: 0, y: p.c, kind: "y", label: `Interseção Y: (0, ${f(p.c)})` });
    roots.forEach((r) => points.push({ x: r, y: 0, kind: "root", label: `Raiz: (${f(r)}, 0)` }));
    if (vx !== null && vy !== null)
      points.push({ x: vx, y: vy, kind: "vertex", label: `Vértice: (${f(vx)}, ${f(vy)})` });

    stats.push({ label: "Discriminante Δ", value: degenerate ? "—" : f(delta, 1) });
    stats.push({
      label: "Raízes reais",
      value: roots.length ? roots.map((r) => f(r, 1)).join("  e  ") : "nenhuma",
    });
    stats.push({
      label: "Vértice",
      value: vx !== null && vy !== null ? `(${f(vx, 1)}, ${f(vy, 1)})` : "—",
    });

    blocks.push({
      title: "Interseção com o eixo Y",
      badge: "Y",
      intro: "Substituindo x = 0, todos os termos com x desaparecem e sobra o coeficiente c.",
      lines: [
        `f(0) = ${f(p.a, 1)}·0² + ${f(p.b, 1)}·0 + ${f(p.c, 1)}`,
        `f(0) = ${f(p.c, 1)}`,
      ],
      result: `Ponto: (0, ${f(p.c, 1)})`,
    });
    blocks.push({
      title: "Interseções com o eixo X (raízes)",
      badge: "X",
      intro: degenerate
        ? "Com a = 0 a função deixa de ser quadrática e vira uma função afim."
        : "Usamos a fórmula de Bhaskara: primeiro o discriminante Δ = b² − 4ac.",
      lines: degenerate
        ? [
            `${f(p.b, 1)}x + ${f(p.c, 1)} = 0`,
            p.b !== 0 ? `x = ${f(-p.c / p.b)}` : "Não existe raiz",
          ]
        : [
            `Δ = (${f(p.b, 1)})² − 4·(${f(p.a, 1)})·(${f(p.c, 1)})`,
            `Δ = ${f(delta, 2)}`,
            delta < 0
              ? "Δ < 0 → não há raízes reais"
              : `x = (−(${f(p.b, 1)}) ± √${f(delta, 2)}) / (2·${f(p.a, 1)})`,
            ...(delta >= 0 ? roots.map((r, i) => `x${i + 1} = ${f(r)}`) : []),
          ],
      result:
        roots.length === 0
          ? "A parábola não cruza o eixo X"
          : roots.map((r) => `(${f(r)}, 0)`).join("   "),
    });
    if (!degenerate && vx !== null && vy !== null) {
      blocks.push({
        title: "Vértice da parábola",
        badge: "V",
        intro: "O vértice é o ponto de máximo ou mínimo, com xᵥ = −b / 2a.",
        lines: [
          `xᵥ = −(${f(p.b, 1)}) / (2·${f(p.a, 1)}) = ${f(vx)}`,
          `yᵥ = f(${f(vx)}) = ${f(vy)}`,
        ],
        result: `${p.a > 0 ? "Mínimo" : "Máximo"} em (${f(vx)}, ${f(vy)})`,
      });
    }
  }

  if (def.id === "exponencial") {
    const valid = p.b > 0 && p.b !== 1;
    const y0 = p.a + p.c;
    const ratio = p.a !== 0 ? -p.c / p.a : null;
    const root = valid && ratio !== null && ratio > 0 ? Math.log(ratio) / Math.log(p.b) : null;

    points.push({ x: 0, y: y0, kind: "y", label: `Interseção Y: (0, ${f(y0)})` });
    if (root !== null) points.push({ x: root, y: 0, kind: "root", label: `Raiz: (${f(root)}, 0)` });

    stats.push({ label: "Comportamento", value: p.b > 1 ? "Crescimento" : "Decaimento" });
    stats.push({ label: "Assíntota horizontal", value: `y = ${f(p.c, 1)}` });
    stats.push({ label: "Raiz", value: root !== null ? `x = ${f(root, 2)}` : "nenhuma" });

    blocks.push({
      title: "Interseção com o eixo Y",
      badge: "Y",
      intro: "Como b⁰ = 1 para qualquer base, a interseção Y é sempre a + c.",
      lines: [`f(0) = ${f(p.a, 1)}·${f(p.b, 1)}⁰ + ${f(p.c, 1)}`, `f(0) = ${f(p.a, 1)} + ${f(p.c, 1)} = ${f(y0)}`],
      result: `Ponto: (0, ${f(y0)})`,
    });
    blocks.push({
      title: "Interseção com o eixo X (raiz)",
      badge: "X",
      intro: "Fazemos f(x) = 0, isolamos a potência e aplicamos logaritmo na base b.",
      lines: [
        `${f(p.a, 1)}·${f(p.b, 1)}ˣ + ${f(p.c, 1)} = 0`,
        `${f(p.b, 1)}ˣ = ${f(-p.c, 1)} / ${f(p.a, 1)}`,
        ratio !== null ? `${f(p.b, 1)}ˣ = ${f(ratio)}` : "a = 0 → não há potência para isolar",
        root !== null
          ? `x = log_${f(p.b, 1)}(${f(ratio!)}) = ${f(root)}`
          : "A potência precisa ser positiva → não existe raiz real",
      ],
      result: root !== null ? `Ponto: (${f(root)}, 0)` : "A curva não cruza o eixo X",
    });
  }

  if (def.id === "logaritmica") {
    const valid = p.b > 1 && p.a !== 0;
    const root = valid ? Math.pow(p.b, -p.c / p.a) : null;
    if (root !== null && Number.isFinite(root))
      points.push({ x: root, y: 0, kind: "root", label: `Raiz: (${f(root)}, 0)` });

    stats.push({ label: "Domínio", value: "x > 0" });
    stats.push({ label: "Assíntota vertical", value: "x = 0" });
    stats.push({ label: "Raiz", value: root !== null ? `x = ${f(root, 2)}` : "—" });

    blocks.push({
      title: "Interseção com o eixo Y",
      badge: "Y",
      intro: "O logaritmo não está definido em x = 0, então a curva nunca toca o eixo Y.",
      lines: ["log_b(0) não existe", "x = 0 é assíntota vertical"],
      result: "Não existe interseção com o eixo Y",
    });
    blocks.push({
      title: "Interseção com o eixo X (raiz)",
      badge: "X",
      intro: "Fazemos f(x) = 0, isolamos o logaritmo e voltamos à forma exponencial.",
      lines: [
        `${f(p.a, 1)}·log_${f(p.b, 1)}(x) + ${f(p.c, 1)} = 0`,
        `log_${f(p.b, 1)}(x) = ${f(-p.c, 1)} / ${f(p.a, 1)}`,
        valid ? `x = ${f(p.b, 1)}^(${f(-p.c / p.a)})` : "a = 0 → função constante, sem raiz",
        root !== null ? `x = ${f(root)}` : "",
      ].filter(Boolean),
      result: root !== null ? `Ponto: (${f(root)}, 0)` : "Não existe raiz",
    });
  }

  return { stats, blocks, points };
}
