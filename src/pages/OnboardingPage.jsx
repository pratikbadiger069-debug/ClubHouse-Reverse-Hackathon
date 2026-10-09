import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Globe, GraduationCap, ArrowRight, Heart, User, Calendar, Camera, Phone, BookOpen, Briefcase } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

// Utility — save profile to localStorage so LiveRoomPage and FeedPage can read it
function saveProfile(profile) {
  localStorage.setItem('echo_user_profile', JSON.stringify(profile));
}

// Multi-step onboarding: step 1 = personal details, step 2 = interests & languages
const TOTAL_STEPS = 2;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // ── Step 1 fields: personal details ──────────────────────────────────────
  const [name, setName]         = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio]           = useState('');
  const [college, setCollege]   = useState('');
  const [year, setYear]         = useState('');
  const [phone, setPhone]       = useState('');
  const [avatarSeed, setAvatarSeed] = useState(Math.floor(Math.random() * 100));

  // Derive avatar URL from seed (uses public DiceBear API — no key required)
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  // ── Step 2 fields: interests & languages ─────────────────────────────────
  const availableInterests = [
    'Placements', 'AI & CS', 'Design', 'Career Talk',
    'Study Rooms', 'Projects', 'Startups', 'Web Dev', 'Data Structures',
  ];
  const availableLanguages = ['English', 'Hindi', 'Spanish', 'French', 'Mandarin'];

  const [selectedInterests, setSelectedInterests] = useState(['Placements', 'AI & CS']);
  const [selectedLanguages, setSelectedLanguages] = useState(['English']);

  const toggleInterest = (i) =>
    setSelectedInterests(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );

  const toggleLanguage = (l) =>
    setSelectedLanguages(prev =>
      prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]
    );

  // ── Validation ───────────────────────────────────────────────────────────
  const step1Valid = name.trim().length >= 2 && college.trim().length >= 2;
  const step2Valid = selectedInterests.length >= 1 && selectedLanguages.length >= 1;

  // ── Navigation ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (!step1Valid) return;
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!step2Valid) return;

    const profile = {
      name: name.trim(),
      username: username.trim() || name.trim().toLowerCase().replace(/\s+/g, '_'),
      bio: bio.trim(),
      college: college.trim(),
      year: year.trim(),
      phone: phone.trim(),
      avatar: avatarUrl,
      interests: selectedInterests,
      languages: selectedLanguages,
    };
    saveProfile(profile);

    // If user came from a room invite link, return them there
    const returnTo = sessionStorage.getItem('echo_return_to');
    if (returnTo) {
      sessionStorage.removeItem('echo_return_to');
      navigate(returnTo);
    } else {
      navigate('/home');
    }
  };

  // ── Derived avatar color (for random background) ─────────────────────────
  const avatarColors = ['#FFF0EB', '#FEF3C7', '#ECFDF5', '#F3E8FF', '#EFF6FF'];
  const avatarBg = avatarColors[avatarSeed % avatarColors.length];

  return (
    <div className="min-h-screen py-12 px-4 bg-[#FDFBF7] flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center space-y-3">
          <Badge variant="terracotta" size="lg" icon={Sparkles}>
            Welcome to Echo · Step {step} of {TOTAL_STEPS}
          </Badge>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D231E]">
            {step === 1 ? 'Tell us about yourself' : 'Pick your interests'}
          </h1>
          <p className="text-base text-[#6B5E57] max-w-md mx-auto">
            {step === 1
              ? 'Your profile helps other students recognise you in live rooms.'
              : 'Select topics and languages to power personalised rooms and community matches.'}
          </p>

          {/* Progress bar */}
          <div className="flex gap-2 max-w-xs mx-auto pt-2">
            {[1, 2].map(s => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#E05638]' : 'bg-[#F0E5DC]'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Step 1 : Personal Details ──────────────────────────────── */}
        {step === 1 && (
          <Card variant="default" className="p-6 sm:p-10 space-y-8">

            {/* Avatar picker */}
            <div className="flex items-center gap-5">
              <div
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden shrink-0"
                style={{ background: avatarBg }}
              >
                <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-[#2D231E]">Your Echo Avatar</p>
                <p className="text-xs text-[#6B5E57]">Auto-generated from your seed. Shuffle for a different look.</p>
                <button
                  type="button"
                  onClick={() => setAvatarSeed(Math.floor(Math.random() * 10000))}
                  className="text-xs font-bold text-[#E05638] border border-[#FCD9CE] bg-[#FFF0EB] px-3 py-1.5 rounded-full hover:bg-[#FFE4D6] transition-colors flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" /> Shuffle Avatar
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Full name */}
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#E05638]" />
                  Full Name <span className="text-[#E05638]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Mehra"
                  required
                  className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
                />
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                  <span className="text-[#E05638] font-extrabold">@</span>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, '_'))}
                  placeholder="e.g. priya_mehra"
                  className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Short Bio
                </label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                  placeholder="e.g. Final year CS student at IIT, building AI for audio..."
                  maxLength={160}
                  className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40 resize-none"
                />
                <p className="text-[10px] text-[#9E8E85] text-right">{bio.length}/160</p>
              </div>

              {/* College + Year side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#E05638]" />
                    College / Organization <span className="text-[#E05638]">*</span>
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay, BITS Pilani"
                    required
                    className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
                  >
                    <option value="">Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgrad">Postgrad</option>
                    <option value="Working Professional">Working Pro</option>
                  </select>
                </div>
              </div>

              {/* Phone (optional) */}
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-xs text-[#2D231E] uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  Phone Number <span className="text-[#9E8E85] font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5ECE5]">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                disabled={!step1Valid}
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue to Interests
              </Button>
              {!step1Valid && (
                <p className="text-xs text-[#9E8E85] text-center mt-2">
                  Please fill in your name and college to continue.
                </p>
              )}
            </div>
          </Card>
        )}

        {/* ── Step 2 : Interests & Languages ─────────────────────────── */}
        {step === 2 && (
          <Card variant="default" className="p-6 sm:p-10 space-y-8">

            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-[#6B5E57] hover:text-[#2D231E] flex items-center gap-1"
            >
              ← Back to personal details
            </button>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Interests grid */}
              <div className="space-y-3">
                <label className="font-heading font-bold text-sm text-[#2D231E] flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E05638]" />
                    Primary Interests ({selectedInterests.length} selected)
                  </span>
                  <span className="text-xs text-[#9E8E85] font-normal">Pick at least 1</span>
                </label>

                <div className="flex flex-wrap gap-2.5">
                  {availableInterests.map(interest => {
                    const sel = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                          sel
                            ? 'bg-[#E05638] text-white shadow-md scale-105'
                            : 'bg-[#FAF5F0] text-[#6B5E57] border border-[#F0E5DC] hover:border-[#E05638]/40'
                        }`}
                      >
                        {sel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <label className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#F59E0B]" />
                  Preferred Spoken Languages
                </label>

                <div className="flex flex-wrap gap-2.5">
                  {availableLanguages.map(lang => {
                    const sel = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                          sel
                            ? 'bg-[#F59E0B] text-white shadow-md'
                            : 'bg-[#FAF5F0] text-[#6B5E57] border border-[#F0E5DC] hover:border-[#F59E0B]/40'
                        }`}
                      >
                        {sel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview profile pill */}
              <div className="bg-[#FAF4EE] p-4 rounded-2xl border border-[#F0E5DC] flex items-center gap-4">
                <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                <div>
                  <p className="font-heading font-bold text-sm text-[#2D231E]">
                    {name} <span className="text-[#9E8E85] font-normal text-xs">@{username || name.toLowerCase().replace(/\s+/g, '_')}</span>
                  </p>
                  <p className="text-xs text-[#6B5E57]">{college} {year && `· ${year}`}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5ECE5]">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={!step2Valid}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Finish & Enter Echo
                </Button>
              </div>
            </form>
          </Card>
        )}

      </div>
    </div>
  );
}
