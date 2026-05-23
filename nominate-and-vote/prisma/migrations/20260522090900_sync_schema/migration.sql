-- CreateEnum
CREATE TYPE "AppState" AS ENUM ('INACTIVE', 'NOMINATION', 'VOTING');

-- CreateTable
CREATE TABLE "NominationPayment" (
    "id" TEXT NOT NULL,
    "voterName" TEXT NOT NULL,
    "voterEmail" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "awardCategory" TEXT NOT NULL,
    "nominationCount" INTEGER NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'success',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NominationPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateVote" (
    "id" TEXT NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "candidateName" TEXT NOT NULL,
    "awardCategory" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoterRecord" (
    "id" TEXT NOT NULL,
    "voterEmail" TEXT NOT NULL,
    "awardCategory" TEXT NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "candidateName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoterRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "state" "AppState" NOT NULL DEFAULT 'INACTIVE',

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NominationPayment_reference_key" ON "NominationPayment"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateVote_candidateId_awardCategory_key" ON "CandidateVote"("candidateId", "awardCategory");

-- CreateIndex
CREATE UNIQUE INDEX "VoterRecord_voterEmail_awardCategory_key" ON "VoterRecord"("voterEmail", "awardCategory");
