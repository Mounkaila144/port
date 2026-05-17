import type { LucideIcon } from "lucide-react";
import {
  Clock,
  FileText,
  Mail,
  Users,
  MapPinned,
  MessageSquareWarning,
  School,
  HeartPulse,
  FileCheck,
} from "lucide-react";

export interface GovtechProject {
  id: string;
  i18nKey: string;
  icon: LucideIcon;
  year: string;
  cover?: string;
  href?: string;
}

export const govtechProjects: GovtechProject[] = [
  { id: "queue", i18nKey: "queue", icon: Clock, year: "2024" },
  { id: "eservices", i18nKey: "eservices", icon: FileText, year: "2024" },
  { id: "mailroom", i18nKey: "mailroom", icon: Mail, year: "2024" },
  { id: "hr", i18nKey: "hr", icon: Users, year: "2024" },
  { id: "projectsTracking", i18nKey: "projectsTracking", icon: MapPinned, year: "2024" },
  { id: "citizenFeedback", i18nKey: "citizenFeedback", icon: MessageSquareWarning, year: "2024" },
  {
    id: "schools",
    i18nKey: "schools",
    icon: School,
    year: "2024",
    cover: "/image/jandoo.ptrniger.com.png",
    href: "https://jandoo.ptrniger.com/",
  },
  {
    id: "health",
    i18nKey: "health",
    icon: HeartPulse,
    year: "2024",
    cover: "/image/clinoo.ptrniger.com.png",
    href: "https://clinoo.ptrniger.com/",
  },
  { id: "permits", i18nKey: "permits", icon: FileCheck, year: "2024" },
];
