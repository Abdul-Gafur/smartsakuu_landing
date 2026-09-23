/** Joins the truthy class names into a single `className` string. */
export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
