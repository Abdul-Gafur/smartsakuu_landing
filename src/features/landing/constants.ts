/**
 * Non-translatable landing page data: identifiers, asset paths, media sources
 * and credit links. All visible copy lives in the `Landing` message namespace.
 */

export const CONTACT_EMAIL = "hello@smartsakuu.com";

export const UNICEF_SOURCE_URL =
  "https://www.unicef.org/ghana/media/8671/file/EDUCATION%20BUDGET%20BRIEF%202025..pdf";

const ASSET_ROOT = "/assets/smartsakuu";

type ImageAsset = { src: string; width: number; height: number };

export const images = {
  logo: { src: `${ASSET_ROOT}/logo.png`, width: 505, height: 110 },
  logoMark: { src: `${ASSET_ROOT}/logo-mark.png`, width: 87, height: 87 },
  classroom: { src: `${ASSET_ROOT}/classroom.jpg`, width: 1400, height: 932 },
  teacher: { src: `${ASSET_ROOT}/teacher.jpg`, width: 1000, height: 1500 },
  planning: { src: `${ASSET_ROOT}/planning.jpg`, width: 900, height: 1350 },
  educator: { src: `${ASSET_ROOT}/educator.jpg`, width: 900, height: 600 },
  lessonPlan: {
    src: `${ASSET_ROOT}/lesson-plan.webp`,
    width: 1664,
    height: 945,
  },
} satisfies Record<string, ImageAsset>;

/** Decorative photographs above the Ghana section, in display order. */
export const ghanaPortraits = [
  images.planning,
  images.educator,
  images.teacher,
  images.planning,
  images.classroom,
];

export const navSections = ["problem", "record", "roles", "ghana"] as const;

export const problemGaps = [
  "behind",
  "topics",
  "warning",
  "support",
  "helped",
  "dropout",
] as const;

export const evidenceRows = [
  "mastery",
  "history",
  "attendance",
  "support",
  "outcome",
] as const;

export const impactStats = ["literacy", "schooling"] as const;

export const schoolProcesses = [
  "admissions",
  "records",
  "attendance",
  "fees",
  "hr",
  "assessments",
  "examinations",
  "curriculum",
  "teaching",
  "reporting",
] as const;

export const adoptionSteps = ["operations", "record", "ai"] as const;

export const recordInputs = [
  "taught",
  "performed",
  "support",
  "school",
] as const;

export const recordFields = [
  "history",
  "focus",
  "curriculum",
  "activity",
  "attendance",
  "support",
] as const;

export const recordOutputs = [
  "persists",
  "changed",
  "next",
  "operations",
] as const;

export const learningLoop = [
  "identify",
  "support",
  "reassess",
  "changed",
  "next",
] as const;

export const valueRoles = [
  "leaders",
  "teachers",
  "students",
  "parents",
] as const;

export const roleIds = ["teachers", "students", "leaders"] as const;
export type RoleId = (typeof roleIds)[number];

export const roleBenefits = {
  teachers: ["generic", "contextual", "control"],
  students: ["focus", "tutor", "incentives"],
  leaders: ["sources", "access"],
} as const satisfies Record<RoleId, readonly string[]>;

export const leaderAiTopics = [
  "learners",
  "topics",
  "trend",
  "attention",
  "fees",
  "attendance",
  "other",
] as const;
export type LeaderAiTopic = (typeof leaderAiTopics)[number];

/** Suggested questions, in display order. The first one plays automatically. */
export const leaderAiPrompts = ["learners", "topics", "trend"] as const;

export const storyIds = ["students", "teachers", "parents"] as const;
export type StoryId = (typeof storyIds)[number];

export const schoolStories = {
  students: {
    poster: images.classroom.src,
    video:
      "https://videos.pexels.com/video-files/5266380/5266380-uhd_4096_2160_30fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/kids-doing-their-homework-5266380/",
  },
  teachers: {
    poster: images.planning.src,
    video:
      "https://videos.pexels.com/video-files/5734867/5734867-hd_1920_1080_30fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/teacher-in-a-classroom-with-students-5734867/",
  },
  parents: {
    poster: images.educator.src,
    video:
      "https://videos.pexels.com/video-files/8211859/8211859-uhd_2160_3840_24fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/parents-helping-their-daughter-with-homework-8211859/",
  },
} satisfies Record<
  StoryId,
  { poster: string; video: string; creditUrl: string }
>;

export const examResources = [
  "pastQuestions",
  "timed",
  "mocks",
  "revision",
  "tutoring",
  "topics",
] as const;

export const memorySteps = [
  "happened",
  "tried",
  "changed",
  "attention",
] as const;
export const memoryTags = ["assessments", "classes", "interventions"] as const;

export const reviewSteps = ["drafts", "reviews", "approves"] as const;
export const principles = [
  "control",
  "access",
  "oversight",
  "context",
] as const;

export const proofStats = ["schools", "learners", "teachers"] as const;

export const ghanaFacts = [
  "curriculum",
  "exams",
  "workflows",
  "payments",
  "languages",
] as const;

export const headteacherStoryIds = [
  "kumasi",
  "accra",
  "tamale",
  "takoradi",
] as const;
export type HeadteacherStoryId = (typeof headteacherStoryIds)[number];

export const headteacherStories = {
  kumasi: {
    poster: `${ASSET_ROOT}/leader-1.jpg`,
    video:
      "https://videos.pexels.com/video-files/5904781/5904781-hd_720_1280_24fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/smiling-teacher-posing-looking-at-camera-5904781/",
  },
  accra: {
    poster: `${ASSET_ROOT}/leader-2.jpg`,
    video:
      "https://videos.pexels.com/video-files/8617321/8617321-hd_1280_720_25fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/male-teacher-looking-at-the-camera-8617321/",
  },
  tamale: {
    poster: `${ASSET_ROOT}/leader-3.jpg`,
    video:
      "https://videos.pexels.com/video-files/6672045/6672045-hd_1280_720_24fps.mp4",
    creditUrl:
      "https://www.pexels.com/video/a-teacher-talking-to-his-student-6672045/",
  },
  takoradi: {
    poster: `${ASSET_ROOT}/leader-4.jpg`,
    video:
      "https://videos.pexels.com/video-files/5904548/5904548-hd_720_1280_24fps.mp4",
    creditUrl: "https://www.pexels.com/video/5904548/",
  },
} satisfies Record<
  HeadteacherStoryId,
  { poster: string; video: string; creditUrl: string }
>;

/** The headteacher story shown first. */
export const initialHeadteacherStory = 1;

export const demoRoleOptions = [
  "head",
  "admin",
  "teacher",
  "parent",
  "district",
  "other",
] as const;

export const demoSizeOptions = [
  "under200",
  "to500",
  "to1000",
  "over1000",
] as const;
