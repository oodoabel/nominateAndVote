import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
