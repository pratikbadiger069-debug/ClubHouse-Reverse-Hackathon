# Echo | Live Audio Rooms That Leave Something Behind 🎙️✨

> **Reverse-Hackathon Project**: Solving the ephemeral audio problem of Clubhouse by turning live voice rooms into structured AI summaries, timestamped notes, searchable knowledge libraries, and interest-matched student communities.

---

## 🚀 Quick Start & Local Setup

```bash
# 1. Clone & Install dependencies
npm install

# 2. Start Vite local development server
npm run dev

# 3. Build for production verification
npm run build
```

---

## ⚙️ Environment Variables & MOCK DEMO MODE

Create a `.env` or `.env.local` file in the root directory (refer to `.env.example`):

```env
# Supabase Database & Realtime Credentials (Optional)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Audio Provider Credentials (Optional)
VITE_AUDIO_PROVIDER=mock
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
DAILY_API_KEY=

# LLM API Key for Serverless Recap Functions (Optional)
GEMINI_API_KEY=
OPENAI_API_KEY=
```

> ⚡ **Zero-Crash Guarantee (MOCK MODE)**: If any API key is omitted, Echo automatically operates in **Demo Data Mode** with seeded mock datasets, client-side Web Speech API captions, and simulated token generation. The app will never crash due to missing credentials.

---

## 🛠️ Tech Architecture & Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS v4
- **Routing**: React Router DOM (`/`, `/onboarding`, `/home`, `/rooms`, `/room/:id`, `/recap/:id`, `/library`, `/communities`, `/community/:id`, `/match`, `/404`)
- **Backend Serverless Functions**: `/api/recap.js`, `/api/translate.js`, `/api/token.js`
- **Database & Realtime**: Supabase (with fallback in-memory store)
- **Speech & Audio**: Browser Web Speech API + LiveKit/Daily token module wrapper

---

## 🔍 Simulated vs. Real Systems

| Feature | Real API Mode (With Keys) | Demo Mode Fallback (No Keys) |
| :--- | :--- | :--- |
| **Recap Engine** | Calls Gemini 1.5 Flash / OpenAI API in `/api/recap.js` | Returns structured JSON recap from seeded transcript |
| **Live Captions** | Native Web Speech API (`SpeechRecognition`) | Simulated transcript chunk generator button |
| **Audio Rooms** | LiveKit / Daily token generation in `/api/token.js` | Simulated audio session with active mic feedback |
| **Database** | PostgreSQL & Supabase Realtime WebSocket client | In-memory seeded store (`seedData.js`) |
| **Live Translation** | Machine translation in `/api/translate.js` | Instant language prefix translator |

---

## 📄 Deliverables & Demo Walkthrough

- **`.env.example`**: Clean key manifest with zero secrets
- **`DEMO_SCRIPT.md`**: Step-by-step 2-minute judging script
- **`supabase/seed.sql`**: Full database schema and SQL seed script
