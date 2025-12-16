import type { components } from "$lib/schemas/bgm-public-api";
import { DateTime } from "luxon";
import { match, P } from "ts-pattern";

type SubjectCollection = components["schemas"]["UserSubjectCollection"];

/**
 * 判断条目是否在指定年份播出（按照东京时区解析）
 */
export function onAirInYear(
  collectedSubject: SubjectCollection,
  year: number,
): boolean {
  const dateStr = collectedSubject.subject?.date;
  if (!dateStr) return false;

  const dateOnAir = DateTime.fromISO(dateStr, { zone: "Asia/Tokyo" });
  return dateOnAir.isValid && dateOnAir.year === year;
}

/**
 * 判断条目是否在指定年份完成（东京时区）
 */
export function doneInYear(
  collectedSubject: SubjectCollection,
  year: number,
): boolean {
  const updatedIsoStr = collectedSubject.updated_at;
  if (!updatedIsoStr) return false;

  const updatedAt = DateTime.fromISO(updatedIsoStr);
  return updatedAt.isValid && updatedAt.year === year;
}

export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

/**
 * 判断条目的季度
 * 规则：
 * Q1: 01-01 至 03-21
 * Q2: 04-01(-7d) 至 06-21
 * Q3: 07-01(-7d) 至 09-21
 * Q4: 10-01(-7d) 至 12-31
 */
export function getQuarter(
  collectedSubject: SubjectCollection,
): Quarter | undefined {
  const dateStr = collectedSubject.subject?.date;
  if (!dateStr) return undefined;

  const dt = DateTime.fromISO(dateStr, { zone: "Asia/Tokyo" });
  if (!dt.isValid) return undefined;

  const year = dt.year;
  const zone = { zone: "Asia/Tokyo" };

  const d = (m: number, d: number) =>
    DateTime.fromObject({ year, month: m, day: d }, zone);

  const intervals = [
    { name: "Q1", start: d(1, 1), end: d(3, 21) },
    { name: "Q2", start: d(4, 1).minus(7), end: d(6, 21) },
    { name: "Q3", start: d(7, 1).minus(7), end: d(9, 21) },
    { name: "Q4", start: d(10, 1).minus(7), end: d(12, 31) },
  ] as const;

  return match(dt)
    .with(
      P.when((t) => t >= intervals[0].start && t <= intervals[0].end),
      () => "Q1" as const,
    )
    .with(
      P.when((t) => t >= intervals[1].start && t <= intervals[1].end),
      () => "Q2" as const,
    )
    .with(
      P.when((t) => t >= intervals[2].start && t <= intervals[2].end),
      () => "Q3" as const,
    )
    .with(
      P.when((t) => t >= intervals[3].start && t <= intervals[3].end),
      () => "Q4" as const,
    )
    .otherwise(() => undefined);
}
