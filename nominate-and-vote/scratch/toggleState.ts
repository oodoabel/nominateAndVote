import * as dotenv from "dotenv";
dotenv.config();
import { setAppState } from "../lib/appConfig";
import { AppState } from "@prisma/client";

const stateArg = process.argv[2] as keyof typeof AppState;

if (!stateArg || !AppState[stateArg]) {
  console.error("Please provide a valid state: INACTIVE, NOMINATION, or VOTING");
  process.exit(1);
}

async function run() {
  console.log(`Setting app state to: ${stateArg}`);
  await setAppState(AppState[stateArg]);
  console.log("Done.");
  process.exit(0);
}

run();
