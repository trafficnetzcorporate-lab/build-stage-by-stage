import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  getSectionsForClient,
  isSectionComplete,
  isSectionStarted,
  type IntakeSection,
} from "./intake-schema";
import { IntakeField } from "./IntakeField";
import { Button } from "@/components/ui/button";
// StatusPill imported on demand if needed
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  saveIntakeDraftFn,
  submitIntakeFn,
} from "@/integrations/onboarding/onboarding.functions";

interface IntakeStepperProps {
  clientSlug: string;
  initialFormData: Record<string, unknown>;
  initialSectionIndex: number;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function IntakeStepper({
  clientSlug,
  initialFormData,
  initialSectionIndex,
}: IntakeStepperProps) {
  const navigate = useNavigate();
  const sections = React.useMemo(() => getSectionsForClient(clientSlug), [clientSlug]);
  const [formData, setFormData] = React.useState<Record<string, unknown>>(initialFormData);
  const [sectionIndex, setSectionIndex] = React.useState(
    Math.min(Math.max(initialSectionIndex, 0), sections.length - 1),
  );
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const saveDraft = useServerFn(saveIntakeDraftFn);
  const submitIntake = useServerFn(submitIntakeFn);

  const section = sections[sectionIndex];
  const isLast = sectionIndex === sections.length - 1;

  // ===== Auto-save with debounce + tab visibility pause =====
  const debounceRef = React.useRef<number | null>(null);
  const latestRef = React.useRef({ formData, sectionIndex });
  React.useEffect(() => {
    latestRef.current = { formData, sectionIndex };
  }, [formData, sectionIndex]);

  const performSave = React.useCallback(async () => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      // Defer until tab is visible again
      return;
    }
    setSaveState("saving");
    try {
      await saveDraft({
        data: {
          clientSlug,
          formData: latestRef.current.formData,
          currentSectionIndex: latestRef.current.sectionIndex,
        },
      });
      setSaveState("saved");
    } catch (err) {
      console.error("[IntakeStepper] save failed:", err);
      setSaveState("error");
    }
  }, [clientSlug, saveDraft]);

  React.useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      void performSave();
    }, 1500);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, sectionIndex]);

  // Save on tab hide (best-effort flush)
  React.useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        void performSave();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [performSave]);

  const updateField = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goNext = () => {
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const goPrev = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Final save first
      await performSave();
      await submitIntake({ data: { clientSlug, formData } });
      void navigate({ to: "/onboarding/intake/success" as never });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section nav rail */}
      <SectionNav
        sections={sections}
        current={sectionIndex}
        formData={formData}
        onSelect={(i) => setSectionIndex(i)}
      />

      {/* Save status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Section {sectionIndex + 1} of {sections.length}
        </span>
        <SaveBadge state={saveState} />
      </div>

      {/* Section body */}
      <div className="space-y-6 rounded-3xl border border-border bg-cream-deep p-6 md:p-8">
        <div>
          <h2 className="font-display text-2xl text-navy md:text-3xl">{section.title}</h2>
          {section.description ? (
            <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
          ) : null}
        </div>

        <div className="space-y-5">
          {section.fields.map((field) => (
            <IntakeField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={(v) => updateField(field.name, v)}
              data={formData}
              clientSlug={clientSlug}
            />
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={goPrev}
          disabled={sectionIndex === 0 || submitting}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        {isLast ? (
          <Button type="button" onClick={handleSubmit} disabled={submitting} className="bg-navy hover:bg-navy-deep">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                Submit intake <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button type="button" onClick={goNext} disabled={submitting} className="bg-navy hover:bg-navy-deep">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {submitError ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      ) : null}
    </div>
  );
}

function SaveBadge({ state }: { state: SaveState }) {
  if (state === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <Loader2 className="h-3 w-3 animate-spin" /> Saving…
      </span>
    );
  }
  if (state === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 text-success">
        <CheckCircle2 className="h-3 w-3" /> Saved
      </span>
    );
  }
  if (state === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-destructive">
        <AlertCircle className="h-3 w-3" /> Save failed — will retry
      </span>
    );
  }
  return <span>&nbsp;</span>;
}

function SectionNav({
  sections,
  current,
  formData,
  onSelect,
}: {
  sections: IntakeSection[];
  current: number;
  formData: Record<string, unknown>;
  onSelect: (i: number) => void;
}) {
  return (
    <nav aria-label="Intake sections" className="overflow-x-auto">
      <ol className="flex min-w-max gap-2">
        {sections.map((s, i) => {
          const complete = isSectionComplete(s, formData);
          const started = isSectionStarted(s, formData);
          const active = i === current;
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-navy bg-navy text-cream"
                    : complete
                      ? "border-success/40 bg-success/10 text-success hover:bg-success/15"
                      : started
                        ? "border-gold/40 bg-gold/10 text-navy hover:bg-gold/20"
                        : "border-border bg-white text-muted-foreground hover:border-navy/40 hover:text-navy"
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{i + 1}</span>
                <span className="max-w-[160px] truncate">{s.title}</span>
                {complete ? <CheckCircle2 className="h-3 w-3" /> : null}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
