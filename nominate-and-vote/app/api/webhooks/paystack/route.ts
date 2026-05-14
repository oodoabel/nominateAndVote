import crypto from "crypto";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Re-use connection initialized logic
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const secret = process.env.PAYSTACK_SECRET_KEY || "";

export async function POST(req: Request) {
  try {
    // 1. Read the raw text body to verify signature
    const text = await req.text();
    
    // 2. Hash the text with your secret key
    const hash = crypto
      .createHmac("sha512", secret)
      .update(text)
      .digest("hex");

    // 3. Compare with the header
    const paystackSignature = req.headers.get("x-paystack-signature");
    if (hash !== paystackSignature) {
      console.warn("Invalid Paystack webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 4. Parse the body now that it's verified
    const event = JSON.parse(text);

    // 5. Handle successful charge event
    if (event.event === "charge.success") {
      const data = event.data;
      
      const reference = data.reference;
      const amountPaid = data.amount / 100; // Webhook amount is in kobo, convert back to Naira

      // Extract custom fields securely
      const customFields = data.metadata?.custom_fields || [];
      const getField = (varName: string) => 
        customFields.find((f: any) => f.variable_name === varName)?.value || "";

      const candidateName = getField("candidate_name") || getField("candidate");
      const awardCategory = getField("award_category");
      const nominationCountStr = getField("nomination_count") || getField("nominations");
      const nominationCount = parseInt(nominationCountStr) || 1;

      const voterEmail = data.customer?.email || "unknown@example.com";
      const voterName = data.metadata?.name || data.customer?.first_name || "Unknown Voter";

      // Prevent duplicate saving if frontend also successfully sent the request
      const existing = await prisma.nominationPayment.findUnique({
        where: { reference },
      });

      if (!existing) {
        await prisma.nominationPayment.create({
          data: {
            voterName,
            voterEmail,
            candidateName,
            awardCategory,
            nominationCount,
            amountPaid,
            reference,
            status: "success",
          },
        });
        console.log(`Webhook successfully saved payment: ${reference}`);
      } else {
        console.log(`Webhook ignored duplicate payment: ${reference}`);
      }
    }

    // Paystack expects a 200 OK immediately
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
