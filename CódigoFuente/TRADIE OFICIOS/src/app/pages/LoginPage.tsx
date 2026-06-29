import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";

interface LoginPageProps {
  onLogin: (role: "user" | "worker") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState<"user" | "worker">("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Fondo foto oficio */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=1600&h=1067&fit=crop&auto=format&q=90"
          alt="Herramientas de oficio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/75" />
        {/* Destellos de marca */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316]/15 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white rounded-2xl p-3 mb-4 shadow-lg shadow-black/20">
              <img
                src={tradieLogoSrc}
                alt="Tradie"
                className="h-14 w-14 object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            <h1
              className="text-white text-2xl text-center"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
            >
              Iniciá sesión en Tradie
            </h1>
            <p className="text-slate-300 text-sm mt-1">Plataforma de Oficios</p>
          </div>

          {/* Role selector */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === "user"
                  ? "bg-[#2563EB] text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Soy cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === "worker"
                  ? "bg-[#F97316] text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Soy profesional
            </button>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full py-3 bg-[#1877F2] hover:bg-[#1466d8] text-white rounded-xl font-semibold text-sm transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuar con Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-slate-400 text-xs font-medium">o continuá con tu email</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:bg-white/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl pl-10 pr-11 py-3 text-sm outline-none focus:border-[#2563EB] focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRemember(r => !r)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${remember ? "bg-[#2563EB]" : "bg-white/20"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${remember ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs text-slate-300">Recordarme</span>
              </label>
              <button type="button" className="text-xs text-[#F97316] hover:text-orange-300 font-semibold transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                background: role === "worker"
                  ? "linear-gradient(135deg, #F97316, #EA6C0A)"
                  : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                color: "white",
              }}
            >
              Iniciar sesión <ArrowRight size={16} />
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-slate-400 mt-6">
            ¿No tenés cuenta?{" "}
            <button className="text-white font-bold hover:text-[#F97316] transition-colors">
              Registrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
