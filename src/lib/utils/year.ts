import { DateTime } from "luxon";
import type { components } from "$lib/schemas/bgm_private_api";

type SlimSubject = components["schemas"]["SlimSubject"];

/**
 * Unix seconds -> UTC DateTime
 */
function fromUnixSecondsUtc(seconds: number): DateTime {
  return DateTime.fromSeconds(seconds);
}

/**
 * Parse "YYYY年M月D日" (JST) -> UTC DateTime
 */
function parseJstDateStringToUtc(info: string): DateTime | undefined {
  const match = info.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match.map(Number);

  const jst = DateTime.fromObject({ year, month, day }, { zone: "Asia/Tokyo" });

  return jst.isValid ? jst.toUTC() : undefined;
}

export function onAirInYear(subject: SlimSubject, year: number): boolean {
  const dateUtc = parseJstDateStringToUtc(subject.info);
  return dateUtc?.year === year;
}

export function doneInYear(subject: SlimSubject, year: number): boolean {
  const updatedAt = subject.interest?.updatedAt;
  if (!updatedAt) {
    return false;
  }
  return fromUnixSecondsUtc(updatedAt).year === year;
}
