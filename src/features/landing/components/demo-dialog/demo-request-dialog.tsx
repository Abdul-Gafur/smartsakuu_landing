import { useTranslations } from "next-intl";

import {
  CONTACT_EMAIL,
  demoRoleOptions,
  demoSizeOptions,
} from "../../constants";
import { lineBreaks } from "../../lib/rich-text";
import { DemoDialog } from "./demo-dialog";

export function DemoRequestDialog() {
  const t = useTranslations("Landing.DemoDialog");

  return (
    <DemoDialog
      copy={{
        title: t("title"),
        close: t("close"),
        intro: t("intro"),
        fields: {
          school: t("fields.school"),
          name: t("fields.name"),
          role: t("fields.role"),
          phone: t("fields.phone"),
          size: t("fields.size"),
        },
        roleOptions: demoRoleOptions.map((value) => ({
          value,
          label: t(`roleOptions.${value}`),
        })),
        sizeOptions: demoSizeOptions.map((value) => ({
          value,
          label: t(`sizeOptions.${value}`),
        })),
        submit: t("submit"),
        note: t.rich("note", {
          ...lineBreaks,
          email: CONTACT_EMAIL,
          link: (chunks) => <a href={`mailto:${CONTACT_EMAIL}`}>{chunks}</a>,
        }),
        status: t("status"),
        required: t("required"),
        email: {
          subject: t("email.subject"),
          school: t("email.school"),
          name: t("email.name"),
          role: t("email.role"),
          phone: t("email.phone"),
          learners: t("email.learners"),
          closing: t("email.closing"),
        },
      }}
    />
  );
}
