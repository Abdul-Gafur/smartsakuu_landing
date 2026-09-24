import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import {
  headteacherStories,
  headteacherStoryIds,
  initialHeadteacherStory,
} from "../../constants";
import { externalLink, lineBreaks } from "../../lib/rich-text";
import { DemoTrigger } from "../demo-dialog/demo-trigger";
import styles from "./headteachers-section.module.css";
import { TestimonialCarousel } from "./testimonial-carousel";

export function HeadteachersSection() {
  const t = useTranslations("Landing.Headteachers");

  return (
    <section
      className={cn("section", styles.section)}
      id="headteacher-stories"
      aria-labelledby="leaders-title"
    >
      <div className="wrap">
        <div className={styles.copy}>
          <span className="label">{t("label")}</span>
          <h2 id="leaders-title" className={styles.title}>
            {t.rich("title", lineBreaks)}
          </h2>
          <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
        </div>
        <TestimonialCarousel
          initialIndex={initialHeadteacherStory}
          labels={{
            previous: t("previous"),
            next: t("next"),
            dots: t("dotsLabel"),
            play: t("play"),
          }}
          testimonials={headteacherStoryIds.map((id, index) => ({
            id,
            poster: headteacherStories[id].poster,
            video: headteacherStories[id].video,
            videoLabel: t(`stories.${id}.videoLabel`),
            quote: t(`stories.${id}.quote`),
            role: t(`stories.${id}.role`),
            place: t(`stories.${id}.place`),
            dotLabel: t("dotLabel", {
              index: index + 1,
              total: headteacherStoryIds.length,
            }),
          }))}
        />
      </div>
    </section>
  );
}
