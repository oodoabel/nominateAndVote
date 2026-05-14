/**
 * qualifiedCandidates.ts
 *
 * Maps each award category name to the list of candidate IDs that have
 * qualified for voting. The IDs correspond to `Candidate.id` values
 * generated in `candidates.ts` (1-indexed from excellersData).
 *
 * ⚠️  PLACEHOLDER DATA — replace the candidateIds arrays with your real
 *     shortlisted candidate IDs when the official qualified list is ready.
 */

export interface QualifiedCategory {
  categoryName: string;
  candidateIds: number[];
}

export const qualifiedCategories: QualifiedCategory[] = [
  // ── Male-only ─────────────────────────────────────────────────────────────
  {
    categoryName: "Most Handsome",
    candidateIds: [1, 5, 10],
  },
  {
    categoryName: "Most Social Male",
    candidateIds: [7, 14, 21],
  },
  {
    categoryName: "Entrepreneur of the Year (Male)",
    candidateIds: [3, 9, 18],
  },
  {
    categoryName: "Best Dressed (Male)",
    candidateIds: [4, 12, 22],
  },
  {
    categoryName: "Mr Ebony",
    candidateIds: [16, 24, 30],
  },
  {
    categoryName: "Sportsman of the Year",
    candidateIds: [8, 19, 28],
  },
  {
    categoryName: "Mr Culture",
    candidateIds: [6, 20, 35],
  },

  // ── Female-only ───────────────────────────────────────────────────────────
  {
    categoryName: "Most Beautiful",
    candidateIds: [2, 6, 11],
  },
  {
    categoryName: "Most Social Female",
    candidateIds: [13, 23, 32],
  },
  {
    categoryName: "Entrepreneur of the Year (Female)",
    candidateIds: [2, 11, 29],
  },
  {
    categoryName: "Best Dressed (Female)",
    candidateIds: [15, 26, 33],
  },
  {
    categoryName: "Miss Ebony",
    candidateIds: [17, 25, 31],
  },
  {
    categoryName: "Sportswoman of the Year",
    candidateIds: [13, 27, 34],
  },
  {
    categoryName: "Miss Culture",
    candidateIds: [2, 23, 36],
  },

  // ── Open / All genders ────────────────────────────────────────────────────
  {
    categoryName: "Most Intellectual (Gk)",
    candidateIds: [3, 7, 12],
  },
  {
    categoryName: "Most Intellectual (Bosso)",
    candidateIds: [10, 18, 25],
  },
  {
    categoryName: "Most Dedicated (GK)",
    candidateIds: [5, 13, 22],
  },
  {
    categoryName: "Most Dedicated (Bosso)",
    candidateIds: [8, 16, 29],
  },
  {
    categoryName: "Outstanding Personality (Gk)",
    candidateIds: [4, 9, 20],
  },
  {
    categoryName: "Outstanding Personality (Bosso)",
    candidateIds: [11, 19, 30],
  },
  {
    categoryName: "Cool Calm and Collected (Gk)",
    candidateIds: [6, 14, 26],
  },
  {
    categoryName: "Cool Calm and Collected (Bosso)",
    candidateIds: [1, 17, 28],
  },
  {
    categoryName: "Most Influential",
    candidateIds: [4, 8, 13],
  },
  {
    categoryName: "Best Clique (Gk)",
    candidateIds: [2, 10, 21],
  },
  {
    categoryName: "Best Clique (Bosso)",
    candidateIds: [7, 15, 24],
  },
  {
    categoryName: "Most Political",
    candidateIds: [5, 12, 27],
  },
  {
    categoryName: "Couple of the Year",
    candidateIds: [3, 16, 23],
  },
  {
    categoryName: "Icon of Excellers Family",
    candidateIds: [1, 9, 18],
  },
  {
    categoryName: "Most Expensive",
    candidateIds: [6, 11, 31],
  },
];
