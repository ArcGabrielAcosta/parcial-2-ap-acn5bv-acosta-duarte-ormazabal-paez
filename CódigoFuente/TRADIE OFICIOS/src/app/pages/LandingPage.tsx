import { Hero } from "../components/Hero";
import { TradesGrid } from "../components/TradesGrid";
import { FeaturedProfessionals } from "../components/FeaturedProfessionals";
import { HowItWorks } from "../components/HowItWorks";
import { Footer } from "../components/Footer";
import { Star, Shield, Clock, Award, CheckCircle2, ArrowRight } from "lucide-react";
const plomeroImg = "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=1400&h=1050&fit=crop&auto=format&q=90";

const trustBadges = [
  { icon: Shield, title: "Profesionales verificados", desc: "Todos pasan por un proceso de validación de identidad y antecedentes." },
  { icon: Star, title: "Calificaciones reales", desc: "Opiniones de clientes reales para ayudarte a elegir mejor." },
  { icon: Clock, title: "Respuesta rápida", desc: "Tiempo promedio de respuesta: 15 minutos." },
  { icon: Award, title: "Garantía de satisfacción", desc: "Si no estás conforme, te ayudamos a resolverlo." },
];

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onViewProfile: (id: number) => void;
}

export function LandingPage({ onNavigate, onViewProfile }: LandingPageProps) {
  return (
    <div>
      <Hero onSearch={() => onNavigate("professionals")} />

      {/* Trust badges */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-1" style={{ fontFamily: "var(--font-display)" }}>{title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TradesGrid onSelectTrade={() => onNavigate("professionals")} />

      {/* Split section — foto real + propuesta de valor */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[520px]">
          {/* Imagen */}
          <div className="relative min-h-[320px] lg:min-h-0 overflow-hidden">
            <img
              src={plomeroImg}
              alt="Plomero profesional con herramientas de trabajo"
              className="absolute inset-0 w-full h-full object-cover object-left"
            />
            {/* Overlay degradado que une con el lado derecho */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white hidden lg:block" />
            {/* Badge flotante */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={18} className="text-[#F97316]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>100% verificados</p>
                <p className="text-xs text-slate-400">Identidad y antecedentes</p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex items-center px-8 py-14 lg:px-14">
            <div className="max-w-lg">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F97316] mb-4">
                Profesionales reales
              </span>
              <h2
                className="text-[#0F172A] mb-5 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 800 }}
              >
                Cada trabajo merece un profesional de confianza
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                En Tradie conectamos a personas con oficiales calificados, verificados y con trayectoria comprobada. Desde una pérdida de agua hasta una instalación completa — el profesional correcto está a minutos de distancia.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Verificación de identidad y antecedentes",
                  "Calificaciones reales de clientes anteriores",
                  "Presupuesto claro antes de empezar",
                  "Garantía de satisfacción en cada trabajo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-[#22C55E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate("professionals")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ver profesionales disponibles <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProfessionals onViewProfile={onViewProfile} />
      <HowItWorks />

      {/* Testimonials */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F97316] mb-3">Testimonios</span>
            <h2 className="text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Florencia M.", role: "Usuaria desde 2025", text: "Encontré un electricista de confianza en 10 minutos. El proceso fue increíblemente simple y el profesional llegó puntual y hizo un trabajo impecable.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", rating: 5 },
              { name: "Rodrigo P.", role: "Propietario de local", text: "Contraté un albañil para renovar el local. Tradie me mostró perfiles con fotos de trabajos reales, lo que me dio mucha confianza antes de contratar.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", rating: 5 },
              { name: "Valentina G.", role: "Usuaria frecuente", text: "Uso Tradie para todo lo del hogar. Ya contraté plomero, pintor y jardinero. Siempre excelentes resultados y precios claros desde el principio.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F97316" className="text-[#F97316]" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "var(--font-display)" }}>{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="py-16 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800 }}>
            ¿Listo para empezar?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Unite a más de 500.000 usuarios que ya confían en Tradie para sus trabajos del hogar y empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate("user-dashboard")} className="px-8 py-3 bg-white text-[#2563EB] font-bold rounded-xl hover:shadow-xl transition-all" style={{ fontFamily: "var(--font-display)" }}>
              Buscar profesional
            </button>
            <button onClick={() => onNavigate("worker-dashboard")} className="px-8 py-3 bg-[#F97316] text-white font-bold rounded-xl hover:bg-[#EA6C0A] transition-all" style={{ fontFamily: "var(--font-display)" }}>
              Ofrecer mis servicios
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
