import { useState } from "react";
import { FunctionGraph } from "./function-graph";
import { ParameterControl } from "./parameter-control";
import { Sidebar } from "./sidebar";
import { HelpCircle } from "lucide-react";

export function MathFunctionApp() {
  const [a, setA] = useState(2.5);
  const [b, setB] = useState(-1);
  const [showCheck, setShowCheck] = useState(false);

  const rootX = a !== 0 ? -b / a : null;
  const yIntercept = b;
  const isIncreasing = a > 0;
  const isConstant = a === 0;

  const handleCheck = () => {
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar activeItem="explorar" />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Matemática</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900 font-medium">Funções Afins</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <HelpCircle className="size-4" />
              Ajuda
            </button>
            <button className="px-4 py-1.5 text-sm font-medium bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 shadow-sm transition-colors">
              Próxima Aula
            </button>
          </div>
        </header>

        <div className="p-8 flex-1 grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-slate-950 mb-4">
                Explorando a Função Afim
              </h1>
              <p className="text-slate-600 leading-relaxed">
                A função afim é definida pela fórmula{" "}
                <code className="bg-slate-100 px-1 rounded font-medium text-brand-primary">f(x) = ax + b</code>. 
                O coeficiente <span className="font-semibold">a</span> determina a inclinação, enquanto{" "}
                <span className="font-semibold">b</span> é o ponto onde a reta cruza o eixo y.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-display font-semibold text-slate-900">Controles de Parâmetros</h3>

              <div className="space-y-5">
                <ParameterControl
                  label="Coeficiente Angular (a)"
                  name="a"
                  value={a}
                  min={-4}
                  max={4}
                  step={0.1}
                  onChange={setA}
                />
                <ParameterControl
                  label="Coeficiente Linear (b)"
                  name="b"
                  value={b}
                  min={-4}
                  max={4}
                  step={0.1}
                  onChange={setB}
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 italic mb-4">
                  Observe como a reta se comporta ao deslizar os valores acima.
                </p>
                <button
                  onClick={handleCheck}
                  className="w-full py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Verificar Equação Atual
                </button>
                {showCheck && (
                  <p className="mt-3 text-sm text-center text-emerald-600 font-medium animate-in fade-in slide-in-from-bottom-2">
                    Equação atual: f(x) = {a.toFixed(1)}x {b >= 0 ? "+" : "-"} {Math.abs(b).toFixed(1)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-8 flex flex-col gap-6">
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
                  <FunctionGraph a={a} b={b} />
                </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl">
                <span className="font-display font-medium text-lg">
                  f(x) = {a.toFixed(1)}x {b >= 0 ? "+" : "-"} {Math.abs(b).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-xs text-slate-500 font-medium">Raiz da Função</span>
                <span className="text-lg font-bold text-slate-950 font-display">
                  {rootX !== null ? `x = ${rootX.toFixed(1)}` : "—"}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-xs text-slate-500 font-medium">Crescimento</span>
                <span className="text-lg font-bold font-display">
                  {isConstant ? (
                    <span className="text-slate-500">Constante</span>
                  ) : isIncreasing ? (
                    <span className="text-emerald-500">Crescente</span>
                  ) : (
                    <span className="text-rose-500">Decrescente</span>
                  )}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
                <span className="text-xs text-slate-500 font-medium">Interseção Y</span>
                <span className="text-lg font-bold text-slate-950 font-display">(0, {yIntercept.toFixed(1)})</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
