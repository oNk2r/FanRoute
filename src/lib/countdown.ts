export interface CountdownResult {
  label: string;
  days: number;
  hours: number;
  minutes: number;
  status: "UPCOMING" | "LIVE" | "FINISHED";
}

/**
 * Calculates the exact remaining time until a match starts.
 *
 * @param matchDateStr "YYYY-MM-DD" style date
 * @param matchTimeUtcStr "HH:MM" style UTC kickoff time
 * @param currentTime Date object to represent current time (useful for mocking/current time lock)
 */
export function getCountdown(
  matchDateStr: string,
  matchTimeUtcStr: string,
  currentTime: Date = new Date()
): CountdownResult {
  const matchIsoStr = `${matchDateStr}T${matchTimeUtcStr}:00Z`;
  const matchDate = new Date(matchIsoStr);
  const diffMs = matchDate.getTime() - currentTime.getTime();

  // If match has already kicked off
  if (diffMs <= 0) {
    const matchDurationMs = 120 * 60 * 1000; // Average football draft duration including halftime (2 hours)
    if (Math.abs(diffMs) < matchDurationMs) {
      return {
        label: "Live Now",
        days: 0,
        hours: 0,
        minutes: 0,
        status: "LIVE",
      };
    } else {
      return {
        label: "Finished",
        days: 0,
        hours: 0,
        minutes: 0,
        status: "FINISHED",
      };
    }
  }

  // Calculate divisions
  const minMs = 60 * 1000;
  const hourMs = 60 * minMs;
  const dayMs = 24 * hourMs;

  const days = Math.floor(diffMs / dayMs);
  const hours = Math.floor((diffMs % dayMs) / hourMs);
  const minutes = Math.floor((diffMs % hourMs) / minMs);

  let label = "";
  if (days > 1) {
    label = `${days} Days Left`;
  } else if (days === 1) {
    label = `Tomorrow (${hours}h remaining)`;
  } else if (hours > 0) {
    label = `${hours}h ${minutes}m Left`;
  } else {
    label = `${minutes} min Left`;
  }

  return {
    label,
    days,
    hours,
    minutes,
    status: "UPCOMING",
  };
}
