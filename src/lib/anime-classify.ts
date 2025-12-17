import { DateTime } from "luxon";
import { match, P } from "ts-pattern";
import { fetchSubjectCollectionPlatform } from "$lib/anime-fetch";
import type { components } from "$lib/schemas/bgm-public-api";

type SubjectCollection = components["schemas"]["UserSubjectCollection"];

/**
 * 判断条目是否在指定年份完成（东京时区）
 */
export function isDoneInYear(
  collectedSubject: SubjectCollection,
  year: number,
): boolean {
  const updatedIsoStr = collectedSubject.updated_at;
  if (!updatedIsoStr) return false;

  const updatedAt = DateTime.fromISO(updatedIsoStr);
  return updatedAt.isValid && updatedAt.year === year;
}

/**
 * 判断条目是否在指定年份播出（按照东京时区解析）
 */
export function isOnAirInYear(
  collectedSubject: SubjectCollection,
  year: number,
): boolean {
  const dateStr = collectedSubject.subject?.date;
  if (!dateStr) return false;

  const dateOnAir = DateTime.fromISO(dateStr, { zone: "Asia/Tokyo" });
  return dateOnAir.isValid && dateOnAir.year === year;
}

export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

/**
 * 返回条目的季度
 * 规则：
 * Q1: 01-01 至 03-21
 * Q2: 04-01(-7d) 至 06-21
 * Q3: 07-01(-7d) 至 09-21
 * Q4: 10-01(-7d) 至 12-31
 */
export function getSubjectQuarter(
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

/**
 * 判断条目是否为TV动画
 */
export async function isTvAnime(
  collectedSubject: SubjectCollection,
): Promise<boolean> {
  const platform = await fetchSubjectCollectionPlatform(collectedSubject);
  if (!platform) return false;
  return platform === "TV";
}

export type SplitResult = Record<Quarter | "Others", SubjectCollection[]>;

/**
 * 按季度 + Others 劈分 SubjectCollection[]
 * 内部并发处理异步 TV 判断
 */
export async function splitByQuarter(
  collectedSubjects: SubjectCollection[],
): Promise<SplitResult> {
  const result: SplitResult = {
    Q1: [],
    Q2: [],
    Q3: [],
    Q4: [],
    Others: [],
  };

  // 并发处理 TV 判断
  const checks = collectedSubjects.map(async (subj) => {
    // 判断是否 TV
    const isTv = await isTvAnime(subj);
    if (!isTv) return { subj, quarter: "Others" as const };

    // 判断季度
    const quarter = getSubjectQuarter(subj);
    return { subj, quarter: quarter ?? ("Others" as const) };
  });

  const results = await Promise.all(checks);

  // 按季度归类
  for (const { subj, quarter } of results) {
    result[quarter].push(subj);
  }

  return result;
}
