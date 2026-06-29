import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Download, Clock, Star, Eye } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";
import { quotes } from "../data/mockData";

interface QuotesPageProps {
  onBack: () => void;
}

const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  Pendiente: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  Aceptado: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  Rechazado: { bg: "bg-red-100", text: "text-red-600", icon: XCircle },
};

export function QuotesPage({ onBack }: QuotesPageProps) {
  const [selected, setSelected] = useState(quotes[0]);
  const [quoteList, setQuoteList] = useState(quotes);
  const [view, setView] = useState<"list" | "detail">("list");

  const handleAccept = (id: string) => {
    setQuoteList(ql => ql.map(q => q.id === id ? { ...q, status: "Aceptado" } : q));
    setSelected(s => s.id === id ? { ...s, status: "Aceptado" } : s);
  };

  const handleReject = (id: string) => {
    setQuoteList(ql => ql.map(q => q.id === id ? { ...q, status: "Rechazado" } : q));
    setSelected(s => s.id === id ? { ...s, status: "Rechazado" } : s);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
          Presupuestos
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "list" ? (
          <div className="grid md:grid-cols-2 gap-6">
            {quoteList.map((quote) => {
              const status = statusColors[quote.status] || statusColors["Pendiente"];
              const StatusIcon = status.icon;
              return (
                <div key={quote.id} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-200/60 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={quote.avatar} alt={quote.professional} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>{quote.professional}</p>
                        <p className="text-xs text-slate-400">{quote.trade}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                      <StatusIcon size={11} />
                      {quote.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <p className="text-xs text-slate-400 mb-1">Servicio</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{quote.service}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-xs text-slate-400">N° Presupuesto</p>
                        <p className="text-sm font-mono font-bold text-slate-700">{quote.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total</p>
                        <p className="text-xl font-black text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>{quote.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span>Enviado: {quote.date}</span>
                    <span>Válido hasta: {quote.validUntil}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelected(quote); setView("detail"); }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <Eye size={14} /> Ver detalle
                    </button>
                    {quote.status === "Pendiente" && (
                      <>
                        <button onClick={() => handleAccept(quote.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors">
                          <CheckCircle size={14} /> Aceptar
                        </button>
                        <button onClick={() => handleReject(quote.id)} className="px-3 py-2 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors">
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detail view */
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0F172A] mb-6">
              <ArrowLeft size={14} /> Volver a presupuestos
            </button>

            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/50">
              {/* Invoice header */}
              <div className="bg-[#0F172A] px-8 py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <img src={tradieLogoSrc} alt="TRADIE" className="h-8 w-auto object-contain brightness-0 invert" />
                      <span className="text-lg text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>Tradie</span>
                    </div>
                    <p className="text-slate-400 text-sm">Presupuesto de Servicio</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">N°</p>
                    <p className="font-mono text-lg font-bold text-white">{selected.id}</p>
                    <p className="text-xs text-slate-400 mt-1">{selected.date}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Parties */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">De</p>
                    <div className="flex items-center gap-3">
                      <img src={selected.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-[#0F172A]">{selected.professional}</p>
                        <p className="text-xs text-slate-500">{selected.trade}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={10} fill="#F97316" className="text-[#F97316]" />
                          <span className="text-xs text-slate-500">4.9 (127 reseñas)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Para</p>
                    <p className="font-bold text-[#0F172A]">Florencia M.</p>
                    <p className="text-xs text-slate-500">Palermo, Buenos Aires</p>
                    <p className="text-xs text-slate-500">Válido hasta: {selected.validUntil}</p>
                  </div>
                </div>

                {/* Service */}
                <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6">
                  <p className="text-xs text-slate-500 mb-1">Servicio solicitado</p>
                  <p className="font-bold text-[#0F172A]">{selected.service}</p>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                    <span className="col-span-6">Descripción</span>
                    <span className="col-span-2 text-center">Cant.</span>
                    <span className="col-span-2 text-right">Precio</span>
                    <span className="col-span-2 text-right">Total</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {selected.items.map((item, i) => (
                      <div key={i} className="grid grid-cols-12 gap-2 py-3 px-2 text-sm">
                        <span className="col-span-6 text-slate-700">{item.description}</span>
                        <span className="col-span-2 text-center text-slate-500">{item.qty}</span>
                        <span className="col-span-2 text-right text-slate-500">{item.unit}</span>
                        <span className="col-span-2 text-right font-semibold text-[#0F172A]">{item.total}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between text-sm text-slate-500 mb-1">
                    <span>Subtotal</span><span>{selected.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>IVA (21%)</span><span>{selected.iva}</span>
                  </div>
                  <div className="flex justify-between font-black text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                    <span>Total</span><span>{selected.total}</span>
                  </div>
                </div>

                {/* Notes */}
                {selected.notes && (
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Notas</p>
                    <p className="text-sm text-slate-600">{selected.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {selected.status === "Pendiente" && (
                    <>
                      <button onClick={() => handleAccept(selected.id)} className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
                        <CheckCircle size={16} /> Aceptar presupuesto
                      </button>
                      <button onClick={() => handleReject(selected.id)} className="px-5 py-2.5 border border-red-200 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2">
                        <XCircle size={16} /> Rechazar
                      </button>
                    </>
                  )}
                  {selected.status === "Aceptado" && (
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-xl font-semibold text-sm w-full justify-center">
                      <CheckCircle size={16} /> Presupuesto aceptado
                    </div>
                  )}
                  <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                    <Download size={16} /> Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
