"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, Layers, Sparkles, Briefcase } from "lucide-react";
import { Profile } from "@/lib/types";
import { Language } from "@/lib/translations";

interface NavbarProps {
  profile: Profile;
  tab: string;
  setTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export function Navbar({ profile, tab, setTab, language, setLanguage, t }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B10]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo / Nom */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <span className="text-sm sm:text-lg font-bold">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-base sm:text-lg font-semibold">{profile.name}</h2>
              <p className="text-xs text-white/60">{profile.role}</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <Tabs value={tab} onValueChange={setTab} className="hidden md:block">
            <TabsList className="bg-white/5 border border-white/10 rounded-lg p-1">
              <TabsTrigger
                value="profil"
                className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
              >
                <UserIcon className="h-4 w-4" /> {t.profile}
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
              >
                <Layers className="h-4 w-4" /> {t.skills}
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
              >
                <Sparkles className="h-4 w-4" /> {t.projects}
              </TabsTrigger>
              <TabsTrigger
                value="companies"
                className="data-[state=active]:bg-white/20 data-[state=active]:shadow-lg rounded-md flex items-center gap-2 px-4 py-2 text-sm transition-all"
              >
                <Briefcase className="h-4 w-4" /> {t.companies}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Navigation Mobile */}
          <Tabs value={tab} onValueChange={setTab} className="md:hidden">
            <TabsList className="bg-white/5 border border-white/10 rounded-lg p-0.5 grid grid-cols-4 gap-0.5">
              <TabsTrigger
                value="profil"
                className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
              >
                <UserIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
              >
                <Layers className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
              >
                <Sparkles className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger
                value="companies"
                className="data-[state=active]:bg-white/20 rounded-md px-2 py-1.5"
              >
                <Briefcase className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Language Switcher + Boutons CTA */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all ${
                  language === "fr"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/60 hover:text-white"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all ${
                  language === "en"
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Boutons CTA Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a href={`mailto:${profile.email}`}>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  {t.email}
                </Button>
              </a>
              <a href="#contact">
                <Button size="sm" className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
                  {t.contact}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
