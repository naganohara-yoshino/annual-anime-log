import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { components } from "$lib/schemas/bgm_private_api";

type SlimSubject = components["schemas"]["SlimSubject"];

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const JST = "Asia/Tokyo";

function fromUnixSeconds(ts: number): dayjs.Dayjs {
  return dayjs.unix(ts).utc();
}

function fromJstDateString(info: string): dayjs.Dayjs | null {
  const m = info.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) return null;

  const [, y, mo, d] = m;

  const date = dayjs.tz(`${y}-${mo}-${d} 00:00:00`, "YYYY-M-D HH:mm:ss", JST);

  return date.isValid() ? date.utc() : null;
}

function nowUtc(): dayjs.Dayjs {
  return dayjs.utc();
}

export function onAirInYear(subject: SlimSubject, year: number): boolean {
  const date = fromJstDateString(subject.info);
  return date !== null && date.year() === year;
}

export function doneInYear(subject: SlimSubject, year: number): boolean {
  const date = fromUnixSeconds(subject.interest?.updatedAt ?? 0);
  return date !== null && date.year() === year;
}
