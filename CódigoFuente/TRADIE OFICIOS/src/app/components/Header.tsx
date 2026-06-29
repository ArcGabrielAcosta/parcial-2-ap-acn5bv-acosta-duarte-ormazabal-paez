import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function useSafeAreaTop() {
  const [safeTop, setSafeTop] = useState(0);
  useEffect(() => {
    // Detectar safe area real via CSS env() en un div de prueba
    const div = document.createElement("div");
    div.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:env(safe-area-inset-top,0px);pointer-events:none;opacity:0;";
    document.body.appendChild(div);
    const h = div.getBoundingClientRect().height;
    document.body.removeChild(div);

    // Si env() devuelve 0 en mobile, forzar un mínimo razonable
    if (h === 0 && window.innerWidth < 768) {
      // Detectar si es iPhone por ratio de pantalla
      const ratio = window.screen.height / window.screen.width;
      if (ratio > 1.9) {
        // iPhone con notch/Dynamic Island — mínimo 50px
        setSafeTop(50);
      } else {
        setSafeTop(20);
      }
    } else {
      setSafeTop(h);
    }
  }, []);
  return safeTop;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const safeTop = useSafeAreaTop();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const navLinks = [
    { label: "Inicio", page: "landing" },
    { label: "Profesionales", page: "professionals" },
    { label: "Categorías", page: "categories" },
    { label: "Cómo funciona", page: "how" },
    { label: "Contacto", page: "contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
    >
      {/* Spacer para notch/Dynamic Island — solo mobile */}
      {safeTop > 0 && (
        <div style={{ height: safeTop }} className="w-full md:hidden" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 group">
            <img src={tradieLogoSrc} alt="Tradie" className="h-11 w-auto object-contain" />
            <span
              className="text-2xl text-[#0F172A] group-hover:text-[#2563EB] transition-colors"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
            >
              Tradie
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.page ? "text-[#2563EB]" : "text-slate-600 hover:text-[#0F172A]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onNavigate("login")} className="px-4 py-2 text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
              Iniciar sesión
            </button>
            <button onClick={() => onNavigate("register")} className="px-4 py-2 text-sm font-semibold bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm">
              Registrarse
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
                className={`text-left text-base font-semibold py-3 px-3 rounded-xl transition-colors ${
                  currentPage === link.page ? "text-[#2563EB] bg-blue-50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 mt-2 flex flex-col gap-3 border-t border-slate-100">
              <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="w-full px-4 py-3 text-sm font-bold border-2 border-[#0F172A] text-[#0F172A] rounded-xl">
                Iniciar sesión
              </button>
              <button onClick={() => { onNavigate("register"); setMobileOpen(false); }} className="w-full px-4 py-3 text-sm font-bold bg-[#2563EB] text-white rounded-xl">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
