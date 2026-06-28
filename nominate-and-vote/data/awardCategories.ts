export interface AwardCategory {
  id: number;
  name: string;
  gender: "male" | "female" | "all";
}

export const awardCategories: AwardCategory[] = [
  // Unisex / General Awards
  { id: 1, name: "Most Handsome", gender: "male" },
  { id: 2, name: "Most Beautiful", gender: "female" },
  { id: 3, name: "Most Intellectual (Gk)", gender: "all" },
  { id: 4, name: "Most intellectual (Bosso)", gender: "all" },
  { id: 5, name: "Most Social male", gender: "male" },
  { id: 6, name: "Most social female", gender: "female" },
  { id: 7, name: "Entrepreneur of the Year male", gender: "male" },
  { id: 8, name: "Entrepreneur of the year Female", gender: "female" },
  { id: 9, name: "Best Dressed (Male)", gender: "male" },
  { id: 10, name: "Best Dressed (Female)", gender: "female" },
  { id: 11, name: "Most Dedicated (GK)", gender: "all" },
  { id: 12, name: "Most dedicated (bosso)", gender: "all" },
  { id: 13, name: "Outstanding Personality (Gk)", gender: "all" },
  { id: 14, name: "Outstanding personality (bosso)", gender: "all" },
  { id: 15, name: "Cool Calm and Collected (Gk)", gender: "all" },
  { id: 16, name: "Cool calm and collected (bosso)", gender: "all" },
  { id: 17, name: "Most Influential", gender: "all" },
  { id: 18, name: "Best clique (Gk)", gender: "all" },
  { id: 19, name: "Best clique (bosso)", gender: "all" },
  { id: 20, name: "Most political", gender: "all" },
  { id: 21, name: "Couple of the year", gender: "all" },
  { id: 22, name: "Mr ebony", gender: "male" },
  { id: 23, name: "Miss ebony", gender: "female" },
  { id: 24, name: "Sportsman of the year", gender: "male" },
  { id: 25, name: "Sportswoman of the year", gender: "female" },
  { id: 27, name: "Mr Culture", gender: "male" },
  { id: 28, name: "Miss Culture", gender: "female" },
  { id: 30, name: "Most talented", gender: "all" },
  { id: 31, name: "Music personality of the year", gender: "all" },
];
