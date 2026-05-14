"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  CheckCircle2, ChevronDown, ChevronUp, ArrowLeft,
  Vote as VoteIcon, Trophy, Edit2, Loader2, PartyPopper, Mail, AlertCircle, ShieldCheck,
} from "lucide-react";
import { candidates } from "@/data/candidates";
import { qualifiedCategories, type QualifiedCategory } from "@/data/qualifiedCandidates";

interface VoteSelection {
  categoryName: string;
  candidateId: number;
  candidateName: string;
  candidateImage: string;
  candidateSociety: string;
}

interface AlreadyVoted {
  awardCategory: string;
  candidateId: number;
  candidateName: string;
}

// ─── Step bar ────────────────────────────────────────────────────────────────
const STEPS = ["Verify Email", "Select Candidates", "Review & Confirm", "Done"];

function StepBar({ step }: { step: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-1">
      {STEPS.map((label, i) => {
        const isComplete = step > i;
        const isActive = step === i;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isComplete ? "bg-emerald-500 text-white" : isActive ? "bg-blue-600 text-white ring-4 ring-blue-600/20" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"}`}>
                {isComplete ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${isActive ? "text-blue-600 dark:text-blue-400" : isComplete ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-10 sm:w-16 mx-1 mb-5 transition-all duration-500 ${step > i ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Category section ────────────────────────────────────────────────────────
function CategorySection({ category, selection, onSelect }: {
  category: QualifiedCategory;
  selection: VoteSelection | undefined;
  onSelect: (sel: VoteSelection) => void;
}) {
  const [open, setOpen] = useState(true);
  const categoryCandidates = useMemo(
    () => category.candidateIds.map((id) => candidates.find((c) => c.id === id)).filter(Boolean) as typeof candidates,
    [category.candidateIds]
  );

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${selection ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          <span className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">{category.categoryName}</span>
          {selection && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ {selection.candidateName.split(" ")[0]}</span>}
        </div>
        <div className="flex items-center gap-2">
          {!selection && <span className="text-xs text-zinc-400 hidden sm:block">{categoryCandidates.length} candidates</span>}
          {open ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
        </div>
      </button>

      {open && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-5 pb-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          {categoryCandidates.map((candidate) => {
            const selected = selection?.candidateId === candidate.id;
            return (
              <button
                key={candidate.id}
                onClick={() => onSelect({ categoryName: category.categoryName, candidateId: candidate.id, candidateName: `${candidate.firstname} ${candidate.otherNames}`, candidateImage: candidate.image, candidateSociety: candidate.society })}
                className={`relative flex flex-col items-center rounded-xl p-3 border-2 transition-all duration-200 focus:outline-none ${selected ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-blue-500/20 shadow-lg" : "border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
              >
                {selected && <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 ring-2 ${selected ? "ring-blue-500" : "ring-zinc-200 dark:ring-zinc-700"}`}>
                  <Image src={candidate.image} alt={candidate.firstname} width={80} height={80} unoptimized className="w-full h-full object-cover" />
                </div>
                <p className={`text-xs sm:text-sm font-semibold text-center leading-tight ${selected ? "text-blue-700 dark:text-blue-300" : "text-zinc-800 dark:text-zinc-200"}`}>
                  {candidate.firstname} {candidate.otherNames.split(" ")[0]}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5 text-center">{candidate.society}</p>
                <div className={`mt-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${selected ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                  {selected ? "Selected ✓" : "Vote"}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Review card ─────────────────────────────────────────────────────────────
function ReviewCard({ selection, onEdit }: { selection: VoteSelection; onEdit: () => void }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0">
        <Image src={selection.candidateImage} alt={selection.candidateName} width={56} height={56} unoptimized className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5 uppercase tracking-wide truncate">{selection.categoryName}</p>
        <p className="font-bold text-zinc-900 dark:text-white truncate">{selection.candidateName}</p>
        <p className="text-xs text-zinc-400 truncate">{selection.candidateSociety}</p>
      </div>
      <button onClick={onEdit} className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
        <Edit2 className="w-3 h-3" /> Edit
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function VotePage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [email, setEmail] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState<AlreadyVoted[]>([]);
  const [selections, setSelections] = useState<Map<string, VoteSelection>>(new Map());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newlySubmitted, setNewlySubmitted] = useState(0);

  // Only show categories this voter hasn't voted in yet
  const remainingCategories = useMemo(
    () => qualifiedCategories.filter((c) => !alreadyVoted.some((v) => v.awardCategory === c.categoryName)),
    [alreadyVoted]
  );

  const totalRemaining = remainingCategories.length;
  const selectedCount = selections.size;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    if (!email.trim() || !email.includes("@")) {
      setVerifyError("Please enter a valid email address.");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("/api/voter/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      if (!data.eligible) {
        setVerifyError("This email is not registered to vote. Please contact the event organisers.");
        return;
      }
      setAlreadyVoted(data.votedCategories || []);
      setStep(1);
    } catch (err: any) {
      setVerifyError(err.message || "Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSelect = (sel: VoteSelection) => {
    setSelections((prev) => { const n = new Map(prev); n.set(sel.categoryName, sel); return n; });
  };

  const handleEditCategory = (categoryName: string) => {
    setStep(1);
    setTimeout(() => {
      document.getElementById(`cat-${categoryName.replace(/\s+/g, "-")}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const votes = Array.from(selections.values()).map((s) => ({
        candidateId: s.candidateId,
        candidateName: s.candidateName,
        awardCategory: s.categoryName,
      }));
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes, voterEmail: email.trim().toLowerCase() }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Submission failed"); }
      setNewlySubmitted(votes.length);
      setStep(3);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step 0: Email gate ───────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <StepBar step={0} />
        <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/30">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-center text-zinc-900 dark:text-white mb-2">Verify Your Email</h1>
          <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm mb-8">
            Only registered members can vote. Enter your email to verify eligibility.
          </p>
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {verifyError && (
              <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{verifyError}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={verifying}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {verifying ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : <><ShieldCheck className="w-4 h-4" /> Verify & Proceed</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Step 1: Select (remaining categories only) ──────────────────────────
  if (step === 1) {
    // Edge case: voter has already completed all categories
    if (totalRemaining === 0) {
      return (
        <div className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
          <StepBar step={3} />
          <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">You've Already Voted!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              Your votes across all <span className="font-bold text-zinc-900 dark:text-white">{qualifiedCategories.length} categories</span> have already been recorded. Thank you for participating!
            </p>
            <button onClick={() => window.location.href = "/"} className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-3 px-6 rounded-xl transition-colors">
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <StepBar step={1} />

        {/* Resume banner */}
        {alreadyVoted.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Welcome back!</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">You've already voted in {alreadyVoted.length} categor{alreadyVoted.length > 1 ? "ies" : "y"}. Only the remaining {totalRemaining} are shown below.</p>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 shadow-lg shadow-blue-500/30">
            <Trophy className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">Cast Your Votes</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm">Select one candidate per category. Review before submitting.</p>
        </div>

        <div className="flex flex-col gap-4">
          {remainingCategories.map((category) => (
            <div key={category.categoryName} id={`cat-${category.categoryName.replace(/\s+/g, "-")}`}>
              <CategorySection category={category} selection={selections.get(category.categoryName)} onSelect={handleSelect} />
            </div>
          ))}
        </div>

        {/* Sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Progress</span>
                <span className={`text-xs font-bold ${selectedCount === totalRemaining && totalRemaining > 0 ? "text-emerald-600" : "text-blue-600 dark:text-blue-400"}`}>
                  {selectedCount} / {totalRemaining}
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: totalRemaining > 0 ? `${(selectedCount / totalRemaining) * 100}%` : "0%" }} />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedCount === 0}
              className={`flex-shrink-0 flex items-center gap-2 font-bold py-3 px-5 rounded-xl transition-all text-sm ${selectedCount > 0 ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 active:scale-[0.97]" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"}`}
            >
              <VoteIcon className="w-4 h-4" /> Review Votes
            </button>
          </div>
        </div>
        <div className="h-24" />
      </div>
    );
  }

  // ── Step 2: Review ───────────────────────────────────────────────────────
  if (step === 2) {
    const selectionList = Array.from(selections.values());
    const unanswered = remainingCategories.filter((c) => !selections.has(c.categoryName));
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <StepBar step={2} />
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to selection
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Review Your Votes</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Confirm your selections before submitting. You can still go back.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Your Selections ({selectionList.length})</h3>
          <div className="flex flex-col gap-3">
            {selectionList.map((sel) => (
              <ReviewCard key={sel.categoryName} selection={sel} onEdit={() => handleEditCategory(sel.categoryName)} />
            ))}
          </div>
        </div>

        {unanswered.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">⚠️ {unanswered.length} categor{unanswered.length > 1 ? "ies" : "y"} not yet voted:</p>
            <ul className="space-y-1">
              {unanswered.map((c) => (
                <li key={c.categoryName}>
                  <button onClick={() => handleEditCategory(c.categoryName)} className="text-xs text-amber-700 dark:text-amber-400 hover:underline">→ {c.categoryName}</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {submitError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-sm text-red-700 dark:text-red-400">{submitError}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || selectionList.length === 0}
          className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl text-base transition-all duration-200 ${submitting || selectionList.length === 0 ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.98]"}`}
        >
          {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</> : <><VoteIcon className="w-5 h-5" /> Submit {selectionList.length} Vote{selectionList.length !== 1 ? "s" : ""}</>}
        </button>
        <p className="text-center text-xs text-zinc-400 mt-3">Once submitted, your votes are final and cannot be changed.</p>
      </div>
    );
  }

  // ── Step 3: Success ──────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]">
      <StepBar step={3} />
      <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
          <PartyPopper className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">Votes Submitted!</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          Thank you! Your <span className="font-bold text-zinc-900 dark:text-white">{newlySubmitted} vote{newlySubmitted !== 1 ? "s" : ""}</span> have been securely recorded. May the best candidates win! 🏆
        </p>
        <div className="flex flex-col gap-2 mb-8 text-left max-h-72 overflow-y-auto">
          {Array.from(selections.values()).map((sel) => (
            <div key={sel.categoryName} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 truncate">{sel.categoryName}</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{sel.candidateName}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => window.location.href = "/"} className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-3 px-6 rounded-xl transition-colors">
          Return to Home
        </button>
      </div>
    </div>
  );
}
