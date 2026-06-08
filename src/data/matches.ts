import { Match } from "../types/match";
import { TEAMS } from "./teams";

// Helper to find a team by its ID
const getTeam = (id: string) => {
  const team = TEAMS.find((t) => t.id === id);
  if (!team) {
    return { id: "unknown", name: id, flag: "🏳️", code: "UNK", group: "Group Unassigned" };
  }
  return team;
};

// Helper to generate a TBD team placeholder for knockouts
const getTBDTeam = (id: string, name: string) => ({
  id: `tbd-${id}`,
  name,
  flag: "🏳️",
  code: "TBD",
  group: "Knockout",
});

// Venue name map (official FIFA stadium names used during the tournament)
// FIFA uses generic city-based names; common names shown in parentheses
// All times are UTC

export const MATCHES: Match[] = [
  // GROUP STAGE (June 11 - June 27, 2026)
  {
    id: "m001",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("mexico"),
    teamB: getTeam("south-africa"),
    date: "2026-06-11",
    timeUTC: "19:00",
    venue: "Estadio Azteca",
    city: "Mexico City"
  },
  {
    id: "m002",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("south-korea"),
    teamB: getTeam("czechia"),
    date: "2026-06-12",
    timeUTC: "02:00",
    venue: "Estadio Akron",
    city: "Guadalajara"
  },
  {
    id: "m003",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("canada"),
    teamB: getTeam("bosnia"),
    date: "2026-06-12",
    timeUTC: "19:00",
    venue: "BMO Field",
    city: "Toronto"
  },
  {
    id: "m004",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("usa"),
    teamB: getTeam("paraguay"),
    date: "2026-06-13",
    timeUTC: "01:00",
    venue: "SoFi Stadium",
    city: "Los Angeles"
  },
  {
    id: "m005",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("qatar"),
    teamB: getTeam("switzerland"),
    date: "2026-06-13",
    timeUTC: "19:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay"
  },
  {
    id: "m006",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("brazil"),
    teamB: getTeam("morocco"),
    date: "2026-06-13",
    timeUTC: "22:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey"
  },
  {
    id: "m007",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("haiti"),
    teamB: getTeam("scotland"),
    date: "2026-06-14",
    timeUTC: "01:00",
    venue: "Gillette Stadium",
    city: "Boston"
  },
  {
    id: "m008",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("australia"),
    teamB: getTeam("turkey"),
    date: "2026-06-14",
    timeUTC: "04:00",
    venue: "BC Place",
    city: "Vancouver"
  },
  {
    id: "m009",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("germany"),
    teamB: getTeam("curacao"),
    date: "2026-06-14",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston"
  },
  {
    id: "m010",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("netherlands"),
    teamB: getTeam("japan"),
    date: "2026-06-14",
    timeUTC: "20:00",
    venue: "AT&T Stadium",
    city: "Dallas"
  },
  {
    id: "m011",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("ivory-coast"),
    teamB: getTeam("ecuador"),
    date: "2026-06-14",
    timeUTC: "23:00",
    venue: "Lincoln Financial Field",
    city: "Philadelphia"
  },
  {
    id: "m012",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("sweden"),
    teamB: getTeam("tunisia"),
    date: "2026-06-15",
    timeUTC: "02:00",
    venue: "Estadio BBVA",
    city: "Monterrey"
  },
  {
    id: "m013",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("spain"),
    teamB: getTeam("cape-verde"),
    date: "2026-06-15",
    timeUTC: "16:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta"
  },
  {
    id: "m014",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("belgium"),
    teamB: getTeam("egypt"),
    date: "2026-06-15",
    timeUTC: "19:00",
    venue: "Lumen Field",
    city: "Seattle"
  },
  {
    id: "m015",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("saudi-arabia"),
    teamB: getTeam("uruguay"),
    date: "2026-06-15",
    timeUTC: "22:00",
    venue: "Hard Rock Stadium",
    city: "Miami"
  },
  {
    id: "m016",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("iran"),
    teamB: getTeam("new-zealand"),
    date: "2026-06-16",
    timeUTC: "01:00",
    venue: "SoFi Stadium",
    city: "Los Angeles"
  },
  {
    id: "m017",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("france"),
    teamB: getTeam("senegal"),
    date: "2026-06-16",
    timeUTC: "19:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey"
  },
  {
    id: "m018",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("iraq"),
    teamB: getTeam("norway"),
    date: "2026-06-16",
    timeUTC: "22:00",
    venue: "Gillette Stadium",
    city: "Boston"
  },
  {
    id: "m019",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("argentina"),
    teamB: getTeam("algeria"),
    date: "2026-06-17",
    timeUTC: "01:00",
    venue: "Arrowhead Stadium",
    city: "Kansas City"
  },
  {
    id: "m020",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("austria"),
    teamB: getTeam("jordan"),
    date: "2026-06-17",
    timeUTC: "04:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay"
  },
  {
    id: "m021",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("portugal"),
    teamB: getTeam("congo-dr"),
    date: "2026-06-17",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston"
  },
  {
    id: "m022",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("england"),
    teamB: getTeam("croatia"),
    date: "2026-06-17",
    timeUTC: "20:00",
    venue: "AT&T Stadium",
    city: "Dallas"
  },
  {
    id: "m023",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("ghana"),
    teamB: getTeam("panama"),
    date: "2026-06-17",
    timeUTC: "23:00",
    venue: "BMO Field",
    city: "Toronto"
  },
  {
    id: "m024",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("uzbekistan"),
    teamB: getTeam("colombia"),
    date: "2026-06-18",
    timeUTC: "02:00",
    venue: "Estadio Azteca",
    city: "Mexico City"
  },
  {
    id: "m025",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("czechia"),
    teamB: getTeam("south-africa"),
    date: "2026-06-18",
    timeUTC: "16:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta"
  },
  {
    id: "m026",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("switzerland"),
    teamB: getTeam("bosnia"),
    date: "2026-06-18",
    timeUTC: "19:00",
    venue: "SoFi Stadium",
    city: "Los Angeles"
  },
  {
    id: "m027",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("canada"),
    teamB: getTeam("qatar"),
    date: "2026-06-18",
    timeUTC: "22:00",
    venue: "BC Place",
    city: "Vancouver"
  },
  {
    id: "m028",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("mexico"),
    teamB: getTeam("south-korea"),
    date: "2026-06-19",
    timeUTC: "01:00",
    venue: "Estadio Akron",
    city: "Guadalajara"
  },
  {
    id: "m029",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("usa"),
    teamB: getTeam("australia"),
    date: "2026-06-19",
    timeUTC: "19:00",
    venue: "Lumen Field",
    city: "Seattle"
  },
  {
    id: "m030",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("scotland"),
    teamB: getTeam("morocco"),
    date: "2026-06-19",
    timeUTC: "22:00",
    venue: "Gillette Stadium",
    city: "Boston"
  },
  {
    id: "m031",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("brazil"),
    teamB: getTeam("haiti"),
    date: "2026-06-20",
    timeUTC: "00:30",
    venue: "Lincoln Financial Field",
    city: "Philadelphia"
  },
  {
    id: "m032",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("turkey"),
    teamB: getTeam("paraguay"),
    date: "2026-06-20",
    timeUTC: "03:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay"
  },
  {
    id: "m033",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("netherlands"),
    teamB: getTeam("sweden"),
    date: "2026-06-20",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston"
  },
  {
    id: "m034",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("germany"),
    teamB: getTeam("ivory-coast"),
    date: "2026-06-20",
    timeUTC: "20:00",
    venue: "BMO Field",
    city: "Toronto"
  },
  {
    id: "m035",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("ecuador"),
    teamB: getTeam("curacao"),
    date: "2026-06-21",
    timeUTC: "00:00",
    venue: "Arrowhead Stadium",
    city: "Kansas City"
  },
  {
    id: "m036",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("tunisia"),
    teamB: getTeam("japan"),
    date: "2026-06-21",
    timeUTC: "04:00",
    venue: "Estadio BBVA",
    city: "Monterrey"
  },
  {
    id: "m037",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("spain"),
    teamB: getTeam("saudi-arabia"),
    date: "2026-06-21",
    timeUTC: "16:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta"
  },
  {
    id: "m038",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("belgium"),
    teamB: getTeam("iran"),
    date: "2026-06-21",
    timeUTC: "19:00",
    venue: "SoFi Stadium",
    city: "Los Angeles"
  },
  {
    id: "m039",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("uruguay"),
    teamB: getTeam("cape-verde"),
    date: "2026-06-21",
    timeUTC: "22:00",
    venue: "Hard Rock Stadium",
    city: "Miami"
  },
  {
    id: "m040",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("new-zealand"),
    teamB: getTeam("egypt"),
    date: "2026-06-22",
    timeUTC: "01:00",
    venue: "BC Place",
    city: "Vancouver"
  },
  {
    id: "m041",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("argentina"),
    teamB: getTeam("austria"),
    date: "2026-06-22",
    timeUTC: "17:00",
    venue: "AT&T Stadium",
    city: "Dallas"
  },
  {
    id: "m042",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("france"),
    teamB: getTeam("iraq"),
    date: "2026-06-22",
    timeUTC: "21:00",
    venue: "Lincoln Financial Field",
    city: "Philadelphia"
  },
  {
    id: "m043",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("norway"),
    teamB: getTeam("senegal"),
    date: "2026-06-23",
    timeUTC: "00:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey"
  },
  {
    id: "m044",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("jordan"),
    teamB: getTeam("algeria"),
    date: "2026-06-23",
    timeUTC: "03:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay"
  },
  {
    id: "m045",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("portugal"),
    teamB: getTeam("uzbekistan"),
    date: "2026-06-23",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston"
  },
  {
    id: "m046",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("england"),
    teamB: getTeam("ghana"),
    date: "2026-06-23",
    timeUTC: "20:00",
    venue: "Gillette Stadium",
    city: "Boston"
  },
  {
    id: "m047",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("panama"),
    teamB: getTeam("croatia"),
    date: "2026-06-23",
    timeUTC: "23:00",
    venue: "BMO Field",
    city: "Toronto"
  },
  {
    id: "m048",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("colombia"),
    teamB: getTeam("congo-dr"),
    date: "2026-06-24",
    timeUTC: "02:00",
    venue: "Estadio Akron",
    city: "Guadalajara"
  },
  {
    id: "m049",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("switzerland"),
    teamB: getTeam("canada"),
    date: "2026-06-24",
    timeUTC: "19:00",
    venue: "BC Place",
    city: "Vancouver"
  },
  {
    id: "m050",
    stage: "Group Stage",
    group: "Group B",
    teamA: getTeam("bosnia"),
    teamB: getTeam("qatar"),
    date: "2026-06-24",
    timeUTC: "19:00",
    venue: "Lumen Field",
    city: "Seattle"
  },
  {
    id: "m051",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("morocco"),
    teamB: getTeam("haiti"),
    date: "2026-06-24",
    timeUTC: "22:00",
    venue: "Hard Rock Stadium",
    city: "Miami"
  },
  {
    id: "m052",
    stage: "Group Stage",
    group: "Group C",
    teamA: getTeam("scotland"),
    teamB: getTeam("brazil"),
    date: "2026-06-24",
    timeUTC: "22:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta"
  },
  {
    id: "m053",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("south-africa"),
    teamB: getTeam("south-korea"),
    date: "2026-06-25",
    timeUTC: "01:00",
    venue: "Estadio Azteca",
    city: "Mexico City"
  },
  {
    id: "m054",
    stage: "Group Stage",
    group: "Group A",
    teamA: getTeam("czechia"),
    teamB: getTeam("mexico"),
    date: "2026-06-25",
    timeUTC: "01:00",
    venue: "Estadio BBVA",
    city: "Monterrey"
  },
  {
    id: "m055",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("curacao"),
    teamB: getTeam("ivory-coast"),
    date: "2026-06-25",
    timeUTC: "20:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey"
  },
  {
    id: "m056",
    stage: "Group Stage",
    group: "Group E",
    teamA: getTeam("ecuador"),
    teamB: getTeam("germany"),
    date: "2026-06-25",
    timeUTC: "20:00",
    venue: "Lincoln Financial Field",
    city: "Philadelphia"
  },
  {
    id: "m057",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("tunisia"),
    teamB: getTeam("netherlands"),
    date: "2026-06-25",
    timeUTC: "23:00",
    venue: "Arrowhead Stadium",
    city: "Kansas City"
  },
  {
    id: "m058",
    stage: "Group Stage",
    group: "Group F",
    teamA: getTeam("japan"),
    teamB: getTeam("sweden"),
    date: "2026-06-25",
    timeUTC: "23:00",
    venue: "AT&T Stadium",
    city: "Dallas"
  },
  {
    id: "m059",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("turkey"),
    teamB: getTeam("usa"),
    date: "2026-06-26",
    timeUTC: "02:00",
    venue: "SoFi Stadium",
    city: "Los Angeles"
  },
  {
    id: "m060",
    stage: "Group Stage",
    group: "Group D",
    teamA: getTeam("paraguay"),
    teamB: getTeam("australia"),
    date: "2026-06-26",
    timeUTC: "02:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay"
  },
  {
    id: "m061",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("norway"),
    teamB: getTeam("france"),
    date: "2026-06-26",
    timeUTC: "19:00",
    venue: "Gillette Stadium",
    city: "Boston"
  },
  {
    id: "m062",
    stage: "Group Stage",
    group: "Group I",
    teamA: getTeam("senegal"),
    teamB: getTeam("iraq"),
    date: "2026-06-26",
    timeUTC: "19:00",
    venue: "BMO Field",
    city: "Toronto"
  },
  {
    id: "m063",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("cape-verde"),
    teamB: getTeam("saudi-arabia"),
    date: "2026-06-27",
    timeUTC: "00:00",
    venue: "Estadio Akron",
    city: "Guadalajara"
  },
  {
    id: "m064",
    stage: "Group Stage",
    group: "Group H",
    teamA: getTeam("uruguay"),
    teamB: getTeam("spain"),
    date: "2026-06-27",
    timeUTC: "00:00",
    venue: "NRG Stadium",
    city: "Houston"
  },
  {
    id: "m065",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("new-zealand"),
    teamB: getTeam("belgium"),
    date: "2026-06-27",
    timeUTC: "03:00",
    venue: "BC Place",
    city: "Vancouver"
  },
  {
    id: "m066",
    stage: "Group Stage",
    group: "Group G",
    teamA: getTeam("egypt"),
    teamB: getTeam("iran"),
    date: "2026-06-27",
    timeUTC: "03:00",
    venue: "Lumen Field",
    city: "Seattle"
  },
  {
    id: "m067",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("panama"),
    teamB: getTeam("england"),
    date: "2026-06-27",
    timeUTC: "21:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey"
  },
  {
    id: "m068",
    stage: "Group Stage",
    group: "Group L",
    teamA: getTeam("croatia"),
    teamB: getTeam("ghana"),
    date: "2026-06-27",
    timeUTC: "21:00",
    venue: "Lincoln Financial Field",
    city: "Philadelphia"
  },
  {
    id: "m069",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("colombia"),
    teamB: getTeam("portugal"),
    date: "2026-06-27",
    timeUTC: "23:30",
    venue: "Hard Rock Stadium",
    city: "Miami"
  },
  {
    id: "m070",
    stage: "Group Stage",
    group: "Group K",
    teamA: getTeam("congo-dr"),
    teamB: getTeam("uzbekistan"),
    date: "2026-06-27",
    timeUTC: "23:30",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta"
  },
  {
    id: "m071",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("algeria"),
    teamB: getTeam("austria"),
    date: "2026-06-28",
    timeUTC: "02:00",
    venue: "AT&T Stadium",
    city: "Dallas"
  },
  {
    id: "m072",
    stage: "Group Stage",
    group: "Group J",
    teamA: getTeam("jordan"),
    teamB: getTeam("argentina"),
    date: "2026-06-28",
    timeUTC: "02:00",
    venue: "Arrowhead Stadium",
    city: "Kansas City"
  },

  // ROUND OF 32  (June 28 – July 3, 2026)
  // ─────────────────────────────────────────────

  // Match 73 – June 28
  {
    id: "m073",
    stage: "Round of 32",
    teamA: getTBDTeam("2a", "Runner-up Group A"),
    teamB: getTBDTeam("2b", "Runner-up Group B"),
    date: "2026-06-28",
    timeUTC: "19:00",
    venue: "SoFi Stadium",
    city: "Los Angeles",
  },

  // June 29
  {
    id: "m076",
    stage: "Round of 32",
    teamA: getTBDTeam("1c", "Winner Group C"),
    teamB: getTBDTeam("2f", "Runner-up Group F"),
    date: "2026-06-29",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    id: "m074",
    stage: "Round of 32",
    teamA: getTBDTeam("1e", "Winner Group E"),
    teamB: getTBDTeam("3abcdf", "Best 3rd A/B/C/D/F"),
    date: "2026-06-29",
    timeUTC: "20:30",
    venue: "Gillette Stadium",
    city: "Boston",
  },
  {
    id: "m075",
    stage: "Round of 32",
    teamA: getTBDTeam("1f", "Winner Group F"),
    teamB: getTBDTeam("2c", "Runner-up Group C"),
    date: "2026-06-30",
    timeUTC: "01:00",
    venue: "Estadio BBVA",
    city: "Monterrey",
  },

  // June 30
  {
    id: "m078",
    stage: "Round of 32",
    teamA: getTBDTeam("2e", "Runner-up Group E"),
    teamB: getTBDTeam("2i", "Runner-up Group I"),
    date: "2026-06-30",
    timeUTC: "17:00",
    venue: "AT&T Stadium",
    city: "Dallas",
  },
  {
    id: "m077",
    stage: "Round of 32",
    teamA: getTBDTeam("1i", "Winner Group I"),
    teamB: getTBDTeam("3cdfgh", "Best 3rd C/D/F/G/H"),
    date: "2026-06-30",
    timeUTC: "21:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
  },
  {
    id: "m079",
    stage: "Round of 32",
    teamA: getTBDTeam("1a", "Winner Group A"),
    teamB: getTBDTeam("3cefhi", "Best 3rd C/E/F/H/I"),
    date: "2026-07-01",
    timeUTC: "01:00",
    venue: "Estadio Azteca",
    city: "Mexico City",
  },

  // July 1
  {
    id: "m080",
    stage: "Round of 32",
    teamA: getTBDTeam("1l", "Winner Group L"),
    teamB: getTBDTeam("3ehijk", "Best 3rd E/H/I/J/K"),
    date: "2026-07-01",
    timeUTC: "16:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    id: "m082",
    stage: "Round of 32",
    teamA: getTBDTeam("1g", "Winner Group G"),
    teamB: getTBDTeam("3aehij", "Best 3rd A/E/H/I/J"),
    date: "2026-07-01",
    timeUTC: "20:00",
    venue: "Lumen Field",
    city: "Seattle",
  },
  {
    id: "m081",
    stage: "Round of 32",
    teamA: getTBDTeam("1d", "Winner Group D"),
    teamB: getTBDTeam("3befij", "Best 3rd B/E/F/I/J"),
    date: "2026-07-02",
    timeUTC: "00:00",
    venue: "Levi's Stadium",
    city: "San Francisco Bay",
  },

  // July 2
  {
    id: "m084",
    stage: "Round of 32",
    teamA: getTBDTeam("1h", "Winner Group H"),
    teamB: getTBDTeam("2j", "Runner-up Group J"),
    date: "2026-07-02",
    timeUTC: "19:00",
    venue: "SoFi Stadium",
    city: "Los Angeles",
  },
  {
    id: "m083",
    stage: "Round of 32",
    teamA: getTBDTeam("2k", "Runner-up Group K"),
    teamB: getTBDTeam("2l", "Runner-up Group L"),
    date: "2026-07-02",
    timeUTC: "23:00",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    id: "m085",
    stage: "Round of 32",
    teamA: getTBDTeam("1b", "Winner Group B"),
    teamB: getTBDTeam("3deijl", "Best 3rd D/E/I/J/L"),
    date: "2026-07-03",
    timeUTC: "03:00",
    venue: "BC Place",
    city: "Vancouver",
  },

  // July 3
  {
    id: "m088",
    stage: "Round of 32",
    teamA: getTBDTeam("2d", "Runner-up Group D"),
    teamB: getTBDTeam("2g", "Runner-up Group G"),
    date: "2026-07-03",
    timeUTC: "18:00",
    venue: "AT&T Stadium",
    city: "Dallas",
  },
  {
    id: "m086",
    stage: "Round of 32",
    teamA: getTBDTeam("1j", "Winner Group J"),
    teamB: getTBDTeam("2h", "Runner-up Group H"),
    date: "2026-07-03",
    timeUTC: "22:00",
    venue: "Hard Rock Stadium",
    city: "Miami",
  },
  {
    id: "m087",
    stage: "Round of 32",
    teamA: getTBDTeam("1k", "Winner Group K"),
    teamB: getTBDTeam("3deijl2", "Best 3rd D/E/I/J/L"),
    date: "2026-07-04",
    timeUTC: "01:30",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },

  // ─────────────────────────────────────────────
  // ROUND OF 16  (July 4 – July 7, 2026)
  // ─────────────────────────────────────────────

  // July 4
  {
    id: "m090",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-90a", "TBD"),
    teamB: getTBDTeam("w-r32-90b", "TBD"),
    date: "2026-07-04",
    timeUTC: "17:00",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    id: "m089",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-89a", "TBD"),
    teamB: getTBDTeam("w-r32-89b", "TBD"),
    date: "2026-07-04",
    timeUTC: "21:00",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },

  // July 5
  {
    id: "m091",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-91a", "TBD"),
    teamB: getTBDTeam("w-r32-91b", "TBD"),
    date: "2026-07-05",
    timeUTC: "20:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
  },
  {
    id: "m092",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-92a", "TBD"),
    teamB: getTBDTeam("w-r32-92b", "TBD"),
    date: "2026-07-06",
    timeUTC: "00:00",
    venue: "Estadio Azteca",
    city: "Mexico City",
  },

  // July 6
  {
    id: "m093",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-93a", "TBD"),
    teamB: getTBDTeam("w-r32-93b", "TBD"),
    date: "2026-07-06",
    timeUTC: "19:00",
    venue: "AT&T Stadium",
    city: "Dallas",
  },
  {
    id: "m094",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-94a", "TBD"),
    teamB: getTBDTeam("w-r32-94b", "TBD"),
    date: "2026-07-07",
    timeUTC: "00:00",
    venue: "Lumen Field",
    city: "Seattle",
  },

  // July 7
  {
    id: "m095",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-95a", "TBD"),
    teamB: getTBDTeam("w-r32-95b", "TBD"),
    date: "2026-07-07",
    timeUTC: "16:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    id: "m096",
    stage: "Round of 16",
    teamA: getTBDTeam("w-r32-96a", "TBD"),
    teamB: getTBDTeam("w-r32-96b", "TBD"),
    date: "2026-07-07",
    timeUTC: "20:00",
    venue: "BC Place",
    city: "Vancouver",
  },

  // ─────────────────────────────────────────────
  // QUARTER-FINALS  (July 9 – July 11, 2026)
  // ─────────────────────────────────────────────

  // July 9
  {
    id: "m097",
    stage: "Quarter-finals",
    teamA: getTBDTeam("w-r16-97a", "TBD"),
    teamB: getTBDTeam("w-r16-97b", "TBD"),
    date: "2026-07-09",
    timeUTC: "20:00",
    venue: "Gillette Stadium",
    city: "Boston",
  },

  // July 10
  {
    id: "m098",
    stage: "Quarter-finals",
    teamA: getTBDTeam("w-r16-98a", "TBD"),
    teamB: getTBDTeam("w-r16-98b", "TBD"),
    date: "2026-07-10",
    timeUTC: "19:00",
    venue: "SoFi Stadium",
    city: "Los Angeles",
  },

  // July 11
  {
    id: "m099",
    stage: "Quarter-finals",
    teamA: getTBDTeam("w-r16-99a", "TBD"),
    teamB: getTBDTeam("w-r16-99b", "TBD"),
    date: "2026-07-11",
    timeUTC: "21:00",
    venue: "Hard Rock Stadium",
    city: "Miami",
  },
  {
    id: "m100",
    stage: "Quarter-finals",
    teamA: getTBDTeam("w-r16-100a", "TBD"),
    teamB: getTBDTeam("w-r16-100b", "TBD"),
    date: "2026-07-12",
    timeUTC: "01:00",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },

  // ─────────────────────────────────────────────
  // SEMI-FINALS  (July 14 – July 15, 2026)
  // ─────────────────────────────────────────────

  {
    id: "m101",
    stage: "Semi-finals",
    teamA: getTBDTeam("wqf1", "Winner QF 1"),
    teamB: getTBDTeam("wqf2", "Winner QF 2"),
    date: "2026-07-14",
    timeUTC: "19:00",
    venue: "AT&T Stadium",
    city: "Dallas",
  },
  {
    id: "m102",
    stage: "Semi-finals",
    teamA: getTBDTeam("wqf3", "Winner QF 3"),
    teamB: getTBDTeam("wqf4", "Winner QF 4"),
    date: "2026-07-15",
    timeUTC: "19:00",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },

  // ─────────────────────────────────────────────
  // THIRD-PLACE PLAY-OFF  (July 18, 2026)
  // ─────────────────────────────────────────────

  {
    id: "m103",
    stage: "Third-place play-off",
    teamA: getTBDTeam("lsf1", "Loser SF 1"),
    teamB: getTBDTeam("lsf2", "Loser SF 2"),
    date: "2026-07-18",
    timeUTC: "21:00",
    venue: "Hard Rock Stadium",
    city: "Miami",
  },

  // ─────────────────────────────────────────────
  // FINAL  (July 19, 2026)
  // ─────────────────────────────────────────────

  {
    id: "m104",
    stage: "Final",
    teamA: getTBDTeam("wsf1", "Winner SF 1"),
    teamB: getTBDTeam("wsf2", "Winner SF 2"),
    date: "2026-07-19",
    timeUTC: "19:00",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
  },
];