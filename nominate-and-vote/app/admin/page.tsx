import { Users, TrendingUp, Vote, DollarSign } from "lucide-react";
import Image from "next/image";

// Dummy Data
const candidates = [
  {
    id: 1,
    name: "John Doe",
    society: "NFCS Choir",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=John",
    nominations: 45,
    votes: 12,
  },
  {
    id: 2,
    name: "Jane Smith",
    society: "Board of Lectors",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jane",
    nominations: 80,
    votes: 25,
  },
  {
    id: 3,
    name: "Michael Johnson",
    society: "Legion of Mary",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Michael",
    nominations: 30,
    votes: 5,
  },
  {
    id: 4,
    name: "Sarah Williams",
    society: "Charismatic Renewal",
    image: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
    nominations: 120,
    votes: 40,
  },
];

export default function AdminDashboard() {
  const totalNominations = candidates.reduce((acc, curr) => acc + curr.nominations, 0);
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);
  const totalRevenue = totalNominations * 500; // 500 Naira per nomination

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Overview of the NFCS Awards progress.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all">
          + Add Candidate
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Candidates</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{candidates.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Nominations</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalNominations}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Revenue</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">₦{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Vote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Votes</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalVotes}</p>
          </div>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Candidates Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Society</th>
                <th className="px-6 py-4">Nominations</th>
                <th className="px-6 py-4">Votes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={candidate.image}
                        alt={candidate.name}
                        width={40}
                        height={40}
                        className="rounded-full bg-zinc-100 dark:bg-zinc-800"
                      />
                      <span className="font-medium text-zinc-900 dark:text-white">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{candidate.society}</td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-white">{candidate.nominations}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-white">{candidate.votes}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
