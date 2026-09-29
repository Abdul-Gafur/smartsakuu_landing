import type { useFormatter } from "next-intl";

import type { DateRange } from "../types";

type Formatter = ReturnType<typeof useFormatter>;

const longDate = {
  dateStyle: "long",
  timeZone: "UTC",
} as const;

/**
 * Formats an ISO date such as "2026-09-29" as a long date in the page locale.
 * The date is read and shown in UTC so the day never shifts with the server's
 * time zone.
 */
export function formatJobDate(format: Formatter, isoDate: string) {
  return format.dateTime(new Date(isoDate), longDate);
}

/** Formats a date range compactly, e.g. "October 26 – 30, 2026". */
export function formatJobDateRange(format: Formatter, range: DateRange) {
  return format.dateTimeRange(
    new Date(range.start),
    new Date(range.end),
    longDate,
  );
}
