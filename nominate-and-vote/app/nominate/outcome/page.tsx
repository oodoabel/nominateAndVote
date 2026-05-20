import React from "react";
import { prisma } from "@/lib/prisma";
import NominationResultsDisplay, { CategoryNominationResult } from "@/components/NominationResultsDisplay";
import { awardCategories } from "@/data/awardCategories";

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
  
  // Initialize ALL categories so empty categories are visible too
  awardCategories.forEach((cat) => {
    groupedResults[cat.name] = [];
  });
  
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
  ).sort((a, b) => a.category.localeCompare(b.category));

  return (
    <NominationResultsDisplay
      title="Nomination Live Standings"
      description=""
      data={formattedData}
    />
  );
}
