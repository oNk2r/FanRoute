import React, { useMemo, useState } from "react";
import { TEAMS } from "../data/teams";
import { Star, Trophy, CheckCircle, ChevronDown, Search, X } from "lucide-react";

interface TeamSelectorProps {
  selectedTeamIds: string[];
  onChange: (selectedIds: string[]) => void;
  superFavoriteTeamIds: string[];
  onToggleSuperFavorite: (teamId: string) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  selectedTeamIds,
  onChange,
  superFavoriteTeamIds,
  onToggleSuperFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConfederation, setSelectedConfederation] = useState("all");
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    "AFC": false,
    "CAF": false,
    "CONCACAF": false,
    "CONMEBOL": false,
    "OFC": false,
    "UEFA": false
  });

  const toggleSection = (conf: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [conf]: !prev[conf]
    }));
  };

  const toggleTeam = (teamId: string) => {
    if (selectedTeamIds.includes(teamId)) {
      onChange(selectedTeamIds.filter((id) => id !== teamId));
    } else {
      onChange([...selectedTeamIds, teamId]);
    }
  };

  const selectAll = () => {
    onChange(TEAMS.map((t) => t.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  const groupedTeams = useMemo(() => {
    const groups: { [key: string]: typeof TEAMS } = {
      "AFC": [],
      "CAF": [],
      "CONCACAF": [],
      "CONMEBOL": [],
      "OFC": [],
      "UEFA": []
    };
    
    const query = searchQuery.trim().toLowerCase();
    
    TEAMS.forEach(team => {
      const matchesSearch = !query || 
        team.name.toLowerCase().includes(query) || 
        team.code.toLowerCase().includes(query);

      const matchesConf = selectedConfederation === "all" || 
        team.confederation === selectedConfederation;

      if (matchesSearch && matchesConf) {
        const conf = team.confederation || "UEFA";
        if (!groups[conf]) {
          groups[conf] = [];
        }
        groups[conf].push(team);
      }
    });
    
    return groups;
  }, [searchQuery, selectedConfederation]);

  return (
    <div className="bg-transparent border-0 p-0 shadow-none lg:bg-[#111111] lg:border lg:border-[#222222] lg:rounded-xl lg:p-4 lg:shadow-xl lg:sticky lg:top-24" id="team-selector-card">
      <div className="mb-4">
        <h2 className="text-sm font-bold font-sans tracking-tight text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#22C55E]" />
          <span className="uppercase tracking-wider">Filter by Country</span>
        </h2>
        <p className="text-[11px] text-neutral-400 mt-1">
          Select teams to filter matches shown in the calendar.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={selectAll}
          className="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded bg-[#0A0A0A] hover:bg-[#222222] text-white border border-[#222222] transition-all cursor-pointer text-center"
          id="btn-select-all"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded bg-[#0A0A0A] hover:bg-red-950/40 text-neutral-300 hover:text-red-300 border border-[#222222] hover:border-red-900/50 transition-all cursor-pointer text-center"
          id="btn-clear-all"
        >
          Clear All
        </button>
      </div>

      {/* Search & Confederation Filter Dropdown */}
      <div className="flex flex-col gap-2.5 mb-4">
        {/* Search Input Box */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-neutral-500">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country..."
            className="w-full bg-[#0A0A0A] text-xs text-white placeholder-neutral-500 border border-[#222222] focus:border-[#22C55E] focus:outline-none rounded-lg py-1.5 pl-8 pr-7 transition-colors"
            id="country-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-500 hover:text-white cursor-pointer"
              id="clear-search-btn"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Confederation Select Dropdown */}
        <div className="relative">
          <select
            value={selectedConfederation}
            onChange={(e) => setSelectedConfederation(e.target.value)}
            className="w-full bg-[#0A0A0A] text-neutral-200 border border-[#222222] focus:border-[#22C55E] focus:outline-none rounded-lg py-1.5 pl-3 pr-8 text-xs font-semibold cursor-pointer appearance-none transition-colors"
            id="confederation-select-dropdown"
          >
            <option value="all" className="bg-[#111111] text-white">All Confederations</option>
            <option value="AFC" className="bg-[#111111] text-white">AFC (Asia)</option>
            <option value="CAF" className="bg-[#111111] text-white">CAF (Africa)</option>
            <option value="CONCACAF" className="bg-[#111111] text-white">CONCACAF (North/Central America)</option>
            <option value="CONMEBOL" className="bg-[#111111] text-white">CONMEBOL (South America)</option>
            <option value="OFC" className="bg-[#111111] text-white">OFC (Oceania)</option>
            <option value="UEFA" className="bg-[#111111] text-white">UEFA (Europe)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-500 border-l border-[#222222]">
            <ChevronDown className="h-3 w-3 text-neutral-400" />
          </div>
        </div>
      </div>

      {selectedTeamIds.length === 0 && (
        <div className="mb-3 p-2 bg-[#22C55E]/10 text-[#22C55E] text-[10px] rounded-lg border border-[#22C55E]/20 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 animate-pulse flex-shrink-0" />
          <span>No teams selected! Calendar will appear empty.</span>
        </div>
      )}

      {showLimitWarning && (
        <div className="mb-3 p-2 bg-red-500/10 text-red-400 text-[10px] rounded-lg border border-red-500/20 flex items-center gap-1.5 animate-fadeIn">
          <Star className="w-3.5 h-3.5 animate-pulse flex-shrink-0 fill-red-500 text-red-500" />
          <span>You can only select up to 3 Super Favorite teams!</span>
        </div>
      )}

      {/* Vertical List of Teams Grouped by Confederation */}
      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent" id="teams-grid">
        {(Object.entries(groupedTeams) as [string, typeof TEAMS][]).map(([confederation, teams]) => {
          if (teams.length === 0) return null;
          // Force expand sections if a search query is active OR if a specific confederation is selected in the dropdown
          const isExpanded = 
            searchQuery.trim() !== "" || 
            selectedConfederation === confederation || 
            expandedSections[confederation];
          return (
            <div key={confederation} className="space-y-2 border-b border-[#222222]/40 pb-2 last:border-0 last:pb-0">
              {/* Confederation Header Toggle */}
              <button
                onClick={() => toggleSection(confederation)}
                className="flex items-center justify-between w-full text-left py-1 hover:text-white transition-colors cursor-pointer group/header select-none"
              >
                <h3 className="text-[10px] font-bold text-neutral-400 group-hover/header:text-neutral-200 uppercase tracking-wider font-mono">
                  {confederation === "AFC" && "AFC (Asia)"}
                  {confederation === "CAF" && "CAF (Africa)"}
                  {confederation === "CONCACAF" && "CONCACAF (North & Central America)"}
                  {confederation === "CONMEBOL" && "CONMEBOL (South America)"}
                  {confederation === "OFC" && "OFC (Oceania)"}
                  {confederation === "UEFA" && "UEFA (Europe)"}
                </h3>
                <ChevronDown 
                  className={`w-3.5 h-3.5 text-neutral-500 group-hover/header:text-neutral-300 transition-transform duration-200 ${
                    isExpanded ? "transform rotate-0" : "transform -rotate-90"
                  }`}
                />
              </button>

              {/* Grid or Stack of Teams within confederation */}
              {isExpanded && (
                <div className="space-y-1 animate-fadeIn">
                  {teams.map((team) => {
                    const isSelected = selectedTeamIds.includes(team.id);
                    return (
                      <div
                        key={team.id}
                        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all duration-200 w-full group ${
                          isSelected
                            ? "bg-[#22C55E]/10 border-[#22C55E]/30"
                            : "bg-[#0A0A0A] border-[#222222] hover:border-neutral-700"
                        }`}
                      >
                        {/* Interactive Selection area */}
                        <button
                          onClick={() => toggleTeam(team.id)}
                          className="flex-1 flex items-center gap-2.5 text-left cursor-pointer min-w-0 select-none"
                          id={`team-btn-${team.id}`}
                        >
                          {/* Flag Emoji */}
                          <span className="text-xl select-none filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                            {team.flag}
                          </span>

                          {/* Team Name and info */}
                          <div className="flex-1 min-w-0">
                            <div className={`font-semibold text-xs tracking-tight ${isSelected ? "text-white" : "text-neutral-200"}`}>
                              {team.name}
                            </div>
                            <div className="text-[9px] text-neutral-500 font-mono">
                              {team.code} • {team.group}
                            </div>
                          </div>
                          
                          {/* Check Circle if selected */}
                          {isSelected && (
                            <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] fill-black shrink-0 mr-1" />
                          )}
                        </button>

                        {/* Interactive Super Favorite star button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const isSuper = superFavoriteTeamIds.includes(team.id);
                            if (!isSuper && superFavoriteTeamIds.length >= 3) {
                              setShowLimitWarning(true);
                              setTimeout(() => setShowLimitWarning(false), 3500);
                            } else {
                              onToggleSuperFavorite(team.id);
                            }
                          }}
                          className="p-1 rounded-md hover:bg-neutral-800/60 transition-colors cursor-pointer"
                          title={superFavoriteTeamIds.includes(team.id) ? "Remove from Super Favorites" : "Add to Super Favorites (Max 3)"}
                        >
                          <Star 
                            className={`w-3.5 h-3.5 transition-transform duration-100 active:scale-95 ${
                              superFavoriteTeamIds.includes(team.id) 
                                ? "fill-[#22C55E] text-[#22C55E] animate-pulse" 
                                : "text-neutral-600 hover:text-neutral-400"
                            }`} 
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
