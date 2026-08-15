import { formatDecimal } from "@/lib/math-format";

interface CalculationStepsProps {
  a: number;
  b: number;
}

export function CalculationSteps({ a, b }: CalculationStepsProps) {
  const rootX = a !== 0 ? -b / a : null;
  const yIntercept = b;
  const isConstant = a === 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
      <h3 className="font-display font-semibold text-slate-900">Cálculo dos Pontos Notáveis</h3>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
              Y
            </div>
            <h4 className="font-medium text-slate-900">Interseção com o eixo Y</h4>
          </div>

          <p className="text-sm text-slate-600">
            No eixo Y, o valor de <span className="font-semibold">x</span> é sempre zero.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-sm space-y-2">
            <div className="text-slate-500">f(x) = ax + b</div>
            <div className="text-slate-900">f(0) = {formatDecimal(a, 1)}·0 + {formatDecimal(b, 1)}</div>
            <div className="text-slate-900">f(0) = {formatDecimal(yIntercept, 1)}</div>
            <div className="text-brand-primary font-semibold pt-2 border-t border-slate-200">
              Ponto: (0, {formatDecimal(yIntercept, 1)})
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center text-sm font-bold">
              X
            </div>
            <h4 className="font-medium text-slate-900">Interseção com o eixo X (raiz)</h4>
          </div>

          {isConstant ? (
            <p className="text-sm text-slate-600">
              Quando <span className="font-semibold">a = 0</span>, a função é constante. A reta é horizontal e só cruza o eixo X se{" "}
              <span className="font-semibold">b</span> também for zero.
            </p>
          ) : (
            <p className="text-sm text-slate-600">
              No eixo X, o valor de <span className="font-semibold">f(x)</span> é zero. Resolvemos a equação{" "}
              <span className="font-semibold">ax + b = 0</span>.
            </p>
          )}

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-sm space-y-2">
            {isConstant ? (
              <>
                <div className="text-slate-500">f(x) = {formatDecimal(b, 1)}</div>
                <div className="text-slate-900">
                  {b === 0 ? "f(x) = 0 para todo x" : "Não existe interseção com o eixo X"}
                </div>
                <div className="text-brand-primary font-semibold pt-2 border-t border-slate-200">
                  {b === 0 ? "A reta coincide com o eixo X" : "Reta paralela ao eixo X"}
                </div>
              </>
            ) : (
              <>
                <div className="text-slate-500">ax + b = 0</div>
                <div className="text-slate-900">
                  {formatDecimal(a, 1)}x + {formatDecimal(b, 1)} = 0
                </div>
                <div className="text-slate-900">
                  {formatDecimal(a, 1)}x = {formatDecimal(-b, 1)}
                </div>
                <div className="text-slate-900">
                  x = {formatDecimal(-b, 1)} / {formatDecimal(a, 1)}
                </div>
                <div className="text-slate-900">x = {formatDecimal(rootX!, 2)}</div>
                <div className="text-brand-primary font-semibold pt-2 border-t border-slate-200">
                  Ponto: ({formatDecimal(rootX!, 2)}, 0)
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
