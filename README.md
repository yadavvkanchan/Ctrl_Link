# 🔗 Ctrl_Link — A Simple & Fast URL Shortener

**Ctrl_Link** is a modern, full-stack URL shortener web app that allows users to create, customize, and manage short links with ease. Designed with speed, clarity, and real-world usability in mind, Ctrl_Link offers an intuitive interface and powerful backend.

---

## ✨ Features

- 🔗 Instantly shorten long URLs
- ✍️ Custom aliases for short URLs (e.g., `ctrl.link/myname`)
- 🗂️ Edit and delete previously created short links
- 📊 (Optional) Click tracking support
- 🔐 Google authentication using NextAuth
- 💻 REST API endpoints for developers
- 🌐 Fully responsive frontend with modern UI

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Auth |
|----------|---------|----------|------|
| Next.js  | Express.js | MongoDB | NextAuth (Google OAuth) |

Additional tools: Tailwind CSS, nanoid, dotenv, Vercel (frontend hosting), Render/Fly.io (backend hosting)

---

## 📁 Project Structure

/Ctrl_Link
├── backend/ # Express backend (API + DB logic)
│ ├── routes/ # API routes for shortening, editing, deleting
│ ├── models/ # Mongoose models
│ ├── server.js # Main backend server entry
│ └── .env # Backend environment variables
├── app/ or src/ # Next.js frontend pages
├── components/ # Navbar, Footer, and UI components
├── public/ # Static files
├── .env.local # Frontend env vars
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js
└── README.md # This file