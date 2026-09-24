import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import {
  learningLoop,
  recordFields,
  recordInputs,
  recordOutputs,
} from "../constants";
import { lineBreaks } from "../lib/rich-text";
import styles from "./record-section.module.css";

/** Connector curves from each list item to the record, in a 1000×420 box. */
const connectorPaths = [
  "M286 94 C326 94 312 178 361 210",
  "M286 171 C324 171 323 200 361 210",
  "M286 250 C324 250 323 220 361 210",
  "M286 328 C326 328 312 242 361 210",
  "M639 210 C688 178 674 94 714 94",
  "M639 210 C677 200 676 171 714 171",
  "M639 210 C677 220 676 250 714 250",
  "M639 210 C688 242 674 328 714 328",
];

export function RecordSection() {
  const t = useTranslations("Landing.Record");

  return (
    <section
      className={cn("section", styles.section)}
      id="record"
      aria-labelledby="record-title"
    >
      <div className="wrap">
        <div className={styles.heading}>
          <span className={cn("label", styles.label)}>{t("label")}</span>
          <h2 id="record-title">{t.rich("title", lineBreaks)}</h2>
          <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
          <p className={styles.statement}>{t("statement")}</p>
        </div>
        <div className={styles.map}>
          <svg
            className={styles.lines}
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {connectorPaths.map((path) => (
              <path key={path} d={path} />
            ))}
          </svg>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t("inputs.title")}</h3>
            <ul className={styles.list}>
              {recordInputs.map((input) => (
                <li key={input}>
                  <b>{t(`inputs.items.${input}.title`)}</b>
                  <span>{t(`inputs.items.${input}.body`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.core}>
            <header>
              <Icon name="book" />
              <div>
                <strong>{t("core.title")}</strong>
                <small>{t("core.sample")}</small>
              </div>
            </header>
            <dl>
              {recordFields.map((field) => (
                <div key={field}>
                  <dt>{t(`core.fields.${field}.term`)}</dt>
                  <dd>{t(`core.fields.${field}.value`)}</dd>
                </div>
              ))}
            </dl>
            <p>{t("core.note")}</p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t("outputs.title")}</h3>
            <ul className={styles.list}>
              {recordOutputs.map((output) => (
                <li key={output}>
                  <b>{t(`outputs.items.${output}.title`)}</b>
                  <span>{t(`outputs.items.${output}.body`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.loop}>
          <h3>{t("loop.title")}</h3>
          <ol>
            {learningLoop.map((step, index) => (
              <li key={step}>
                <b>{t(`loop.steps.${step}`)}</b>
              </li>
            ))}
          </ol>
          <p>{t("loop.note")}</p>
        </div>
      </div>
    </section>
  );
}
