'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function YourUrls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Redirect to home if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // ✅ Fetch URLs only if authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      fetchUrls();
    }
  }, [status]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/url/all');
      setUrls(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this URL?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/url/${id}`);
      fetchUrls();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete');
    }
  };

  const handleEdit = async (url) => {
    const newOriginal = prompt('Enter new original URL:', url.original);
    if (!newOriginal) return;

    const newCustom = prompt('Enter new custom word (optional):', url.slug);

    try {
      await axios.patch(`http://localhost:5000/api/url/${url._id}`, {
        original: newOriginal,
        custom: newCustom || undefined,
      });
      fetchUrls();
    } catch (err) {
      console.error('Edit failed:', err);
      alert(err.response?.data?.message || 'Failed to edit');
    }
  };

  // ✅ Show loading while checking session
  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex-grow px-6 py-10 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Your Trimmed URLs
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="space-y-6">
            {urls.map((url) => (
              <div
                key={url._id}
                className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 shadow-inner shadow-black/30"
              >
                <div className="mb-2 text-sm text-gray-400">Original:</div>
                <p className="text-white break-words">{url.original}</p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-gray-400">Short URL:</span>
                    <p className="text-indigo-400 font-mono">
                      <a href={url.short} target="_blank" rel="noopener noreferrer">
                        {url.short}
                      </a>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(url.short)}
                      className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded-lg transition shadow-[0_0_10px_#6366f1aa]"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => handleEdit(url)}
                      className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded-lg transition shadow-[0_0_10px_#22d3ee66]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(url._id)}
                      className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded-lg transition shadow-[0_0_10px_#fb718566]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {urls.length === 0 && !loading && (
              <p className="text-center text-gray-400 mt-10">
                You haven’t shortened any URLs yet.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
