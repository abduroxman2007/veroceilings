"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  startIndex?: number;
  defaultOpenIndex?: number | null;
}

export default function FaqAccordion({ items, startIndex = 0, defaultOpenIndex = null }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const uid = useId();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${uid}-trigger-${index}`;
        const panelId = `${uid}-panel-${index}`;

        return (
          <div className="faq-row" data-open={isOpen} key={index}>
            <span className="faq-bar" aria-hidden="true" />
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={triggerId}
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="faq-number" aria-hidden="true">
                  {String(startIndex + index + 1).padStart(2, "0")}
                </span>
                <span className="faq-question">{item.question}</span>
                <ChevronDown size={22} className="faq-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className="faq-panel-wrap"
            >
              <div className="faq-panel-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        .faq-list { display: flex; flex-direction: column; }

        .faq-row {
          position: relative;
          border-bottom: 1px solid var(--color-border);
        }
        .faq-row:first-child { border-top: 1px solid var(--color-border); }

        .faq-bar {
          position: absolute;
          left: 0;
          top: 0.35rem;
          bottom: 0.35rem;
          width: 3px;
          background: var(--color-accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-row[data-open="true"] .faq-bar { transform: scaleY(1); }

        .faq-trigger {
          display: flex;
          align-items: center;
          width: 100%;
          gap: clamp(1rem, 3vw, 2rem);
          padding: 1.85rem 0.5rem 1.85rem 1.75rem;
          background: transparent;
          border: none;
          margin: 0;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .faq-trigger:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: -3px;
          border-radius: 4px;
        }

        .faq-number {
          flex-shrink: 0;
          width: clamp(1.9rem, 5vw, 2.75rem);
          font-size: clamp(1.3rem, 3.8vw, 2.05rem);
          font-weight: 800;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          color: var(--color-border);
          transition: color 0.3s ease;
        }
        .faq-row[data-open="true"] .faq-number { color: rgba(234, 88, 12, 0.4); }

        .faq-question {
          flex: 1;
          font-size: clamp(0.95rem, 1.7vw, 1.1rem);
          font-weight: 600;
          line-height: 1.45;
          color: var(--color-primary);
          transition: color 0.25s ease;
        }
        .faq-row[data-open="true"] .faq-question { color: var(--color-accent); }
        .faq-trigger:hover .faq-question { color: var(--color-accent-light); }

        .faq-chevron {
          flex-shrink: 0;
          color: var(--color-text-muted);
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .faq-row[data-open="true"] .faq-chevron { transform: rotate(180deg); color: var(--color-accent); }
        .faq-trigger:hover .faq-chevron { color: var(--color-accent-light); }

        .faq-panel-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .faq-row[data-open="true"] .faq-panel-wrap { grid-template-rows: 1fr; }

        .faq-panel-inner { overflow: hidden; }

        .faq-answer {
          margin: 0;
          max-width: 580px;
          padding: 0 1.5rem 1.85rem calc(1.75rem + clamp(1.9rem, 5vw, 2.75rem) + clamp(1rem, 3vw, 2rem));
          color: var(--color-text-muted);
          font-size: 0.92rem;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .faq-row[data-open="true"] .faq-answer { opacity: 1; transform: translateY(0); }

        @media (max-width: 560px) {
          .faq-trigger { gap: 0.75rem; padding: 1.4rem 0.25rem 1.4rem 1.1rem; }
          .faq-number { width: 1.6rem; font-size: 1.2rem; }
          .faq-question { font-size: 0.95rem; }
          .faq-answer { padding-left: 1.1rem; padding-right: 1.1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-bar, .faq-number, .faq-question, .faq-chevron, .faq-panel-wrap, .faq-answer {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
