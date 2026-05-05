import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p className="text-2xl font-bold text-black dark:text-white">
          Welcome to the <span className="text-3xl">Nominate and Vote</span>!
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold min-w-50 py-2 px-4 rounded">
          I want to Nominate
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold min-w-50 py-2 px-4 rounded">
          I want to Vote
        </button>
        <button className="bg-none border-2 border-blue-500 text-blue-500 font-bold min-w-50 py-2 px-4 rounded">
          Admin Page
        </button>
      </main>
    </div>
  );
}
