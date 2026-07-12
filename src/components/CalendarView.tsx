import React, { useState, useMemo } from "react";
import { Match } from "../types/match";
import { MatchCard } from "./MatchCard";
import { getLocalDateAndTime, getLocalDateKey } from "../lib/timezone";
import { getCountdown } from "../lib/countdown";
import { Calendar, ChevronLeft, ChevronRight, Activity } from "lucide-react";

interface CalendarViewProps {
  matches: Match[];
  selectedTimezone: string;
  favoriteTeamIds: string[];
  superFavoriteTeamIds: string[];
  viewMode: "all" | "favorites" | "super";
  onViewModeChange: (mode: "all" | "favorites" | "super") => void;
  currentDate: Date;
}

type MonthOption = "june" | "july";

export const CalendarView: React.FC<CalendarViewProps> = ({
  matches,
  selectedTimezone,
  favoriteTeamIds,
  superFavoriteTeamIds,
  viewMode,
  onViewModeChange,
  currentDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState<MonthOption>("july");
  
  // Track the currently selected calendar day for filtering details underneath (Format: "YYYY-MM-DD")
  // Default to July 1, 2026
  const [clickedDay, setClickedDay] = useState<string>("2026-07-01");

  const monthYearLabel = currentMonth === "june" ? "June 2026" : "July 2026";

  // Build list of calendar cells
  const calendarData = useMemo(() => {
    const year = 2026;
    const monthIndex = currentMonth === "june" ? 5 : 6; // June=5, July=6
    const totalDays = currentMonth === "june" ? 30 : 31;

    // Day of the week of the 1st of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOffset = new Date(year, monthIndex, 1).getDay();

    // Create array with empty offset slots
    const cells: { dayNum: number | null; dateStr: string | null }[] = [];
    
    for (let i = 0; i < firstDayOffset; i++) {
      cells.push({ dayNum: null, dateStr: null });
    }

    for (let d = 1; d <= totalDays; d++) {
      const monthStr = String(monthIndex + 1).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      cells.push({
        dayNum: d,
        dateStr: `${year}-${monthStr}-${dayStr}`,
      });
    }

    return cells;
  }, [currentMonth]);

  // Index matches by their localized date in selected timezone for lightning-fast calendar lookup
  const matchesByLocalDate = useMemo(() => {
    const lookup: { [dateStr: string]: Match[] } = {};
    matches.forEach((match) => {
      // Get the localized date format of the target timezone to compare
      // e.g. "June 11, 2026" or "June 12, 2026"
      const { rawDate } = getLocalDateAndTime(match.date, match.timeUTC, selectedTimezone);
      
      // Use the robust utility function to construct targetLocalDateKey
      const targetLocalDateKey = getLocalDateKey(rawDate, selectedTimezone);

      if (!lookup[targetLocalDateKey]) {
        lookup[targetLocalDateKey] = [];
      }
      lookup[targetLocalDateKey].push(match);
    });
    return lookup;
  }, [matches, selectedTimezone]);

  // Get matches scheduled for the selected clicked day
  const clickedDayMatches = useMemo(() => {
    return matchesByLocalDate[clickedDay] || [];
  }, [clickedDay, matchesByLocalDate]);

  // Render month header label
  const formattedClickedDayLabel = useMemo(() => {
    const d = new Date(clickedDay + "T00:00:00");
    if (isNaN(d.getTime())) return clickedDay;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [clickedDay]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6" id="calendar-view-panel">
      
      {/* Calendar Card Wrap */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#22C55E] animate-pulse" />
            <h2 className="text-xl font-bold text-white font-sans tracking-tight">
              Calendar View
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
            {/* View Modes Selector */}
            <div className="grid grid-cols-3 gap-1 sm:flex sm:items-center sm:gap-1 bg-[#0A0A0A] p-1 border border-[#222222] rounded-lg text-xs font-semibold font-sans w-full sm:w-auto">
              <button
                onClick={() => onViewModeChange("all")}
                className={`px-1 py-1.5 sm:px-3 rounded-md transition-all cursor-pointer text-center ${
                  viewMode === "all"
                    ? "bg-[#22C55E] text-[#0A0A0A] font-bold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                All <span className="hidden md:inline">Matches</span>
              </button>
              <button
                onClick={() => onViewModeChange("favorites")}
                className={`px-1 py-1.5 sm:px-3 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  viewMode === "favorites"
                    ? "bg-[#22C55E] text-[#0A0A0A] font-bold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">My Favorites</span>
                <span className="inline sm:hidden">Favs</span>
                <span className={`px-1 sm:px-1.5 py-0.2 text-[9px] rounded-full font-mono ${
                  viewMode === "favorites" ? "bg-black/20 text-[#0A0A0A]" : "bg-[#222222] text-neutral-400"
                }`}>
                  {favoriteTeamIds.length}
                </span>
              </button>
              <button
                onClick={() => onViewModeChange("super")}
                className={`px-1 py-1.5 sm:px-3 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  viewMode === "super"
                    ? "bg-[#22C55E] text-[#0A0A0A] font-bold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">Super Favorites</span>
                <span className="inline sm:hidden">Supers</span>
                <span className={`px-1 sm:px-1.5 py-0.2 text-[9px] rounded-full font-mono ${
                  viewMode === "super" ? "bg-black/20 text-[#0A0A0A]" : "bg-[#222222] text-neutral-400"
                }`}>
                  {superFavoriteTeamIds.length}
                </span>
              </button>
            </div>

            {/* Month Swappers */}
            <div className="grid grid-cols-2 gap-1 sm:flex sm:items-center sm:gap-1 bg-[#0A0A0A] p-1 border border-[#222222] rounded-lg w-full sm:w-auto">
              <button
                onClick={() => {
                  setCurrentMonth("june");
                  setClickedDay("2026-06-11"); // Reset to June opening day
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-all cursor-pointer text-center ${
                  currentMonth === "june"
                    ? "bg-[#22C55E] text-[#0A0A0A] shadow-lg font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
                id="june-picker-btn"
              >
                June <span className="hidden md:inline">2026</span>
              </button>
              <button
                onClick={() => {
                  setCurrentMonth("july");
                  setClickedDay("2026-07-01"); // Reset to July start
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold font-sans transition-all cursor-pointer text-center ${
                  currentMonth === "july"
                    ? "bg-[#22C55E] text-[#0A0A0A] shadow-lg font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
                id="july-picker-btn"
              >
                July <span className="hidden md:inline">2026</span>
              </button>
            </div>



          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-4 text-xs">
          <span className="text-neutral-400 font-medium">Click on highlighted days to view matches</span>
          <div className="flex items-center gap-4 text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]/25 border border-[#22C55E]/60" />
              <span>Matches Scheduled</span>
            </div>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] sm:text-xs font-bold text-neutral-500 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Grid Cells */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {calendarData.map((cell, index) => {
            const { dayNum, dateStr } = cell;

            if (!dayNum || !dateStr) {
              return (
                <div
                  key={`offset-${index}`}
                  className="bg-transparent border border-transparent rounded-lg aspect-square"
                />
              );
            }

            // Get matches count for this slot
            const dayMatches = matchesByLocalDate[dateStr] || [];
            const matchCount = dayMatches.length;
            const isClicked = clickedDay === dateStr;
            
            // Check if this day has any match featuring a super favorite team
            const hasSuperFavorite = dayMatches.some(
              (m) => superFavoriteTeamIds.includes(m.teamA.id) || superFavoriteTeamIds.includes(m.teamB.id)
            );

            // Check if this day has any live match right now
            const hasLiveMatch = dayMatches.some((m) => {
              const countdown = getCountdown(m.date, m.timeUTC, currentDate);
              return countdown.status === "LIVE";
            });



            // FIFA context check: June 11 - July 19, 2026 is the tournament active bracket
            const monthVal = currentMonth === "june" ? 6 : 7;
            const isActiveTournamentDay = 
              (monthVal === 6 && dayNum >= 11) || 
              (monthVal === 7 && dayNum <= 19);

            // Extract unique team flags for this day
            const uniqueFlags: string[] = [];
            dayMatches.forEach((m) => {
              if (m.teamA?.flag && !uniqueFlags.includes(m.teamA.flag)) {
                uniqueFlags.push(m.teamA.flag);
              }
              if (m.teamB?.flag && !uniqueFlags.includes(m.teamB.flag)) {
                uniqueFlags.push(m.teamB.flag);
              }
            });

            return (
              <button
                key={dateStr}
                onClick={() => setClickedDay(dateStr)}
                disabled={!dayNum}
                className={`relative flex flex-col items-start justify-between p-1 sm:p-1.5 md:p-2 rounded-lg border aspect-square transition-all duration-205 select-none cursor-pointer w-full ${
                  isClicked
                    ? "bg-[#22C55E] border-[#22C55E] text-[#0A0A0A] font-bold ring-2 ring-[#22C55E]/30 shadow-md shadow-[#22C55E]/10 z-10"
                    : hasLiveMatch
                    ? "bg-red-950/20 hover:bg-red-900/10 border-red-500/70 ring-2 ring-red-500/30 text-white animate-pulse"
                    : hasSuperFavorite
                    ? "bg-[#22C55E]/15 hover:bg-[#22C55E]/25 border-[#22C55E]/80 ring-2 ring-[#22C55E]/40 shadow-md shadow-[#22C55E]/25 text-white animate-pulse"
                    : matchCount > 0
                    ? "bg-[#22C55E]/5 hover:bg-[#22C55E]/15 border-[#22C55E]/30 text-white"
                    : isActiveTournamentDay
                    ? "bg-[#0A0A0A] hover:bg-neutral-900 border-[#222222] text-neutral-300 hover:border-neutral-700"
                    : "bg-[#0E0E0E]/40 border-transparent text-neutral-700 cursor-not-allowed"
                }`}
                id={`calendar-cell-${dateStr}`}
              >
                {/* Day num */}
                <div className="flex items-center gap-1 self-start">
                  <span className={`text-[10px] sm:text-xs md:text-sm font-sans ${isClicked ? "text-neutral-950 font-extrabold" : "text-neutral-200"}`}>
                    {dayNum}
                  </span>
                  {hasLiveMatch && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" title="Live match currently playing!" />
                  )}
                </div>

                {/* Flags container (Mobile - max 2 flags, smaller text) */}
                {matchCount > 0 && (
                  <div className="flex flex-wrap justify-center items-center gap-0.5 w-full my-auto sm:hidden">
                    {uniqueFlags.slice(0, 2).map((flag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] filter drop-shadow-sm select-none"
                        title="Competing Team"
                      >
                        {flag}
                      </span>
                    ))}
                    {uniqueFlags.length > 2 && (
                      <span
                        className={`text-[7px] font-mono font-bold leading-none px-0.5 py-0.2 rounded border ${
                          isClicked
                            ? "bg-black/10 border-black/25 text-black"
                            : "bg-[#111111]/80 border-[#222222] text-neutral-400"
                        }`}
                      >
                        +{uniqueFlags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Flags container (Desktop - max 4 flags) */}
                {matchCount > 0 && (
                  <div className="hidden sm:flex flex-wrap justify-center items-center gap-0.5 sm:gap-1 w-full my-auto">
                    {uniqueFlags.slice(0, 4).map((flag, idx) => (
                      <span
                        key={idx}
                        className="text-xs sm:text-sm md:text-base filter drop-shadow-sm select-none transition-transform duration-200 hover:scale-125"
                        title="Competing Team"
                      >
                        {flag}
                      </span>
                    ))}
                    {uniqueFlags.length > 4 && (
                      <span
                        className={`text-[8px] sm:text-[9px] font-mono font-bold leading-none px-0.5 py-0.2 rounded border ${
                          isClicked
                            ? "bg-black/10 border-black/25 text-black"
                            : "bg-[#111111]/80 border-[#222222] text-neutral-400"
                        }`}
                      >
                        +{uniqueFlags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Mobile indicators / badges */}
                {matchCount > 0 && (
                  <div
                    className={`absolute top-1 right-1 flex items-center justify-center text-[7px] sm:text-[9px] font-bold px-0.5 sm:px-1 py-0.2 rounded font-mono ${
                      isClicked
                        ? "bg-black/90 text-[#22C55E]"
                        : "bg-[#22C55E] text-black shadow"
                    }`}
                  >
                    {matchCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Match Detailed List Drawer */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-5 md:p-6 shadow-xl" id="calendar-details-drawer">
        <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#22C55E] font-mono font-bold uppercase tracking-wider">
              Selected Day Schedule
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
              {formattedClickedDayLabel}
            </h3>
          </div>
          <span className="text-xs bg-[#0A0A0A] px-3 py-1 rounded-full text-neutral-400 border border-[#222222] font-mono">
            {clickedDayMatches.length} {clickedDayMatches.length === 1 ? "Match" : "Matches"}
          </span>
        </div>

        {clickedDayMatches.length === 0 ? (
          <div className="py-12 text-center text-neutral-500">
            <Activity className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
            <p className="text-sm">No matches scheduled for your selected teams on this day.</p>
            <p className="text-xs text-neutral-600 mt-1">Try choosing another day or selecting more teams above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clickedDayMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                selectedTimezone={selectedTimezone}
                favoriteTeamIds={favoriteTeamIds}
                superFavoriteTeamIds={superFavoriteTeamIds}
                currentTime={currentDate}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
