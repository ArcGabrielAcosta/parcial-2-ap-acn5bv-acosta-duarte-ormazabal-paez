import { ArrowLeft, Star, MapPin, Clock, Briefcase, BadgeCheck, Users, Award, MessageCircle, FileText, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { professionals } from "../data/mockData";
import { useState } from "react";

interface ProfessionalProfileProps {
  professionalId: number;
  onBack: () => void;
  onMessage: () => void;
  onQuotes: () => void;
}

export function ProfessionalProfile({ professionalId, onBack, onMessage, onQuotes }: ProfessionalProfileProps) {
  const pro = professionals.find(p => p.id === professionalId) || professionals[0];
  const [activeTab, setActiveTab] = useState<"info" | "portfolio" | "reviews">("info");
  const [photoIdx, setPhotoIdx] = useState(0);

  const stats = [
    { label: "Trabajos completados", value: pro.completedJobs, icon: Briefcase },
    { label: "Calificación promedio", value: pro.rating, icon: Star },
    { label: "Tiempo de respuesta", value: pro.responseTime, icon: Clock },
    { label: "Clientes recurrentes", value: `${pro.repeatClients}%`, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=400&fit=crop&auto=format"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 text-sm font-medium">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-16">
        {/* Profile card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative shrink-0">
              <img src={pro.avatar} alt={pro.name} className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg" />
              {pro.verified && (
                <div className="absolute -bottom-2 -right-2 bg-[#2563EB] rounded-full p-1">
                  <BadgeCheck size={18} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>{pro.name}</h1>
                    {pro.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${pro.badge === "Top Profesional" ? "bg-orange-100 text-[#F97316]" : pro.badge === "Premium" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-[#2563EB]"}`}>
                        {pro.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[#2563EB] font-semibold mt-0.5">{pro.trade}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.floor(pro.rating) ? "#F97316" : "none"} className={i <= Math.floor(pro.rating) ? "text-[#F97316]" : "text-slate-300"} />)}
                      <span className="text-sm font-bold text-slate-700">{pro.rating}</span>
                      <span className="text-sm text-slate-400">({pro.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={13} /> {pro.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Precio estimado</p>
                  <p className="font-black text-[#0F172A] text-lg" style={{ fontFamily: "var(--font-display)" }}>{pro.price}</p>
                  <p className="text-xs text-slate-400">por trabajo</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100">
            <button onClick={onMessage} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              <MessageCircle size={16} /> Contactar
            </button>
            <button onClick={onQuotes} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-xl hover:bg-blue-50 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              <FileText size={16} /> Solicitar presupuesto
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
              <Calendar size={16} /> Agendar visita
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
              <Icon size={18} className="text-[#2563EB] mx-auto mb-2" />
              <p className="font-black text-[#0F172A] text-xl" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {(["info", "portfolio", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors capitalize ${activeTab === tab ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-blue-50/50" : "text-slate-500 hover:text-slate-700"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tab === "info" ? "Información" : tab === "portfolio" ? "Portfolio" : "Reseñas"}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "info" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-3" style={{ fontFamily: "var(--font-display)" }}>Sobre mí</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{pro.description}</p>
                  <h3 className="font-bold text-[#0F172A] mb-3" style={{ fontFamily: "var(--font-display)" }}>Experiencia</h3>
                  <p className="text-slate-600 text-sm">{pro.experience} años de experiencia profesional</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] mb-3" style={{ fontFamily: "var(--font-display)" }}>Certificaciones</h3>
                  <div className="flex flex-col gap-2">
                    {pro.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                        <Award size={14} className="text-[#2563EB] shrink-0" />
                        <span className="text-sm text-slate-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-100">
                  <img
                    src={pro.portfolio[photoIdx]}
                    alt="Trabajo realizado"
                    className="w-full h-full object-cover"
                  />
                  {pro.portfolio.length > 1 && (
                    <>
                      <button onClick={() => setPhotoIdx(i => (i - 1 + pro.portfolio.length) % pro.portfolio.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setPhotoIdx(i => (i + 1) % pro.portfolio.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-3">
                  {pro.portfolio.map((img, i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === photoIdx ? "border-[#2563EB]" : "border-transparent"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="flex flex-col gap-4">
                {pro.reviews_list.map((review, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {review.author[0]}
                        </div>
                        <span className="font-semibold text-sm text-[#0F172A]">{review.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= review.rating ? "#F97316" : "none"} className={s <= review.rating ? "text-[#F97316]" : "text-slate-300"} />)}
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
