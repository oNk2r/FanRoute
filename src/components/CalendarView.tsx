import React, { useState, useMemo } from "react";
import { Match } from "../types/match";
import { MatchCard } from "./MatchCard";
import { getLocalDateAndTime } from "../lib/timezone";
import { Calendar, ChevronLeft, ChevronRight, Activity } from "lucide-react";

interface CalendarViewProps {
  matches: Match[];
  selectedTimezone: string;
  favoriteTeamIds: string[];
  superFavoriteTeamIds: string[];
}

type MonthOption = "june" | "july";

export const CalendarView: React.FC<CalendarViewProps> = ({
  matches,
  selectedTimezone,
  favoriteTeamIds,
  superFavoriteTeamIds,
}) => {
  const [currentMonth, setCurrentMonth] = useState<MonthOption>("june");
  
  // Track the currently selected calendar day for filtering details underneath (Format: "YYYY-MM-DD")
  // Default to June 11, 2026 (the opening match day of the World Cup!)
  const [clickedDay, setClickedDay] = useState<string>("2026-06-11");

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
      
      // Let's get the exact local date as YYYY-MM-DD relative to that timezone
      const year = rawDate.toLocaleDateString("en-US", { timeZone: selectedTimezone, year: "numeric" });
      const monthNum = rawDate.toLocaleDateString("en-US", { timeZone: selectedTimezone, month: "2-digit" });
      const dayNum = rawDate.toLocaleDateString("en-US", { timeZone: selectedTimezone, day: "2-digit" });
      const targetLocalDateKey = `${year}-${monthNum}-${dayNum}`;

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#22C55E] animate-pulse" />
            <h2 className="text-xl font-bold text-white font-sans tracking-tight">
              Calendar View
            </h2>
          </div>

          {/* Month Swappers */}
          <div className="flex items-center gap-2 bg-[#0A0A0A] p-1 border border-[#222222] rounded-lg">
            <button
              onClick={() => {
                setCurrentMonth("june");
                setClickedDay("2026-06-11"); // Reset to June opening day
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold font-sans transition-all cursor-pointer ${
                currentMonth === "june"
                  ? "bg-[#22C55E] text-[#0A0A0A] shadow-lg font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
              id="june-picker-btn"
            >
              June 2026
            </button>
            <button
              onClick={() => {
                setCurrentMonth("july");
                setClickedDay("2026-07-01"); // Reset to July start
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold font-sans transition-all cursor-pointer ${
                currentMonth === "july"
                  ? "bg-[#22C55E] text-[#0A0A0A] shadow-lg font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
              id="july-picker-btn"
            >
              July 2026
            </button>
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

            // FIFA context check: June 11 - July 19, 2026 is the tournament active bracket
            const monthVal = currentMonth === "june" ? 6 : 7;
            const isActiveTournamentDay = 
              (monthVal === 6 && dayNum >= 11) || 
              (monthVal === 7 && dayNum <= 19);

            return (
              <button
                key={dateStr}
                onClick={() => setClickedDay(dateStr)}
                disabled={!dayNum}
                className={`relative flex flex-col items-center justify-between p-1 sm:p-2 md:p-3 rounded-lg border aspect-square transition-all duration-205 select-none cursor-pointer ${
                  isClicked
                    ? "bg-[#22C55E] border-[#22C55E] text-[#0A0A0A] font-bold ring-2 ring-[#22C55E]/30 shadow-md shadow-[#22C55E]/10 z-10"
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
                <span className={`text-[10px] sm:text-xs md:text-sm font-sans ${isClicked ? "text-neutral-950 font-extrabold" : "text-neutral-200"}`}>
                  {dayNum}
                </span>

                {/* Mobile indicators / badges */}
                {matchCount > 0 && (
                  <div
                    className={`flex items-center justify-center text-[8px] sm:text-[9px] font-bold px-0.5 sm:px-1.5 py-0.2 rounded font-mono ${
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
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
