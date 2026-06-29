import { useState } from "react";
import { Home, ClipboardList, Heart, MessageCircle, FileText, Settings, Bell, Search, Star, MapPin, ChevronRight, Clock, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";
import { userRequests, professionals } from "../data/mockData";

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  onViewProfile: (id: number) => void;
}

const sidebarLinks = [
  { label: "Inicio", icon: Home, page: "home" },
  { label: "Mis solicitudes", icon: ClipboardList, page: "requests" },
  { label: "Favoritos", icon: Heart, page: "favorites" },
  { label: "Mensajes", icon: MessageCircle, page: "messages", badge: 2 },
  { label: "Presupuestos", icon: FileText, page: "quotes" },
  { label: "Pagos", icon: CreditCard, page: "payments" },
  { label: "Configuración", icon: Settings, page: "settings" },
];

const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  "En progreso": { bg: "bg-blue-100", text: "text-[#2563EB]", icon: Clock },
  "Presupuesto recibido": { bg: "bg-amber-100", text: "text-amber-700", icon: AlertCircle },
  "Completado": { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

export function UserDashboard({ onNavigate, onViewProfile }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className={`${mobileSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0F172A] flex flex-col z-50 transition-transform duration-300`}>
        <div className="p-6 flex items-center gap-2 border-b border-white/5">
          <img src={tradieLogoSrc} alt="TRADIE" className="h-7 w-auto object-contain brightness-0 invert" />
          <span className="text-lg text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>Tradie</span>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" alt="Usuario" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">Florencia M.</p>
              <p className="text-xs text-slate-400">Usuario Premium</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map(({ label, icon: Icon, page, badge }) => (
            <button
              key={page}
              onClick={() => { setActiveSection(page); setMobileSidebar(false); if (page === "messages") onNavigate("messaging"); if (page === "quotes") onNavigate("quotes"); if (page === "payments") onNavigate("payments"); }}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === page ? "bg-[#2563EB] text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                {label}
              </div>
              {badge && <span className="bg-[#F97316] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{badge}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => onNavigate("landing")} className="w-full px-3 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors text-left">
            ← Volver al inicio
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {mobileSidebar && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebar(false)} />}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 z-30 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileSidebar(true)}>
              <Home size={18} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2 w-60 hidden sm:flex">
              <Search size={14} className="text-slate-400" />
              <input type="text" placeholder="Buscar..." className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={18} className="text-slate-600" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
            </button>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800 }} className="text-[#0F172A] mb-1">
              ¡Buen día, Florencia! 👋
            </h1>
            <p className="text-slate-500">Acá tenés el resumen de tu actividad.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Requests */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Solicitudes recientes</h2>
                <button className="text-xs text-[#2563EB] font-semibold flex items-center gap-1">Ver todas <ChevronRight size={12} /></button>
              </div>
              <div className="divide-y divide-slate-50">
                {userRequests.map((req) => {
                  const status = statusColors[req.status] || statusColors["En progreso"];
                  const StatusIcon = status.icon;
                  return (
                    <div key={req.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-[#0F172A]">{req.service}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                            <StatusIcon size={10} />
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{req.description}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{req.professional} · {req.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-[#0F172A]">{req.budget}</p>
                        <p className="text-xs text-slate-400">estimado</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Mis favoritos</h2>
                <Heart size={14} className="text-[#F97316]" fill="#F97316" />
              </div>
              <div className="divide-y divide-slate-50">
                {professionals.slice(0, 4).map((pro) => (
                  <button key={pro.id} onClick={() => onViewProfile(pro.id)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left">
                    <img src={pro.avatar} alt={pro.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] truncate">{pro.name}</p>
                      <p className="text-xs text-slate-400">{pro.trade}</p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Star size={10} fill="#F97316" className="text-[#F97316]" />
                      <span className="text-xs font-semibold text-slate-600">{pro.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pagos acceso rápido */}
          <div className="mt-6 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center shrink-0">
                <CreditCard size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Gestión de Pagos</p>
                <p className="text-slate-400 text-xs">Pagá servicios, descargá comprobantes y solicitá reembolsos</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("payments")}
              className="shrink-0 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Ir a Pagos →
            </button>
          </div>

          {/* Recent activity */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-[#0F172A] mb-4" style={{ fontFamily: "var(--font-display)" }}>Actividad reciente</h2>
            <div className="flex flex-col gap-3">
              {[
                { text: "Juan Pérez aceptó tu solicitud de electricidad", time: "Hace 2 horas", color: "#2563EB" },
                { text: "Recibiste un presupuesto de Martín Gómez", time: "Hace 5 horas", color: "#F97316" },
                { text: "Lucas Martínez completó el trabajo de pintura", time: "Hace 2 días", color: "#22C55E" },
                { text: "Nueva calificación: Martín Gómez te dio 5 estrellas", time: "Hace 3 días", color: "#EAB308" },
              ].map(({ text, time, color }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <p className="flex-1 text-sm text-slate-600">{text}</p>
                  <p className="text-xs text-slate-400 shrink-0">{time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
