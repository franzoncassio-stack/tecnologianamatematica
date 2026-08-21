import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { FUNCTION_LIST } from "@/lib/functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Funcio — Escolha a função para estudar" },
      {
        name: "description",
        content:
          "Escolha entre função afim, quadrática, exponencial ou logarítmica e explore gráficos interativos com o cálculo passo a passo dos pontos notáveis.",
      },
      { property: "og:title", content: "Funcio — Escolha a função para estudar" },
      {
        property: "og:description",
        content:
          "Função afim, quadrática, exponencial e logarítmica com gráficos interativos e cálculos passo a passo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="flex items-center gap-2 mb-12">
          <div className="size-8 bg-brand-primary rounded flex items-center justify-center text-white font-display font-bold">
            F
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-950">Funcio</span>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
          Trabalho de Tecnologia na educação de Matemática
        </p>
        <p className="text-xs font-semibold text-slate-500 mb-1">Prof. Edinei Luis Becher</p>
        <p className="text-xs font-semibold text-slate-500 mb-4">Aluno Cássio Franzon</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-950 max-w-2xl leading-tight">
          Qual função você quer estudar hoje?
        </h1>
        <p className="mt-5 text-slate-600 max-w-xl leading-relaxed">
          Escolha um tipo de função para abrir o laboratório interativo: ajuste os coeficientes,
          acompanhe o gráfico em tempo real e veja o cálculo passo a passo dos pontos onde a curva
          corta os eixos X e Y.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FUNCTION_LIST.map((def) => (
            <Link
              key={def.id}
              to={def.path}
              className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {def.short}
              </span>
              <h2 className="font-display text-xl font-bold text-slate-950">{def.title}</h2>
              <code className="font-mono text-sm text-brand-primary bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 w-fit">
                {def.formula}
              </code>
              <p className="text-sm text-slate-600 leading-relaxed">{def.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-primary">
                Explorar
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
