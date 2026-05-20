"use client";

import React from "react";
import { Award, TrendingUp, User, BarChart3, Trophy } from "lucide-react";

export type ResultItem = {
  candidateName: string;
  count: number;
  percentage: number;
};

export type CategoryResult = {
  category: string;
  results: ResultItem[];
};

interface ResultsDisplayProps {
  title: string;
  description: string;
  data: CategoryResult[];
  type: "nominate" | "vote";
}

export default function ResultsDisplay({ title, description, data, type }: ResultsDisplayProps) {
  const getGradient = () => {
    return type === "nominate"
      ? "from-blue-600 to-indigo-600"
      : "from-amber-500 to-orange-600";
  };

  const getIconColor = () => {
    return type === "nominate" ? "text-blue-600" : "text-amber-500";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl mb-4 border border-zinc-200 dark:border-zinc-800`}>
            <BarChart3 className={`h-8 w-8 ${getIconColor()}`} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((category, catIdx) => (
            <div
              key={category.category}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500 p-8"
            >
              {/* Card Background Glow */}
              <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${getGradient()} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${getIconColor()}`}>
                      <Award className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white truncate">
                      {category.category}
                    </h2>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {category.results.length} Candidates
                  </span>
                </div>

                <div className="space-y-6">
                  {category.results.map((candidate, idx) => (
                    <div key={candidate.candidateName} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          {idx === 0 && (
                            <Trophy className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className={`font-medium ${idx === 0 ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {candidate.candidateName}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-zinc-900 dark:text-white">
                            {candidate.count}
                          </span>
                          <span className="text-[10px] text-zinc-400 ml-1 uppercase tracking-wider">
                            {type === "nominate" ? "Nominations" : "Votes"}
                          </span>
                        </div>
                      </div>

                      <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out rounded-full`}
                          style={{ width: `${candidate.percentage}%` }}
                        />
                      </div>

                      <div className="flex justify-end">
                        <span className="text-[10px] font-semibold text-zinc-400">
                          {candidate.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <TrendingUp className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No results found yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400">The data will appear here once the {type === "nominate" ? "nomination" : "voting"} process begins.</p>
          </div>
        )}
      </div>
    </div>
  );
}
