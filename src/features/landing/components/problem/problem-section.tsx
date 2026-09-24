import { useTranslations } from "next-intl";
import Image from "next/image";

import { evidenceRows, images, problemGaps } from "../../constants";
import { lineBreaks } from "../../lib/rich-text";
import { EvidencePanel } from "./evidence-panel";
import styles from "./problem-section.module.css";

export function ProblemSection() {
  const t = useTranslations("Landing.Problem");

  return (
    <section className="section" id="problem" aria-labelledby="problem-title">
      <div className="wrap">
        <div className="section-intro">
          <div>
            <span className="label">{t("label")}</span>
            <h2 id="problem-title">{t("title")}</h2>
          </div>
          <p className="body-copy">{t("body")}</p>
        </div>
        <div className={styles.gaps}>
          <p>{t("gaps.lead")}</p>
          <ul>
            {problemGaps.map((gap) => (
              <li key={gap}>{t(`gaps.items.${gap}`)}</li>
            ))}
          </ul>
        </div>
        <div className={styles.grid}>
          <div className={styles.scoreCard}>
            <Image
              {...images.classroom}
              alt=""
              className={styles.scorePhoto}
              sizes="(max-width: 560px) 100vw, 480px"
            />
            <small className={styles.sampleLabel}>
              {t("score.sampleLabel")}
            </small>
            <div className={styles.scoreNumber}>{t("score.value")}</div>
            <h3>{t.rich("score.title", lineBreaks)}</h3>
            <p>{t("score.body")}</p>
            <span className={styles.scoreCaption}>{t("score.caption")}</span>
          </div>
          <EvidencePanel
            label={t("evidence.controlsLabel")}
            viewLabels={{
              score: t("evidence.scoreView"),
              record: t("evidence.recordView"),
            }}
          >
            <dl className={styles.evidence}>
              {evidenceRows.map((row) => (
                <div key={row}>
                  <dt>{t(`evidence.rows.${row}.term`)}</dt>
                  <dd>
                    <span className={styles.value}>
                      {t(`evidence.rows.${row}.value`)}
                    </span>
                    <span className={styles.empty}>
                      {t(`evidence.rows.${row}.empty`)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.result}>
              <span className={styles.recordResult}>
                {t("evidence.result")}
              </span>
              <span className={styles.empty}>{t("evidence.resultEmpty")}</span>
            </p>
          </EvidencePanel>
        </div>
        <div className={styles.closing}>
          <h3>{t("closing.title")}</h3>
          <div>
            <p className="body-copy">{t("closing.body")}</p>
            <p className={styles.statement}>{t("closing.statement")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
