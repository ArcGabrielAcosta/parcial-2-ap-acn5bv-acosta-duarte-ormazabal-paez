import { useState } from "react";
import { ArrowLeft, Send, Paperclip, MapPin, FileText, Phone, MoreVertical, Search, Image } from "lucide-react";
import { messages } from "../data/mockData";

interface MessagingPageProps {
  onBack: () => void;
}

export function MessagingPage({ onBack }: MessagingPageProps) {
  const [activeConv, setActiveConv] = useState(messages[0]);
  const [inputText, setInputText] = useState("");
  const [convMessages, setConvMessages] = useState(messages);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const updated = convMessages.map(c =>
      c.id === activeConv.id
        ? { ...c, messages: [...c.messages, { from: "user" as const, text: inputText, time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) }], lastMessage: inputText }
        : c
    );
    setConvMessages(updated);
    const updatedActive = updated.find(c => c.id === activeConv.id)!;
    setActiveConv(updatedActive);
    setInputText("");
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center gap-4 shrink-0">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="font-bold text-[#0F172A]" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>Mensajes</h1>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Conversation list */}
        <div className="w-72 bg-white border-r border-slate-100 flex flex-col hidden sm:flex">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2">
              <Search size={14} className="text-slate-400" />
              <input type="text" placeholder="Buscar conversación..." className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {convMessages.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={`w-full flex items-start gap-3 px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 text-left ${activeConv.id === conv.id ? "bg-blue-50/60 border-l-2 border-l-[#2563EB]" : ""}`}
              >
                <div className="relative shrink-0">
                  <img src={conv.avatar} alt={conv.professional} className="w-11 h-11 rounded-2xl object-cover" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <p className="text-sm font-bold text-[#0F172A] truncate">{conv.professional}</p>
                    <span className="text-xs text-slate-400 shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-0.5">{conv.trade}</p>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="shrink-0 w-5 h-5 bg-[#2563EB] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeConv.avatar} alt={activeConv.professional} className="w-10 h-10 rounded-xl object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "var(--font-display)" }}>{activeConv.professional}</p>
                <p className="text-xs text-green-500 font-medium">En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
                <Phone size={16} />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3 bg-slate-50">
            {activeConv.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "pro" && (
                  <img src={activeConv.avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-auto shrink-0" />
                )}
                <div className={`max-w-xs sm:max-w-md`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "user"
                      ? "bg-[#2563EB] text-white rounded-br-sm"
                      : "bg-white text-[#1E293B] rounded-bl-sm shadow-sm border border-slate-100"
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-xs text-slate-400 mt-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="bg-white border-t border-slate-100 px-4 py-2 flex items-center gap-2 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] text-xs font-semibold hover:bg-blue-100 transition-colors">
              <FileText size={12} /> Enviar presupuesto
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors">
              <MapPin size={12} /> Ubicación
            </button>
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-100 px-4 py-3 flex items-end gap-3 shrink-0">
            <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 shrink-0">
              <Paperclip size={18} />
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 shrink-0">
              <Image size={18} />
            </button>
            <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Escribí un mensaje..."
                rows={1}
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400 resize-none max-h-32"
                style={{ lineHeight: "1.5" }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
