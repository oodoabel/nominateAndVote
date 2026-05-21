import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      voterName,
      voterEmail,
      candidateName,
      awardCategory,
      nominationCount,
      amountPaid,
      reference,
    } = body;

    // Validate required fields
    if (
      !voterName ||
      !voterEmail ||
      !candidateName ||
      !awardCategory ||
      !reference
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save the nomination payment to the database
    const nominationPayment = await prisma.nominationPayment.create({
      data: {
        voterName,
        voterEmail,
        candidateName,
        awardCategory,
        nominationCount: Number(nominationCount),
        amountPaid: Number(amountPaid),
        reference,
        status: "success",
      },
    });

    return NextResponse.json(
      { success: true, data: nominationPayment },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error saving nomination:", error);
    // Handle unique constraint violation for duplicate references
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A payment with this reference already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to save nomination payment" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const nominations = await prisma.nominationPayment.groupBy({
      by: ["awardCategory", "candidateName"],
      _sum: {
        nominationCount: true,
      },
    });

    const standings = nominations.map((item) => ({
      category: item.awardCategory,
      candidateName: item.candidateName,
      count: item._sum.nominationCount || 0,
    }));

    return NextResponse.json({ success: true, standings });
  } catch (error: any) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 },
    );
  }
}
