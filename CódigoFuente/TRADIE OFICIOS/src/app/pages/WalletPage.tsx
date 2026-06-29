import { useState } from "react";
import {
  ArrowLeft, Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine,
  CheckCircle, Clock, Eye, EyeOff, CreditCard, Building2,
  Smartphone, ChevronRight, ShieldCheck, Bell, CircleDollarSign,
  RotateCcw, Info, FileText
} from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";
import formasPagoImg from "@/imports/formas-pago-3.png";

interface WalletPageProps {
  onBack: () => void;
  onInvoices?: () => void;
}

type Screen = "home" | "withdraw" | "withdraw-success";
type WithdrawMethod = "bank" | "mercadopago" | null;

const movements = [
  { id: 1, type: "income", desc: "Instalación tablero trifásico", client: "Florencia M.", date: "8 Jun 2026", amount: 17787, status: "Acreditado" },
  { id: 2, type: "income", desc: "Reparación tomacorriente", client: "Rodrigo P.", date: "5 Jun 2026", amount: 3500, status: "Acreditado" },
  { id: 3, type: "withdraw", desc: "Retiro a cuenta bancaria", client: "Banco Galicia •••1234", date: "3 Jun 2026", amount: 15000, status: "Procesado" },
  { id: 4, type: "income", desc: "Instalación luces LED", client: "Laura S.", date: "1 Jun 2026", amount: 5200, status: "Acreditado" },
  { id: 5, type: "income", desc: "Certificación eléctrica", client: "Jorge B.", date: "28 May 2026", amount: 4800, status: "Pendiente" },
  { id: 6, type: "refund", desc: "Reembolso solicitado", client: "Carlos M.", date: "25 May 2026", amount: 2100, status: "En revisión" },
];

const fmt = (n: number) => "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });

const statusStyle: Record<string, string> = {
  "Acreditado": "bg-green-100 text-green-700",
  "Procesado": "bg-slate-100 text-slate-600",
  "Pendiente": "bg-amber-100 text-amber-700",
  "En revisión": "bg-blue-100 text-blue-700",
};

export function WalletPage({ onBack, onInvoices }: WalletPageProps) {
  const [screen, setScreen] = useState<Screen>("home");
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawMethod, setWithdrawMethod] = useState<WithdrawMethod>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [alias, setAlias] = useState("");
  const [processing, setProcessing] = useState(false);

  const balance = 16287;
  const pending = 4800;
  const monthTotal = 31287;

  const handleWithdraw = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setScreen("withdraw-success"); }, 1800);
  };

  /* ── SUCCESS ── */
  if (screen === "withdraw-success") return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl text-[#0F172A] mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>
          ¡Retiro solicitado!
        </h2>
        <p className="text-slate-500 mb-2 leading-relaxed">
          Tu retiro de <strong className="text-[#0F172A]">{fmt(Number(withdrawAmount) || 0)}</strong> fue procesado correctamente.
        </p>
        <p className="text-xs text-slate-400 mb-8">El dinero se acreditará en tu cuenta en 1–2 días hábiles.</p>
        <button onClick={() => { setScreen("home"); setWithdrawAmount(""); setWithdrawMethod(null); setAlias(""); }}
          className="w-full py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-[#1E293B] transition-colors"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Volver a mi billetera
        </button>
      </div>
    </div>
  );

  /* ── WITHDRAW ── */
  if (screen === "withdraw") return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Retirar dinero
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Balance disponible */}
        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A8A] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs mb-1">Saldo disponible</p>
            <p className="text-white font-black text-2xl" style={{ fontFamily: "'Nunito', sans-serif" }}>{fmt(balance)}</p>
          </div>
          <Wallet size={28} className="text-[#F97316]" />
        </div>

        {/* Monto */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <label className="block text-sm font-semibold text-[#0F172A] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            ¿Cuánto querés retirar?
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
              placeholder="0"
              max={balance}
              className="w-full border border-slate-200 rounded-xl pl-8 pr-4 py-3.5 text-lg font-bold text-[#0F172A] outline-none focus:border-[#2563EB] transition-colors"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
          </div>
          <div className="flex gap-2 mt-3">
            {[5000, 10000, 15000].map(v => (
              <button key={v} onClick={() => setWithdrawAmount(String(v))}
                className="flex-1 py-2 text-xs font-semibold border border-slate-200 rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                {fmt(v)}
              </button>
            ))}
            <button onClick={() => setWithdrawAmount(String(balance))}
              className="flex-1 py-2 text-xs font-semibold border border-slate-200 rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
              Todo
            </button>
          </div>
        </div>

        {/* Método de retiro */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="font-semibold text-sm text-[#0F172A] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Destino del retiro
          </p>
          <div className="flex flex-col gap-3">
            {[
              { id: "bank" as WithdrawMethod, label: "Transferencia bancaria", sub: "CBU / CVU / Alias", icon: Building2, color: "#0F172A" },
              { id: "mercadopago" as WithdrawMethod, label: "MercadoPago", sub: "Cuenta de MercadoPago", icon: Smartphone, color: "#009EE3" },
            ].map(({ id, label, sub, icon: Icon, color }) => (
              <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${withdrawMethod === id ? "border-[#2563EB] bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}>
                <input type="radio" className="sr-only" checked={withdrawMethod === id} onChange={() => setWithdrawMethod(id)} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${withdrawMethod === id ? "border-[#2563EB]" : "border-slate-300"}`}>
                  {withdrawMethod === id && <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />}
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </label>
            ))}
          </div>

          {withdrawMethod && (
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                {withdrawMethod === "bank" ? "CBU / CVU / Alias" : "Alias o email de MercadoPago"}
              </label>
              <input
                value={alias}
                onChange={e => setAlias(e.target.value)}
                placeholder={withdrawMethod === "bank" ? "Ej: juan.perez.galicia" : "Ej: juan@gmail.com"}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl p-4">
          <Info size={14} className="shrink-0 mt-0.5" />
          Los retiros se procesan en 1–2 días hábiles. Sin comisión para retiros mayores a $5.000.
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!withdrawMethod || !withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > balance || !alias || processing}
          className="w-full py-4 text-white font-black rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
          }}
        >
          {processing
            ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</>
            : <><ArrowUpFromLine size={16} /> Retirar {withdrawAmount ? fmt(Number(withdrawAmount)) : ""}</>
          }
        </button>
      </div>
    </div>
  );

  /* ── HOME ── */
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Mi Billetera
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* Balance card */}
        <div className="relative bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E3A8A] rounded-3xl p-7 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316]/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={tradieLogoSrc} alt="Tradie" className="h-6 w-6 object-contain" style={{ mixBlendMode: "multiply" }} />
                  <span className="text-slate-400 text-xs font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>TRADIE Wallet</span>
                </div>
                <p className="text-slate-400 text-sm mt-3">Saldo disponible</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-white font-black" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "2.4rem" }}>
                    {showBalance ? fmt(balance) : "$ ••••••"}
                  </p>
                  <button onClick={() => setShowBalance(s => !s)} className="text-slate-400 hover:text-white transition-colors">
                    {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#F97316] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <Wallet size={22} className="text-white" />
              </div>
            </div>

            {/* Sub-stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/8 rounded-2xl p-4">
                <p className="text-slate-400 text-xs mb-1">Pendiente de cobro</p>
                <p className="text-amber-400 font-black text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {showBalance ? fmt(pending) : "$ •••"}
                </p>
              </div>
              <div className="bg-white/8 rounded-2xl p-4">
                <p className="text-slate-400 text-xs mb-1">Cobrado este mes</p>
                <p className="text-green-400 font-black text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {showBalance ? fmt(monthTotal) : "$ •••"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setScreen("withdraw")}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                <ArrowUpFromLine size={15} /> Retirar dinero
              </button>
              <button onClick={onInvoices} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all text-sm border border-white/20">
                <FileText size={15} /> Mis facturas
              </button>
            </div>
          </div>
        </div>

        {/* Medios de cobro */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="bg-[#0F172A] px-5 py-4">
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Medios de cobro aceptados</p>
            <p className="text-slate-400 text-xs mt-0.5">Recibí pagos de tus clientes por cualquier método</p>
          </div>
          <div className="flex justify-center p-5">
            <img src={formasPagoImg} alt="Medios de pago aceptados" className="w-full max-w-lg object-contain" />
          </div>
        </div>

        {/* Movimientos */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Movimientos</h2>
            <button className="text-xs text-[#2563EB] font-semibold flex items-center gap-1">
              Ver todos <ChevronRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {movements.map((m) => {
              const isIncome = m.type === "income";
              const isRefund = m.type === "refund";
              return (
                <div key={m.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-green-100" : isRefund ? "bg-blue-100" : "bg-slate-100"}`}>
                    {isIncome
                      ? <ArrowDownToLine size={16} className="text-green-600" />
                      : isRefund
                      ? <RotateCcw size={16} className="text-[#2563EB]" />
                      : <ArrowUpFromLine size={16} className="text-slate-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">{m.desc}</p>
                    <p className="text-xs text-slate-400">{m.client} · {m.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-sm ${isIncome ? "text-green-600" : isRefund ? "text-[#2563EB]" : "text-slate-600"}`}
                      style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {isIncome ? "+" : "-"}{fmt(m.amount)}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[m.status]}`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Política de pagos */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="bg-[#0F172A] px-5 py-4 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#F97316]" />
            <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>¿Cómo recibo mis pagos?</p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {[
              { icon: CircleDollarSign, color: "#F97316", bg: "bg-orange-50", title: "Cobro al finalizar el trabajo", desc: "Una vez que el cliente confirme que el trabajo fue realizado correctamente, el monto se acredita automáticamente en tu billetera Tradie." },
              { icon: Wallet, color: "#2563EB", bg: "bg-blue-50", title: "Retirá cuando quieras", desc: "Podés retirar tu saldo a tu cuenta bancaria o MercadoPago en cualquier momento. El dinero llega en 1–2 días hábiles sin costo para retiros mayores a $5.000." },
              { icon: Bell, color: "#22C55E", bg: "bg-green-50", title: "Notificaciones de cobro", desc: "Te avisamos por mail y en la app cada vez que recibís un pago, cuando hay un retiro procesado o si existe alguna consulta sobre un reembolso." },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A] mb-0.5">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
