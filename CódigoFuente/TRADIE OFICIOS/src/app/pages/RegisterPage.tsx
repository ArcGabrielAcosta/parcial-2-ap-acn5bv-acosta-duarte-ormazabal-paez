import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import tradieLogoSrc from "@/imports/logo.png";

interface RegisterPageProps {
  onRegister: (role: "user" | "worker") => void;
  onGoLogin: () => void;
}

export function RegisterPage({ onRegister, onGoLogin }: RegisterPageProps) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState<"user" | "worker">("user");

  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMismatch) onRegister(role);
  };

  const accentColor = role === "worker" ? "#F97316" : "#F97316";

  return (
    <div className="min-h-screen relative flex items-center justify-center py-8">
      {/* Fondo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1659930087003-2d64e33181f7?w=1600&h=1067&fit=crop&auto=format&q=90"
          alt="Carpintero trabajando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F172A]/80" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316]/10 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Logo + título centrados */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-white rounded-2xl p-3 mb-4 shadow-lg shadow-black/20">
              <img
                src={tradieLogoSrc}
                alt="Tradie"
                className="h-14 w-14 object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            <h1
              className="text-white text-3xl"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
            >
              Registrarse
            </h1>
            <p className="text-slate-300 text-sm mt-1">Plataforma de Oficios</p>
          </div>

          {/* Role selector */}
          <div className="flex bg-white/10 rounded-xl p-1 mb-7">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === "user" ? "bg-[#2563EB] text-white shadow" : "text-slate-300 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Soy cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("worker")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === "worker" ? "bg-[#F97316] text-white shadow" : "text-slate-300 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Soy profesional
            </button>
          </div>

          {/* Form — estilo underline igual a la referencia */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Nombre */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-300 text-sm">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                className="bg-transparent border-0 border-b border-white/30 focus:border-[#F97316] text-white placeholder-transparent py-2 text-sm outline-none transition-colors"
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-300 text-sm">Correo</label>
              <input
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
                className="bg-transparent border-0 border-b border-white/30 focus:border-[#F97316] text-white placeholder-transparent py-2 text-sm outline-none transition-colors"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-300 text-sm">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-0 border-b border-white/30 focus:border-[#F97316] text-white placeholder-transparent py-2 pr-8 text-sm outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col gap-1">
              <label className="text-slate-300 text-sm">Confirmar contraseña</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full bg-transparent border-0 border-b text-white placeholder-transparent py-2 pr-8 text-sm outline-none transition-colors ${
                    passwordMismatch ? "border-red-400" : "border-white/30 focus:border-[#F97316]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(s => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {passwordMismatch && (
                <p className="text-red-400 text-xs mt-0.5">Las contraseñas no coinciden</p>
              )}
            </div>

            {/* Botón — naranja exacto como la referencia */}
            <button
              type="submit"
              disabled={passwordMismatch}
              className="mt-3 w-full py-3.5 rounded-lg font-bold text-sm tracking-widest uppercase transition-all disabled:opacity-50 hover:opacity-90 hover:scale-[1.02]"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                backgroundColor: "#F97316",
                color: "white",
                letterSpacing: "0.08em",
              }}
            >
              Registrarse
            </button>
          </form>

          {/* Volver al login */}
          <button
            onClick={onGoLogin}
            className="mt-6 flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mx-auto"
          >
            <ArrowLeft size={14} />
            ¿Ya tenés cuenta? <span className="text-white font-semibold">Iniciá sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}
