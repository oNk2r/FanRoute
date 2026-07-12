export interface Team {
  id: string;
  name: string;
  flag: string; // Emoji representing the flag
  group: string;
  code: string; // 3-letter FIFA code
  confederation?: string;
}

export interface Match {
  id: string;
  stage: string; // e.g., "Group Stage", "Round of 32", "Round of 16", "Quarter-finals", "Semi-finals", "Final"
  group?: string; // e.g. "Group A"
  teamA: Team;
  teamB: Team;
  date: string; // ISO format 'YYYY-MM-DD'
  timeUTC: string; // Match kickoff time in UTC 'HH:MM'
  venue: string;
  city: string;
}

export type TimezoneOption = {
  label: string;
  value: string; // Timezone name, e.g. "UTC", "America/New_York", "Europe/London", etc.
  offset: number; // Offset from UTC in hours
};



