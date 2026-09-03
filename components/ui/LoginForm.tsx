"use client";

import { useActionState, useId } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Loader2, AlertCircle, LogIn } from "lucide-react";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const uid = useId();

  return (
    <form action={formAction} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label htmlFor={`${uid}-email`} className="vero-form-label">Email</label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          required
          autoComplete="username"
          className="vero-form-control"
        />
      </div>

      <div>
        <label htmlFor={`${uid}-password`} className="vero-form-label">Parol</label>
        <input
          id={`${uid}-password`}
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="vero-form-control"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary"
        style={{ justifyContent: "center", opacity: pending ? 0.75 : 1, cursor: pending ? "not-allowed" : "pointer" }}
      >
        {pending ? (
          <>
            <Loader2 size={18} className="vero-spin" aria-hidden /> Kirilmoqda...
          </>
        ) : (
          <>
            Kirish <LogIn size={16} aria-hidden />
          </>
        )}
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {state?.error && (
          <p style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#dc2626", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "1px" }} aria-hidden />
            {state.error}
          </p>
        )}
      </div>

      <style>{`
        .vero-form-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .vero-form-control {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1.5px solid var(--color-border);
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          background: var(--color-surface-alt);
          color: var(--color-text);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }
        .vero-form-control:focus {
          border-color: var(--color-accent);
          background: var(--color-surface);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.14);
        }
        .vero-spin { animation: vero-spin 0.9s linear infinite; }
        @keyframes vero-spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
