'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">

      {/* Glowing grid dots background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[length:20px_20px] opacity-10 animate-pulse z-0" />

      {/* Centered content box */}
      <div className="relative z-10 px-6">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-10 max-w-xl text-center shadow-[0_0_40px_#6366f1aa]">
          <h1 className="text-5xl font-extrabold text-indigo-400 mb-4">
            Welcome to Ctrl<span className="text-white">Link</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Shorten, manage, and share your URLs with simplicity and style.
          </p>

          {session ? (
            <>
              <div className="mb-6">
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <h2 className="text-xl font-semibold">{session.user.name}</h2>
                <p className="text-gray-400">{session.user.email}</p>
              </div>
              <div className="flex justify-center gap-4">
                <a href="/trim">
                  <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition shadow-[0_0_10px_#6366f1aa]">
                    Get Started
                  </button>
                </a>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => signIn('google')}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition shadow-[0_0_10px_#6366f1aa]"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
