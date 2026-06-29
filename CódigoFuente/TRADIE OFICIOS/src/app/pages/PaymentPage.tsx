import { useState } from "react";
import {
  ArrowLeft, CreditCard, Smartphone, ShieldCheck, Clock,
  CheckCircle, AlertCircle, Lock, RotateCcw,
  Receipt, Info, ChevronDown, Mail
} from "lucide-react";
import mediosPagoImg from "@/imports/formas-pago-3.png";

interface PaymentPageProps {
  onBack: () => void;
}

type PaymentMethod = "credit" | "debit" | "mercadopago" | null;
type Screen = "home" | "pay" | "refund" | "success" | "refund-success";

const completedJobs = [
  {
    id: "TRJ-2026-0041",
    professional: "Juan Pérez",
    trade: "Electricista",
    service: "Instalación tablero trifásico",
    date: "8 Jun 2026",
    amount: 17787,
    status: "Pendiente de pago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 4.9,
  },
  {
    id: "TRJ-2026-0038",
    professional: "Martín Gómez",
    trade: "Plomero",
    service: "Reparación pérdida cocina",
    date: "7 Jun 2026",
    amount: 5082,
    status: "Pagado",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    rating: 4.8,
  },
  {
    id: "TRJ-2026-0031",
    professional: "Lucas Martínez",
    trade: "Pintor",
    service: "Pintura interior 3 ambientes",
    date: "1 Jun 2026",
    amount: 21780,
    status: "Reembolsado",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&auto=format",
    rating: null,
  },
];

const refundReasons = [
  "El profesional no se presentó",
  "El trabajo no fue realizado correctamente",
  "El profesional canceló el servicio",
  "El trabajo fue abandonado a mitad",
  "Cobro incorrecto / monto mayor al acordado",
  "Otro motivo",
];

const fmt = (n: number) =>
  "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 2 });

export function PaymentPage({ onBack }: PaymentPageProps) {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedJob, setSelectedJob] = useState(completedJobs[0]);
  const [payMethod, setPayMethod] = useState<PaymentMethod>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");
  const [refundReason, setRefundReason] = useState("");
  const [refundDetail, setRefundDetail] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setScreen("success"); }, 1800);
  };

  const handleRefund = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setScreen("refund-success"); }, 1800);
  };

  const statusStyle: Record<string, string> = {
    "Pendiente de pago": "bg-amber-100 text-amber-700",
    "Pagado": "bg-green-100 text-green-700",
    "Reembolsado": "bg-blue-100 text-blue-700",
  };

  /* ── SUCCESS ── */
  if (screen === "success") return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl text-[#0F172A] mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>
          ¡Pago exitoso!
        </h2>
        <p className="text-slate-500 mb-2">Tu pago fue procesado correctamente.</p>
        <p className="text-3xl font-black text-[#0F172A] mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {fmt(selectedJob.amount)}
        </p>
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <img src={selectedJob.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
            <div>
              <p className="font-bold text-sm text-[#0F172A]">{selectedJob.professional}</p>
              <p className="text-xs text-slate-400">{selectedJob.service}</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>N° transacción</span>
            <span className="font-mono font-semibold">TXN-{Math.random().toString(36).slice(2,10).toUpperCase()}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-6">Recibirás un comprobante por email</p>
        <button onClick={onBack} className="w-full py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-[#1E293B] transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Volver al inicio
        </button>
      </div>
    </div>
  );

  if (screen === "refund-success") return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <RotateCcw size={36} className="text-[#2563EB]" />
        </div>
        <h2 className="text-2xl text-[#0F172A] mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>
          Reembolso solicitado
        </h2>
        <p className="text-slate-500 mb-6 leading-relaxed">
          Recibimos tu solicitud. El equipo de Tradie la revisará en un plazo de <strong>48 horas hábiles</strong>. El monto se acreditará en tu medio de pago original.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-left flex gap-3">
          <Info size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600">El reembolso puede demorar entre 5 y 10 días hábiles en reflejarse según tu banco o medio de pago.</p>
        </div>
        <button onClick={onBack} className="w-full py-3 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-[#1D4ED8] transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Entendido
        </button>
      </div>
    </div>
  );

  /* ── REFUND SCREEN ── */
  if (screen === "refund") return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Solicitar reembolso
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Job card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 flex items-center gap-4">
          <img src={selectedJob.avatar} className="w-14 h-14 rounded-2xl object-cover shrink-0" alt="" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>{selectedJob.professional}</p>
            <p className="text-sm text-slate-500 truncate">{selectedJob.service}</p>
            <p className="text-xs text-slate-400">{selectedJob.date}</p>
          </div>
          <p className="font-black text-lg text-[#0F172A] shrink-0" style={{ fontFamily: "'Nunito', sans-serif" }}>{fmt(selectedJob.amount)}</p>
        </div>

        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Antes de solicitar el reembolso</p>
            <p className="text-xs text-amber-700 mt-1">Te recomendamos primero contactar al profesional para resolver el inconveniente. Si no obtenés respuesta, procedé con la solicitud.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-5">
          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Motivo del reembolso *</label>
            <div className="flex flex-col gap-2">
              {refundReasons.map((r) => (
                <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${refundReason === r ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${refundReason === r ? "border-[#2563EB]" : "border-slate-300"}`}>
                    {refundReason === r && <div className="w-2 h-2 rounded-full bg-[#2563EB]" />}
                  </div>
                  <input type="radio" className="sr-only" checked={refundReason === r} onChange={() => setRefundReason(r)} />
                  <span className="text-sm text-slate-700">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">Detalle adicional</label>
            <textarea
              value={refundDetail}
              onChange={e => setRefundDetail(e.target.value)}
              placeholder="Describí brevemente qué ocurrió..."
              rows={4}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#2563EB] resize-none transition-colors"
            />
          </div>

          {/* Refund amount */}
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex justify-between text-sm text-slate-500 mb-1">
              <span>Monto pagado</span><span>{fmt(selectedJob.amount)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#0F172A]">
              <span>Reembolso estimado</span>
              <span className="text-[#2563EB]">{fmt(selectedJob.amount)}</span>
            </div>
          </div>

          <button
            onClick={handleRefund}
            disabled={!refundReason || processing}
            className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}
          >
            {processing ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</>
            ) : (
              <><RotateCcw size={16} /> Solicitar reembolso</>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── PAY SCREEN ── */
  if (screen === "pay") return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={() => setScreen("home")} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Realizar pago
        </h1>
        <div className="ml-auto flex items-center gap-1 text-xs text-slate-400">
          <Lock size={12} /> Pago seguro
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">
        {/* Job summary */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
          <img src={selectedJob.avatar} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-[#0F172A]">{selectedJob.professional}</p>
            <p className="text-xs text-slate-500 truncate">{selectedJob.service}</p>
          </div>
          <p className="font-black text-xl text-[#0F172A]" style={{ fontFamily: "'Nunito', sans-serif" }}>{fmt(selectedJob.amount)}</p>
        </div>

        {/* Method selector */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <p className="font-bold text-sm text-[#0F172A] mb-4" style={{ fontFamily: "var(--font-display)" }}>Método de pago</p>
          <div className="flex flex-col gap-3">
            {[
              { id: "credit" as PaymentMethod, label: "Tarjeta de crédito", sub: "Visa, Mastercard, AMEX", icon: "💳", cuotas: true },
              { id: "debit" as PaymentMethod, label: "Tarjeta de débito", sub: "Visa Débito, Maestro", icon: "🏦", cuotas: false },
              { id: "mercadopago" as PaymentMethod, label: "MercadoPago", sub: "Saldo, QR o link de pago", icon: "🔵", cuotas: false },
            ].map(({ id, label, sub, icon }) => (
              <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === id ? "border-[#2563EB] bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}>
                <input type="radio" className="sr-only" checked={payMethod === id} onChange={() => setPayMethod(id)} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${payMethod === id ? "border-[#2563EB]" : "border-slate-300"}`}>
                  {payMethod === id && <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />}
                </div>
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{label}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
                {payMethod === id && <CheckCircle size={16} className="text-[#2563EB] shrink-0" />}
              </label>
            ))}
          </div>
        </div>

        {/* Card form */}
        {(payMethod === "credit" || payMethod === "debit") && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4">
            <p className="font-bold text-sm text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>
              Datos de la tarjeta
            </p>

            {/* Visual card */}
            <div className="relative h-44 rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  {payMethod === "credit" ? "Crédito" : "Débito"}
                </div>
                <div className="flex gap-1">
                  <div className="w-7 h-7 rounded-full bg-red-500 opacity-80" />
                  <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-80 -ml-3" />
                </div>
              </div>
              <div className="absolute top-14 left-5 right-5">
                <p className="text-white font-mono text-lg tracking-widest">
                  {cardNumber || "•••• •••• •••• ••••"}
                </p>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between">
                <div>
                  <p className="text-white/50 text-xs">TITULAR</p>
                  <p className="text-white text-sm font-semibold">{cardName || "NOMBRE APELLIDO"}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-xs">VENCE</p>
                  <p className="text-white text-sm font-semibold">{cardExpiry || "MM/AA"}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Número de tarjeta</label>
              <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="0000 0000 0000 0000" maxLength={19}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#2563EB] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nombre del titular</label>
              <input value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="COMO FIGURA EN LA TARJETA"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Vencimiento</label>
                <input value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/AA" maxLength={5}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#2563EB] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">CVV</label>
                <input value={cardCvv} placeholder="•••" type="password" maxLength={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" onChange={e => setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))} />
              </div>
            </div>


            {payMethod === "credit" && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Cuotas</label>
                <div className="relative">
                  <select value={installments} onChange={e => setInstallments(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] appearance-none bg-white transition-colors">
                    <option value="1">1 cuota de {fmt(selectedJob.amount)} (sin interés)</option>
                    <option value="3">3 cuotas de {fmt(Math.ceil(selectedJob.amount * 1.05 / 3))} (+5%)</option>
                    <option value="6">6 cuotas de {fmt(Math.ceil(selectedJob.amount * 1.12 / 6))} (+12%)</option>
                    <option value="12">12 cuotas de {fmt(Math.ceil(selectedJob.amount * 1.22 / 12))} (+22%)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* MercadoPago */}
        {payMethod === "mercadopago" && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#009EE3]/10 flex items-center justify-center mx-auto mb-3">
              <Smartphone size={28} className="text-[#009EE3]" />
            </div>
            <p className="font-bold text-[#0F172A] mb-1" style={{ fontFamily: "var(--font-display)" }}>MercadoPago</p>
            <p className="text-sm text-slate-500 mb-4">Al confirmar serás redirigido a MercadoPago para completar el pago de forma segura.</p>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
              Podés pagar con saldo en cuenta, tarjetas, QR o link de pago
            </div>
          </div>
        )}

        {/* Security */}
        <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
          <ShieldCheck size={14} className="text-green-500" />
          Pago 256-bit SSL encriptado · Datos protegidos
        </div>

        {/* Total + pay button */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex justify-between text-sm text-slate-500 mb-1">
            <span>Subtotal</span><span>{fmt(selectedJob.amount / 1.21)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500 mb-3">
            <span>IVA (21%)</span><span>{fmt(selectedJob.amount - selectedJob.amount / 1.21)}</span>
          </div>
          <div className="flex justify-between font-black text-[#0F172A] text-lg border-t border-slate-100 pt-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <span>Total</span><span>{fmt(selectedJob.amount)}</span>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={!payMethod || processing}
          className="w-full py-4 text-white font-black rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base shadow-lg"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: payMethod ? "linear-gradient(135deg, #F97316, #EA6C0A)" : "#94A3B8",
            boxShadow: payMethod ? "0 8px 24px rgba(249,115,22,0.35)" : "none",
          }}
        >
          {processing ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Procesando...</>
          ) : (
            <><Lock size={16} /> Pagar {fmt(selectedJob.amount)}</>
          )}
        </button>
      </div>
    </div>
  );

  /* ── HOME ── */
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <div>
          <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            Gestión de Pagos
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">

        {/* Methods banner con imagen real */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="bg-[#0F172A] px-6 py-4">
            <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Medios de pago aceptados</p>
            <p className="text-slate-400 text-xs mt-0.5">Pagá de forma segura con cualquier método</p>
          </div>
          <div className="flex justify-center p-6 bg-white">
            <img
              src={mediosPagoImg}
              alt="Medios de pago: MercadoPago, Visa, MasterCard, AMEX, CABAL, Banelco, Link, Rapipago, Pago Fácil, Transferencia Bancaria"
              className="w-full max-w-lg object-contain"
            />
          </div>
        </div>

        {/* Jobs list */}
        <div>
          <h2 className="font-bold text-[#0F172A] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            Trabajos y pagos
          </h2>
          <div className="flex flex-col gap-4">
            {completedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <img src={job.avatar} className="w-14 h-14 rounded-2xl object-cover shrink-0" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <div>
                        <p className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>{job.professional}</p>
                        <p className="text-xs text-slate-400">{job.trade} · {job.date}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{job.service}</p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <p className="font-black text-xl text-[#0F172A]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {fmt(job.amount)}
                      </p>
                      <div className="flex gap-2">
                        {job.status === "Pendiente de pago" && (
                          <button
                            onClick={() => { setSelectedJob(job); setScreen("pay"); }}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold rounded-xl transition-colors"
                            style={{ fontFamily: "'Nunito', sans-serif" }}
                          >
                            <CreditCard size={14} /> Pagar ahora
                          </button>
                        )}
                        {job.status === "Pagado" && (
                          <>
                            <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                              <Receipt size={14} /> Comprobante
                            </button>
                            <button
                              onClick={() => { setSelectedJob(job); setScreen("refund"); }}
                              className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors"
                            >
                              <RotateCcw size={14} /> Reembolso
                            </button>
                          </>
                        )}
                        {job.status === "Reembolsado" && (
                          <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold bg-blue-50 px-3 py-2 rounded-xl">
                            <CheckCircle size={13} /> Reembolso procesado
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Política de reembolsos actualizada */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
          <div className="bg-[#0F172A] px-6 py-4 flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#F97316]" />
            <p className="text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>Política de reembolsos</p>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                <CreditCard size={15} className="text-[#F97316]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-0.5">Pago al momento del trabajo</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  El pago del servicio se abona en el momento en que el trabajo es realizado, una vez que el cliente confirma que está conforme con el resultado.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <RotateCcw size={15} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-0.5">¿Inconveniente con el servicio?</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  En caso de que surja algún problema con el profesional o el trabajo realizado, desde Tradie nos pondremos en contacto con vos a través de tu correo electrónico registrado para gestionar el reembolso correspondiente.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={15} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-0.5">Contacto por reembolso</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Nuestro equipo se comunicará dentro de las <strong>48 horas hábiles</strong> al mail con el que te registraste. También podés escribirnos directamente a{" "}
                  <span className="text-[#2563EB] font-semibold">reembolsos@tradie.com.ar</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

