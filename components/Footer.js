'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-white px-6 py-10 mt-10 shadow-[0_0_20px_#6366f180]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">Ctrl<span className="text-white">Link</span></h2>
          <p className="text-gray-400 mt-2">
            Your modern, secure, and smart URL shortener built for the future.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:text-indigo-400 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-indigo-400 transition">About</Link></li>
            <li><Link href="/login" className="hover:text-indigo-400 transition">Login</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <p className="text-gray-400">
            Email: <a href="mailto:support@ctrllink.com" className="hover:text-indigo-400">support@ctrllink.com</a>
          </p>
          <p className="text-gray-400 mt-2">Mumbai, India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-white/10 pt-4">
        &copy; {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">CtrlLink</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
