import { BookOpen, FlaskConical, Target, Trophy } from "lucide-react";

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = "explorar" }: SidebarProps) {
  const items = [
    { id: "explorar", label: "Explorar Lições", icon: BookOpen },
    { id: "laboratorio", label: "Laboratório Gráfico", icon: FlaskConical },
    { id: "progresso", label: "Meu Progresso", icon: Trophy },
    { id: "desafios", label: "Desafios Diários", icon: Target },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-brand-primary rounded flex items-center justify-center text-white font-display font-bold">
            F
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-950">Funcio</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-slate-100 text-brand-primary"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-900 rounded-xl p-4 text-white">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Nível 12</p>
          <p className="text-sm font-semibold mb-3">Mestre das Parábolas</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-secondary w-3/4" />
          </div>
        </div>
      </div>
    </aside>
  );
}
