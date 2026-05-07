"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Award, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <span>NFCS Awards</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/nominate" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
            Nominate
          </Link>
          <Link href="/vote" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
            Vote
          </Link>
          <Link href="/admin" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
            Admin Dashboard
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black absolute w-full left-0 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-4 pt-2 pb-6 space-y-4">
            <Link 
              href="/nominate" 
              onClick={closeMenu}
              className="block px-3 py-3 rounded-xl text-base font-medium text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Nominate
            </Link>
            <Link 
              href="/vote" 
              onClick={closeMenu}
              className="block px-3 py-3 rounded-xl text-base font-medium text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Vote
            </Link>
            <Link 
              href="/admin" 
              onClick={closeMenu}
              className="block px-3 py-3 rounded-xl text-base font-medium text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
