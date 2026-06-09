import { useState, useEffect, useMemo } from "react";
import { TeamSelector } from "./components/TeamSelector";
import { CalendarView } from "./components/CalendarView";
import { MATCHES } from "./data/matches";
import { TEAMS } from "./data/teams";
import { TIMEZONES, getBrowserTimezone } from "./lib/timezone";
import { 
  Trophy, 
  Clock 
} from "lucide-react";

export default function App() {
  // 1. Core States initialized from LocalStorage
  const [favoriteTeamIds, setFavoriteTeamIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fanroute_favorites");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Default to selecting all teams on first load
    return TEAMS.map((t) => t.id);
  });

  const [superFavoriteTeamIds, setSuperFavoriteTeamIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("fanroute_super_favorites");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return []; // default to empty
  });

  const [selectedTimezone, setSelectedTimezone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("fanroute_timezone");
      if (saved) {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return getBrowserTimezone();
  });

  const [viewMode, setViewMode] = useState<"all" | "favorites" | "super">(( ) => {
    try {
      const saved = localStorage.getItem("fanroute_view_mode");
      if (saved === "all" || saved === "favorites" || saved === "super") {
        return saved;
      }
    } catch (e) {
      console.error(e);
    }
    return "favorites";
  });

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // 3. Dynamic Local Time for Clock Display (Locks to World Cup 2026 context, ticking live)
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date("2026-06-07T19:55:09Z"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 4. Persistence Effect
  useEffect(() => {
    localStorage.setItem("fanroute_favorites", JSON.stringify(favoriteTeamIds));
  }, [favoriteTeamIds]);

  useEffect(() => {
    localStorage.setItem("fanroute_super_favorites", JSON.stringify(superFavoriteTeamIds));
  }, [superFavoriteTeamIds]);

  useEffect(() => {
    localStorage.setItem("fanroute_timezone", selectedTimezone);
  }, [selectedTimezone]);

  useEffect(() => {
    localStorage.setItem("fanroute_view_mode", viewMode);
  }, [viewMode]);

  const handleToggleSuperFavorite = (teamId: string) => {
    setSuperFavoriteTeamIds((prev) => {
      if (prev.includes(teamId)) {
        return prev.filter((id) => id !== teamId);
      }
      if (prev.length >= 3) {
        return prev; // cap at 3
      }
      return [...prev, teamId];
    });
  };

  // 5. Match Filtration
  // Returns match list based on viewMode and selections
  const filteredMatches = useMemo(() => {
    if (viewMode === "all") {
      return MATCHES;
    }
    if (viewMode === "super") {
      if (superFavoriteTeamIds.length === 0) return [];
      return MATCHES.filter(
        (match) =>
          superFavoriteTeamIds.includes(match.teamA.id) ||
          superFavoriteTeamIds.includes(match.teamB.id)
      );
    }
    
    // "favorites" view mode
    if (favoriteTeamIds.length === 0) {
      return []; // Return empty list
    }
    return MATCHES.filter(
      (match) =>
        favoriteTeamIds.includes(match.teamA.id) ||
        favoriteTeamIds.includes(match.teamB.id) ||
        match.teamA.id.startsWith("tbd-") ||
        match.teamB.id.startsWith("tbd-")
    );
  }, [viewMode, favoriteTeamIds, superFavoriteTeamIds]);

  // 7. Format current clock text beautifully for the header
  const formattedCurrentClock = useMemo(() => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      timeZone: selectedTimezone,
      dateStyle: "medium",
      timeStyle: "medium",
    };
    try {
      return currentDate.toLocaleString("en-US", timeOptions);
    } catch (e) {
      return currentDate.toUTCString();
    }
  }, [currentDate, selectedTimezone]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#22C55E] selection:text-black">
      
      {/* 1. Header Navigation Bar */}
      <header className="border-b border-[#222222] bg-[#111111]/90 backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-[#22C55E] p-2.5 rounded-xl shadow-lg shadow-[#22C55E]/10">
              <Trophy className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase font-sans text-white">
                Fan<span className="text-[#22C55E]">Route</span>
              </h1>
            </div>
          </div>

          {/* Timezone Switcher & Clock Widget details */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full md:w-auto">
            
            {/* Clock */}
            <div className="flex items-center gap-2 bg-[#0A0A0A] px-3.5 py-2 border border-[#222222] rounded-lg text-xs w-full sm:w-auto justify-between sm:justify-start">
              <span className="flex items-center gap-1.5 text-neutral-400 font-medium font-sans">
                <Clock className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
                Live Hub Time:
              </span>
              <span className="text-white font-mono font-bold tracking-tight">
                {formattedCurrentClock}
              </span>
            </div>

            {/* Selector Dropdown custom-styled */}
            <div className="relative w-full sm:w-72">
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full bg-[#0A0A0A] text-neutral-200 border border-[#222222] focus:border-[#22C55E] focus:outline-none rounded-lg py-2 pl-3 pr-8 text-xs font-semibold cursor-pointer appearance-none transition-colors"
                id="timezone-select-dropdown"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value} className="bg-[#111111] text-white">
                    {tz.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-500 border-l border-[#222222]">
                <ChevronDownIcon />
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* 2. Main Content Grid Wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Central Column: Calendar and Match list details */}
          <div className="lg:col-span-3 space-y-6">
            <CalendarView
              matches={filteredMatches}
              selectedTimezone={selectedTimezone}
              favoriteTeamIds={favoriteTeamIds}
              superFavoriteTeamIds={superFavoriteTeamIds}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Right Column: Country Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <TeamSelector
              selectedTeamIds={favoriteTeamIds}
              onChange={setFavoriteTeamIds}
              superFavoriteTeamIds={superFavoriteTeamIds}
              onToggleSuperFavorite={handleToggleSuperFavorite}
            />
          </div>

        </div>
      </main>

      {/* 3. Footer branding section */}
      <footer className="border-t border-[#222222] bg-[#111111]/40 py-8 text-xs text-neutral-500 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 font-sans">
            <span className="font-bold text-neutral-300">FanRoute</span>
            <span>FIFA World Cup 2026</span>
          </div>
        </div>
      </footer>

      {/* Floating Filter Toggle for Mobile */}
      <button
        onClick={() => setIsFilterDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#22C55E] text-[#0A0A0A] font-bold px-4 py-3 rounded-full shadow-lg shadow-[#22C55E]/30 hover:scale-105 transition-all flex items-center gap-2 select-none cursor-pointer"
        id="mobile-filter-fab"
      >
        <Trophy className="w-4 h-4 text-black animate-bounce" />
        <span>Filter Countries</span>
        <span className="bg-black/20 text-black px-1.5 py-0.5 rounded-full text-[10px]">
          {favoriteTeamIds.length}
        </span>
      </button>

      {/* Slide-in Mobile Drawer */}
      {isFilterDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm lg:hidden flex justify-end animate-fadeIn"
          onClick={() => setIsFilterDrawerOpen(false)}
          id="mobile-drawer-overlay"
        >
          <div 
            className="w-full max-w-xs bg-[#111111] h-full p-4 border-l border-[#222222] overflow-y-auto animate-slideIn flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
            id="mobile-drawer-content"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
              <span className="font-bold text-sm text-neutral-300">Filter Panel</span>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-xs text-neutral-400 hover:text-white font-medium bg-[#0A0A0A] border border-[#222222] px-2.5 py-1 rounded cursor-pointer"
              >
                Close
              </button>
            </div>
            <TeamSelector
              selectedTeamIds={favoriteTeamIds}
              onChange={setFavoriteTeamIds}
              superFavoriteTeamIds={superFavoriteTeamIds}
              onToggleSuperFavorite={handleToggleSuperFavorite}
            />
          </div>
        </div>
      )}

    </div>
  );
}

// Chevron Down Icon component
function ChevronDownIcon() {
  return (
    <svg
      role="img"
      aria-label="dropdown-icon"
      className="h-4 w-4 text-neutral-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
