# ConvoX

ConvoX is a modern, production-ready, real-time chat application powered by an integrated AI assistant. Built with the MERN stack (MongoDB, Express, React, Node.js) and utilizing WebSockets for real-time communication, ConvoX blends the traditional messaging experience with advanced AI capabilities.

## 🚀 Features

### Core Functionality
- **Real-Time Messaging**: Instant text communication between users utilizing Socket.io.
- **AI Chat Assistant**: Integrated intelligent assistant powered by Groq/OpenAI APIs to help answer questions, draft messages, and provide insights directly within the chat interface.
- **User Authentication**: Secure signup and login flow using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Responsive UI**: A beautiful, modern interface built with React, Tailwind CSS, and DaisyUI that works seamlessly across desktop and mobile devices.
- **State Management**: Fast and predictable global state management utilizing Zustand.

### Security
- HttpOnly Cookies for storing auth tokens to prevent XSS attacks.
- Robust password encryption.
- Protected API routes and authenticated socket connections.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Real-time**: Socket.io-client

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Real-time**: Socket.io
- **AI Integration**: OpenAI SDK (configured for Groq API)

## 📂 Project Structure

The project is structured into a standard monorepo format separating the client and server layers:

```
ConvoX/
├── client/          # React frontend application
│   ├── src/         # UI components, pages, styling, and Zustand store
│   ├── package.json # Frontend dependencies
│   └── vite.config.js
└── server/          # Node.js + Express backend
    ├── models/      # MongoDB database schemas
    ├── controllers/ # Route logic and business functionality
    ├── routes/      # Express API route definitions
    ├── lib/         # Utility functions (db connection, socket initialization)
    └── server.js    # Entry point for the backend application
```

## ⚙️ Installation & Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas cluster URI)
- Groq or OpenAI API Key (for the AI assistant)

### 1. Clone the repository
```bash
git clone https://github.com/asutosh-das/ConvoX.git
cd ConvoX
```

### 2. Setup the Backend
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_or_openai_api_key
NODE_ENV=development
```

Start the backend development server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

*(Optional)* Create a `.env` file in the `client` directory if you need to specify custom API URLs (depending on your Vite configuration).

Start the frontend development server:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173` (or the port specified by Vite).

## 💡 How the AI Assistant Works
ConvoX leverages a seamless API integration to inject intelligent responses into standard real-time chats or dedicated bot-interaction channels. The backend securely manages the API keys (using `openai` node package pointing to Groq's high-speed inference endpoints), ensuring that sensitive credentials are never exposed to the client.

## 🌍 Deployment

You can deploy ConvoX for **free** using standard cloud platforms. The recommended approach is separating the Frontend and Backend.

### 1. Backend (Server) -> Deploy to Render or Railway
- Create a new Web Service on [Render](https://render.com/) or [Railway](https://railway.app/).
- Set the root directory to `server`.
- Use the Build Command: `npm install`
- Use the Start Command: `npm start` (Make sure your `server/package.json` has `"start": "node server.js"`).
- Add all your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `GROQ_API_KEY`) exactly as they are in your local `.env`.

### 2. Frontend (Client) -> Deploy to Vercel or Netlify
- Create a new project on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- Set the Root Directory to `client`.
- The Framework preset should auto-detect **Vite** (Build command: `npm run build`, Output directory: `dist`).
- **Important:** Add an environment variable (e.g., `VITE_API_URL` or whatever your frontend uses to connect to the backend) and point it to your deployed Backend URL from Step 1!

## 📄 License
This project is open-source and available for use and modification.
