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

> **Key principle**: Live rooms are real. Demo / seed data only appears in the library, recap history, and recommendation feeds — never inside a live room you create.

| Feature | Real (always on, no keys needed) | Real API Mode (with keys) |
| :--- | :--- | :--- |
| **Private room creation** | `nanoid` ID, isolated per room, roomStore presence bus | Supabase row + Realtime Presence |
| **Mic level waveform** | Web Audio API `AnalyserNode` — proves mic is working | ← same |
| **Live captions** | Web Speech API per-speaker, broadcast via roomStore bus | Supabase Realtime Broadcast channel |
| **Room presence** | In-memory pub-sub (roomStore.js) — zero fake participants | Supabase Realtime Presence |
| **Recap engine** | Structured fallback from captured transcript | Calls Gemini / OpenAI in `/api/recap.js` |
| **Audio rooms** | Mock token flow | LiveKit / Daily token in `/api/token.js` |
| **Library / feed** | Seeded demo data (`seedData.js`) | PostgreSQL via Supabase |

---

## 📄 Deliverables & Demo Walkthrough

- **`.env.example`**: Clean key manifest with zero secrets
- **`DEMO_SCRIPT.md`**: Step-by-step 2-minute judging script
- **`supabase/seed.sql`**: Full database schema and SQL seed script
