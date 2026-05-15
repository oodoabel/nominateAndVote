import Link from "next/link";
import { ArrowRight, Trophy, Users, Star, Lock } from "lucide-react";
import { getAppState } from "@/lib/appConfig";
import { AppState } from "@prisma/client";

export default async function Home() {
  const appState = await getAppState();
  const isNomination = appState === AppState.NOMINATION;
  const isVoting = appState === AppState.VOTING;
  const isInactive = appState === AppState.INACTIVE;

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <main className="w-full max-w-5xl px-6 py-15 flex flex-col items-center justify-center text-center relative z-10">
        <div className="flex items-center gap-2 px-3 py-3">
          <img className="w-10 h-10" src="nfcs_logo.png" alt="" />
          <img className="w-10 h-10" src="futm_logo.png" alt="" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 border border-blue-100 dark:border-blue-800/50">
          <Trophy className="w-4 h-4" />
          <span>NFCS Annual Awards</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          Celebrate the Best <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Among Us
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-12">
          {isInactive
            ? "The nomination and voting periods for this year's awards are currently closed. Stay tuned for updates!"
            : "Support your favorite final-year students. Boost their chances with paid nominations, and cast your official vote when the polls open."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {isNomination && (
            <Link
              href="/nominate"
              className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
            >
              <span>Nominate Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {isVoting && (
            <Link
              href="/vote"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Cast Your Vote</span>
            </Link>
          )}
          {isInactive && (
            <div className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-semibold py-4 px-8 rounded-full border border-zinc-200 dark:border-zinc-700 cursor-not-allowed">
              <Lock className="w-5 h-5" />
              <span>Portal Closed</span>
            </div>
          )}
        </div>

        {isNomination && (
          <div className="flex flex-col items-center gap-8 mt-24 w-full text-left">
            <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Secure Voting
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-center md:text-left">
                Only registered members can cast the final, decisive vote.{" "}
                <a
                  className="text-blue-400"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSczBrfotpQqq4tYLMnS7BjZwC9QNs54dhgeE9gF9s6_ZsI-qA/viewform?usp=header"
                >
                  Click here to register
                </a>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
