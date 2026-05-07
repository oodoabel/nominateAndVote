"use client";

import { useState } from "react";
import Image from "next/image";
import { UserPlus, X, CheckCircle2, Search, Eye } from "lucide-react";

// Expanded Dummy Data
const candidates = [
  {
    id: 1,
    firstname: "John",
    otherNames: "Chukwudi Doe",
    nickname: "Johnny Boy",
    relationshipStatus: "Single",
    dateOfBirth: "12th May",
    hobby: "Singing & Coding",
    favBibleVerse: "Philippians 4:13",
    forumPaddy: "Jane Smith",
    forumCrush: "Secret 😉",
    department: "Computer Science",
    society: "NFCS Choir",
    bestCampusExperience: "Winning the departmental coding hackathon in 300L.",
    bestLevel: "400L",
    mostStressfulLevel: "300L",
    favQuote: "It is what it is.",
    skill: "Web Development",
    partingWords: "Never give up on your dreams, keep pushing.",
    japaOrStay: "Japa ✈️",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    firstname: "Jane",
    otherNames: "Ngozi Smith",
    nickname: "Jay",
    relationshipStatus: "In a relationship",
    dateOfBirth: "3rd August",
    hobby: "Reading Novels",
    favBibleVerse: "John 3:16",
    forumPaddy: "John Doe",
    forumCrush: "Michael",
    department: "Mass Communication",
    society: "Board of Lectors",
    bestCampusExperience: "My first time reading as a Lector.",
    bestLevel: "200L",
    mostStressfulLevel: "400L",
    favQuote: "Live and let live.",
    skill: "Content Creation",
    partingWords: "Make good friends, they will save you.",
    japaOrStay: "Stay 🇳🇬",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jane",
  },
  {
    id: 3,
    firstname: "Michael",
    otherNames: "Oluwaseun Johnson",
    nickname: "Mickey",
    relationshipStatus: "Single",
    dateOfBirth: "25th December",
    hobby: "Playing Football",
    favBibleVerse: "Psalms 23:1",
    forumPaddy: "David Brown",
    forumCrush: "Sarah",
    department: "Mechanical Engineering",
    society: "Legion of Mary",
    bestCampusExperience: "NFCS week sports festival.",
    bestLevel: "100L",
    mostStressfulLevel: "500L",
    favQuote: "Hard work beats talent.",
    skill: "Graphic Design",
    partingWords: "Always put God first in everything.",
    japaOrStay: "Japa ✈️",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Michael",
  },
];

const NOMINATION_PRICE = 500; // Naira

export default function NominatePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<
    (typeof candidates)[0] | null
  >(null);
  const [previewCandidate, setPreviewCandidate] = useState<
    (typeof candidates)[0] | null
  >(null);
  const [nominationCount, setNominationCount] = useState(1);
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
    setPaymentSuccess(false);
  };

  const handlePreviewClick = (candidate: (typeof candidates)[0]) => {
    setPreviewCandidate(candidate);
  };

  const closeNominateModal = () => {
    setSelectedCandidate(null);
    setPaymentSuccess(false);
  };

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
                className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800/50 p-4 sm:p-6 flex items-center justify-center cursor-pointer group/img overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="bg-white/90 text-zinc-900 text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 shadow-lg">
                    <Eye className="w-3 h-3" /> Preview
                  </span>
                </div>
                <Image
                  src={candidate.image}
                  alt={candidate.firstname}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain group-hover/img:scale-110 transition-transform duration-500"
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
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handlePreviewClick(candidate)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold py-2 sm:py-3 px-2 sm:px-4 rounded-xl transition-colors text-xs sm:text-sm"
                  >
                    <Eye className="w-4 h-4 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Profile</span>
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
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white dark:bg-zinc-800 rounded-full shadow-xl p-2 mb-4">
                  <Image
                    src={previewCandidate.image}
                    alt={previewCandidate.firstname}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain rounded-full"
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
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  You have successfully purchased {nominationCount}{" "}
                  nomination(s) for {selectedCandidate.firstname}.
                </p>
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

                <div className="mb-8">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
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
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Proceed to Pay
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
