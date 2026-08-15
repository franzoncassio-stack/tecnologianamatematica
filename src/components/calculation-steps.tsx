import type { StepBlock } from "@/lib/analysis";

interface CalculationStepsProps {
  blocks: StepBlock[];
}

const badgeStyle: Record<string, string> = {
  Y: "bg-emerald-100 text-emerald-600",
  X: "bg-brand-secondary/10 text-brand-secondary",
  V: "bg-slate-900 text-white",
};

export function CalculationSteps({ blocks }: CalculationStepsProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
      <h3 className="font-display font-semibold text-slate-900">Cálculo dos Pontos Notáveis</h3>

      <div className="space-y-6">
        {blocks.map((block) => (
          <div key={block.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`size-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                  badgeStyle[block.badge] ?? "bg-slate-100 text-slate-600"
                }`}
              >
                {block.badge}
              </div>
              <h4 className="font-medium text-slate-900">{block.title}</h4>
            </div>

            <p className="text-sm text-slate-600">{block.intro}</p>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-sm space-y-2">
              {block.lines.map((line, i) => (
                <div key={i} className="text-slate-900 break-words">
                  {line}
                </div>
              ))}
              <div className="text-brand-primary font-semibold pt-2 border-t border-slate-200 break-words">
                {block.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
