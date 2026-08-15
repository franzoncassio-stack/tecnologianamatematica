import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";

import { CalculationSteps } from "./calculation-steps";
import { FunctionGraph } from "./function-graph";
import { ParameterControl } from "./parameter-control";
import { Sidebar } from "./sidebar";
import { analyze } from "@/lib/analysis";
import { formatEquation, initialParams, type FunctionDef } from "@/lib/functions";

interface FunctionLabProps {
  def: FunctionDef;
}

export function FunctionLab({ def }: FunctionLabProps) {
  const [params, setParams] = useState(() => initialParams(def));

  const analysis = useMemo(() => analyze(def, params), [def, params]);
  const evaluate = useMemo(() => (x: number) => def.evaluate(params, x), [def, params]);
  const equation = formatEquation(def, params);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar activeItem={def.id} />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Matemática
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-900 font-medium">{def.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setParams(initialParams(def))}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="size-4" />
              Redefinir
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 shadow-sm transition-colors"
            >
              <ArrowLeft className="size-4" />
              Escolher função
            </Link>
          </div>
        </header>

        <div className="p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-slate-950 mb-4">{def.title}</h1>
              <p className="text-slate-600 leading-relaxed">
                Fórmula geral:{" "}
                <code className="bg-slate-100 px-1 rounded font-medium text-brand-primary">
                  {def.formula}
                </code>
                . {def.description}
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-display font-semibold text-slate-900">Controles de Parâmetros</h3>

              <div className="space-y-5">
                {def.params.map((p) => (
                  <ParameterControl
                    key={p.name}
                    label={p.label}
                    name={p.name}
                    value={params[p.name as "a" | "b" | "c"]}
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    onChange={(v) => setParams((prev) => ({ ...prev, [p.name]: v }))}
                  />
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 italic">
                  Observe como o gráfico e os cálculos reagem ao deslizar os valores.
                </p>
              </div>
            </div>

            <CalculationSteps blocks={analysis.blocks} />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden flex flex-col min-h-[420px]">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Visualização do Gráfico
                </span>
                <div className="flex gap-2">
                  <div className="size-2.5 rounded-full bg-slate-200" />
                  <div className="size-2.5 rounded-full bg-slate-200" />
                </div>
              </div>

              <div className="flex-1 relative bg-[radial-gradient(var(--slate-200)_1px,transparent_1px)] [background-size:24px_24px] flex items-center justify-center p-4">
                <div className="w-full h-full">
                  <FunctionGraph
                    evaluate={evaluate}
                    points={analysis.points}
                    verticalAsymptote={def.verticalAsymptote ? def.verticalAsymptote(params) : null}
                    horizontalAsymptote={
                      def.horizontalAsymptote ? def.horizontalAsymptote(params) : null
                    }
                  />
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl">
                <span className="font-display font-medium text-lg">{equation}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {analysis.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1"
                >
                  <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                  <span className="text-lg font-bold text-slate-950 font-display">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
