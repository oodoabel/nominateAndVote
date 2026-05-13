"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserPlus,
  X,
  CheckCircle2,
  Search,
  Eye,
  ChevronDown,
} from "lucide-react";
import { candidates, Candidate } from "@/data/candidates";

// Award Categories
type AwardGender = "male" | "female" | "all";
interface AwardCategory {
  id: number;
  name: string;
  gender: AwardGender;
}

const awardCategories: AwardCategory[] = [
  // Unisex Awards (1-15)
  { id: 1, name: "Most Popular", gender: "all" },
  { id: 2, name: "Most Spiritual", gender: "all" },
  { id: 3, name: "Best Dressed", gender: "all" },
  { id: 4, name: "Most Friendly", gender: "all" },
  { id: 5, name: "Most Likely to Succeed", gender: "all" },
  { id: 6, name: "Life of the Party", gender: "all" },
  { id: 7, name: "Most Talented", gender: "all" },
  { id: 8, name: "Best Smile", gender: "all" },
  { id: 9, name: "Most Hardworking", gender: "all" },
  { id: 10, name: "Most Generous", gender: "all" },
  { id: 11, name: "Best Leader", gender: "all" },
  { id: 12, name: "Most Creative", gender: "all" },
  { id: 13, name: "Best Couple (Him)", gender: "male" },
  { id: 14, name: "Best Couple (Her)", gender: "female" },
  { id: 15, name: "Most Prayerful", gender: "all" },
  // Male-only Awards (16-25)
  { id: 16, name: "Mr. NFCS", gender: "male" },
  { id: 17, name: "Most Handsome", gender: "male" },
  { id: 18, name: "Best Bro", gender: "male" },
  { id: 19, name: "Most Gentle Guy", gender: "male" },
  { id: 20, name: "Most Fashionable Guy", gender: "male" },
  { id: 21, name: "Coolest Guy", gender: "male" },
  { id: 22, name: "Most Caring Bro", gender: "male" },
  { id: 23, name: "Ladies' Man", gender: "male" },
  { id: 24, name: "Most Athletic Guy", gender: "male" },
  { id: 25, name: "Best Male Singer", gender: "male" },
  // Female-only Awards (26-35)
  { id: 26, name: "Miss NFCS", gender: "female" },
  { id: 27, name: "Most Beautiful", gender: "female" },
  { id: 28, name: "Best Sis", gender: "female" },
  { id: 29, name: "Most Gentle Lady", gender: "female" },
  { id: 30, name: "Most Fashionable Lady", gender: "female" },
  { id: 31, name: "Coolest Lady", gender: "female" },
  { id: 32, name: "Most Caring Sis", gender: "female" },
  { id: 33, name: "Guys' Crush", gender: "female" },
  { id: 34, name: "Most Athletic Lady", gender: "female" },
  { id: 35, name: "Best Female Singer", gender: "female" },
];

// Expanded Dummy Data
const NOMINATION_PRICE = 100; // Naira

export default function NominatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [previewCandidate, setPreviewCandidate] = useState<Candidate | null>(
    null,
  );
  const [nominationCount, setNominationCount] = useState(1);
  const [selectedAward, setSelectedAward] = useState<AwardCategory | null>(
    null,
  );
  const [awardDropdownOpen, setAwardDropdownOpen] = useState(false);
  const [awardSearch, setAwardSearch] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Filter candidates based on search
  const filteredCandidates = candidates.filter((candidate) => {
    const fullName =
      `${candidate.firstname} ${candidate.otherNames}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      candidate.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleNominateClick = (candidate: (typeof candidates)[0]) => {
    setSelectedCandidate(candidate);
    setNominationCount(1);
    setSelectedAward(null);
    setAwardDropdownOpen(false);
    setAwardSearch("");
    setPaymentSuccess(false);
  };

  const handlePreviewClick = (candidate: (typeof candidates)[0]) => {
    setPreviewCandidate(candidate);
  };

  const closeNominateModal = () => {
    setSelectedCandidate(null);
    setSelectedAward(null);
    setAwardDropdownOpen(false);
    setAwardSearch("");
    setPaymentSuccess(false);
  };

  // Filter award categories based on candidate gender
  const getEligibleAwards = (gender: string) => {
    return awardCategories.filter(
      (award) => award.gender === "all" || award.gender === gender,
    );
  };

  const filteredAwards = selectedCandidate
    ? getEligibleAwards(selectedCandidate.gender).filter((award) =>
        award.name.toLowerCase().includes(awardSearch.toLowerCase()),
      )
    : [];

  const closePreviewModal = () => {
    setPreviewCandidate(null);
  };

  const handleMockPayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
          Nominate Candidates
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Browse through our final-year students and boost your favorite
          candidate's chances.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-zinc-400" />
        </div>
        <input
          type="search"
          placeholder="Search by name or nickname..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 transition-all"
        />
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No candidates found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Image Area - Clickable for Preview */}
              <button
                onClick={() => handlePreviewClick(candidate)}
                className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800/50  flex items-center justify-center cursor-pointer group/img overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="bg-white/90 text-zinc-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 shadow-lg">
                    <Eye className="w-3 h-3" /> Preview
                  </span>
                </div>
                <Image
                  src={candidate.image}
                  alt={candidate.firstname}
                  width={500}
                  height={500}
                  unoptimized
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                />
              </button>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-1 truncate">
                  {candidate.firstname} {candidate.otherNames.split(" ")[0]}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-[10px] sm:text-xs font-medium text-purple-700 dark:text-purple-400 ring-1 ring-inset ring-purple-700/10 truncate">
                    {candidate.society}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-[10px] sm:text-xs font-medium text-purple-700 dark:text-purple-400 ring-1 ring-inset ring-purple-700/10 truncate">
                    {candidate.department}
                  </span>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handlePreviewClick(candidate)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-xl transition-colors text-xs sm:text-sm"
                  >
                    <Eye className=" w-4 h-4 sm:w-4 sm:h-4" />
                    <span className="sm:inline">Profile</span>
                  </button>
                  <button
                    onClick={() => handleNominateClick(candidate)}
                    className="flex-[2] flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-xl transition-colors text-sm sm:text-base"
                  >
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Nominate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewCandidate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl my-auto relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-full">
            <button
              onClick={closePreviewModal}
              className="absolute top-4 right-4 z-10 bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 p-2 rounded-full text-zinc-600 dark:text-zinc-300 transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-0">
              {/* Header / Big Image */}
              <div className="bg-gradient-to-b from-blue-100 to-white dark:from-blue-900/30 dark:to-zinc-900 pt-12 pb-6 px-6 sm:px-10 flex flex-col items-center text-center">
                <div className="w-50 h-50 sm:w-48 sm:h-48 bg-white dark:bg-zinc-800 rounded-full shadow-xl p-2 mb-4">
                  <Image
                    src={previewCandidate.image}
                    alt={previewCandidate.firstname}
                    width={800}
                    height={800}
                    unoptimized
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                  {previewCandidate.firstname} {previewCandidate.otherNames}
                </h2>
                <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-1">
                  "{previewCandidate.nickname}"
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full text-sm font-medium">
                    {previewCandidate.department}
                  </span>
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    {previewCandidate.society}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="p-6 sm:p-10 bg-white dark:bg-zinc-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <DetailItem
                    label="Relationship Status"
                    value={previewCandidate.relationshipStatus}
                  />
                  <DetailItem
                    label="Date of Birth"
                    value={previewCandidate.dateOfBirth}
                  />
                  <DetailItem label="Hobby" value={previewCandidate.hobby} />
                  <DetailItem
                    label="Skill / Side Hustle"
                    value={previewCandidate.skill}
                  />
                  <DetailItem
                    label="Forum Paddy"
                    value={previewCandidate.forumPaddy}
                  />
                  <DetailItem
                    label="Forum Crush 😍"
                    value={previewCandidate.forumCrush}
                  />
                  <DetailItem
                    label="Best Level"
                    value={previewCandidate.bestLevel}
                  />
                  <DetailItem
                    label="Most Stressful Level"
                    value={previewCandidate.mostStressfulLevel}
                  />
                  <DetailItem
                    label="Japa or Stay?"
                    value={previewCandidate.japaOrStay}
                  />
                  <DetailItem
                    label="Fav Bible Verse"
                    value={previewCandidate.favBibleVerse}
                  />
                </div>

                <div className="mt-8 space-y-6">
                  <DetailItem
                    label="Best Campus Experience / Fun Moment"
                    value={previewCandidate.bestCampusExperience}
                    fullWidth
                  />
                  <DetailItem
                    label="Favorite Quote"
                    value={`"${previewCandidate.favQuote}"`}
                    fullWidth
                  />
                  <DetailItem
                    label="Parting Words for Lower Levels"
                    value={`"${previewCandidate.partingWords}"`}
                    fullWidth
                  />
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => {
                      closePreviewModal();
                      handleNominateClick(previewCandidate);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1"
                  >
                    Nominate {previewCandidate.firstname} Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nomination Payment Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={closeNominateModal}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  Payment Successful!
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  You have successfully purchased {nominationCount}{" "}
                  nomination(s) for {selectedCandidate.firstname}.
                </p>
                {selectedAward && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-8">
                    Category: {selectedAward.name}
                  </p>
                )}
                <button
                  onClick={closeNominateModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src={selectedCandidate.image}
                    alt={selectedCandidate.firstname}
                    width={64}
                    height={64}
                    unoptimized
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {selectedCandidate.firstname}{" "}
                      {selectedCandidate.otherNames.split(" ")[0]}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {selectedCandidate.society}
                    </p>
                  </div>
                </div>

                {/* Award Category Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    Award Category
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAwardDropdownOpen(!awardDropdownOpen)}
                      className={`w-full flex items-center justify-between p-3 border rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-left transition-colors ${
                        selectedAward
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          selectedAward
                            ? "text-zinc-900 dark:text-white font-medium"
                            : "text-zinc-400"
                        }`}
                      >
                        {selectedAward
                          ? selectedAward.name
                          : "Select an award category..."}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform ${
                          awardDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {awardDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl z-20 overflow-hidden">
                        <div className="p-2 border-b border-zinc-100 dark:border-zinc-700">
                          <input
                            type="text"
                            placeholder="Search awards..."
                            value={awardSearch}
                            onChange={(e) => setAwardSearch(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-900 dark:text-white placeholder:text-zinc-400"
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredAwards.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-zinc-400">
                              No matching awards
                            </div>
                          ) : (
                            filteredAwards.map((award) => (
                              <button
                                key={award.id}
                                type="button"
                                onClick={() => {
                                  setSelectedAward(award);
                                  setAwardDropdownOpen(false);
                                  setAwardSearch("");
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-zinc-700 transition-colors text-left ${
                                  selectedAward?.id === award.id
                                    ? "bg-blue-50 dark:bg-zinc-700 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-zinc-700 dark:text-zinc-300"
                                }`}
                              >
                                <span>{award.name}</span>
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                    award.gender === "male"
                                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                                      : award.gender === "female"
                                        ? "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400"
                                        : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                                  }`}
                                >
                                  {award.gender === "male"
                                    ? "♂ Male"
                                    : award.gender === "female"
                                      ? "♀ Female"
                                      : "All"}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Number of Nominations */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    Number of Nominations
                  </label>
                  <div className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50">
                    <button
                      onClick={() =>
                        setNominationCount(Math.max(1, nominationCount - 1))
                      }
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white w-16 text-center">
                      {nominationCount}
                    </span>
                    <button
                      onClick={() => setNominationCount(nominationCount + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="flex items-center justify-between mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                  <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₦{(nominationCount * NOMINATION_PRICE).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleMockPayment}
                  disabled={!selectedAward}
                  className={`w-full flex items-center justify-center gap-2 font-semibold py-4 px-4 rounded-xl transition-all ${
                    selectedAward
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {selectedAward
                    ? "Proceed to Pay"
                    : "Select an award category first"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for preview details
function DetailItem({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      <h4 className="text-xs sm:text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
        {label}
      </h4>
      <p className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-200">
        {value}
      </p>
    </div>
  );
}
