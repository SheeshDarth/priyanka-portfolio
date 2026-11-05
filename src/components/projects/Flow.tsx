import type { FlowStep } from "@/content/projects";

/**
 * Accessible diagram: a semantic ordered list. The list IS the text equivalent,
 * so no separate alt text is required.
 */
export function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {steps.map((s, i) => (
        <li
          key={s.label}
          className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-8 last:pb-0 md:grid-cols-[2.5rem_12rem_1fr] md:gap-x-6"
        >
          <span
            aria-hidden="true"
            className="relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-signal-ink bg-porcelain font-mono text-xs text-signal-ink"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute bottom-0 left-5 top-10 w-px -translate-x-1/2 bg-signal-ink/40" />
          )}
          <h3 className="display col-start-2 self-center text-2xl">{s.label}</h3>
          <p className="col-start-2 mt-1 text-muted md:col-start-3 md:mt-0 md:self-center">{s.detail}</p>
        </li>
      ))}
    </ol>
  );
}
