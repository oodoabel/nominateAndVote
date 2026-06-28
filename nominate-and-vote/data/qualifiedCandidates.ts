import { prisma } from "@/lib/prisma";
import { candidates } from "@/data/candidates";

export type QualifiedCategory = {
  categoryName: string;
  candidateIds: number[];
};

export async function getQualifiedCategories(): Promise<QualifiedCategory[]> {
  // Group nominations by candidate name and award category and sum the nomination counts
  const groups = await prisma.nominationPayment.groupBy({
    by: ["candidateName", "awardCategory"],
    _sum: { nominationCount: true },
  });

  // Filter groups with total nominations >= 100
  const qualified = groups.filter((g) => (g._sum.nominationCount ?? 0) >= 100);

  // Build a map from category to candidate IDs
  const map: Record<string, number[]> = {};
  for (const q of qualified) {
    const candidate = candidates.find(
      (c) => c.firstname + " " + c.otherNames === q.candidateName,
    );
    if (!candidate) continue; // skip if candidate not found in static list
    if (!map[q.awardCategory]) map[q.awardCategory] = [];
    map[q.awardCategory].push(candidate.id);
  }

  // Convert to the required shape
  return Object.entries(map).map(([categoryName, candidateIds]) => ({
    categoryName,
    candidateIds,
  }));
}
