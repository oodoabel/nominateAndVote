import { prisma } from "./prisma";
import { AppState } from "@prisma/client";

export async function getAppState(): Promise<AppState> {
  try {
    const config = await prisma.systemConfig.findFirst({
      where: { id: 1 },
    });

    if (!config) {
      // Initialize with default if not found
      const newConfig = await prisma.systemConfig.create({
        data: { id: 1, state: AppState.INACTIVE },
      });
      return newConfig.state;
    }

    return config.state;
  } catch (error) {
    console.error("Error fetching app state:", error);
    return AppState.INACTIVE; // Fallback to safe state
  }
}

export async function setAppState(state: AppState) {
  return prisma.systemConfig.upsert({
    where: { id: 1 },
    update: { state },
    create: { id: 1, state },
  });
}
