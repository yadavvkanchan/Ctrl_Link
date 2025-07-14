'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const linkStyle = (path) =>
        `hover:text-indigo-400 transition ${pathname === path ? 'text-indigo-400 font-semibold' : 'text-white'
        }`;

    return (
        <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10 shadow-[0_0_10px_#6366f180] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-wider text-indigo-400 hover:text-white transition">
                    Ctrl<span className="text-white">Link</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 font-medium text-sm">
                    <Link href="/" className={linkStyle('/')}>Home</Link>
                    <Link href="/trim" className={linkStyle('/trim')}>Trim</Link>
                    <Link href="/yoururls" className={linkStyle('/yoururls')}>Your URLs</Link>
                </div>


                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        <svg
                            className="w-6 h-6 text-indigo-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Links */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-sm text-white">
                    <Link href="/" className={linkStyle('/')}>Home</Link>
                    <Link href="/trim" className={linkStyle('/trim')}>Trim</Link>
                    <Link href="/yoururls" className={linkStyle('/yoururls')}>Your URLs</Link>
                    <Link
                        href="/login"
                        className="block bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg transition shadow-[0_0_10px_#6366f1aa]"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
