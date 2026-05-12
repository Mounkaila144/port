"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error" | "rateLimit" | "validation";

const TYPES = ["maintenance", "audit", "build", "partnership", "other"] as const;

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations();
  const search = useSearchParams();
  const presetType = search.get("type") ?? "build";
  const utm = {
    utm_source: search.get("utm_source") ?? "",
    utm_medium: search.get("utm_medium") ?? "",
    utm_campaign: search.get("utm_campaign") ?? "",
    utm_content: search.get("utm_content") ?? "",
    utm_term: search.get("utm_term") ?? "",
  };
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    if (data.get("hp")) {
      setStatus("success");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 429) setStatus("rateLimit");
      else if (res.status === 422) setStatus("validation");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-3xl border border-ptr-teal/30 bg-ptr-teal/[0.04] p-8 ${className ?? ""}`}>
        <CheckCircle2 className="h-8 w-8 text-ptr-teal" />
        <h3 className="mt-3 font-display text-2xl text-off-white">{t("contact.ack.title")}</h3>
        <p className="mt-2 text-muted">{t("contact.ack.body")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-4 ${className ?? ""}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("contact.fields.name")} name="name" required />
        <Field label={t("contact.fields.company")} name="company" />
      </div>
      <Field label={t("contact.fields.email")} name="email" type="email" required />
      <SelectField
        label={t("contact.fields.type")}
        name="type"
        defaultValue={presetType}
        options={TYPES.map((v) => ({ value: v, label: t(`contact.types.${v}`) }))}
      />
      <TextAreaField label={t("contact.fields.brief")} name="brief" required rows={5} />
      <Field label={t("contact.fields.source")} name="source" />

      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} readOnly />
      ))}

      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-ptr-teal" />
        <span>
          {t("contact.fields.consent")}{" "}
          <Link href="/privacy" className="text-ptr-teal underline-offset-4 hover:underline">
            {t("footer.privacy")}
          </Link>
        </span>
      </label>

      {status === "error" && <p className="text-sm text-ptr-red">{t("contact.errors.generic")}</p>}
      {status === "rateLimit" && <p className="text-sm text-ptr-red">{t("contact.errors.rateLimit")}</p>}
      {status === "validation" && <p className="text-sm text-ptr-red">{t("contact.errors.validation")}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-ptr-teal px-6 py-3 text-sm font-semibold text-carbon disabled:opacity-60"
      >
        {t("contact.fields.submit")}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 block w-full rounded-xl border border-white/[0.08] bg-surface/60 px-4 py-2.5 text-sm text-off-white placeholder:text-muted focus:border-ptr-teal/40 focus:outline-none"
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  rows,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
        {required && " *"}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="mt-1.5 block w-full rounded-xl border border-white/[0.08] bg-surface/60 px-4 py-2.5 text-sm text-off-white placeholder:text-muted focus:border-ptr-teal/40 focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 block w-full rounded-xl border border-white/[0.08] bg-surface/60 px-4 py-2.5 text-sm text-off-white focus:border-ptr-teal/40 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-carbon text-off-white">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
