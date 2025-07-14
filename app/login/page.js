'use client';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = '/my-urls';
    } else {
      alert('Login failed: ' + data.message);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-xl p-8 shadow-inner shadow-black/30 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">Login to Ctrl<span className="text-white">Link</span></h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition shadow-[0_0_10px_#6366f1aa]"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
