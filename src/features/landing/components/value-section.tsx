import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { valueRoles, type RoleId } from "../constants";
import { SelectRoleLink } from "./roles/select-role-link";
import styles from "./value-section.module.css";

type ValueRole = (typeof valueRoles)[number];

const icons: Record<ValueRole, IconName> = {
  leaders: "operations",
  teachers: "teaching",
  students: "learning",
  parents: "community",
};

export function ValueSection() {
  const t = useTranslations("Landing.Value");

  // Parents have no AI tab; the other roles link to theirs.
  const link = (role: RoleId, label: string) => (
    <SelectRoleLink role={role} className={cn("text-link", styles.link)}>
      {label}
      <Icon name="arrow" />
    </SelectRoleLink>
  );

  const details: Record<ValueRole, ReactNode> = {
    leaders: (
      <>
        <p className={styles.quote}>
          <b>{t("roles.leaders.quoteLabel")}</b> {t("roles.leaders.quote")}
        </p>
        {link("leaders", t("roles.leaders.link"))}
      </>
    ),
    teachers: link("teachers", t("roles.teachers.link")),
    students: link("students", t("roles.students.link")),
    parents: (
      <>
        <p className={cn(styles.quote, styles.before)}>
          {t("roles.parents.from")}
        </p>
        <p className={styles.toward}>{t("roles.parents.toLabel")}</p>
        <p className={styles.quote}>{t("roles.parents.to")}</p>
      </>
    ),
  };

  return (
    <section
      className={cn("section", styles.section)}
      id="value"
      aria-labelledby="value-title"
    >
      <div className="wrap">
        <div className={styles.heading}>
          <span className="label">{t("label")}</span>
          <h2 id="value-title">{t("title")}</h2>
        </div>
        <div className={styles.grid}>
          {valueRoles.map((role) => (
            <article key={role}>
              <h3>{t(`roles.${role}.title`)}</h3>
              <p className={styles.body}>{t(`roles.${role}.body`)}</p>
              {details[role]}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
