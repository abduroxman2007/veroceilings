"use client";

import { useTransition } from "react";
import { Trash, Loader2 } from "lucide-react";

interface Props {
  id: string;
  action: (id: string) => Promise<{ success: boolean }>;
  confirmText: string;
}

export default function DeleteButton({ id, action, confirmText }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        startTransition(() => {
          action(id);
        });
      }}
      style={{ display: "inline-flex", background: "transparent", border: "1px solid #fee2e2", padding: "0.4rem", borderRadius: "4px", cursor: pending ? "not-allowed" : "pointer", color: "#ef4444" }}
    >
      {pending ? <Loader2 size={14} className="admin-spin" /> : <Trash size={14} />}
      <style>{`.admin-spin { animation: admin-spin 0.9s linear infinite; } @keyframes admin-spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
