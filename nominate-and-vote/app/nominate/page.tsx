import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";
import { redirect } from "next/navigation";
import NominateClient from "./NominateClient";

export default async function NominatePage() {
  const appState = await getAppState();

  if (appState !== AppState.NOMINATION) {
    redirect("/");
  }

  return <NominateClient />;
}
