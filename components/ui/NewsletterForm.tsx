"use client";
import { useActionState, useRef } from "react";
import { subscribeNewsletterAction } from "@/lib/actions";
import { ArrowRight, CheckCircle } from "lucide-react";

interface Props {
  placeholder: string;
  buttonText: string;
}

export default function NewsletterForm({ placeholder, buttonText }: Props) {
  const [state, formAction, pending] = useActionState(subscribeNewsletterAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.success) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "#4ade80", fontSize: "0.9rem" }}>
        <CheckCircle size={18} />
        <span>Muvaffaqiyatli obuna bo&apos;ldingiz!</span>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} style={{ display: "flex", gap: "0", maxWidth: "380px", width: "100%" }}>
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "0.75rem 1rem",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRight: "none",
          borderRadius: "4px 0 0 4px",
          color: "white",
          fontSize: "0.875rem",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={pending}
        aria-label={buttonText}
        style={{
          background: "var(--color-accent)",
          color: "var(--color-primary-dark)",
          border: "none",
          padding: "0 1.25rem",
          borderRadius: "0 4px 4px 0",
          cursor: pending ? "not-allowed" : "pointer",
          opacity: pending ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontWeight: "700",
          fontSize: "0.8rem",
          whiteSpace: "nowrap",
          transition: "background 0.2s",
        }}
      >
        {pending ? "..." : buttonText}
        {!pending && <ArrowRight size={14} />}
      </button>
      {state?.error && (
        <p style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "0.5rem", position: "absolute" }}>
          {state.error}
        </p>
      )}
    </form>
  );
}
