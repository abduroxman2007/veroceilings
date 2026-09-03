"use client";

import { useActionState, useId } from "react";
import { useTranslations } from "next-intl";
import { submitContactAction } from "@/lib/actions";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface Props { locale: string; }

export default function ContactForm({ locale }: Props) {
  const t = useTranslations("contact");
  const [state, formAction, pending] = useActionState(submitContactAction, null);
  const uid = useId();

  if (state?.success) {
    return (
      <div role="status" aria-live="polite" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem", padding: "1.5rem 0" }}>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(22,163,74,0.1)",
            color: "#16a34a",
            flexShrink: 0,
          }}
        >
          <CheckCircle2 size={28} />
        </span>
        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.5, margin: 0 }}>
          {t("status_success")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input type="hidden" name="locale" value={locale} />
      {/* honeypot — real visitors never fill this in */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} aria-hidden="true" />

      <div className="vero-form-grid">
        <div className="vero-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor={`${uid}-name`} className="vero-form-label">
            {t("name_label")} <span aria-hidden style={{ color: "var(--color-accent)" }}>*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder={t("name_placeholder_new")}
            className="vero-form-control"
          />
        </div>

        <div className="vero-field">
          <label htmlFor={`${uid}-phone`} className="vero-form-label">
            {t("phone_label")} <span aria-hidden style={{ color: "var(--color-accent)" }}>*</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            name="phone"
            required
            minLength={9}
            autoComplete="tel"
            placeholder={t("phone_placeholder_new")}
            className="vero-form-control"
          />
        </div>

        <div className="vero-field">
          <label htmlFor={`${uid}-email`} className="vero-form-label">
            {t("email_label")}
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t("email_placeholder_new")}
            className="vero-form-control"
          />
        </div>

        <div className="vero-field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor={`${uid}-message`} className="vero-form-label">
            {t("message_label")} <span aria-hidden style={{ color: "var(--color-accent)" }}>*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            required
            minLength={5}
            rows={4}
            placeholder={t("message_placeholder_new")}
            className="vero-form-control"
            style={{ resize: "vertical" }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-primary"
        style={{ justifyContent: "center", padding: "0.75rem 1.5rem", fontSize: "0.9rem", opacity: pending ? 0.75 : 1, cursor: pending ? "not-allowed" : "pointer" }}
      >
        {pending ? (
          <>
            <Loader2 size={18} className="vero-spin" aria-hidden />
            {t("status_sending")}
          </>
        ) : (
          <>
            {t("send_button")}
            <Send size={16} aria-hidden />
          </>
        )}
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {state?.error && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <p style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#dc2626", fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: "1px" }} aria-hidden />
              {state.error || t("status_error_generic")}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", paddingLeft: "1.5rem", margin: 0 }}>
              {t("status_error")}
            </p>
          </div>
        )}
      </div>

      <style>{`
        .vero-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .vero-form-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--color-text);
          margin-bottom: 0.4rem;
        }
        .vero-form-control {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1.5px solid var(--color-border);
          border-radius: 6px;
          font-size: 0.88rem;
          font-family: var(--font-sans);
          background: white;
          color: var(--color-text);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .vero-form-control::placeholder { color: #9a9aa8; }
        .vero-form-control:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.14);
        }
        .vero-spin { animation: vero-spin 0.9s linear infinite; }
        @keyframes vero-spin { to { transform: rotate(360deg); } }
        @media (min-width: 560px) {
          .vero-form-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </form>
  );
}
