import { useState } from "react";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfessionalProfile } from "./pages/ProfessionalProfile";
import { UserDashboard } from "./pages/UserDashboard";
import { WorkerDashboard } from "./pages/WorkerDashboard";
import { MessagingPage } from "./pages/MessagingPage";
import { QuotesPage } from "./pages/QuotesPage";
import { PaymentPage } from "./pages/PaymentPage";
import { WalletPage } from "./pages/WalletPage";
import { InvoicePage } from "./pages/InvoicePage";

type Page =
  | "landing"
  | "professionals"
  | "categories"
  | "how"
  | "contact"
  | "profile"
  | "login"
  | "register"
  | "user-dashboard"
  | "worker-dashboard"
  | "messaging"
  | "quotes"
  | "payments"
  | "wallet"
  | "invoices";

const PAGES_WITHOUT_HEADER: Page[] = ["login", "register", "user-dashboard", "worker-dashboard", "messaging", "quotes", "payments", "wallet", "invoices"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(1);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const viewProfile = (id: number) => {
    setSelectedProfessionalId(id);
    setCurrentPage("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showHeader = !PAGES_WITHOUT_HEADER.includes(currentPage);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {showHeader && (
        <Header currentPage={currentPage} onNavigate={navigate} />
      )}

      <div className={showHeader ? "pt-16" : ""}>
        {currentPage === "landing" && (
          <LandingPage onNavigate={navigate} onViewProfile={viewProfile} />
        )}

        {(currentPage === "professionals" || currentPage === "categories" || currentPage === "how" || currentPage === "contact") && (
          <LandingPage onNavigate={navigate} onViewProfile={viewProfile} />
        )}

        {currentPage === "login" && (
          <LoginPage
            onLogin={(role) => navigate(role === "worker" ? "worker-dashboard" : "user-dashboard")}
            onGoRegister={() => navigate("register")}
          />
        )}

        {currentPage === "register" && (
          <RegisterPage
            onRegister={(role) => navigate(role === "worker" ? "worker-dashboard" : "user-dashboard")}
            onGoLogin={() => navigate("login")}
          />
        )}

        {currentPage === "profile" && (
          <ProfessionalProfile
            professionalId={selectedProfessionalId}
            onBack={() => navigate("landing")}
            onMessage={() => navigate("messaging")}
            onQuotes={() => navigate("quotes")}
          />
        )}

        {currentPage === "user-dashboard" && (
          <UserDashboard onNavigate={navigate} onViewProfile={viewProfile} />
        )}

        {currentPage === "worker-dashboard" && (
          <WorkerDashboard onNavigate={navigate} />
        )}

        {currentPage === "messaging" && (
          <MessagingPage onBack={() => navigate("user-dashboard")} />
        )}

        {currentPage === "quotes" && (
          <QuotesPage onBack={() => navigate("user-dashboard")} />
        )}

        {currentPage === "payments" && (
          <PaymentPage onBack={() => navigate("user-dashboard")} />
        )}

        {currentPage === "wallet" && (
          <WalletPage onBack={() => navigate("worker-dashboard")} onInvoices={() => navigate("invoices")} />
        )}

        {currentPage === "invoices" && (
          <InvoicePage onBack={() => navigate("wallet")} />
        )}
      </div>
    </div>
  );
}
