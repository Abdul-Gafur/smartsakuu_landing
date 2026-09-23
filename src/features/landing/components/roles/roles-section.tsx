import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import {
  images,
  leaderAiPrompts,
  leaderAiTopics,
  roleBenefits,
  roleIds,
  type LeaderAiTopic,
  type RoleId,
} from "../../constants";
import { LeaderAiDemo, type LeaderAiAnswer } from "./leader-ai-demo";
import { RolesShowcase } from "./roles-showcase";
import styles from "./roles-section.module.css";

const imageSizes = "(max-width: 800px) 100vw, 520px";

export function RolesSection() {
  const t = useTranslations("Landing.Roles");
  const tAi = useTranslations("Landing.LeaderAi");

  // Built per role so every message key stays type-checked.
  const benefits: Record<
    RoleId,
    { id: string; title: string; body: string }[]
  > = {
    students: roleBenefits.students.map((id) => ({
      id,
      title: t(`panels.students.benefits.${id}.title`),
      body: t(`panels.students.benefits.${id}.body`),
    })),
    teachers: roleBenefits.teachers.map((id) => ({
      id,
      title: t(`panels.teachers.benefits.${id}.title`),
      body: t(`panels.teachers.benefits.${id}.body`),
    })),
    leaders: roleBenefits.leaders.map((id) => ({
      id,
      title: t(`panels.leaders.benefits.${id}.title`),
      body: t(`panels.leaders.benefits.${id}.body`),
    })),
  };

  const visuals: Record<RoleId, ReactNode> = {
    students: (
      <figure className={styles.image}>
        <Image
          {...images.classroom}
          alt={t("panels.students.imageAlt")}
          sizes={imageSizes}
        />
        <figcaption>
          <b>{t("panels.students.captionTitle")}</b>
          {t("panels.students.caption")}
        </figcaption>
      </figure>
    ),
    teachers: (
      <figure className={cn(styles.image, styles.product)}>
        <Image
          {...images.lessonPlan}
          alt={t("panels.teachers.imageAlt")}
          sizes={imageSizes}
        />
        <figcaption>
          <b>{t("panels.teachers.captionTitle")}</b>
          {t("panels.teachers.caption")}
        </figcaption>
      </figure>
    ),
    leaders: (
      <LeaderAiDemo
        copy={{
          name: tAi("name"),
          badge: tAi("badge"),
          empty: tAi("empty"),
          placeholder: tAi("placeholder"),
          inputLabel: tAi("inputLabel"),
          send: tAi("send"),
        }}
        prompts={leaderAiPrompts.map((topic) => ({
          topic,
          label: tAi(`prompts.${topic}`),
        }))}
        answers={
          Object.fromEntries(
            leaderAiTopics.map((topic) => [
              topic,
              {
                lines: tAi.raw(`answers.${topic}.lines`) as string[],
                sources: tAi(`answers.${topic}.sources`),
              },
            ]),
          ) as Record<LeaderAiTopic, LeaderAiAnswer>
        }
      />
    ),
  };

  return (
    <RolesShowcase
      intro={
        <>
          <div>
            <span className="label">{t("label")}</span>
            <h2 id="roles-title">{t("title")}</h2>
          </div>
          <p className="body-copy">{t("body")}</p>
        </>
      }
      tablistLabel={t("tablistLabel")}
      tabs={roleIds.map((role) => ({
        id: role,
        label: t(`tabs.${role}`),
        panel: (
          <>
            <div>
              <h3 className={styles.panelTitle}>{t(`panels.${role}.title`)}</h3>
              <p className={cn("body-copy", styles.panelBody)}>
                {t(`panels.${role}.body`)}
              </p>
              <ul className={styles.benefits}>
                {benefits[role].map((benefit) => (
                  <li key={benefit.id}>
                    <b>{benefit.title}</b>
                    <span>{benefit.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            {visuals[role]}
          </>
        ),
      }))}
    />
  );
}
