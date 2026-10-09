# Echo — Demo Script (Judges / Live Demo)

> **Duration**: ~3 minutes end-to-end  
> **Setup**: Two browser windows side-by-side (or two devices on the same network), both pointing at `http://localhost:5173`

---

## Step 0 — Preparation (30 s)

1. Open **Window A** (you, the host) and **Window B** (guest / judge's phone or second laptop).
2. Make sure both are on the same local URL. No account or sign-in needed for the guest.
3. On Window A, complete the onboarding if not already done (Name, College, interests).

---

## Step 1 — Create a real room (Window A) ≈ 30 s

1. Click **"Start a Room"** in the nav or feed.
2. Fill in:
   - **Title**: `FAANG Placement Prep Q&A`
   - **Topic**: `DSA, System Design`
   - **Language**: `English`
3. Click **Launch Live Room** → you land on `/room/<nanoid-id>`.
4. Point out: **no fake participants**. Only you are on stage.
5. Show the room ID in the URL bar — 10 random characters (e.g. `V8kAq2Bm4r`).

---

## Step 2 — Copy & share the invite link ≈ 15 s

1. Click **Copy Link** (or the Share button on mobile).
2. Paste the URL into Window B (or send via WhatsApp/AirDrop to the second device).
3. The URL is `https://<host>/room/V8kAq2Bm4r` — anyone with the link can join, no account needed.

---

## Step 3 — Guest joins via lobby (Window B) ≈ 30 s

1. Window B opens the URL → sees the **lobby screen** (not the room directly).
2. Guest enters their display name (e.g. `Judge Rhea`).
3. Browser prompts for mic permission → click **Allow & Join**.
4. Guest lands in the room as a **Listener**.
5. Show both windows: Window A's participant list updates instantly with `Judge Rhea`.

---

## Step 4 — Mic level waveform (Window A) ≈ 30 s

1. On Window A, click the **mic button** to unmute.
2. Speak — the **7-bar waveform** next to the mic button animates with your voice.
3. Stay silent for a moment → bars drop flat; the label says "Mic on, listening…".
4. Speak again → bars bounce. This **proves the mic is working** — judges love this.
5. If the mic is silent for 4 s, a hint appears: _"We can't hear you…"_

---

## Step 5 — Live captions appear (Window A & B) ≈ 45 s

1. With the mic on in Window A, say something clearly:
   > _"Echo solves the biggest problem with Clubhouse — conversations used to disappear. Now every word is captured."_
2. Watch the **caption panel** in Window A: interim text (grey) appears almost instantly, then turns black when the phrase is final.
3. Switch to Window B: the same captions appear within ~1 second.
4. Guest (Window B) raises their hand → Window A shows the **"Raised hands"** panel.
5. Host approves → guest moves from Listener to **Speaker**; guest can now unmute and their captions also appear.

---

## Step 6 — End room → recap ≈ 20 s

1. Host clicks **End Room** (top right).
2. Both windows redirect to `/recap/recap-<id>`.
3. Show the recap card: speaker, key takeaways, transcript lines.
4. This recap is now searchable in the **Library** (for real Supabase) or visible as a demo card (mock mode).

---

## Key talking points for judges

| What they see | What it proves |
|---|---|
| Unique URL per room | Private, isolated, unguessable |
| Waveform moves with voice | Actual `getUserMedia` + Web Audio `AnalyserNode` |
| Captions appear in ~1 s | `SpeechRecognition` + in-tab broadcast bus |
| Guest joins via lobby | No account required, zero friction |
| Participant list is real | `roomStore` presence, no seeded fake data |
| Recap after room ends | Persistent knowledge left behind (Echo's core value prop) |

---

## What is seeded / demo-only

The **Library**, **Recommendations feed**, and **Communities** tabs contain seeded demo data to show what the product looks like at scale. This data never appears inside a live room you create.
