"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Vote as VoteIcon,
} from "lucide-react";
import { candidates, Candidate } from "@/data/candidates";


export default function VotePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // Mock verification delay
    setError("");
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handleVote = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    // Mock voting delay
    setTimeout(() => {
      setStep(3);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      {step === 1 && (
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 mx-auto">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2">
            Verify Eligibility
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
            Please enter your registered email address to access the voting
            booth.
          </p>

          <form onSubmit={handleVerifyEmail} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              onClick={() => {
                alert(
                  "Voting is yet to commence, ensure to nominate your favourite FYB",
                );
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
            >
              Verify & Proceed
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
              Official Voting Booth
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              You are eligible to cast one vote. Select your preferred candidate
              carefully. This action cannot be undone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800/50 p-8 flex items-center justify-center">
                  <Image
                    src={candidate.image}
                    alt={candidate.firstname}
                    width={200}
                    height={200}
                    unoptimized
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    {candidate.firstname} {candidate.otherNames.split(" ")[0]}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                    {candidate.society}
                  </p>

                  <button
                    onClick={() => handleVote(candidate)}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-semibold py-3 px-4 rounded-xl transition-all"
                  >
                    <VoteIcon className="w-5 h-5" />
                    <span>Cast Vote</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && selectedCandidate && (
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Vote Recorded!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Thank you, your vote for{" "}
            <span className="font-bold text-zinc-900 dark:text-white">
              {selectedCandidate.firstname} {selectedCandidate.otherNames}
            </span>{" "}
            has been securely recorded.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}
