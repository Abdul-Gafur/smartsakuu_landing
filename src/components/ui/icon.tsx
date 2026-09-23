import type { ReactNode } from "react";

const icons = {
  arrow: (
    <path
      d="M4 12h15m-6-6 6 6-6 6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  book: (
    <path
      d="M12 5v15M12 5C9 3 5 3 2 4v14c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 1Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  spark: (
    <path
      d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  operations: (
    <path
      d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5M12 5V2.5h3M8.5 12h1m5 0h1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  teaching: (
    <path
      d="M9 3.5h6v3H9zM9 5H6.5a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 5H15M9 14l2 2 4-4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  learning: (
    <path
      d="m2 9 10-5 10 5-10 5L2 9ZM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  community: (
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5c1.9.9 3 3 3 6" />
    </g>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

/** Decorative stroke icon; size it with CSS. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
