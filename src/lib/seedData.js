// Echo Seed Dataset for Demo Mode & Database Seeding

export const initialUsers = [
  {
    id: "user-1",
    name: "Elena Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Stanford CS '26",
    interests: ["Design", "Study Rooms", "Projects"],
    languages: ["English", "Spanish"],
    hostedCount: 14,
    avgQuality: 9.4
  },
  {
    id: "user-2",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "MIT EECS '25",
    interests: ["AI & CS", "Placements", "Projects"],
    languages: ["English", "Mandarin"],
    hostedCount: 19,
    avgQuality: 9.6
  },
  {
    id: "user-3",
    name: "Aria Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "UC Berkeley '26",
    interests: ["Career Talk", "Placements", "Design"],
    languages: ["English", "Hindi"],
    hostedCount: 11,
    avgQuality: 9.1
  },
  {
    id: "user-4",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    college: "IIT Bombay '25",
    interests: ["AI & CS", "Placements", "Study Rooms"],
    languages: ["English", "Hindi"],
    hostedCount: 16,
    avgQuality: 9.5
  },
  {
    id: "user-5",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    college: "Carnegie Mellon '26",
    interests: ["Design", "Career Talk", "Projects"],
    languages: ["English"],
    hostedCount: 8,
    avgQuality: 8.9
  },
  {
    id: "user-6",
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    college: "Harvard '27",
    interests: ["Career Talk", "Study Rooms", "Design"],
    languages: ["English", "Spanish"],
    hostedCount: 5,
    avgQuality: 8.7
  },
  {
    id: "user-7",
    name: "Priyesha Roy",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    college: "BITS Pilani '26",
    interests: ["Placements", "Study Rooms", "AI & CS"],
    languages: ["English", "Hindi"],
    hostedCount: 12,
    avgQuality: 9.3
  },
  {
    id: "user-8",
    name: "Devon Vance",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    college: "NYU Tech '25",
    interests: ["Projects", "Career Talk", "Design"],
    languages: ["English"],
    hostedCount: 15,
    avgQuality: 9.2
  },
  {
    id: "user-9",
    name: "Siddharth Rao",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    college: "IIT Delhi '25",
    interests: ["AI & CS", "Projects"],
    languages: ["English", "Hindi"],
    hostedCount: 10,
    avgQuality: 9.0
  },
  {
    id: "user-10",
    name: "Jessica Wu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "Columbia CS '26",
    interests: ["Study Rooms", "Placements"],
    languages: ["English", "Mandarin"],
    hostedCount: 7,
    avgQuality: 8.8
  },
  {
    id: "user-11",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    college: "Oxford CS '26",
    interests: ["AI & CS", "Study Rooms"],
    languages: ["English"],
    hostedCount: 6,
    avgQuality: 8.6
  },
  {
    id: "user-12",
    name: "Ananya Gupta",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    college: "NSUT Delhi '26",
    interests: ["Placements", "Career Talk"],
    languages: ["English", "Hindi"],
    hostedCount: 9,
    avgQuality: 9.1
  }
];

export const initialCommunities = [
  {
    id: "comm-1",
    name: "Campus Placements & Interview Prep",
    topic: "Placements",
    description: "Weekly mock interviews, DSA problem solving, resume roast, and tech referral huddles.",
    membersCount: 428,
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    tags: ["Placements", "DSA", "System Design", "Referrals"]
  },
  {
    id: "comm-2",
    name: "CS & AI Study Rooms",
    topic: "AI & CS",
    description: "Late night silent co-study, LLM paper reviews, research project collaborations.",
    membersCount: 612,
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    tags: ["Study Rooms", "Machine Learning", "Python"]
  },
  {
    id: "comm-3",
    name: "Design & UX Guild",
    topic: "Design",
    description: "Portfolio feedback, fluid design systems, Figma masterclasses, and UI token reviews.",
    membersCount: 315,
    banner: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80",
    tags: ["Design", "Figma", "UI/UX", "Tailwind"]
  },
  {
    id: "comm-4",
    name: "Student Career & Startup Hangouts",
    topic: "Career Talk",
    description: "Pitching side projects, finding co-founders, internship advice, and VC AMA sessions.",
    membersCount: 510,
    banner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80",
    tags: ["Career Talk", "Startups", "Internships"]
  }
];

export const initialRooms = [
  {
    id: "room-1",
    title: "Cracking FAANG Coding Rounds: System Design & DSA Practice",
    topic: "Placements",
    host_id: "user-2",
    hostName: "Marcus Chen",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "live",
    started_at: "18 mins ago",
    language: "English",
    listenersCount: 184,
    tags: ["Placements", "DSA", "System Design"],
    recentSnippet: "Always clarify rate limiting scale requirements before diving into DB sharding..."
  },
  {
    id: "room-2",
    title: "Fluid Design Tokens & Accessible Web UI Guild",
    topic: "Design",
    host_id: "user-1",
    hostName: "Elena Vance",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "live",
    started_at: "32 mins ago",
    language: "English",
    listenersCount: 142,
    tags: ["Design", "Tailwind", "a11y"],
    recentSnippet: "Rounded 32px radii signal warmth and approachable human design..."
  },
  {
    id: "room-3",
    title: "Late Night Silent Co-Study & LeetCode Grind",
    topic: "Study Rooms",
    host_id: "user-4",
    hostName: "Rahul Sharma",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "live",
    started_at: "5 mins ago",
    language: "English",
    listenersCount: 95,
    tags: ["Study Rooms", "LeetCode", "Focus"],
    recentSnippet: "Pomodoro block 1 starting now. Post your targets in chat..."
  },
  {
    id: "room-4",
    title: "Off-Campus Internship Referral Huddle for 2026 Batch",
    topic: "Placements",
    host_id: "user-3",
    hostName: "Aria Patel",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "scheduled",
    started_at: "Today at 7:00 PM",
    language: "English",
    listenersCount: 240,
    tags: ["Placements", "Internships", "Referrals"],
    recentSnippet: "Bring your resume PDF links for live feedback!"
  }
];

export const initialRecaps = [
  {
    room_id: "recap-101",
    title: "Campus Placement Strategy: Resume Tailoring & Mock Interviews",
    topic: "Placements",
    hostName: "Marcus Chen",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "Recorded 2 days ago",
    duration: "45 min",
    listeners: 312,
    quality_score: 9.8,
    summary: "The speakers broke down how college candidates can land tier-1 tech referrals by highlighting 2 high-impact open-source contributions rather than generic class assignments.",
    key_points: [
      { ts: "04:12", text: "Targeted resume bullets showing quantifiable metrics boost interview callback rates by 3x." },
      { ts: "18:40", text: "Always prepare a 60-second audio elevator pitch focusing on your hardest technical bug fix." },
      { ts: "31:05", text: "Mock interviews in peer voice rooms reduce live anxiety significantly." }
    ],
    action_items: [
      { text: "Refactor GitHub READMEs for top 2 side projects", assignee: "Marcus" },
      { text: "Schedule peer mock interview session on Echo for Thursday", assignee: "Rahul" }
    ],
    unanswered_questions: [
      "How do non-CS students bypass initial automated ATS filters?",
      "What is the best timeline for reaching out to alumni recruiters on LinkedIn?"
    ],
    highlights: [
      { speaker: "Marcus Chen", quote: "A clean 1-page resume with verified metrics beats 3 pages of buzzwords every time." },
      { speaker: "Aria Patel", quote: "Voice mock interviews give you immediate feedback on confidence and clarity." }
    ]
  },
  {
    room_id: "recap-102",
    title: "Building Warm AI Products & Natural UI Systems",
    topic: "Design",
    hostName: "Elena Vance",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "Recorded Yesterday",
    duration: "38 min",
    listeners: 245,
    quality_score: 9.6,
    summary: "Discussed how adopting rounded warm typography, terracotta palette tokens, and ambient live audio recaps creates far deeper human resonance than hyper-analytical cold interfaces.",
    key_points: [
      { ts: "06:15", text: "Rounded 32px radii signal warmth and approachable human design." },
      { ts: "14:22", text: "Voice audio carries emotional nuance that plain prompts miss." },
      { ts: "28:50", text: "Semantic audio search lets users query spoken moments by intent." }
    ],
    action_items: [
      { text: "Export Tailwind design tokens into design system package", assignee: "Elena" }
    ],
    unanswered_questions: [
      "How do we maintain high contrast compliance on warm cream background surfaces?"
    ],
    highlights: [
      { speaker: "Elena Vance", quote: "Design should feel like a cozy living room, not a sterile hospital hallway." }
    ]
  },
  {
    room_id: "recap-103",
    title: "Sub-100ms Streaming Audio & Real-time AI Transcripts",
    topic: "AI & CS",
    hostName: "Rahul Sharma",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    date: "Recorded 4 days ago",
    duration: "52 min",
    listeners: 410,
    quality_score: 9.7,
    summary: "Deep dive into binary web-audio streaming tokens, WebSockets fallback, and real-time Whisper transcription pipelines for multi-speaker audio rooms.",
    key_points: [
      { ts: "10:30", text: "Chunking audio into 250ms binary buffers minimizes API latency." },
      { ts: "24:15", text: "Web Speech API provides client-side transcription with 0 server cost." }
    ],
    action_items: [
      { text: "Benchmark Web Speech API accuracy vs server Whisper LLM", assignee: "Rahul" }
    ],
    unanswered_questions: [
      "What is the memory footprint of keeping 2 hours of transcript in client state?"
    ],
    highlights: [
      { speaker: "Rahul Sharma", quote: "Low latency audio streaming turns passive listening into interactive co-creation." }
    ]
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    text: "New recap published in Placement Prep: 'Cracking FAANG Coding Rounds'",
    link: "/recap/recap-101",
    read: false,
    created_at: "10 mins ago"
  },
  {
    id: "notif-2",
    text: "Follow-up room scheduled: 'System Design Mock Interviews' starting at 7:00 PM",
    link: "/rooms",
    read: false,
    created_at: "1 hour ago"
  },
  {
    id: "notif-3",
    text: "Elena Vance joined your community 'Design & UX Guild'",
    link: "/community/comm-3",
    read: true,
    created_at: "Yesterday"
  }
];
