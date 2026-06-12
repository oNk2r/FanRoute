import { TimezoneOption } from "../types/match";

export const TIMEZONES: TimezoneOption[] = [
  { label: "UTC (Coordinated Universal Time)", value: "UTC", offset: 0 },
  { label: "US Eastern Time (EDT/New York)", value: "America/New_York", offset: -4 },
  { label: "US Central Time (CDT/Chicago)", value: "America/Chicago", offset: -5 },
  { label: "US Mountain Time (MDT/Denver)", value: "America/Denver", offset: -6 },
  { label: "US Pacific Time (PDT/Los Angeles)", value: "America/Los_Angeles", offset: -7 },
  { label: "Canada Atlantic Time (ADT/Halifax)", value: "America/Halifax", offset: -3 },
  { label: "Mexico City Time (CST/CDMX)", value: "America/Mexico_City", offset: -5 },
  { label: "London Time (BST)", value: "Europe/London", offset: 1 },
  { label: "Western European Time (WEST/Lisbon)", value: "Europe/Lisbon", offset: 1 },
  { label: "Central European Time (CEST/Paris)", value: "Europe/Paris", offset: 2 },
  { label: "Argentina Time (ART/Buenos Aires)", value: "America/Argentina/Buenos_Aires", offset: -3 },
  { label: "Brasilia Time (BRT/São Paulo)", value: "America/Sao_Paulo", offset: -3 },
  { label: "India Standard Time (IST)", value: "Asia/Kolkata", offset: 5.5 },
  { label: "Japan Standard Time (JST)", value: "Asia/Tokyo", offset: 9 },
  { label: "Australia Eastern Time (AEST/Sydney)", value: "Australia/Sydney", offset: 10 },
];

/**
 * Parses match date and UTC kickoff time and formats it for a given target timezone.
 *
 * @param dateStr "YYYY-MM-DD" style date
 * @param timeUtcStr "HH:MM" style 24-hour UTC time
 * @param targetTimezone The target standard IANA timezone name
 */
export function getLocalDateAndTime(
  dateStr: string,
  timeUtcStr: string,
  targetTimezone: string
) {
  // Construct the ISO string for parsing as UTC.
  // Example: "2026-06-11T22:00:00Z"
  const isoString = `${dateStr}T${timeUtcStr}:00Z`;
  const dateObj = new Date(isoString);

  // Fallback if parsing fails
  if (isNaN(dateObj.getTime())) {
    return {
      formattedDate: dateStr,
      formattedTime: timeUtcStr + " UTC",
      originalTimeStr: timeUtcStr + " UTC",
      isDifferentDate: false,
      rawDate: dateObj,
    };
  }

  // Format date in target timezone
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: targetTimezone,
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions);

  // Format time in target timezone
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: targetTimezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = dateObj.toLocaleTimeString("en-US", timeOptions);

  // Clean original formatted UTC version for context
  const utcDateOptions: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const utcFormattedDate = dateObj.toLocaleDateString("en-US", utcDateOptions);

  const utcTimeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const utcFormattedTime = dateObj.toLocaleTimeString("en-US", utcTimeOptions);

  // Check if date changed during timezone shifting
  const originalLocalDateStr = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
  
  // To get the formatted date string of the converted timezone as YYYY-MM-DD to compare:
  const targetYear = dateObj.toLocaleDateString("en-US", { timeZone: targetTimezone, year: "numeric" });
  const targetMonth = dateObj.toLocaleDateString("en-US", { timeZone: targetTimezone, month: "2-digit" });
  const targetDay = dateObj.toLocaleDateString("en-US", { timeZone: targetTimezone, day: "2-digit" });
  const targetComparisonStr = `${targetYear}-${targetMonth}-${targetDay}`;
  
  // Simplified check: does target formatted date differ from UTC format date
  const formattedUtcRef = dateObj.toLocaleDateString("en-US", { ...dateOptions, timeZone: "UTC" });
  const isDifferentDate = formattedDate !== formattedUtcRef;

  return {
    formattedDate,
    formattedTime,
    originalTimeStr: `${utcFormattedTime} (${utcFormattedDate})`,
    isDifferentDate,
    rawDate: dateObj,
  };
}

/**
 * Detects the user's browser timezone if supported, otherwise returns "UTC".
 */
export function getBrowserTimezone(): string {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected && TIMEZONES.some((tz) => tz.value === detected)) {
      return detected;
    }
    // Try to find matching offset if direct match fails
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const closest = TIMEZONES.find((tz) => Math.abs(tz.offset - offsetHours) < 0.5);
    return closest ? closest.value : "America/New_York"; // default to NY if UTC offset is missing
  } catch (e) {
    return "America/New_York";
  }
}

/**
 * Formats a Date object as a YYYY-MM-DD string under a specific timezone,
 * ensuring robust formatting free from system or environment-specific quirks.
 */
export function getLocalDateKey(dateObj: Date, targetTimezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: targetTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const parts = formatter.formatToParts(dateObj);
    const year = parts.find((p) => p.type === "year")?.value || "";
    const month = parts.find((p) => p.type === "month")?.value || "";
    const day = parts.find((p) => p.type === "day")?.value || "";
    return `${year}-${month}-${day}`;
  } catch (e) {
    // Basic fallback parsing
    const y = dateObj.getUTCFullYear();
    const m = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
}
