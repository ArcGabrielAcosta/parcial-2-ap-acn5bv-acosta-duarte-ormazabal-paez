import { Zap, Droplets, Hammer, PaintBucket, Flame, TreePine, KeyRound, Wind, Drill, Leaf } from "lucide-react";
import { trades } from "../data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Zap, Droplets, Hammer, PaintBucket, Flame, TreePine, KeyRound, Wind, Drill, Leaf,
};

interface TradesGridProps {
  onSelectTrade?: (trade: string) => void;
}

export function TradesGrid({ onSelectTrade }: TradesGridProps) {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Categorías</span>
          <h2 className="text-[#0F172A] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>
            Todos los oficios en un lugar
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Más de 40 categorías de profesionales verificados, disponibles en toda la ciudad.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trades.map((trade) => {
            const Icon = iconMap[trade.icon] || Zap;
            return (
              <button
                key={trade.id}
                onClick={() => onSelectTrade?.(trade.name)}
                className="group bg-white rounded-2xl p-6 flex flex-col items-center gap-3 border border-slate-100 hover:border-[#2563EB] hover:shadow-lg hover:shadow-blue-100 transition-all duration-200 text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${trade.color}15` }}
                >
                  <Icon size={26} style={{ color: trade.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {trade.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{trade.count} profesionales</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
