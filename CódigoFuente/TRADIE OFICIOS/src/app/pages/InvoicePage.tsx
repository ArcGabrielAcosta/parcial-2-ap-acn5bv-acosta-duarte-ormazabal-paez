import { useState } from "react";
import {
  ArrowLeft, Plus, Trash2, Download, Eye, FileText,
  CheckCircle, Clock, Send, Printer, X, ChevronDown
} from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";

interface InvoicePageProps {
  onBack: () => void;
}

type Screen = "list" | "create" | "preview";

interface LineItem {
  id: number;
  desc: string;
  qty: number;
  price: number;
}

interface Invoice {
  id: string;
  client: string;
  clientEmail: string;
  service: string;
  date: string;
  dueDate: string;
  items: LineItem[];
  notes: string;
  status: "Borrador" | "Enviada" | "Pagada";
}

const mockInvoices: Invoice[] = [
  {
    id: "FAC-2026-0041",
    client: "Florencia Martínez",
    clientEmail: "florencia@gmail.com",
    service: "Instalación tablero trifásico",
    date: "8 Jun 2026",
    dueDate: "22 Jun 2026",
    items: [
      { id: 1, desc: "Tablero trifásico 24 circuitos", qty: 1, price: 8500 },
      { id: 2, desc: "Mano de obra instalación", qty: 1, price: 4000 },
      { id: 3, desc: "Materiales (cables, disyuntores)", qty: 1, price: 2200 },
    ],
    notes: "Garantía de 1 año en mano de obra. Materiales con factura.",
    status: "Pagada",
  },
  {
    id: "FAC-2026-0038",
    client: "Rodrigo Pérez",
    clientEmail: "rodrigo.p@hotmail.com",
    service: "Reparación toma corriente",
    date: "5 Jun 2026",
    dueDate: "19 Jun 2026",
    items: [
      { id: 1, desc: "Inspección y diagnóstico", qty: 1, price: 800 },
      { id: 2, desc: "Reemplazo tomacorriente", qty: 2, price: 600 },
      { id: 3, desc: "Mano de obra", qty: 1, price: 1700 },
    ],
    notes: "",
    status: "Enviada",
  },
  {
    id: "FAC-2026-0035",
    client: "Laura Sánchez",
    clientEmail: "laura.s@gmail.com",
    service: "Instalación luces LED",
    date: "1 Jun 2026",
    dueDate: "15 Jun 2026",
    items: [
      { id: 1, desc: "Luces LED embutidas x6", qty: 1, price: 2400 },
      { id: 2, desc: "Mano de obra", qty: 1, price: 1800 },
    ],
    notes: "Incluye garantía de 6 meses.",
    status: "Borrador",
  },
];

const fmt = (n: number) => "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 2 });

const statusStyle: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  "Borrador": { bg: "bg-slate-100", text: "text-slate-600", icon: FileText },
  "Enviada": { bg: "bg-amber-100", text: "text-amber-700", icon: Send },
  "Pagada": { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

const subtotal = (items: LineItem[]) => items.reduce((s, i) => s + i.qty * i.price, 0);
const iva = (items: LineItem[]) => subtotal(items) * 0.21;
const total = (items: LineItem[]) => subtotal(items) + iva(items);

export function InvoicePage({ onBack }: InvoicePageProps) {
  const [screen, setScreen] = useState<Screen>("list");
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selected, setSelected] = useState<Invoice>(mockInvoices[0]);

  // Form state
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [service, setService] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, desc: "", qty: 1, price: 0 },
  ]);
  const [saveDraft, setSaveDraft] = useState(false);

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), desc: "", qty: 1, price: 0 }]);
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

  const handleSave = (status: Invoice["status"]) => {
    const newInv: Invoice = {
      id: `FAC-2026-0${String(invoices.length + 42).padStart(3, "0")}`,
      client, clientEmail, service,
      date: new Date().toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }),
      dueDate,
      items,
      notes,
      status,
    };
    setInvoices(prev => [newInv, ...prev]);
    setSelected(newInv);
    setScreen("preview");
  };

  const resetForm = () => {
    setClient(""); setClientEmail(""); setService("");
    setDueDate(""); setNotes("");
    setItems([{ id: 1, desc: "", qty: 1, price: 0 }]);
  };

  /* ── PREVIEW ── */
  if (screen === "preview") {
    const inv = selected;
    const sub = subtotal(inv.items);
    const tax = iva(inv.items);
    const tot = total(inv.items);
    const StatusIcon = statusStyle[inv.status].icon;

    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
          <button onClick={() => setScreen("list")} className="p-2 rounded-xl hover:bg-slate-100">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <h1 className="font-bold text-[#0F172A] flex-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            {inv.id}
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
              <Printer size={14} /> Imprimir
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold rounded-xl transition-colors">
              <Download size={14} /> Descargar PDF
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/50">

            {/* Factura header */}
            <div className="bg-[#0F172A] px-8 py-7">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-white rounded-xl p-1.5">
                      <img src={tradieLogoSrc} alt="Tradie" className="h-7 w-7 object-contain" style={{ mixBlendMode: "multiply" }} />
                    </div>
                    <span className="text-xl text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>Tradie</span>
                  </div>
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>Juan Pérez</p>
                  <p className="text-slate-400 text-sm">Electricista Matriculado</p>
                  <p className="text-slate-400 text-sm">juan.perez@tradie.com.ar</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Factura</p>
                  <p className="text-white font-mono text-xl font-bold">{inv.id}</p>
                  <div className="mt-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusStyle[inv.status].bg} ${statusStyle[inv.status].text}`}>
                      <StatusIcon size={11} />{inv.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Parties */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Facturado a</p>
                  <p className="font-bold text-[#0F172A]">{inv.client}</p>
                  <p className="text-sm text-slate-500">{inv.clientEmail}</p>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <p className="text-xs text-slate-400">Fecha de emisión</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{inv.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Vencimiento</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{inv.dueDate}</p>
                  </div>
                </div>
              </div>

              {/* Servicio */}
              <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6">
                <p className="text-xs text-slate-500 mb-0.5">Servicio</p>
                <p className="font-semibold text-[#0F172A]">{inv.service}</p>
              </div>

              {/* Items table */}
              <div className="mb-6">
                <div className="grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                  <span className="col-span-6">Descripción</span>
                  <span className="col-span-2 text-center">Cant.</span>
                  <span className="col-span-2 text-right">Precio</span>
                  <span className="col-span-2 text-right">Total</span>
                </div>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {inv.items.map((item, i) => (
                    <div key={item.id} className={`grid grid-cols-12 gap-2 py-3 px-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <span className="col-span-6 text-slate-700">{item.desc}</span>
                      <span className="col-span-2 text-center text-slate-500">{item.qty}</span>
                      <span className="col-span-2 text-right text-slate-500">{fmt(item.price)}</span>
                      <span className="col-span-2 text-right font-semibold text-[#0F172A]">{fmt(item.qty * item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-6">
                <div className="w-64">
                  <div className="flex justify-between text-sm text-slate-500 mb-1.5">
                    <span>Subtotal</span><span>{fmt(sub)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 mb-3">
                    <span>IVA (21%)</span><span>{fmt(tax)}</span>
                  </div>
                  <div className="flex justify-between font-black text-[#0F172A] text-xl pt-3 border-t border-slate-200" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    <span>Total</span><span className="text-[#F97316]">{fmt(tot)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {inv.notes && (
                <div className="bg-slate-50 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notas</p>
                  <p className="text-sm text-slate-600">{inv.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-slate-100 pt-4 text-center">
                <p className="text-xs text-slate-400">Generado con <span className="font-bold text-[#2563EB]">Tradie</span> · tradie.com.ar · reembolsos@tradie.com.ar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── CREATE ── */
  if (screen === "create") return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={() => { setScreen("list"); resetForm(); }} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A] flex-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Nueva factura
        </h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Datos del cliente */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Datos del cliente</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Nombre completo *</label>
              <input value={client} onChange={e => setClient(e.target.value)} placeholder="Ej: Florencia Martínez"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email *</label>
              <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} type="email" placeholder="email@ejemplo.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Servicio realizado *</label>
              <input value={service} onChange={e => setService(e.target.value)} placeholder="Ej: Instalación eléctrica"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Fecha de vencimiento</label>
              <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2563EB] transition-colors" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Ítems del servicio</h2>
            <button onClick={addItem} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2563EB] text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors">
              <Plus size={14} /> Agregar ítem
            </button>
          </div>

          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            <span className="col-span-5">Descripción</span>
            <span className="col-span-2 text-center">Cant.</span>
            <span className="col-span-3 text-right">Precio unit.</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <input value={item.desc} onChange={e => updateItem(item.id, "desc", e.target.value)}
                  placeholder="Descripción del ítem"
                  className="col-span-12 sm:col-span-5 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2563EB] transition-colors" />
                <input value={item.qty} onChange={e => updateItem(item.id, "qty", Number(e.target.value))}
                  type="number" min="1"
                  className="col-span-4 sm:col-span-2 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-center outline-none focus:border-[#2563EB] transition-colors" />
                <div className="col-span-6 sm:col-span-3 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                  <input value={item.price || ""} onChange={e => updateItem(item.id, "price", Number(e.target.value))}
                    type="number" min="0" placeholder="0"
                    className="w-full border border-slate-200 rounded-xl pl-6 pr-3 py-2.5 text-sm text-right outline-none focus:border-[#2563EB] transition-colors" />
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <span className="hidden sm:block text-sm font-semibold text-[#0F172A] text-right">{fmt(item.qty * item.price)}</span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-300 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-slate-100 pt-4 flex justify-end">
            <div className="w-60 flex flex-col gap-1.5">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span><span className="font-semibold">{fmt(subtotal(items))}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>IVA (21%)</span><span className="font-semibold">{fmt(iva(items))}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#0F172A] pt-2 border-t border-slate-100" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <span>Total</span><span className="text-[#F97316]">{fmt(total(items))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <label className="block text-sm font-bold text-[#0F172A] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Notas / Condiciones
          </label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Ej: Garantía de 1 año en mano de obra. Materiales con factura..."
            rows={3}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#2563EB] resize-none transition-colors" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => handleSave("Borrador")}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            <FileText size={16} /> Guardar borrador
          </button>
          <button
            onClick={() => handleSave("Enviada")}
            disabled={!client || !clientEmail || !service || items.every(i => !i.desc)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-white font-black rounded-xl transition-all disabled:opacity-50 shadow-lg"
            style={{ background: "linear-gradient(135deg, #F97316, #EA6C0A)", fontFamily: "'Nunito', sans-serif", boxShadow: "0 6px 20px rgba(249,115,22,0.3)" }}>
            <Send size={16} /> Emitir y enviar factura
          </button>
        </div>
      </div>
    </div>
  );

  /* ── LIST ── */
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A] flex-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
          Mis Facturas
        </h1>
        <button onClick={() => { resetForm(); setScreen("create"); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-bold rounded-xl transition-colors shadow-md"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          <Plus size={15} /> Nueva factura
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total facturado", value: fmt(invoices.filter(i => i.status === "Pagada").reduce((s, i) => s + total(i.items), 0)), color: "#22C55E" },
            { label: "Pendiente de cobro", value: fmt(invoices.filter(i => i.status === "Enviada").reduce((s, i) => s + total(i.items), 0)), color: "#F97316" },
            { label: "Facturas emitidas", value: String(invoices.length), color: "#2563EB" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
              <p className="text-xs text-slate-400 mb-1">{label}</p>
              <p className="font-black text-xl" style={{ fontFamily: "'Nunito', sans-serif", color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)" }}>Historial de facturas</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {invoices.map((inv) => {
              const { bg, text, icon: StatusIcon } = statusStyle[inv.status];
              return (
                <div key={inv.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-sm text-[#0F172A] font-mono">{inv.id}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${bg} ${text}`}>
                        <StatusIcon size={10} />{inv.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 truncate">{inv.client} · {inv.service}</p>
                    <p className="text-xs text-slate-400">{inv.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-[#0F172A]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {fmt(total(inv.items))}
                    </p>
                    <button onClick={() => { setSelected(inv); setScreen("preview"); }}
                      className="flex items-center gap-1 text-xs text-[#2563EB] font-semibold hover:underline mt-1">
                      <Eye size={11} /> Ver factura
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
