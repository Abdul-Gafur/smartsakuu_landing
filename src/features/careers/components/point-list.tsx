import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

import styles from "./point-list.module.css";

type PointListProps = HTMLAttributes<HTMLUListElement> & {
  items: string[];
  /** `solid` for essentials, `ring` for everything else. */
  marker?: "solid" | "ring";
};

/** A bulleted list of plain-text points from a job posting. */
export function PointList({
  items,
  marker = "ring",
  className,
  ...props
}: PointListProps) {
  return (
    <ul className={cn(styles.list, styles[marker], className)} {...props}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
