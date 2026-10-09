import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Globe, GraduationCap, ArrowRight, Heart } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const availableInterests = [
    "Placements", "AI & CS", "Design", "Career Talk", 
    "Study Rooms", "Projects", "Startups", "Web Dev", "Data Structures"
  ];

  const availableLanguages = [
    "English", "Hindi", "Spanish", "French", "Mandarin"
  ];

  const [selectedInterests, setSelectedInterests] = useState(["Placements", "AI & CS"]);
  const [selectedLanguages, setSelectedLanguages] = useState(["English"]);
  const [collegeName, setCollegeName] = useState("Stanford CS '26");

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const toggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for demo persistence
    const userProfile = {
      name: "Alex Rivera",
      college: collegeName,
      interests: selectedInterests,
      languages: selectedLanguages
    };
    localStorage.setItem('echo_user_profile', JSON.stringify(userProfile));
    navigate('/home');
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#FDFBF7] flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="terracotta" size="lg" icon={Sparkles}>
            Welcome to Echo
          </Badge>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2D231E]">
            Personalize Your Audio Experience
          </h1>
          <p className="text-base text-[#6B5E57] max-w-md mx-auto">
            Select your college track, interests, and languages to power personalized room recommendations and community matches.
          </p>
        </div>

        <Card variant="default" className="p-6 sm:p-10 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* College Tag */}
            <div className="space-y-2">
              <label className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#E05638]" />
                College / Organization
              </label>
              <input 
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Stanford CS '26, MIT, IIT Bombay"
                required
                className="w-full bg-[#FAF5F0] px-4 py-3 rounded-2xl border border-[#F0E5DC] text-sm text-[#2D231E] font-medium focus:outline-none focus:ring-2 focus:ring-[#E05638]/40"
              />
            </div>

            {/* Interests Grid */}
            <div className="space-y-3">
              <label className="font-heading font-bold text-sm text-[#2D231E] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E05638]" />
                  Select Your Primary Interests ({selectedInterests.length} selected)
                </span>
                <span className="text-xs text-[#9E8E85] font-normal">Pick 2 or more</span>
              </label>

              <div className="flex flex-wrap gap-2.5">
                {availableInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                        isSelected 
                          ? 'bg-[#E05638] text-white shadow-md scale-105' 
                          : 'bg-[#FAF5F0] text-[#6B5E57] border border-[#F0E5DC] hover:border-[#E05638]/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spoken Languages */}
            <div className="space-y-3">
              <label className="font-heading font-bold text-sm text-[#2D231E] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#F59E0B]" />
                Preferred Spoken Languages
              </label>

              <div className="flex flex-wrap gap-2.5">
                {availableLanguages.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05638] ${
                        isSelected 
                          ? 'bg-[#F59E0B] text-white shadow-md' 
                          : 'bg-[#FAF5F0] text-[#6B5E57] border border-[#F0E5DC] hover:border-[#F59E0B]/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{lang}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#F5ECE5]">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full justify-center"
                icon={ArrowRight}
                iconPosition="right"
              >
                Complete Onboarding & View Feed
              </Button>
            </div>

          </form>
        </Card>

      </div>
    </div>
  );
}
