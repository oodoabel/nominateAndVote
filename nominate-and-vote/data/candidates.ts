import { excellersData } from "./excellersData";
import { getImageUrl } from "@/utils/imageUrl";

export interface Candidate {
  id: number;
  firstname: string;
  otherNames: string;
  nickname: string;
  gender: "male" | "female";
  relationshipStatus: string;
  dateOfBirth: string;
  hobby: string;
  favBibleVerse: string;
  forumPaddy: string;
  forumCrush: string;
  department: string;
  society: string;
  bestCampusExperience: string;
  bestLevel: string;
  mostStressfulLevel: string;
  favQuote: string;
  skill: string;
  partingWords: string;
  japaOrStay: string;
  image: string;
}

const femaleNames = [
  "Priscilla",
  "Susan",
  "Veronica",
  "Regina",
  "Joan",
  "Ngozi",
  "Esther",
  "Jennifer",
  "Mary",
  "Sylvia",
  "Victoria",
  "Faustina",
  "Edith",
  "Constance",
  "Benedicta",
  "Emmanuella",
  "Martha",
  "Ochanya",
  "Vivian",
  "Elizabeth",
  "Joy",
  "Favour",
  "Chidinma",
  "Nwagbo", // Peter Ifeanyi? No, that's Peter.
  "Anekwe", // Ngozi Catherine
  "Okoli", // This is a surname, but Chibuifem Justin is male.
  "Datoegoem", // Mary
  "Ezenneh", // Sylvia
  "Atsewe", // Mercy
  "Edoka", // Annorah
  "Amana", // Chongsum Benedicta
  "Udoji", // Emmanuella
  "Halli", // Elizabeth
  "Kyrian", // Regina
  "Atsaakaa", // Emmanuella
];

const maleNames = [
  "Itodo",
  "Emmanuel",
  "Benjamin",
  "Kingsley",
  "Joseph",
  "Okere",
  "James",
  "Richard",
  "Okodede",
  "Paul",
  "Peter",
  "Gerard",
  "Samuel",
  "Iliya",
  "Simon",
  "Shalom",
  "Bensirus",
  "Solomon",
  "Mathias",
  "David",
  "Martin",
  "Francis",
  "Alphonsus",
  "Izunna",
  "Yayock",
  "Chukwuemeka",
  "Louis",
  "Zaccheaus",
  "Tersoo",
  "Metu",
  "Israel",
  "Okoli", // Chibuifem Justin
  "Ojotule",
  "Raphael",
  "Tyokase",
  "Sanker",
  "Emetomo",
  "Idyu",
  "Matthew",
  "Chimezie",
  "Adama",
  "Anate",
  "Franklin",
  "Sachia",
  "Cyril",
  "Moses",
  "Bartholomew",
  "Abraham",
  "Shankyula",
  "Chidiebere",
  "Chukwudubem",
  "Somtochukwu",
  "Akachukwu",
  "Elvis",
  "Wisdom",
  "Fanen",
];

function inferGender(firstname: string, otherNames: string): "male" | "female" {
  const combined = `${firstname} ${otherNames}`.toLowerCase();

  // Explicit checks for known names
  if (
    combined.includes("emmanuella") ||
    combined.includes("priscilla") ||
    combined.includes("susan") ||
    combined.includes("veronica") ||
    combined.includes("regina") ||
    combined.includes("joan") ||
    combined.includes("ngozi") ||
    combined.includes("esther") ||
    combined.includes("jennifer") ||
    combined.includes("mary") ||
    combined.includes("sylvia") ||
    combined.includes("victoria") ||
    combined.includes("faustina") ||
    combined.includes("edith") ||
    combined.includes("constance") ||
    combined.includes("benedicta") ||
    combined.includes("martha") ||
    combined.includes("ochanya") ||
    combined.includes("vivian") ||
    combined.includes("elizabeth") ||
    combined.includes("joy") ||
    combined.includes("favour") ||
    combined.includes("chidinma") ||
    combined.includes("mercy") ||
    combined.includes("annorah") ||
    combined.includes("hellen")
  ) {
    return "female";
  }

  // Default to male for others as the list of guys is longer in this dataset
  return "male";
}


export const candidates: Candidate[] = excellersData.map((data, index) => ({
  id: index + 1,
  firstname: data.firstname,
  otherNames: data.otherNames,
  nickname: data.nickname,
  gender: inferGender(data.firstname, data.otherNames),
  relationshipStatus: data.relationshipStatus,
  dateOfBirth: data.dateOfBirth,
  hobby: data.hobby,
  favBibleVerse: data.favBibleVerse,
  forumPaddy: data.forumPaddy,
  forumCrush: data.forumCrush,
  department: data.department,
  society: data.nfcsSocieties || "General Member",
  bestCampusExperience: data.bestCampusExperience,
  bestLevel: data.bestLevel,
  mostStressfulLevel: data.mostStressfulLevel,
  favQuote: data.favQuote,
  skill: data.skillOrSideHustle,
  partingWords: data.partingWords,
  japaOrStay: data.japaOrStay,
  image: getImageUrl(data.photoUrl),
}));
