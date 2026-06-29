import { Search, MapPin, Shield, Star, Users } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onSearch: () => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0F172A]">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&h=900&fit=crop&auto=format')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A]/95 to-[#1E3A8A]/80" />
        {/* Decorative orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#2563EB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-[#F97316]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/3 w-[300px] h-[300px] bg-[#2563EB]/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: content */}
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 border border-[#2563EB]/30 rounded-full px-4 py-2 w-fit">
            <Shield size={14} className="text-[#F97316]" />
            <span className="text-xs font-semibold text-[#93C5FD] uppercase tracking-wider">Profesionales verificados</span>
          </div>

          <div>
            <h1
              className="text-white leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}
            >
              Encontrá el{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">
                profesional ideal
              </span>{" "}
              para cualquier trabajo
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
              Electricistas, plomeros, albañiles, pintores y más — verificados y listos para ayudarte en todo Buenos Aires.
            </p>
          </div>

          {/* Search box */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="¿Qué servicio necesitás?"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
              <MapPin size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="¿Dónde lo necesitás?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>
            <button
              onClick={onSearch}
              className="px-6 py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Buscar Profesionales
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { icon: Users, value: "12.000+", label: "Profesionales" },
              { icon: Star, value: "4.8", label: "Calificación promedio" },
              { icon: Shield, value: "98%", label: "Satisfacción" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-[#F97316]" />
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
                  <div className="text-slate-400 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: visual cards */}
        <div className="hidden lg:block relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Main image */}
            <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=600&fit=crop&auto=format"
                alt="Profesional trabajando"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
            </div>

            {/* Floating card: rating */}
            <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-48">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Juan" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Juan Pérez</p>
                <p className="text-xs text-slate-500">Electricista</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#F97316" className="text-[#F97316]" />)}
                  <span className="text-xs text-slate-600 font-semibold">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating card: job done */}
            <div className="absolute bottom-12 -left-4 bg-white rounded-2xl shadow-xl p-4 w-44">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-xs font-bold text-slate-800">Trabajo finalizado</span>
              </div>
              <p className="text-xs text-slate-500">Instalación eléctrica</p>
              <p className="text-xs font-semibold text-green-600 mt-1">Calificación: ★ 5.0</p>
            </div>

            {/* Floating card: response */}
            <div className="absolute bottom-4 right-4 bg-[#2563EB] rounded-2xl shadow-xl p-4 w-40">
              <p className="text-xs font-bold text-white">Respuesta rápida</p>
              <p className="text-2xl font-black text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>15 min</p>
              <p className="text-xs text-blue-200">tiempo promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80H1440V20C1200 60 800 0 480 40C200 70 0 20 0 20V80Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </section>
  );
}
