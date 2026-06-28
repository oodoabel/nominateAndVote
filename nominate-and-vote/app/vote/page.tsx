import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";
import { redirect } from "next/navigation";
import VoteClient from "./VoteClient";
import { getQualifiedCategories } from "@/data/qualifiedCandidates";

export default async function VotePage() {
  const appState = await getAppState();

  if (appState !== AppState.VOTING) {
    redirect("/");
  }

  const qualifiedCategories = await getQualifiedCategories();

  return <VoteClient qualifiedCategories={qualifiedCategories} />;
}
