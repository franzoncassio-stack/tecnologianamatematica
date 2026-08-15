import { Link } from "@tanstack/react-router";

import { FUNCTION_LIST } from "@/lib/functions";

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex-col shrink-0 hidden lg:flex">
      <div className="p-6 border-b border-slate-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 bg-brand-primary rounded flex items-center justify-center text-white font-display font-bold">
            F
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-950">
            Funcio
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          Funções
        </p>
        {FUNCTION_LIST.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex flex-col gap-0.5 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-slate-100 text-brand-primary" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{item.title}</span>
              <span className="font-mono text-xs text-slate-400">{item.formula}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-xl p-4 text-white">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Laboratório
          </p>
          <p className="text-sm font-semibold">Ajuste os coeficientes e veja os cálculos passo a passo.</p>
        </div>
      </div>
    </aside>
  );
}
