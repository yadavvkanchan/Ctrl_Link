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

| Frontend | Backend     | Database | Auth                    |
|----------|-------------|----------|-------------------------|
| Next.js  | Express.js  | MongoDB  | NextAuth (Google OAuth) |

**Additional tools**: Tailwind CSS, nanoid, dotenv  
**Deployment**: Vercel (Frontend), Render or Railway (Backend)

---

## 📁 Project Structure

Ctrl_Link/
├── backend/ # Express backend
│ ├── routes/ # API routes (shorten, edit, delete)
│ ├── models/ # Mongoose models
│ └── server.js # Backend entry point
├── app/ or src/ # Next.js frontend (pages, layout, styling)
├── components/ # Navbar, Footer, etc.
├── public/ # Static assets
├── .env.local # Frontend environment variables
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js
└── README.md


---

## 🚀 Getting Started Locally

### 1️⃣ Clone the repository

git clone https://github.com/yadavvkanchan/Ctrl_Link.git
cd Ctrl_Link


---

### 2️⃣ Backend Setup

cd backend
npm install
npm start


Make sure you have a `.env` file inside `/backend` with the following:

MONGO_URI=your_mongodb_connection_string
PORT=5000

---

### 3️⃣ Frontend Setup (Next.js)

Open a new terminal tab/window:

cd Ctrl_Link
npm install
npm run dev


Make sure you have a `.env.local` in root with the following:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000


---

## 🧪 API Routes

| Method | Endpoint             | Description                      |
|--------|----------------------|----------------------------------|
| POST   | /api/url/shorten     | Create a new short URL           |
| GET    | /api/url/:slug       | Redirect to original URL         |
| GET    | /api/url/user        | Get all URLs created by user     |
| PUT    | /api/url/edit/:id    | Update existing short URL        |
| DELETE | /api/url/delete/:id  | Delete a short URL               |

---

## 📦 Deployment

- **Frontend**: Deploy easily to [Vercel](https://vercel.com/)
- **Backend**: Deploy to [Render](https://render.com), [Railway](https://railway.app) or [Fly.io](https://fly.io)

---


## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📃 License

[MIT](https://choosealicense.com/licenses/mit/)

---





