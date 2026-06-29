import { Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={tradieLogoSrc} alt="TRADIE" className="h-9 w-auto object-contain brightness-0 invert" />
              <span className="text-xl text-white" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}>Tradie</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plataforma que conecta personas con profesionales de oficios de manera rápida, segura y confiable.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 hover:bg-[#2563EB] rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={15} className="text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: "var(--font-display)" }}>Plataforma</h4>
            <ul className="flex flex-col gap-3">
              {["Cómo funciona", "Categorías", "Profesionales", "Para empresas", "Tradie Pro"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: "var(--font-display)" }}>Soporte</h4>
            <ul className="flex flex-col gap-3">
              {["Preguntas frecuentes", "Centro de ayuda", "Términos y condiciones", "Política de privacidad", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm" style={{ fontFamily: "var(--font-display)" }}>Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={14} className="text-[#F97316] shrink-0" />
                hola@tradie.com.ar
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={14} className="text-[#F97316] shrink-0" />
                0800-222-TRADIE
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} className="text-[#F97316] shrink-0" />
                Buenos Aires, Argentina
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 Tradie S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Términos</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacidad</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
