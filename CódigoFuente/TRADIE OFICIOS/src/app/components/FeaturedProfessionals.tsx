import { Star, MapPin, Briefcase, ChevronRight, BadgeCheck } from "lucide-react";
import { professionals } from "../data/mockData";

interface FeaturedProfessionalsProps {
  onViewProfile: (id: number) => void;
}

export function FeaturedProfessionals({ onViewProfile }: FeaturedProfessionalsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Destacados</span>
            <h2 className="text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>
              Profesionales mejor valorados
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
            Ver todos <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((pro) => (
            <div
              key={pro.id}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card header */}
              <div className="relative h-32 bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={`https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=200&fit=crop&auto=format`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {pro.badge && (
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                    pro.badge === "Top Profesional"
                      ? "bg-[#F97316] text-white"
                      : pro.badge === "Premium"
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-white/20 text-white border border-white/30"
                  }`}>
                    {pro.badge}
                  </div>
                )}
              </div>

              <div className="px-5 pb-5">
                {/* Avatar */}
                <div className="relative -mt-10 mb-3 flex items-end justify-between">
                  <div className="relative">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                    />
                    {pro.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-[#2563EB] rounded-full p-0.5">
                        <BadgeCheck size={14} className="text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
                    <Star size={12} fill="#F97316" className="text-[#F97316]" />
                    <span className="text-xs font-bold text-amber-900">{pro.rating}</span>
                    <span className="text-xs text-amber-600">({pro.reviews})</span>
                  </div>
                </div>

                <h3 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                  {pro.name}
                </h3>
                <p className="text-sm text-[#2563EB] font-semibold mb-3">{pro.trade}</p>

                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={12} className="text-slate-400" />
                    {pro.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Briefcase size={12} className="text-slate-400" />
                    {pro.jobs} trabajos realizados
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Precio estimado</p>
                    <p className="text-sm font-bold text-[#0F172A]">{pro.price}</p>
                  </div>
                  <button
                    onClick={() => onViewProfile(pro.id)}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-xl transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
