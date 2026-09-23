"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { CONTACT_EMAIL } from "../../constants";
import { useDemoDialog } from "./demo-dialog-context";
import styles from "./demo-dialog.module.css";

type Option = { value: string; label: string };

export type DemoDialogCopy = {
  title: string;
  close: string;
  intro: string;
  fields: Record<"school" | "name" | "role" | "phone" | "size", string>;
  roleOptions: Option[];
  sizeOptions: Option[];
  submit: string;
  note: ReactNode;
  status: string;
  required: string;
  email: Record<
    "subject" | "school" | "name" | "role" | "phone" | "learners" | "closing",
    string
  >;
};

/**
 * Collects a few details about the school and prepares an email to the
 * SmartSakuu team. Nothing is submitted until the visitor sends that email.
 */
export function DemoDialog({ copy }: { copy: DemoDialogCopy }) {
  const { dialogRef, restoreFocus } = useDemoDialog();
  const [prepared, setPrepared] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // `required` alone accepts whitespace, so check the trimmed values too.
    for (const input of form.querySelectorAll<HTMLInputElement>(
      "input[required]",
    )) {
      input.setCustomValidity(input.value.trim() ? "" : copy.required);
      if (!input.reportValidity()) return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "");
    const { email } = copy;
    const body = [
      `${email.school}: ${value("school")}`,
      `${email.name}: ${value("name")}`,
      `${email.role}: ${value("role")}`,
      `${email.phone}: ${value("phone")}`,
      `${email.learners}: ${value("size")}`,
      "",
      email.closing,
    ].join("\n");
    const subject = `${email.subject}: ${value("school")}`;

    setPrepared(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="dialog-title"
      onClose={restoreFocus}
      onClick={(event) => {
        // Close on backdrop clicks, which target the dialog itself.
        const dialog = event.currentTarget;
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const outside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;
        if (outside) dialog.close();
      }}
    >
      <div className={styles.head}>
        <h2 id="dialog-title" className={styles.title}>
          {copy.title}
        </h2>
        <button
          className={styles.close}
          type="button"
          aria-label={copy.close}
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </div>
      <p className={styles.intro}>{copy.intro}</p>
      <form
        onSubmit={handleSubmit}
        onInput={(event) => {
          if (event.target instanceof HTMLInputElement) {
            event.target.setCustomValidity("");
          }
        }}
      >
        <div className={styles.fields}>
          <div className={cn(styles.field, styles.full)}>
            <label htmlFor="demo-school">{copy.fields.school}</label>
            <input
              id="demo-school"
              name="school"
              autoComplete="organization"
              required
              maxLength={160}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="demo-name">{copy.fields.name}</label>
            <input
              id="demo-name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="demo-role">{copy.fields.role}</label>
            <select id="demo-role" name="role">
              {copy.roleOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="demo-phone">{copy.fields.phone}</label>
            <input
              id="demo-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={40}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="demo-size">{copy.fields.size}</label>
            <select id="demo-size" name="size">
              {copy.sizeOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="button" type="submit">
          {copy.submit}
          <Icon name="arrow" />
        </button>
        <p className={styles.note}>{copy.note}</p>
        <p className={styles.status} role="status" hidden={!prepared}>
          {copy.status}
        </p>
      </form>
    </dialog>
  );
}
