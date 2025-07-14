'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TrimPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [original, setOriginal] = useState('');
  const [custom, setCustom] = useState('');
  const [short, setShort] = useState('');

  // 🔒 Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // or use `/api/auth/signin` to redirect to login directly
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/url/shorten', {
        original,
        custom,
      });
      setShort(res.data.short);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Show loader while checking auth
  if (status === 'loading') {
    return <p className="text-white text-center mt-10">Checking authentication...</p>;
  }

  // ✅ Show Trim form only if authenticated
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md w-full shadow-lg backdrop-blur-md">
        <h2 className="text-2xl mb-4 font-bold text-indigo-400">Shorten Your Link</h2>

        <input
          type="url"
          placeholder="Original URL"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-black/20 border border-white/10 text-white"
        />

        <input
          type="text"
          placeholder="Custom word (optional)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-black/20 border border-white/10 text-white"
        />

        <button type="submit" className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold">
          Shorten
        </button>

        {short && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300">Short URL:</p>
            <a href={short} target="_blank" className="text-indigo-400 underline">{short}</a>
          </div>
        )}
      </form>
    </main>
  );
}
