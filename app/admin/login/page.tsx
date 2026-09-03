import Image from "next/image";
import LoginForm from "@/components/ui/LoginForm";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="login-shell">
      {/* Brand panel — hidden on small screens, where it would just push the form down */}
      <div className="login-brand">
        <div className="login-brand__glow" aria-hidden />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Image
            src="/images/vero_logo.png"
            alt="Vero Ceilings"
            width={150}
            height={45}
            style={{ maxHeight: 42, objectFit: "contain", filter: "brightness(0) invert(1)" }}
            priority
          />
          <h1 className="login-brand__title">Boshqaruv paneli</h1>
          <p className="login-brand__text">
            Mahsulotlar, loyihalar, videolar va mijoz murojaatlarini bitta joydan boshqaring.
          </p>
          <div className="login-brand__badge">
            <ShieldCheck size={15} />
            Himoyalangan kirish
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="login-form-panel">
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div className="login-mobile-logo">
            <Image
              src="/images/vero_logo.png"
              alt="Vero Ceilings"
              width={140}
              height={42}
              style={{ maxHeight: 38, objectFit: "contain" }}
            />
          </div>

          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "0.35rem" }}>
            Tizimga kirish
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1.75rem" }}>
            Davom etish uchun hisobingizga kiring.
          </p>

          <LoginForm />
        </div>
      </div>

      <style>{`
        .login-shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          background: var(--color-surface);
        }
        .login-brand {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2.5rem, 5vw, 4rem);
          background: linear-gradient(150deg, #0d1326 0%, var(--color-primary-dark) 100%);
        }
        .login-brand__glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 22%, rgba(234,88,12,0.20) 0%, transparent 48%),
            radial-gradient(circle at 82% 78%, rgba(234,88,12,0.12) 0%, transparent 52%);
        }
        .login-brand__title {
          color: white;
          font-size: clamp(1.6rem, 2.6vw, 2.15rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 2rem 0 0.75rem;
          letter-spacing: -0.01em;
        }
        .login-brand__text {
          color: rgba(255,255,255,0.62);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 380px;
        }
        .login-brand__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 2rem;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          background: rgba(234,88,12,0.14);
          border: 1px solid rgba(234,88,12,0.28);
          color: var(--color-accent-light);
          font-size: 0.78rem;
          font-weight: 600;
        }
        .login-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 5vw, 3rem);
        }
        .login-mobile-logo { display: none; margin-bottom: 1.75rem; }

        @media (max-width: 860px) {
          .login-shell { grid-template-columns: 1fr; }
          .login-brand { display: none; }
          .login-mobile-logo { display: block; }
        }
      `}</style>
    </div>
  );
}
