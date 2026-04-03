<div align="center">
  <div style="background-color: #09090b; padding: 20px; border-radius: 20px; display: inline-block;">
      <h1 style="color: #6366f1; margin: 0;">💬 ConvoX</h1>
      <p style="color: #a1a1aa; font-size: 1.1em;">Modern, Real-Time AI Chat Application</p>
  </div>
  
  <br />

  [![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  <p align="center">
    A production-ready, beautiful messaging platform blending traditional chat with advanced Groq/OpenAI powered capabilities.
  </p>
</div>

<hr />

## ✨ Features

ConvoX has been extensively designed and engineered to provide a robust, premium user experience.

### 🎨 Premium UI/UX & Aesthetics
* **Glassmorphism Dark Mode:** An immersive, state-of-the-art dark theme utilizing frosted glass panels (`backdrop-blur`), subtle glowing borders, and fluid gradient orbs.
* **Dynamic Chat Bubbles:** Asymmetric, tailored chat bubbles powered by vibrant `indigo/purple` gradients for sent messages, and sleek frosted modules for received ones.
* **Floating Input & Animations:** A fully fluid workspace featuring a detached pill-shaped message input box and smooth micro-animations on every interaction.
* **Animated Avatars:** High-quality, dynamically generated SVG vector avatars via `Dicebear` (`avataaars` for humans, `bottts` for AI assistants) designed to handle API fallback states cleanly.

### ⚡ Core Functionality
* **Real-time Engine:** Instant messaging built on top of robust WebSocket (`Socket.io`) architecture.
* **ConvoX Intelligence (AI):** A fully integrated AI chat assistant capable of reasoning, answering questions, drafting messages, and providing contextual insights.
* **Advanced Message Management:** 
  * Individual message interaction (Star ⭐, Delete 🗑️).
  * WhatsApp-style floating bulk-action bar for multi-message selection and processing.
* **Hardened Architecture:** Robust frontend fetching logic custom-built to intercept empty proxy responses, actively preventing `Unexpected end of JSON input` application crashes.
* **Global State Management:** Lightning-fast state tracking utilizing the lightweight `Zustand` engine.

### 🛡️ Security & Authentication
* Fully encrypted Authentication flow powered by `bcryptjs`.
* Session safety utilizing strict `HttpOnly` JSON Web Token (JWT) cookies to prevent XSS attacks.
* Secured backend API routing structure protecting all messaging and AI endpoints.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, DaisyUI, Zustand, Lucide React |
| **Backend** | Node.js, Express.js, Socket.io, OpenAPI SDK |
| **Database** | MongoDB arrayed with Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **APIs** | Groq Fast Inference, standard OpenAI specifications |

---

## 📂 Project Architecture

A structurally sound monorepo separating React client state from the Node engine:

```text
ConvoX/
├── client/                 # ⚛️ React 19 Frontend Environment
│   ├── src/
│   │   ├── components/     # Modular, reusable UI components (Messages, Sidebar, App Layout)
│   │   ├── context/        # React context boundaries (Auth, Theme)
│   │   ├── hooks/          # Complex business-logic abstractions
│   │   ├── pages/          # Application routing pages (Home, Login, Signup)
│   │   └── zustand/        # Global state stores
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # 🟢 Node.js / Express Backend Endpoint
    ├── controllers/        # Route operational logic
    ├── db/                 # DB configuration & standard initialization seeds
    ├── models/             # Rigid Mongoose Schemas (User, Message, AI)
    ├── routes/             # RESTful Express route definition matrices
    ├── socket/             # WebSocket payload handlers
    ├── middleware/         # Security intercepts (protectRoute)
    └── server.js           # Engine ignition
```

---

## ⚙️ Installation & Setup

### 1. Requirements
Ensure you have the following installed locally:
* **Node.js** (v18.x or higher)
* **MongoDB** (Local daemon or Cloud Atlas URI)
* **Groq API Key** (or Standard OpenAI Key)

### 2. Repository Ignition
```bash
git clone https://github.com/asutosh-das/ConvoX.git
cd ConvoX
```

### 3. Backend Configuration
Move to the inner server directory and initialize parameters:
```bash
cd server
npm install
```

**Environment Variables (`server/.env`)**
Create an `.env` file at the root of the `/server` folder.
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_or_openai_api_key
NODE_ENV=development
```

**Boot the Server:**
```bash
npm run dev
# Server will mount to specified PORT (Default: 5001)
```

### 4. Frontend Configuration
Move to the inner client directory and initialize dependencies:
```bash
cd ../client
npm install
```

**Boot the Client App:**
```bash
npm run dev
# Vite will mount to localhost:5173
```

---

## 🌍 Platform Deployment

ConvoX is structurally decoupled to allow for highly optimized cloud deployments entirely on free tiers.

### ☁️ Backend (Render / Railway)
1. Initialize a Web Service targeted at the `server` root directory.
2. Ensure standard injection markers (`npm install`, `node server.js`).
3. Inject the production `MONGODB_URI`, `JWT_SECRET`, and `GROQ_API_KEY` into your host's environment settings.

### ⚡ Frontend (Vercel / Netlify)
1. Point your platform to the `client` root directory.
2. Allow the system to auto-detect Vite frameworks (`npm run build`, outputting to `/dist`).
3. If necessary, provide `VITE_API_URL` environment variables to reroute fetch requests to your deployed Render instance.

---

<p align="center">
  Built with dedication to redefine digital conversation platforms. <br>
  Open Source under the ISC License.
</p>
