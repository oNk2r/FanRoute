import { Team } from "../types/match";

export const TEAMS: Team[] = [
  // GROUP A
  { id: "mexico",       name: "Mexico",               flag: "🇲🇽", code: "MEX", group: "Group A", confederation: "CONCACAF" },
  { id: "south-korea",  name: "South Korea",           flag: "🇰🇷", code: "KOR", group: "Group A", confederation: "AFC" },
  { id: "czechia",      name: "Czechia",               flag: "🇨🇿", code: "CZE", group: "Group A", confederation: "UEFA" },
  { id: "south-africa", name: "South Africa",          flag: "🇿🇦", code: "RSA", group: "Group A", confederation: "CAF" },

  // GROUP B
  { id: "canada",       name: "Canada",                flag: "🇨🇦", code: "CAN", group: "Group B", confederation: "CONCACAF" },
  { id: "bosnia",       name: "Bosnia and Herzegovina",flag: "🇧🇦", code: "BIH", group: "Group B", confederation: "UEFA" },
  { id: "qatar",        name: "Qatar",                 flag: "🇶🇦", code: "QAT", group: "Group B", confederation: "AFC" },
  { id: "switzerland",  name: "Switzerland",           flag: "🇨🇭", code: "SUI", group: "Group B", confederation: "UEFA" },

  // GROUP C
  { id: "brazil",       name: "Brazil",                flag: "🇧🇷", code: "BRA", group: "Group C", confederation: "CONMEBOL" },
  { id: "morocco",      name: "Morocco",               flag: "🇲🇦", code: "MAR", group: "Group C", confederation: "CAF" },
  { id: "haiti",        name: "Haiti",                 flag: "🇭🇹", code: "HAI", group: "Group C", confederation: "CONCACAF" },
  { id: "scotland",     name: "Scotland",              flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", code: "SCO", group: "Group C", confederation: "UEFA" },

  // GROUP D
  { id: "usa",          name: "USA",                   flag: "🇺🇸", code: "USA", group: "Group D", confederation: "CONCACAF" },
  { id: "paraguay",     name: "Paraguay",              flag: "🇵🇾", code: "PAR", group: "Group D", confederation: "CONMEBOL" },
  { id: "australia",    name: "Australia",             flag: "🇦🇺", code: "AUS", group: "Group D", confederation: "AFC" },
  { id: "turkey",       name: "Türkiye",               flag: "🇹🇷", code: "TUR", group: "Group D", confederation: "UEFA" },

  // GROUP E
  { id: "germany",      name: "Germany",               flag: "🇩🇪", code: "GER", group: "Group E", confederation: "UEFA" },
  { id: "curacao",      name: "Curaçao",               flag: "🇨🇼", code: "CUW", group: "Group E", confederation: "CONCACAF" },
  { id: "ivory-coast",  name: "Ivory Coast",           flag: "🇨🇮", code: "CIV", group: "Group E", confederation: "CAF" },
  { id: "ecuador",      name: "Ecuador",               flag: "🇪🇨", code: "ECU", group: "Group E", confederation: "CONMEBOL" },

  // GROUP F
  { id: "netherlands",  name: "Netherlands",           flag: "🇳🇱", code: "NED", group: "Group F", confederation: "UEFA" },
  { id: "japan",        name: "Japan",                 flag: "🇯🇵", code: "JPN", group: "Group F", confederation: "AFC" },
  { id: "tunisia",      name: "Tunisia",               flag: "🇹🇳", code: "TUN", group: "Group F", confederation: "CAF" },
  { id: "sweden",       name: "Sweden",                flag: "🇸🇪", code: "SWE", group: "Group F", confederation: "UEFA" },

  // GROUP G
  { id: "belgium",      name: "Belgium",               flag: "🇧🇪", code: "BEL", group: "Group G", confederation: "UEFA" },
  { id: "egypt",        name: "Egypt",                 flag: "🇪🇬", code: "EGY", group: "Group G", confederation: "CAF" },
  { id: "iran",         name: "Iran",                  flag: "🇮🇷", code: "IRN", group: "Group G", confederation: "AFC" },
  { id: "new-zealand",  name: "New Zealand",           flag: "🇳🇿", code: "NZL", group: "Group G", confederation: "OFC" },

  // GROUP H
  { id: "spain",        name: "Spain",                 flag: "🇪🇸", code: "ESP", group: "Group H", confederation: "UEFA" },
  { id: "cape-verde",   name: "Cape Verde",            flag: "🇨🇻", code: "CPV", group: "Group H", confederation: "CAF" },
  { id: "saudi-arabia", name: "Saudi Arabia",          flag: "🇸🇦", code: "KSA", group: "Group H", confederation: "AFC" },
  { id: "uruguay",      name: "Uruguay",               flag: "🇺🇾", code: "URU", group: "Group H", confederation: "CONMEBOL" },

  // GROUP I
  { id: "france",       name: "France",                flag: "🇫🇷", code: "FRA", group: "Group I", confederation: "UEFA" },
  { id: "senegal",      name: "Senegal",               flag: "🇸🇳", code: "SEN", group: "Group I", confederation: "CAF" },
  { id: "iraq",         name: "Iraq",                  flag: "🇮🇶", code: "IRQ", group: "Group I", confederation: "AFC" },
  { id: "norway",       name: "Norway",                flag: "🇳🇴", code: "NOR", group: "Group I", confederation: "UEFA" },

  // GROUP J
  { id: "argentina",    name: "Argentina",             flag: "🇦🇷", code: "ARG", group: "Group J", confederation: "CONMEBOL" },
  { id: "algeria",      name: "Algeria",               flag: "🇩🇿", code: "ALG", group: "Group J", confederation: "CAF" },
  { id: "austria",      name: "Austria",               flag: "🇦🇹", code: "AUT", group: "Group J", confederation: "UEFA" },
  { id: "jordan",       name: "Jordan",                flag: "🇯🇴", code: "JOR", group: "Group J", confederation: "AFC" },

  // GROUP K
  { id: "portugal",     name: "Portugal",              flag: "🇵🇹", code: "POR", group: "Group K", confederation: "UEFA" },
  { id: "congo-dr",     name: "Congo DR",              flag: "🇨🇩", code: "COD", group: "Group K", confederation: "CAF" },
  { id: "uzbekistan",   name: "Uzbekistan",            flag: "🇺🇿", code: "UZB", group: "Group K", confederation: "AFC" },
  { id: "colombia",     name: "Colombia",              flag: "🇨🇴", code: "COL", group: "Group K", confederation: "CONMEBOL" },

  // GROUP L
  { id: "england",      name: "England",               flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", group: "Group L", confederation: "UEFA" },
  { id: "croatia",      name: "Croatia",               flag: "🇭🇷", code: "CRO", group: "Group L", confederation: "UEFA" },
  { id: "ghana",        name: "Ghana",                 flag: "🇬🇭", code: "GHA", group: "Group L", confederation: "CAF" },
  { id: "panama",       name: "Panama",                flag: "🇵🇦", code: "PAN", group: "Group L", confederation: "CONCACAF" }
];