"use client";

import React, { useState, useMemo } from "react";
import { 
  Award, 
  TrendingUp, 
  Trophy, 
  Users, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Info, 
  Search,
  Sparkles,
  BarChart3
} from "lucide-react";

export type ResultItem = {
  candidateName: string;
  count: number;
  percentage: number;
};

export type CategoryNominationResult = {
  category: string;
  results: ResultItem[];
};

interface NominationResultsDisplayProps {
  title: string;
  description: string;
  data: CategoryNominationResult[];
}

export default function NominationResultsDisplay({ title, description, data }: NominationResultsDisplayProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Calculate overall system statistics for the dashboard
  const stats = useMemo(() => {
    let totalNominations = 0;
    let uniqueContestants = new Set<string>();
    let totalCandidatesCount = 0;
    let candidatesQualified = 0;
    const unnominatedList: string[] = [];

    data.forEach((cat) => {
      const contestantsCount = cat.results.length;
      const benchmark = contestantsCount === 1 ? 160 : 100;

      if (contestantsCount === 0) {
        unnominatedList.push(cat.category);
      }

      cat.results.forEach((r) => {
        totalNominations += r.count;
        uniqueContestants.add(r.candidateName);
        totalCandidatesCount += 1;
        if (r.count >= benchmark) {
          candidatesQualified += 1;
        }
      });
    });

    return {
      totalNominations,
      activeContestants: uniqueContestants.size,
      totalCandidatesCount,
      candidatesQualified,
      qualifiedPercentage: totalCandidatesCount > 0 ? (candidatesQualified / totalCandidatesCount) * 100 : 0,
      unnominatedCount: unnominatedList.length,
      unnominatedList,
    };
  }, [data]);

  // 2. Filter categories: hide empty ones entirely, and apply search filtering
  const filteredData = useMemo(() => {
    return data.filter((cat) => {
      // Hide categories that have no nominees yet
      if (cat.results.length === 0) return false;

      return cat.category.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
        </div>

        {/* Search Bar (centered and positioned directly after the heading) */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="search"
            placeholder="Search active award categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 transition-all text-sm animate-fade-in"
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredData.map((category) => {
            const catTotal = category.results.reduce((acc, curr) => acc + curr.count, 0);
            const contestantsCount = category.results.length;
            const isSingleContestant = contestantsCount === 1;
            const benchmark = isSingleContestant ? 160 : 100;
            
            // Count how many candidates in this category are qualified
            const qualifiedCount = category.results.filter(r => r.count >= benchmark).length;
            const someQualified = qualifiedCount > 0;
            const allQualified = qualifiedCount === contestantsCount && contestantsCount > 0;

            return (
              <div 
                key={category.category}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500 p-8 flex flex-col justify-between"
              >
                {/* Glow Effects */}
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${someQualified ? 'from-emerald-500 to-teal-500' : 'from-blue-600 to-indigo-600'} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex-1">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
                        <Award className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                        {category.category}
                      </h2>
                    </div>

                    {/* Unlocked / Locked Status Badge */}
                    <div className="flex-shrink-0 self-start sm:self-auto">
                      {allQualified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] animate-pulse">
                          <Unlock className="w-3.5 h-3.5" />
                          <span>All Qualified ({qualifiedCount}/{contestantsCount})</span>
                        </span>
                      ) : someQualified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/5 text-emerald-500 dark:text-emerald-400 border border-emerald-500/10">
                          <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{qualifiedCount} / {contestantsCount} Qualified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                          <Lock className="w-3.5 h-3.5" />
                          <span>0 / {contestantsCount} Qualified</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Summary Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Total Category Weight
                      </span>
                      <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
                        {catTotal.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Required Target
                      </span>
                      <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
                        {benchmark} <span className="text-xs font-normal text-zinc-500">per contestant</span>
                      </span>
                    </div>
                  </div>

                  {/* Single Contestant Alert Banner */}
                  {isSingleContestant && (
                    <div className="mb-6 flex items-start gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                      <Info className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
                      <div className="text-xs leading-relaxed">
                        <span className="font-bold">Single Contestant Category:</span> Requires a benchmark of <span className="font-bold underline decoration-2 decoration-amber-500">160 nominations</span> to unlock this slot for voting.
                      </div>
                    </div>
                  )}

                  {/* Contestant Leaderboard List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Contestants ({contestantsCount})
                    </h3>
                    
                    {category.results.map((candidate, idx) => {
                      const candidateProgress = Math.min((candidate.count / benchmark) * 100, 100);
                      const isCandidateQualified = candidate.count >= benchmark;
                      const candidateRemaining = Math.max(benchmark - candidate.count, 0);

                      return (
                        <div key={candidate.candidateName} className="space-y-2 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/40 rounded-2xl p-4 transition-all hover:border-zinc-200 dark:hover:border-zinc-700">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 min-w-0">
                              {idx === 0 && candidate.count > 0 && (
                                <Trophy className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                              )}
                              <span className={`font-semibold truncate text-sm sm:text-base ${idx === 0 ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                {candidate.candidateName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {isCandidateQualified ? (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_-2px_rgba(16,185,129,0.2)]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Qualified</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                  {candidateRemaining} more needed
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${isCandidateQualified ? 'from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'from-blue-500 to-purple-600'} transition-all duration-1000 ease-out rounded-full`}
                              style={{ width: `${candidateProgress}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                            <span>{candidateProgress.toFixed(0)}% to target</span>
                            <span>{candidate.count} / {benchmark} nominations</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 mb-16">
            <TrendingUp className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No categories found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Try adjusting your search query.
            </p>
          </div>
        )}

        {/* ─── Nomination Overview Dashboard (Moved below the category cards) ─── */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16 mt-16 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Nomination Statistics Overview
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              System-wide metrics and benchmarks across all award categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Total Nominations */}
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute right-4 top-4 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 p-3 rounded-2xl">
                <TrendingUp className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Total Nominations
              </p>
              <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">
                {stats.totalNominations.toLocaleString()}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Total nominations submitted across all categories.
              </p>
            </div>

            {/* Card 2: Candidates Qualified */}
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute right-4 top-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Candidates Qualified
              </p>
              <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">
                {stats.candidatesQualified} <span className="text-lg font-medium text-zinc-400">/ {stats.totalCandidatesCount}</span>
              </h3>
              {/* mini progress indicator */}
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${stats.qualifiedPercentage}%` }}
                />
              </div>
            </div>

            {/* Card 3: Empty Categories */}
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute right-4 top-4 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 p-3 rounded-2xl">
                <Lock className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Empty Categories
              </p>
              <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">
                {stats.unnominatedCount} <span className="text-lg font-medium text-zinc-400">/ {data.length}</span>
              </h3>
              {/* mini progress indicator */}
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${data.length > 0 ? (stats.unnominatedCount / data.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Card 4: Active Contestants */}
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute right-4 top-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 p-3 rounded-2xl">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Active Contestants
              </p>
              <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">
                {stats.activeContestants}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Unique final-year students nominated.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Unnominated Categories List (The very last thing on the page) ─── */}
        {stats.unnominatedList.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-16 mt-16 animate-fade-in text-center">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Unnominated Categories ({stats.unnominatedCount})
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed">
              These categories currently have no nominees. Users can submit nominations in these categories to activate them!
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl mx-auto">
              {stats.unnominatedList.map((catName) => (
                <div
                  key={catName}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/80 cursor-default"
                >
                  <Award className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{catName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
