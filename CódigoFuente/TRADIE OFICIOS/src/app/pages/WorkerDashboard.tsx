import { useState } from "react";
import { Home, Calendar, Users, FileText, Clock, Star, TrendingUp, Bell, ChevronRight, CheckCircle, AlertCircle, DollarSign, Briefcase, MessageCircle, Settings, Wallet } from "lucide-react";

import tradieLogoSrc from "@/imports/logo.png";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface WorkerDashboardProps {
  onNavigate: (page: string) => void;
}

const sidebarLinks = [
  { label: "Resumen", icon: Home, page: "home" },
  { label: "Agenda", icon: Calendar, page: "agenda" },
  { label: "Clientes", icon: Users, page: "clients" },
  { label: "Presupuestos", icon: FileText, page: "quotes" },
  { label: "Mensajes", icon: MessageCircle, page: "messages", badge: 4 },
  { label: "Mi Billetera", icon: Wallet, page: "wallet" },
  { label: "Facturas", icon: FileText, page: "invoices" },
  { label: "Historial", icon: Briefcase, page: "history" },
  { label: "Configuración", icon: Settings, page: "settings" },
];

const chartData = [
  { name: "Ene", ingresos: 42000 },
  { name: "Feb", ingresos: 38000 },
  { name: "Mar", ingresos: 55000 },
  { name: "Abr", ingresos: 61000 },
  { name: "May", ingresos: 48000 },
  { name: "Jun", ingresos: 73000 },
];

const newRequests = [
  { id: 1, client: "Florencia M.", service: "Instalación tablero trifásico", location: "Palermo", date: "Mañana 10:00", budget: "$17.000", priority: "Alta" },
  { id: 2, client: "Rodrigo P.", service: "Reparación toma corriente", location: "Belgrano", date: "Jue 15:00", budget: "$3.500", priority: "Media" },
  { id: 3, client: "Laura S.", service: "Instalación luces LED cocina", location: "Caballito", date: "Vie 9:00", budget: "$5.200", priority: "Baja" },
];

const upcomingJobs = [
  { client: "Carlos M.", service: "Tablero eléctrico", time: "Hoy 14:00", status: "Confirmado" },
  { client: "Ana R.", service: "Colocación enchufes", time: "Mañana 9:30", status: "Pendiente" },
  { client: "Jorge B.", service: "Certificación eléctrica", time: "Jue 11:00", status: "Confirmado" },
];

export function WorkerDashboard({ onNavigate }: WorkerDashboardProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className={`${mobileSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0F172A] flex flex-col z-50 transition-transform duration-300`}>
        <div className="p-6 flex items-center gap-2 border-b border-white/5">
          <img src={tradieLogoSrc} alt="TRADIE" className="h-7 w-auto object-contain brightness-0 invert" />
          <span className="text-lg text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>Tradie Pro</span>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Juan" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">Juan Pérez</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <p className="text-xs text-slate-400">Disponible</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {sidebarLinks.map(({ label, icon: Icon, page, badge }) => (
            <button
              key={page}
              onClick={() => { setActiveSection(page); setMobileSidebar(false); if (page === "messages") onNavigate("messaging"); if (page === "quotes") onNavigate("quotes"); if (page === "wallet") onNavigate("wallet"); if (page === "invoices") onNavigate("invoices"); }}
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
            ← Salir al inicio
          </button>
        </div>
      </aside>

      {mobileSidebar && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileSidebar(false)} />}

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-100 z-30 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobileSidebar(true)}>
              <Home size={18} className="text-slate-600" />
            </button>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }} className="text-[#0F172A] text-lg">Panel del Profesional</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={18} className="text-slate-600" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
            </button>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Juan" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800 }} className="text-[#0F172A] mb-1">
              ¡Hola, Juan! 👷
            </h2>
            <p className="text-slate-500">Tenés <span className="font-semibold text-[#2563EB]">3 solicitudes nuevas</span> esperando respuesta.</p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Solicitudes nuevas", value: "3", trend: "+2 hoy", icon: AlertCircle, color: "#F97316", bg: "bg-orange-50" },
              { label: "Trabajos en curso", value: "4", trend: "2 hoy", icon: Clock, color: "#2563EB", bg: "bg-blue-50" },
              { label: "Ingresos del mes", value: "$73.500", trend: "+18%", icon: DollarSign, color: "#22C55E", bg: "bg-green-50" },
              { label: "Calificación", value: "4.9 ★", trend: "127 reseñas", icon: Star, color: "#EAB308", bg: "bg-yellow-50" },
            ].map(({ label, value, trend, icon: Icon, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-5`}>
                <div className="flex items-start justify-between mb-3">
                  <Icon size={16} style={{ color }} />
                  <span className="text-xs font-semibold" style={{ color }}>{trend}</span>
                </div>
                <p className="text-2xl font-black text-[#0F172A] mb-1" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          {/* Billetera banner */}
          <div className="mb-6 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <Wallet size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Mi Billetera</p>
                <p className="text-slate-400 text-xs">Saldo disponible: <span className="text-white font-bold">$16.287</span> · Retirá cuando quieras</p>
              </div>
            </div>
            <button onClick={() => onNavigate("wallet")}
              className="shrink-0 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Ver billetera →
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Income chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Ingresos 2026</h2>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp size={14} /> +18% vs año anterior
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={32}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Ingresos"]}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
                  />
                  <Bar dataKey="ingresos" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Agenda */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Agenda próxima</h2>
                <button className="text-xs text-[#2563EB] font-semibold flex items-center gap-1">Ver todo <ChevronRight size={12} /></button>
              </div>
              <div className="divide-y divide-slate-50">
                {upcomingJobs.map((job, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar size={16} className="text-[#2563EB]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A]">{job.client}</p>
                      <p className="text-xs text-slate-400">{job.service}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-slate-700">{job.time}</p>
                      <span className={`text-xs font-semibold ${job.status === "Confirmado" ? "text-green-600" : "text-amber-600"}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Requests */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Solicitudes nuevas</h2>
              <span className="bg-orange-100 text-[#F97316] text-xs font-bold px-2 py-0.5 rounded-full">3 sin responder</span>
            </div>
            <div className="divide-y divide-slate-50">
              {newRequests.map((req) => (
                <div key={req.id} className="px-6 py-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[#0F172A]">{req.client}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${req.priority === "Alta" ? "bg-red-100 text-red-600" : req.priority === "Media" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
                        {req.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{req.service}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>📍 {req.location}</span>
                      <span>🗓 {req.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0F172A]">{req.budget}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors">
                        Aceptar
                      </button>
                      <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        Ver detalle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
