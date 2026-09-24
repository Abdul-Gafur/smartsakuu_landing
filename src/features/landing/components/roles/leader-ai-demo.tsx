"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";
import { prefersReducedMotion, wait } from "@/utils/motion";

import { images, type LeaderAiTopic } from "../../constants";
import styles from "./leader-ai-demo.module.css";
import { useActiveRole } from "./role-context";

export type LeaderAiAnswer = { lines: string[]; sources: string };

export type LeaderAiCopy = {
  name: string;
  badge: string;
  empty: string;
  placeholder: string;
  inputLabel: string;
  send: string;
};

type LeaderAiDemoProps = {
  copy: LeaderAiCopy;
  prompts: { topic: LeaderAiTopic; label: string }[];
  answers: Record<LeaderAiTopic, LeaderAiAnswer>;
};

type Paragraph = { text: string; source: boolean };

type Entry =
  | { id: number; kind: "question"; text: string }
  | { id: number; kind: "thinking" }
  | { id: number; kind: "answer"; paragraphs: Paragraph[]; typing: boolean };

/**
 * Lowercases a question and strips Latin accents and Arabic diacritics and
 * hamza marks, so "présence"/"presence" and "الأسبوع"/"الاسبوع" match alike.
 */
function normalizeQuestion(question: string) {
  return question
    .normalize("NFD")
    .replace(/[̀-ͯـً-ٰٟ]/g, "")
    .toLowerCase();
}

/**
 * Matches a free-text question to one of the sample answers. Keywords cover
 * English, French and Arabic (written in normalized form).
 */
function topicFor(question: string): LeaderAiTopic {
  const q = normalizeQuestion(question);
  if (
    /fee|pay|owe|balance|money|frais|paie|solde|argent|dette|رسوم|الدفع|مدفوع|سداد|مستحقات|رصيد|اموال|مصاريف/.test(
      q,
    )
  )
    return "fees";
  if (
    /attend|absen|register|missing|presence|assiduite|registre|حضور|غياب|غايب|تغيب|الدوام/.test(
      q,
    )
  )
    return "attendance";
  if (
    /attention|today|priorit|urgen|week|aujourd|semaine|اليوم|اولوي|عاجل|الاسبوع|انتباه|اهتمام/.test(
      q,
    )
  )
    return "attention";
  if (
    /trend|chang|improv|over time|last three|terms|years|tendance|evolu|progres|amelior|trimestres|annees|au fil|اتجاه|تطور|تغير|تحسن|مع الوقت|سنوات/.test(
      q,
    )
  )
    return "trend";
  if (
    /topic|gap|weak|most often|common|notion|sujet|theme|chapitre|lacune|faible|frequent|موضوع|مواضيع|فجو|ضعف|ضعيف|شيوع|تكرار/.test(
      q,
    )
  )
    return "topics";
  if (
    /math|learner|student|struggl|behind|score|result|exam|bece|class|eleve|apprenant|etudiant|difficult|retard|note|decroch|رياضيات|متعلم|طالب|طلاب|تلميذ|تلاميذ|صعوب|تعثر|متاخر|درجات|نتيج|نتائج|امتحان|اختبار/.test(
      q,
    )
  )
    return "learners";
  return "other";
}

/**
 * An illustrative School AI chat: a question goes in and a sample answer is
 * written out. Nothing leaves the page.
 */
export function LeaderAiDemo({ copy, prompts, answers }: LeaderAiDemoProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const askedRef = useRef(false);
  const nextIdRef = useRef(0);
  const visible = useActiveRole() === "leaders";

  const ask = useCallback(
    async (question: string, topic = topicFor(question)) => {
      const text = question.trim();
      if (!text) return;

      askedRef.current = true;
      setBusy(true);
      const instant = prefersReducedMotion();
      const questionId = nextIdRef.current++;
      const answerId = nextIdRef.current++;

      const updateAnswer = (paragraphs: Paragraph[], typing = true) =>
        setEntries((current) =>
          current.map((entry) =>
            entry.id === answerId
              ? { id: answerId, kind: "answer", paragraphs, typing }
              : entry,
          ),
        );

      setEntries((current) => [
        ...current,
        { id: questionId, kind: "question", text },
        { id: answerId, kind: "thinking" },
      ]);
      await wait(instant ? 0 : 650);

      const { lines, sources } = answers[topic];
      const script: Paragraph[] = [
        ...lines.map((line) => ({ text: line, source: false })),
        { text: sources, source: true },
      ];
      const written: Paragraph[] = [];
      updateAnswer([]);

      for (const paragraph of script) {
        if (instant) {
          written.push(paragraph);
          updateAnswer([...written]);
        } else {
          // Write the line out two characters at a time.
          for (let i = 1; i <= paragraph.text.length; i += 2) {
            const partial = {
              ...paragraph,
              text: paragraph.text.slice(0, i + 1),
            };
            updateAnswer([...written, partial]);
            await wait(14);
          }
          written.push(paragraph);
        }
        await wait(instant ? 0 : 120);
      }

      updateAnswer(written, false);
      setBusy(false);
    },
    [answers],
  );

  // Keep the newest message in view as the answer is written.
  useLayoutEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  // Show the first answer being written when the panel first appears.
  useEffect(() => {
    if (!visible || askedRef.current) return;
    const [firstPrompt] = prompts;
    void ask(firstPrompt.label, firstPrompt.topic);
  }, [visible, ask, prompts]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;

    const question = input.value;
    input.value = "";
    void ask(question).then(() => input.focus({ preventScroll: true }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <span className={styles.mark} aria-hidden="true">
          <Image {...images.logoMark} alt="" sizes="20px" />
        </span>
        <div>
          <b>{copy.name}</b>
          <small>{copy.badge}</small>
        </div>
      </div>
      <div ref={logRef} className={styles.log} aria-live="polite">
        {entries.length === 0 ? (
          <p className={styles.empty}>{copy.empty}</p>
        ) : (
          entries.map((entry) => {
            switch (entry.kind) {
              case "question":
                return (
                  <p key={entry.id} className={styles.question}>
                    {entry.text}
                  </p>
                );
              case "thinking":
                return (
                  <div
                    key={entry.id}
                    className={cn(styles.answer, styles.thinking)}
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                );
              case "answer":
                return (
                  <div
                    key={entry.id}
                    className={cn(styles.answer, entry.typing && styles.typing)}
                  >
                    {entry.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className={paragraph.source ? styles.source : undefined}
                      >
                        {paragraph.text}
                      </p>
                    ))}
                  </div>
                );
            }
          })
        )}
      </div>
      <div className={styles.prompts}>
        {prompts.map((prompt) => (
          <button
            key={prompt.topic}
            type="button"
            disabled={busy}
            onClick={() => void ask(prompt.label, prompt.topic)}
          >
            {prompt.label}
          </button>
        ))}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="question"
          placeholder={copy.placeholder}
          aria-label={copy.inputLabel}
          autoComplete="off"
          disabled={busy}
        />
        <button type="submit" aria-label={copy.send} disabled={busy}>
          <Icon name="arrow" />
        </button>
      </form>
    </div>
  );
}
