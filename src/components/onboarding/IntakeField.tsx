import * as React from "react";
import type { Field } from "./intake-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface IntakeFieldProps {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
  data: Record<string, unknown>; // for conditional rendering
  clientSlug: string;
}

const INTAKE_BUCKET = "intake-uploads";

async function uploadFile(clientSlug: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${clientSlug}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(INTAKE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return path;
}

export function IntakeField({ field, value, onChange, data, clientSlug }: IntakeFieldProps) {
  // Conditional skip
  if (field.conditionalOn) {
    if (data[field.conditionalOn.field] !== field.conditionalOn.equals) return null;
  }

  const id = `field-${field.name}`;

  const labelEl = (
    <Label htmlFor={id} className="text-sm font-medium text-navy">
      {field.label}
      {field.required ? <span className="ml-1 text-destructive">*</span> : null}
    </Label>
  );
  const helpEl = field.helpText ? (
    <p className="mt-1 text-xs text-muted-foreground">{field.helpText}</p>
  ) : null;

  if (field.type === "short-text" || field.type === "email" || field.type === "tel" || field.type === "url") {
    return (
      <div className="space-y-1.5">
        {labelEl}
        <Input
          id={id}
          type={field.type === "short-text" ? "text" : field.type}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="bg-white"
        />
        {helpEl}
      </div>
    );
  }

  if (field.type === "long-text") {
    return (
      <div className="space-y-1.5">
        {labelEl}
        <Textarea
          id={id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="bg-white"
        />
        {helpEl}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="space-y-2">
        {labelEl}
        <div className="space-y-2">
          {(field.options ?? []).map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm transition-colors hover:border-navy"
            >
              <input
                type="radio"
                name={field.name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 accent-navy"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {helpEl}
      </div>
    );
  }

  if (field.type === "file") {
    const stored = Array.isArray(value) ? (value as string[]) : value ? [value as string] : [];
    return (
      <div className="space-y-2">
        {labelEl}
        <FileUploadField
          id={id}
          field={field}
          existing={stored}
          clientSlug={clientSlug}
          onChange={(paths) => onChange(field.multiple ? paths : (paths[0] ?? null))}
        />
        {helpEl}
      </div>
    );
  }

  if (field.type === "repeater") {
    const items = Array.isArray(value) ? (value as Record<string, string>[]) : [];
    return (
      <div className="space-y-3">
        {labelEl}
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2 rounded-lg border border-border bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                #{idx + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
              >
                <Trash2 className="h-4 w-4" /> Remove
              </Button>
            </div>
            {(field.itemFields ?? []).map((sub) => (
              <div key={sub.key} className="space-y-1">
                <Label className="text-xs">{sub.label}</Label>
                {sub.type === "long-text" ? (
                  <Textarea
                    rows={3}
                    value={item[sub.key] ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[idx] = { ...item, [sub.key]: e.target.value };
                      onChange(next);
                    }}
                  />
                ) : (
                  <Input
                    value={item[sub.key] ?? ""}
                    onChange={(e) => {
                      const next = [...items];
                      next[idx] = { ...item, [sub.key]: e.target.value };
                      onChange(next);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, {}])}
        >
          <Plus className="h-4 w-4" /> Add another
        </Button>
        {helpEl}
      </div>
    );
  }

  return null;
}

function FileUploadField({
  id,
  field,
  existing,
  clientSlug,
  onChange,
}: {
  id: string;
  field: Field;
  existing: string[];
  clientSlug: string;
  onChange: (paths: string[]) => void;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const newPaths: string[] = [];
      for (const file of Array.from(files)) {
        const p = await uploadFile(clientSlug, file);
        newPaths.push(p);
      }
      onChange(field.multiple ? [...existing, ...newPaths] : newPaths);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-navy/40 bg-white px-4 py-6 text-sm text-navy transition-colors hover:border-navy"
      >
        <Upload className="h-5 w-5" />
        <span>{uploading ? "Uploading…" : "Click to upload"}</span>
        <input
          id={id}
          type="file"
          accept={field.accept}
          multiple={field.multiple}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </label>
      {existing.length > 0 ? (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {existing.map((p) => (
            <li key={p} className="flex items-center justify-between gap-2 rounded bg-cream-deep px-2 py-1">
              <span className="truncate font-mono">{p.split("/").pop()}</span>
              <button
                type="button"
                onClick={() => onChange(existing.filter((x) => x !== p))}
                className="text-destructive hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
