import { Search, UserCheck, FileText, ThumbsUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Buscá el oficio",
    description: "Ingresá qué tipo de profesional necesitás y tu ubicación. Te mostramos las mejores opciones disponibles.",
    color: "#2563EB",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Compará perfiles",
    description: "Revisá calificaciones, opiniones, fotos de trabajos anteriores y precios. Elegí con toda la información.",
    color: "#F97316",
  },
  {
    step: "03",
    icon: FileText,
    title: "Solicitá presupuesto",
    description: "Enviá tu solicitud gratis. Los profesionales te mandan su presupuesto y coordinás directo.",
    color: "#22C55E",
  },
  {
    step: "04",
    icon: ThumbsUp,
    title: "Contratá con confianza",
    description: "Pagá de forma segura y dejá tu calificación al finalizar. Tu satisfacción es nuestra prioridad.",
    color: "#8B5CF6",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Proceso simple</span>
          <h2 className="text-white mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>
            ¿Cómo funciona Tradie?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            En 4 simples pasos conectamos tus necesidades con el profesional perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-slate-700 z-0" style={{ width: "calc(100% - 5rem)", left: "calc(50% + 2.5rem)" }} />
                )}
                <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-4xl font-black opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ fontFamily: "var(--font-display)", color: step.color }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-white font-bold mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-8 py-6">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>¿Sos profesional?</p>
              <p className="text-slate-400 text-sm">Registrate gratis y conseguí más clientes.</p>
            </div>
            <button className="px-6 py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-all whitespace-nowrap hover:shadow-lg hover:shadow-orange-500/30" style={{ fontFamily: "var(--font-display)" }}>
              Unirme como profesional
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
