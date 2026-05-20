import React from "react";
import { prisma } from "@/lib/prisma";
import NominationResultsDisplay, { CategoryNominationResult } from "@/components/NominationResultsDisplay";

export const dynamic = "force-dynamic";

export default async function NominateResultsPage() {
  // Fetch and aggregate nominations
  const nominations = await prisma.nominationPayment.groupBy({
    by: ["awardCategory", "candidateName"],
    _sum: {
      nominationCount: true,
    },
    orderBy: {
      awardCategory: "asc",
    },
  });

  // Transform data into CategoryNominationResult format
  const groupedResults: Record<string, any[]> = {};
  
  nominations.forEach((item) => {
    if (!groupedResults[item.awardCategory]) {
      groupedResults[item.awardCategory] = [];
    }
    groupedResults[item.awardCategory].push({
      candidateName: item.candidateName,
      count: item._sum.nominationCount || 0,
    });
  });

  const formattedData: CategoryNominationResult[] = Object.entries(groupedResults).map(
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
          .sort((a, b) => b.count - a.count), // Sort by count descending
      };
    }
  );

  return (
    <NominationResultsDisplay
      title="Nomination Live Standings"
      description="Real-time aggregation of candidate nominations across all award categories. These numbers represent the total nomination weight from all verified payments."
      data={formattedData}
    />
  );
}
