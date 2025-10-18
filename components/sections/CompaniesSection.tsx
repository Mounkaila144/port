"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Briefcase } from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface Company {
  id: string;
  name: string;
  role: string;
  years: string;
  logo: string;
  desc: string;
  site: string;
}

interface CompaniesSectionProps {
  companies: Company[];
  language: Language;
}

function SectionTitle({ icon: Icon, title, subtitle }: any) {
  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl lg:text-2xl font-semibold">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" /> {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm sm:text-base text-white/70">{subtitle}</p>}
    </div>
  );
}

export function CompaniesSection({ companies, language }: CompaniesSectionProps) {
  const t = translations[language];

  return (
    <>
      <SectionTitle icon={Briefcase} title={t.companiesTitle} subtitle={t.companiesSubtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {companies.map((c) => (
          <Card key={c.id} className="group rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-xl hover:shadow-2xl transition">
            <CardContent className="p-4 sm:p-5">
              <div className="h-28 sm:h-36 w-full overflow-hidden rounded-lg sm:rounded-xl border border-white/10">
                <img src={c.logo} alt={c.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold truncate">{c.name}</h3>
                  <Badge className="bg-white/10 border border-white/10 text-xs shrink-0">{c.years}</Badge>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  {language === 'fr' ? c.desc :
                    c.id === 'freelance' ? t.companyDescriptions.freelance :
                    c.id === 'icall' ? t.companyDescriptions.icall :
                    c.id === 'ptr-niger' ? t.companyDescriptions.ptrNiger :
                    c.id === 'idev-niger' ? t.companyDescriptions.idevNiger :
                    c.desc
                  }
                </p>
                <div className="mt-3 flex items-center gap-2 sm:gap-3">
                  {c.site !== "#" && (
                    <a href={c.site} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="secondary" className="rounded-xl text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3">
                        <Globe className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />{t.site}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
