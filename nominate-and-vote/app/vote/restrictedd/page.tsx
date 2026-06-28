import React from "react";
import { prisma } from "@/lib/prisma";
import ResultsDisplay, { CategoryResult } from "@/components/ResultsDisplay";

export const dynamic = "force-dynamic";

export default async function VoteResultsPage() {
  // Fetch all candidate votes
  const votes = await prisma.candidateVote.findMany({
    orderBy: [
      { awardCategory: "asc" },
      { voteCount: "desc" }
    ],
  });

  // Transform data into CategoryResult format
  const groupedResults: Record<string, any[]> = {};
  
  votes.forEach((item) => {
    if (!groupedResults[item.awardCategory]) {
      groupedResults[item.awardCategory] = [];
    }
    groupedResults[item.awardCategory].push({
      candidateName: item.candidateName,
      count: item.voteCount,
    });
  });

  const formattedData: CategoryResult[] = Object.entries(groupedResults).map(
    ([category, results]) => {
      // Calculate total for percentages
      const total = results.reduce((acc, curr) => acc + curr.count, 0);
      
      return {
        category,
        results: results
          .map((r) => ({
            ...r,
            percentage: total > 0 ? (r.count / total) * 100 : 0,
          }))
          .sort((a, b) => b.count - a.count),
      };
    }
  );

  return (
    <ResultsDisplay
      title="Voting Results"
      description="Track the progress of the final voting stage. These standings reflect the total number of votes cast by verified voters for each candidate."
      data={formattedData}
      type="vote"
    />
  );
}
