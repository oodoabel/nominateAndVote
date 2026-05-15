import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eligibleEmails } from "@/data/eligibleEmails";
import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const appState = await getAppState();

    if (appState !== AppState.VOTING) {
      return NextResponse.json(
        { error: "Voting is currently closed." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { votes, voterEmail } = body as {
      voterEmail: string;
      votes: {
        candidateId: number;
        candidateName: string;
        awardCategory: string;
      }[];
    };

    if (!voterEmail || typeof voterEmail !== "string") {
      return NextResponse.json(
        { error: "voterEmail is required" },
        { status: 400 }
      );
    }

    if (!votes || !Array.isArray(votes) || votes.length === 0) {
      return NextResponse.json(
        { error: "No votes provided" },
        { status: 400 }
      );
    }

    const normalised = voterEmail.trim().toLowerCase();

    // Guard: email must be on the eligible list
    const isEligible = eligibleEmails
      .map((e) => e.toLowerCase())
      .includes(normalised);

    if (!isEligible) {
      return NextResponse.json(
        { error: "This email address is not registered to vote." },
        { status: 403 }
      );
    }

    // Validate each vote entry
    for (const vote of votes) {
      if (!vote.candidateId || !vote.candidateName || !vote.awardCategory) {
        return NextResponse.json(
          {
            error:
              "Each vote must include candidateId, candidateName, and awardCategory",
          },
          { status: 400 }
        );
      }
    }

    // Check existing votes before transaction to minimize transaction time
    const existingVotes = await prisma.voterRecord.findMany({
      where: { voterEmail: normalised },
      select: { awardCategory: true },
    });
    
    const votedCategories = new Set(existingVotes.map(v => v.awardCategory));
    
    // Filter out votes for categories already voted in
    const newVotes = votes.filter(v => !votedCategories.has(v.awardCategory));

    if (newVotes.length === 0) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    // Run operations in an interactive transaction with increased timeouts
    const results = await prisma.$transaction(
      async (tx) => {
        // 1. Record all voter records at once
        await tx.voterRecord.createMany({
          data: newVotes.map((vote) => ({
            voterEmail: normalised,
            awardCategory: vote.awardCategory,
            candidateId: vote.candidateId,
            candidateName: vote.candidateName,
          })),
          skipDuplicates: true,
        });

        // 2. Upsert CandidateVotes
        // Run them concurrently using Promise.all to drastically reduce transaction time
        const successfulVotes = await Promise.all(
          newVotes.map((vote) =>
            tx.candidateVote.upsert({
              where: {
                candidateId_awardCategory: {
                  candidateId: vote.candidateId,
                  awardCategory: vote.awardCategory,
                },
              },
              update: { voteCount: { increment: 1 } },
              create: {
                candidateId: vote.candidateId,
                candidateName: vote.candidateName,
                awardCategory: vote.awardCategory,
                voteCount: 1,
              },
            })
          )
        );

        return successfulVotes;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );

    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving votes:", error);
    return NextResponse.json(
      { error: "Failed to save votes" },
      { status: 500 }
    );
  }
}
