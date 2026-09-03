"use client";

import { useTransition } from "react";
import { updateInquiryStatusAction } from "@/lib/actions";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "CLOSED", "SPAM"];

export default function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(() => {
          void updateInquiryStatusAction(id, value);
        });
      }}
      className={`badge badge-${status.toLowerCase()}`}
      style={{ border: "1px solid var(--color-border)", cursor: "pointer" }}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
