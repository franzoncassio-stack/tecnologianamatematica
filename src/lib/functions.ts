export interface Params {
  a: number;
  b: number;
  c: number;
}

export type FunctionKind = "afim" | "quadratica" | "exponencial" | "logaritmica";

export interface ParamDef {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
}

export interface FunctionDef {
  id: FunctionKind;
  path: string;
  title: string;
  short: string;
  formula: string;
  description: string;
  params: ParamDef[];
  /** returns null when x is outside the domain */
  evaluate: (p: Params, x: number) => number | null;
  /** vertical asymptote x value, if any */
  verticalAsymptote?: (p: Params) => number | null;
  /** horizontal asymptote y value, if any */
  horizontalAsymptote?: (p: Params) => number | null;
}

export const FUNCTIONS: Record<FunctionKind, FunctionDef> = {
  afim: {
    id: "afim",
    path: "/afim",
    title: "Função Afim",
    short: "1º grau",
    formula: "f(x) = ax + b",
    description:
      "O coeficiente a determina a inclinação da reta e b indica onde a reta cruza o eixo Y.",
    params: [
      { name: "a", label: "Coeficiente angular (a)", min: -4, max: 4, step: 0.1, initial: 2.5 },
      { name: "b", label: "Coeficiente linear (b)", min: -4, max: 4, step: 0.1, initial: -1 },
    ],
    evaluate: (p, x) => p.a * x + p.b,
  },
  quadratica: {
    id: "quadratica",
    path: "/quadratica",
    title: "Função Quadrática",
    short: "2º grau",
    formula: "f(x) = ax² + bx + c",
    description:
      "A parábola abre para cima quando a > 0 e para baixo quando a < 0. O discriminante Δ revela quantas raízes existem.",
    params: [
      { name: "a", label: "Coeficiente a", min: -3, max: 3, step: 0.1, initial: 1 },
      { name: "b", label: "Coeficiente b", min: -6, max: 6, step: 0.1, initial: -1 },
      { name: "c", label: "Coeficiente c", min: -6, max: 6, step: 0.1, initial: -2 },
    ],
    evaluate: (p, x) => p.a * x * x + p.b * x + p.c,
  },
  exponencial: {
    id: "exponencial",
    path: "/exponencial",
    title: "Função Exponencial",
    short: "crescimento",
    formula: "f(x) = a·bˣ + c",
    description:
      "A base b define crescimento (b > 1) ou decaimento (0 < b < 1). O valor c desloca a curva verticalmente e define a assíntota horizontal.",
    params: [
      { name: "a", label: "Fator a", min: -4, max: 4, step: 0.1, initial: 1 },
      { name: "b", label: "Base b", min: 0.2, max: 4, step: 0.1, initial: 2 },
      { name: "c", label: "Deslocamento c", min: -6, max: 6, step: 0.1, initial: -1 },
    ],
    evaluate: (p, x) => {
      if (p.b <= 0 || p.b === 1) return null;
      const v = p.a * Math.pow(p.b, x) + p.c;
      return Number.isFinite(v) ? v : null;
    },
    horizontalAsymptote: (p) => p.c,
  },
  logaritmica: {
    id: "logaritmica",
    path: "/logaritmica",
    title: "Função Logarítmica",
    short: "inversa da exponencial",
    formula: "f(x) = a·log_b(x) + c",
    description:
      "Definida apenas para x > 0. É a inversa da exponencial e possui assíntota vertical no eixo Y.",
    params: [
      { name: "a", label: "Fator a", min: -4, max: 4, step: 0.1, initial: 1 },
      { name: "b", label: "Base b", min: 1.2, max: 10, step: 0.1, initial: 2 },
      { name: "c", label: "Deslocamento c", min: -6, max: 6, step: 0.1, initial: 0 },
    ],
    evaluate: (p, x) => {
      if (x <= 0 || p.b <= 1) return null;
      const v = (p.a * Math.log(x)) / Math.log(p.b) + p.c;
      return Number.isFinite(v) ? v : null;
    },
    verticalAsymptote: () => 0,
  },
};

export const FUNCTION_LIST = [
  FUNCTIONS.afim,
  FUNCTIONS.quadratica,
  FUNCTIONS.exponencial,
  FUNCTIONS.logaritmica,
];

export function initialParams(def: FunctionDef): Params {
  const out: Params = { a: 0, b: 0, c: 0 };
  for (const d of def.params) {
    out[d.name as keyof Params] = d.initial;
  }
  return out;
}

export function formatEquation(def: FunctionDef, p: Params): string {
  const f = (n: number) => n.toFixed(1).replace(",", ".");
  const sign = (n: number) => (n >= 0 ? "+" : "-");
  switch (def.id) {
    case "afim":
      return `f(x) = ${f(p.a)}x ${sign(p.b)} ${f(Math.abs(p.b))}`;
    case "quadratica":
      return `f(x) = ${f(p.a)}x² ${sign(p.b)} ${f(Math.abs(p.b))}x ${sign(p.c)} ${f(Math.abs(p.c))}`;
    case "exponencial":
      return `f(x) = ${f(p.a)}·${f(p.b)}ˣ ${sign(p.c)} ${f(Math.abs(p.c))}`;
    case "logaritmica":
      return `f(x) = ${f(p.a)}·log_${f(p.b)}(x) ${sign(p.c)} ${f(Math.abs(p.c))}`;
  }
}
