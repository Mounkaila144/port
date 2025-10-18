"use client";

import { Separator } from "@/components/ui/separator";
import { Mail, Github } from "lucide-react";
import { Profile } from "@/lib/types";

interface FooterProps {
  profile: Profile;
  setTab: (tab: string) => void;
  t: any;
}

export function Footer({ profile, setTab, t }: FooterProps) {
  return (
    <footer id="contact" className="border-t border-white/10 py-8 sm:py-12 px-4 bg-black/10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />{t.contact}
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <a href={`mailto:${profile.email}`} className="block hover:text-white transition-colors">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="block hover:text-white transition-colors">
                {profile.phone}
              </a>
              <p>{profile.location}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.navigation}</h3>
            <div className="space-y-2 text-sm text-white/70">
              <button onClick={() => setTab("profil")} className="block hover:text-white transition-colors">
                {t.profile}
              </button>
              <button onClick={() => setTab("skills")} className="block hover:text-white transition-colors">
                {t.skills}
              </button>
              <button onClick={() => setTab("projects")} className="block hover:text-white transition-colors">
                {t.projects}
              </button>
              <button onClick={() => setTab("companies")} className="block hover:text-white transition-colors">
                {t.companies}
              </button>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Github className="h-5 w-5" />{t.social}
            </h3>
            <div className="space-y-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} {profile.name} - {t.copyright}</p>
          <p className="mt-2">{t.availableFor}</p>
        </div>
      </div>
    </footer>
  );
}
