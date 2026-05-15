import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eligibleEmails } from "@/data/eligibleEmails";
import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const appState = await getAppState();

    if (appState === AppState.INACTIVE) {
      return NextResponse.json(
        { error: "The voting portal is currently closed." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email } = body as { email: string };

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // 1. Check whitelist
    const isEligible = eligibleEmails
      .map((e) => e.toLowerCase())
      .includes(normalised);

    if (!isEligible) {
      return NextResponse.json(
        { eligible: false, votedCategories: [] },
        { status: 200 }
      );
    }

    // 2. Fetch all categories this email has already voted in
    const existingVotes = await prisma.voterRecord.findMany({
      where: { voterEmail: normalised },
      select: { awardCategory: true, candidateId: true, candidateName: true },
    });

    return NextResponse.json(
      {
        eligible: true,
        votedCategories: existingVotes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying voter:", error);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
