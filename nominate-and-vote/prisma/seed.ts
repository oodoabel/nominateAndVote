import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Seed Award Categories ──────────────────────────────
  const awards = await Promise.all([
    // Unisex Awards
    prisma.awardCategory.upsert({ where: { name: "Most Popular" }, update: {}, create: { name: "Most Popular", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Spiritual" }, update: {}, create: { name: "Most Spiritual", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Dressed" }, update: {}, create: { name: "Best Dressed", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Friendly" }, update: {}, create: { name: "Most Friendly", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Likely to Succeed" }, update: {}, create: { name: "Most Likely to Succeed", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Life of the Party" }, update: {}, create: { name: "Life of the Party", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Talented" }, update: {}, create: { name: "Most Talented", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Smile" }, update: {}, create: { name: "Best Smile", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Hardworking" }, update: {}, create: { name: "Most Hardworking", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Generous" }, update: {}, create: { name: "Most Generous", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Leader" }, update: {}, create: { name: "Best Leader", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Creative" }, update: {}, create: { name: "Most Creative", gender: "ALL" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Prayerful" }, update: {}, create: { name: "Most Prayerful", gender: "ALL" } }),
    // Male-only Awards
    prisma.awardCategory.upsert({ where: { name: "Best Couple (Him)" }, update: {}, create: { name: "Best Couple (Him)", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Mr. NFCS" }, update: {}, create: { name: "Mr. NFCS", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Handsome" }, update: {}, create: { name: "Most Handsome", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Bro" }, update: {}, create: { name: "Best Bro", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Gentle Guy" }, update: {}, create: { name: "Most Gentle Guy", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Fashionable Guy" }, update: {}, create: { name: "Most Fashionable Guy", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Coolest Guy" }, update: {}, create: { name: "Coolest Guy", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Caring Bro" }, update: {}, create: { name: "Most Caring Bro", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Ladies' Man" }, update: {}, create: { name: "Ladies' Man", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Athletic Guy" }, update: {}, create: { name: "Most Athletic Guy", gender: "MALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Male Singer" }, update: {}, create: { name: "Best Male Singer", gender: "MALE" } }),
    // Female-only Awards
    prisma.awardCategory.upsert({ where: { name: "Best Couple (Her)" }, update: {}, create: { name: "Best Couple (Her)", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Miss NFCS" }, update: {}, create: { name: "Miss NFCS", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Beautiful" }, update: {}, create: { name: "Most Beautiful", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Sis" }, update: {}, create: { name: "Best Sis", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Gentle Lady" }, update: {}, create: { name: "Most Gentle Lady", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Fashionable Lady" }, update: {}, create: { name: "Most Fashionable Lady", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Coolest Lady" }, update: {}, create: { name: "Coolest Lady", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Caring Sis" }, update: {}, create: { name: "Most Caring Sis", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Guys' Crush" }, update: {}, create: { name: "Guys' Crush", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Most Athletic Lady" }, update: {}, create: { name: "Most Athletic Lady", gender: "FEMALE" } }),
    prisma.awardCategory.upsert({ where: { name: "Best Female Singer" }, update: {}, create: { name: "Best Female Singer", gender: "FEMALE" } }),
  ]);

  console.log(`✅ Seeded ${awards.length} award categories`);

  // ─── Seed Sample Candidates ─────────────────────────────
  const candidates = [
    {
      firstname: "John",
      otherNames: "Chukwudi Doe",
      nickname: "Johnny Boy",
      gender: "MALE" as const,
      department: "Computer Science",
      society: "NFCS Choir",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=John",
      relationshipStatus: "Single",
      dateOfBirth: "12th May",
      hobby: "Singing & Coding",
      favBibleVerse: "Philippians 4:13",
      forumPaddy: "Jane Smith",
      forumCrush: "Secret 😉",
      bestCampusExperience: "Winning the departmental coding hackathon in 300L.",
      bestLevel: "400L",
      mostStressfulLevel: "300L",
      favQuote: "It is what it is.",
      skill: "Web Development",
      partingWords: "Never give up on your dreams, keep pushing.",
      japaOrStay: "Japa ✈️",
    },
    {
      firstname: "Jane",
      otherNames: "Ngozi Smith",
      nickname: "Jay",
      gender: "FEMALE" as const,
      department: "Mass Communication",
      society: "Board of Lectors",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jane",
      relationshipStatus: "In a relationship",
      dateOfBirth: "3rd August",
      hobby: "Reading Novels",
      favBibleVerse: "John 3:16",
      forumPaddy: "John Doe",
      forumCrush: "Michael",
      bestCampusExperience: "My first time reading as a Lector.",
      bestLevel: "200L",
      mostStressfulLevel: "400L",
      favQuote: "Live and let live.",
      skill: "Content Creation",
      partingWords: "Make good friends, they will save you.",
      japaOrStay: "Stay 🇳🇬",
    },
    {
      firstname: "Michael",
      otherNames: "Oluwaseun Johnson",
      nickname: "Mickey",
      gender: "MALE" as const,
      department: "Mechanical Engineering",
      society: "Legion of Mary",
      image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Michael",
      relationshipStatus: "Single",
      dateOfBirth: "25th December",
      hobby: "Playing Football",
      favBibleVerse: "Psalms 23:1",
      forumPaddy: "David Brown",
      forumCrush: "Sarah",
      bestCampusExperience: "NFCS week sports festival.",
      bestLevel: "100L",
      mostStressfulLevel: "500L",
      favQuote: "Hard work beats talent.",
      skill: "Graphic Design",
      partingWords: "Always put God first in everything.",
      japaOrStay: "Japa ✈️",
    },
  ];

  for (const candidate of candidates) {
    await prisma.candidate.upsert({
      where: { id: candidates.indexOf(candidate) + 1 },
      update: {},
      create: candidate,
    });
  }

  console.log(`✅ Seeded ${candidates.length} candidates`);

  // ─── Seed Sample Voters ─────────────────────────────────
  const voters = [
    { email: "voter1@example.com", name: "Test Voter 1", verified: true },
    { email: "voter2@example.com", name: "Test Voter 2", verified: true },
    { email: "voter3@example.com", name: "Test Voter 3", verified: false },
  ];

  for (const voter of voters) {
    await prisma.voter.upsert({
      where: { email: voter.email },
      update: {},
      create: voter,
    });
  }

  console.log(`✅ Seeded ${voters.length} voters`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
