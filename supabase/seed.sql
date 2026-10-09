-- Supabase Database Schema & Seed Script for Echo

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  college TEXT,
  interests TEXT[],
  languages TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  host_id TEXT REFERENCES users(id),
  status TEXT CHECK (status IN ('scheduled', 'live', 'ended')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  language TEXT DEFAULT 'English'
);

-- 3. Participants Table
CREATE TABLE IF NOT EXISTS participants (
  room_id TEXT REFERENCES rooms(id),
  user_id TEXT REFERENCES users(id),
  role TEXT CHECK (role IN ('host', 'speaker', 'listener')),
  PRIMARY KEY (room_id, user_id)
);

-- 4. Transcript Lines Table
CREATE TABLE IF NOT EXISTS transcript_lines (
  id SERIAL PRIMARY KEY,
  room_id TEXT REFERENCES rooms(id),
  speaker_id TEXT REFERENCES users(id),
  speaker_name TEXT,
  text TEXT NOT NULL,
  ts TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Reactions Table
CREATE TABLE IF NOT EXISTS reactions (
  id SERIAL PRIMARY KEY,
  room_id TEXT REFERENCES rooms(id),
  user_id TEXT REFERENCES users(id),
  type TEXT CHECK (type IN ('👏', '💡', '❓', '🔥')),
  ts TEXT NOT NULL
);

-- 6. Pins Table
CREATE TABLE IF NOT EXISTS pins (
  id SERIAL PRIMARY KEY,
  room_id TEXT REFERENCES rooms(id),
  user_id TEXT REFERENCES users(id),
  ts TEXT NOT NULL
);

-- 7. Polls & Poll Votes Tables
CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY,
  room_id TEXT REFERENCES rooms(id),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS poll_votes (
  poll_id TEXT REFERENCES polls(id),
  user_id TEXT REFERENCES users(id),
  option_index INT NOT NULL,
  PRIMARY KEY (poll_id, user_id)
);

-- 8. Recaps Table
CREATE TABLE IF NOT EXISTS recaps (
  room_id TEXT PRIMARY KEY REFERENCES rooms(id),
  summary TEXT NOT NULL,
  key_points JSONB NOT NULL,
  action_items JSONB NOT NULL,
  unanswered_questions JSONB,
  highlights JSONB,
  quality_score NUMERIC(3,1) DEFAULT 9.0
);

-- 9. Communities & Members Tables
CREATE TABLE IF NOT EXISTS communities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  topic TEXT NOT NULL,
  description TEXT,
  banner TEXT
);

CREATE TABLE IF NOT EXISTS community_members (
  community_id TEXT REFERENCES communities(id),
  user_id TEXT REFERENCES users(id),
  PRIMARY KEY (community_id, user_id)
);

-- 10. Topic Follows Table
CREATE TABLE IF NOT EXISTS follows (
  user_id TEXT REFERENCES users(id),
  topic TEXT NOT NULL,
  PRIMARY KEY (user_id, topic)
);

-- 11. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  text TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Users (12 Users)
INSERT INTO users (id, name, avatar, college, interests, languages) VALUES
('user-1', 'Elena Vance', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Stanford CS', ARRAY['Design', 'Study Rooms', 'Projects'], ARRAY['English', 'Spanish']),
('user-2', 'Marcus Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'MIT EECS', ARRAY['AI & CS', 'Placements', 'Projects'], ARRAY['English', 'Mandarin']),
('user-3', 'Aria Patel', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'UC Berkeley', ARRAY['Career Talk', 'Placements', 'Design'], ARRAY['English', 'Hindi']),
('user-4', 'Rahul Sharma', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'IIT Bombay', ARRAY['AI & CS', 'Placements', 'Study Rooms'], ARRAY['English', 'Hindi']);

-- Seed Initial Communities
INSERT INTO communities (id, name, topic, description) VALUES
('comm-1', 'Campus Placements & Interview Prep', 'Placements', 'Weekly mock interviews and resume roast sessions.'),
('comm-2', 'CS & AI Study Rooms', 'AI & CS', 'Late night silent co-study and ML paper reviews.');
