import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";
import { redirect } from "next/navigation";
import VoteClient from "./VoteClient";

export default async function VotePage() {
  const appState = await getAppState();

  if (appState !== AppState.VOTING) {
    redirect("/");
  }

  return <VoteClient />;
}
