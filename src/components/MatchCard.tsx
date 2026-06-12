import React, { useState, useEffect } from "react";
import { Match } from "../types/match";
import { getCountdown, CountdownResult } from "../lib/countdown";
import { getLocalDateAndTime } from "../lib/timezone";
import { Calendar, MapPin, Clock, Star } from "lucide-react";

interface MatchCardProps {
  match: Match;
  selectedTimezone: string;
  favoriteTeamIds: string[];
  superFavoriteTeamIds: string[];
  currentTime: Date;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  selectedTimezone,
  favoriteTeamIds,
  superFavoriteTeamIds = [],
  currentTime,
}) => {
  const countdown: CountdownResult = getCountdown(match.date, match.timeUTC, currentTime);
  const { formattedDate, formattedTime, originalTimeStr, isDifferentDate } =
    getLocalDateAndTime(match.date, match.timeUTC, selectedTimezone);

  // Check if either of the teams is a user's Super Favorite
  const isASuperFav = superFavoriteTeamIds.includes(match.teamA.id);
  const isBSuperFav = superFavoriteTeamIds.includes(match.teamB.id);
  const isClashOfFavorites = isASuperFav && isBSuperFav;

  return (
    <div
      className={`relative bg-[#111111] border rounded-xl overflow-hidden shadow-lg transition-all duration-300 group ${
        (isASuperFav || isBSuperFav)
          ? "border-[#22C55E]/30 bg-[#111412]/80 hover:border-[#22C55E]/50 shadow-[0_0_10px_rgba(34,197,94,0.05)]"
          : "border-[#222222] hover:border-neutral-700"
      }`}
      id={`match-card-${match.id}`}
    >

      {/* Header Info */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-[#222222] text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#22C55E] font-bold tracking-wider uppercase">
            {match.stage}
          </span>
          {isClashOfFavorites && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-white animate-pulse shadow-md shadow-emerald-950/40 whitespace-nowrap">
              <span className="hidden sm:inline">Clash of Favorites ⚔️</span>
              <span className="inline sm:hidden">Clash ⚔️</span>
            </span>
          )}
        </div>

        {/* Countdown Badge */}
        <div className="flex items-center gap-1.5 font-sans">
          {countdown.status === "LIVE" ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white mr-1 inline-block" />
              LIVE NOW
            </span>
          ) : countdown.status === "FINISHED" ? (
            <span className="text-neutral-500 font-medium px-2 py-0.5 rounded bg-[#111111] border border-[#222222]">
              Finished
            </span>
          ) : (
            <span className="text-[#22C55E] font-bold bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/20 text-[10px] font-mono tracking-wide">
              {countdown.label}
            </span>
          )}
        </div>
      </div>

      {/* Main Vs Section */}
      <div className="p-4 md:p-6 flex items-center justify-between gap-4 bg-[#111111]">
        
        {/* Team A */}
        <div className="flex-1 flex items-center justify-end gap-2.5 min-w-0 text-right">
          <div className="flex flex-col items-end min-w-0">
            <span className="font-bold text-white text-sm md:text-base lg:text-lg flex items-center gap-1 justify-end w-full">
              {isASuperFav && (
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#22C55E] text-[#22C55E] select-none shrink-0 animate-pulse" title="Super Favorite team! 🌟" />
              )}
              <span className="truncate hidden sm:inline">{match.teamA.name}</span>
              <span className="inline sm:hidden font-mono tracking-wide">{match.teamA.code}</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">
              {match.teamA.code} • {match.teamA.group}
            </span>
            <span className="text-[9px] text-neutral-500 font-mono inline sm:hidden">
              {match.teamA.group}
            </span>
          </div>
          <span className="text-2xl md:text-3xl lg:text-4xl filter drop-shadow select-none shrink-0 group-hover:scale-110 transition-transform duration-200">
            {match.teamA.flag}
          </span>
        </div>

        {/* VS Separator Division */}
        <div className="px-2.5 py-1 bg-[#0A0A0A] border border-[#222222] rounded-full text-[10px] md:text-xs font-mono font-bold text-neutral-400 shrink-0">
          VS
        </div>

        {/* Team B */}
        <div className="flex-1 flex items-center justify-start gap-2.5 min-w-0">
          <span className="text-2xl md:text-3xl lg:text-4xl filter drop-shadow select-none shrink-0 group-hover:scale-110 transition-transform duration-200">
            {match.teamB.flag}
          </span>
          <div className="flex flex-col items-start min-w-0">
            <span className="font-bold text-white text-sm md:text-base lg:text-lg flex items-center gap-1 w-full">
              <span className="truncate hidden sm:inline">{match.teamB.name}</span>
              <span className="inline sm:hidden font-mono tracking-wide">{match.teamB.code}</span>
              {isBSuperFav && (
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#22C55E] text-[#22C55E] select-none shrink-0 animate-pulse" title="Super Favorite team! 🌟" />
              )}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">
              {match.teamB.code} • {match.teamB.group}
            </span>
            <span className="text-[9px] text-neutral-500 font-mono inline sm:hidden">
              {match.teamB.group}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info: Venue & Converted Dates */}
      <div className="px-5 py-4 bg-[#0B0B0B] border-t border-[#222222]">
        
        {/* Metadatas */}
        <div className="flex flex-col gap-1.5 text-xs text-neutral-400 flex-1">
          {/* Calendar Date picker */}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
            <span className="font-semibold text-neutral-200 font-sans">
              {formattedDate}
            </span>
            {isDifferentDate && (
              <span className="text-[10px] bg-[#22C55E]/10 text-[#22C55E] px-1.5 py-0.2 rounded font-medium border border-[#22C55E]/20" title="Day shifted due to your timezone selection">
                Date shift
              </span>
            )}
          </div>

          {/* Time converter display */}
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
            <span className="font-bold text-[#22C55E] font-sans">
              {formattedTime}
            </span>
          </div>

          {/* Location venue */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
            <span className="truncate">
              {match.venue}, <strong className="text-neutral-300 font-medium">{match.city}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
