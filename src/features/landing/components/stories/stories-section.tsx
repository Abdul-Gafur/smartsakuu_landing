import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { schoolStories, storyIds, type StoryId } from "../../constants";
import { externalLink, lineBreaks } from "../../lib/rich-text";
import { DemoTrigger } from "../demo-dialog/demo-trigger";
import { SelectRoleLink } from "../roles/select-role-link";
import { StorySlider } from "./story-slider";
import styles from "./stories-section.module.css";

export function StoriesSection() {
  const t = useTranslations("Landing.Stories");

  const ctaFor = (story: StoryId) => {
    const label = (
      <>
        {t(`slides.${story}.cta`)}
        <Icon name="arrow" />
      </>
    );
    const className = cn("text-link", styles.cta);

    // Parents have no role tab; their story leads to a demo instead.
    return story === "parents" ? (
      <DemoTrigger className={className}>{label}</DemoTrigger>
    ) : (
      <SelectRoleLink role={story} className={className}>
        {label}
      </SelectRoleLink>
    );
  };

  return (
    <section
      className={cn("section", styles.section)}
      id="stories"
      aria-labelledby="stories-title"
    >
      <StorySlider
        heading={
          <div>
            <span className="label">{t("label")}</span>
            <h2 id="stories-title" className={styles.title}>
              {t.rich("title", lineBreaks)}
            </h2>
          </div>
        }
        tablistLabel={t("tablistLabel")}
        previousLabel={t("previous")}
        nextLabel={t("next")}
        slides={storyIds.map((story) => ({
          id: story,
          tabLabel: t(`tabs.${story}`),
          content: (
            <>
              <div className={styles.photo}>
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={schoolStories[story].poster}
                  aria-label={t(`slides.${story}.videoLabel`)}
                >
                  <source src={schoolStories[story].video} type="video/mp4" />
                  {t("videoFallback")}
                </video>
              </div>
              <div className={styles.copy}>
                <small>{t(`slides.${story}.eyebrow`)}</small>
                <h3>{t.rich(`slides.${story}.title`, lineBreaks)}</h3>
                <p>{t(`slides.${story}.body`)}</p>
                {ctaFor(story)}
              </div>
            </>
          ),
        }))}
        footer={
          <p className="disclosure">
            {t.rich("disclosure", {
              students: externalLink(schoolStories.students.creditUrl),
              teachers: externalLink(schoolStories.teachers.creditUrl),
              parents: externalLink(schoolStories.parents.creditUrl),
            })}
          </p>
        }
      />
    </section>
  );
}
