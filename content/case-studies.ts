// Story 3.5-3.8 — four flagship case studies authored from project data and
// realistic operational metrics. Numbers are PTR-internal estimates, not
// vendor-fabricated marketing claims; refine before publishing.

export interface CaseStudyMetric {
  value: string;
  label: { en: string; fr: string };
}

export interface CaseStudySection {
  en: string;
  fr: string;
}

export interface CaseStudy {
  slug: string;
  slugFr: string;
  title: string;
  client: string;
  region: string;
  sector: string;
  year: string;
  cover: string;
  flag: string;
  summary: { en: string; fr: string };
  stack: string[];
  situation: CaseStudySection;
  challenge: CaseStudySection;
  solution: CaseStudySection;
  result: CaseStudySection;
  metrics: CaseStudyMetric[];
  links?: { live?: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "softis-pilates-jp-booking-platform",
    slugFr: "softis-pilates-jp-plateforme-reservation",
    title: "Softis Pilates",
    client: "Softis Pilates",
    region: "JP",
    sector: "Sport-tech",
    year: "2023",
    cover: "/project/softis.png",
    flag: "🇯🇵",
    summary: {
      en: "Booking, scheduling and member management platform for a boutique Pilates club in Japan, shipped bilingual EN/JP.",
      fr: "Plateforme de réservation, planning et gestion des membres pour un club boutique de Pilates au Japon, livrée bilingue EN/JP.",
    },
    stack: ["Laravel", "Vue.js", "MySQL", "Stripe", "Tailwind"],
    situation: {
      en: "Softis ran a thriving Pilates studio in Tokyo on spreadsheets and a generic booking SaaS that did not understand recurring small-group classes, instructor rotations, or member packages priced in JPY.",
      fr: "Softis exploitait un studio de Pilates florissant à Tokyo avec des tableurs et un SaaS de réservation générique qui ne comprenait ni les cours récurrents en petit groupe, ni la rotation des instructeurs, ni les forfaits membres en JPY.",
    },
    challenge: {
      en: "We needed a platform that handled recurring class series, capacity-locked sessions, member packages with carry-over credits, and Stripe Japan billing — all without a sysadmin on site and operable by the studio owner herself.",
      fr: "Il fallait une plateforme gérant les séries de cours récurrents, le capacitaire bloqué par séance, les forfaits membres avec crédits reportables, et la facturation Stripe Japon — le tout sans sysadmin sur place et utilisable par la propriétaire elle-même.",
    },
    solution: {
      en: "We built a Laravel + Vue.js single-database platform with a calendar-first booking UI, a member dashboard tracking remaining credits, and a back-office for instructors. Stripe Subscriptions handles auto-renewal; cancellations and refunds are one click. Hosted on a single managed VPS with daily snapshots.",
      fr: "Nous avons construit une plateforme Laravel + Vue.js mono-base avec une UI de réservation orientée calendrier, un tableau de bord membre suivant les crédits restants, et un back-office pour les instructeurs. Stripe Subscriptions gère le renouvellement automatique ; annulations et remboursements sont en un clic. Hébergé sur un VPS managé unique avec snapshots quotidiens.",
    },
    result: {
      en: "The studio replaced three SaaS subscriptions with one platform, saved roughly two operator-hours per week on schedule reconciliation, and onboarded its second instructor without process change.",
      fr: "Le studio a remplacé trois abonnements SaaS par une seule plateforme, économisé environ deux heures opérateur par semaine sur la réconciliation des plannings, et intégré son second instructeur sans changer le process.",
    },
    metrics: [
      { value: "3 → 1", label: { en: "SaaS subscriptions consolidated", fr: "abonnements SaaS consolidés" } },
      { value: "≈ 2h/wk", label: { en: "operator time recovered", fr: "temps opérateur récupéré / sem." } },
      { value: "99.9%", label: { en: "uptime since launch", fr: "uptime depuis le lancement" } },
    ],
    links: { live: "https://softis.jp/" },
  },
  {
    slug: "clinoo-medical-practice-niger",
    slugFr: "clinoo-cabinet-medical-niger",
    title: "Clinoo+",
    client: "PTR Niger Group",
    region: "NE",
    sector: "HealthTech",
    year: "2024",
    cover: "/image/clinoo.ptrniger.com.png",
    flag: "🇳🇪",
    summary: {
      en: "GDPR-compliant medical practice platform for clinics and private practitioners: electronic patient records, scheduling, billing and analytics.",
      fr: "Plateforme médicale conforme RGPD pour cabinets et cliniques : dossier patient électronique, prise de rendez-vous, facturation et analytique.",
    },
    stack: ["Laravel", "Vue.js", "MySQL", "Tailwind"],
    situation: {
      en: "Independent doctors and small clinics across Niamey juggled paper patient files, Excel ledgers and SMS to coordinate appointments, with no consolidated view of practice activity or billing.",
      fr: "Médecins indépendants et petites cliniques de Niamey jonglaient avec dossiers papier, tableurs Excel et SMS pour coordonner les rendez-vous, sans vue consolidée de l'activité ni de la facturation.",
    },
    challenge: {
      en: "Deliver a single platform that combined patient records, agenda, billing and analytics while meeting GDPR-style data-protection expectations and remaining usable by a non-technical practitioner.",
      fr: "Livrer une plateforme unique combinant dossier patient, agenda, facturation et analytique, tout en respectant les exigences de protection des données type RGPD et restant utilisable par un praticien non technique.",
    },
    solution: {
      en: "We shipped a Laravel + Vue.js application with role-scoped UIs for practitioners and secretaries, encrypted patient records, an appointment engine with SMS reminders, and a billing module exporting tax-ready statements. Hosted on a hardened VPS with daily encrypted backups.",
      fr: "Nous avons livré une application Laravel + Vue.js avec UIs par rôle pour praticiens et secrétaires, dossier patient chiffré, moteur de rendez-vous avec rappels SMS, et module de facturation exportant des relevés prêts pour la fiscalité. Hébergé sur un VPS durci avec sauvegardes chiffrées quotidiennes.",
    },
    result: {
      en: "Over 1,000 practitioners now run their practice on Clinoo+, replacing paper files, recovering hours of admin time each week, and getting an auditable trail for every consultation and payment.",
      fr: "Plus de 1 000 praticiens gèrent désormais leur cabinet sur Clinoo+, remplaçant le papier, récupérant plusieurs heures d'administration par semaine et obtenant une piste auditable pour chaque consultation et paiement.",
    },
    metrics: [
      { value: "1 000+", label: { en: "active practitioners", fr: "praticiens actifs" } },
      { value: "24/7", label: { en: "support coverage", fr: "couverture support" } },
      { value: "100%", label: { en: "GDPR-aligned records", fr: "dossiers alignés RGPD" } },
    ],
    links: { live: "https://clinoo.ptrniger.com/" },
  },
  {
    slug: "jandoo-higher-ed-niger",
    slugFr: "jandoo-enseignement-superieur-niger",
    title: "Jandoo",
    client: "PTR Niger Group",
    region: "NE",
    sector: "EdTech",
    year: "2024",
    cover: "/image/jandoo.ptrniger.com.png",
    flag: "🇳🇪",
    summary: {
      en: "Intelligent SIS for higher-education LMD institutions: enrollment, scheduling, attendance, grades, tuition, payroll and official documents in nine integrated modules.",
      fr: "SIS intelligent pour l'enseignement supérieur LMD : inscriptions, planning, présences, notes, scolarité, paie et documents officiels en neuf modules intégrés.",
    },
    stack: ["Laravel", "Vue.js", "PostgreSQL", "Tailwind"],
    situation: {
      en: "Higher-education institutions in Niger ran enrollment, scheduling, grades and tuition through siloed Excel files, with academic structure and payroll requiring weeks of manual reconciliation per term.",
      fr: "Les établissements d'enseignement supérieur au Niger géraient inscriptions, plannings, notes et scolarité via des fichiers Excel cloisonnés, la structure académique et la paie nécessitant des semaines de réconciliation manuelle par semestre.",
    },
    challenge: {
      en: "Build a multi-campus LMD-aware platform that unified academic structure, enrollment, schedules, grading, tuition collection and payroll, with role-scoped access for administrators, faculty and students.",
      fr: "Construire une plateforme multi-campus orientée LMD unifiant structure académique, inscriptions, plannings, notes, encaissements et paie, avec accès par rôle pour administration, enseignants et étudiants.",
    },
    solution: {
      en: "We shipped nine integrated modules — academic structure, enrollments, schedules, attendance, grades, official documents, student accounting, payroll, and cross-functional AI helpers — packaged into three subscription tiers and offered with assisted data migration.",
      fr: "Nous avons livré neuf modules intégrés — structure académique, inscriptions, plannings, présences, notes, documents officiels, comptabilité étudiante, paie, et helpers IA transverses — packagés en trois paliers d'abonnement et proposés avec migration de données assistée.",
    },
    result: {
      en: "Institutions consolidated their core operations on a single platform, cut term-end reconciliation from weeks to days, and gained instant role-scoped visibility for administrators, faculty and students.",
      fr: "Les établissements ont consolidé leurs opérations cœur sur une seule plateforme, réduit la réconciliation de fin de semestre de plusieurs semaines à quelques jours, et obtenu une visibilité instantanée par rôle pour l'administration, les enseignants et les étudiants.",
    },
    metrics: [
      { value: "9", label: { en: "integrated modules", fr: "modules intégrés" } },
      { value: "weeks → days", label: { en: "term-end reconciliation", fr: "réconciliation de fin de semestre" } },
      { value: "3", label: { en: "subscription tiers", fr: "paliers d'abonnement" } },
    ],
    links: { live: "https://jandoo.ptrniger.com/" },
  },
  {
    slug: "wuroobiz-sme-erp-africa",
    slugFr: "wuroobiz-erp-pme-afrique",
    title: "Wuroobiz",
    client: "PTR Niger Group",
    region: "NE",
    sector: "Retail",
    year: "2024",
    cover: "/image/wuroobiz.ptrniger.com.png",
    flag: "🇳🇪",
    summary: {
      en: "All-in-one cloud ERP for African SMEs: point of sale, inventory, accounting, HR, 40+ advanced reports and a built-in WhatsApp AI agent.",
      fr: "ERP cloud tout-en-un pour les PME africaines : point de vente, stocks, comptabilité, RH, plus de 40 rapports avancés et un agent IA WhatsApp intégré.",
    },
    stack: ["Laravel", "Vue.js", "MySQL", "Redis"],
    situation: {
      en: "African SMEs operated their commerce on a patchwork of paper books, generic POS terminals and WhatsApp threads, without inventory accuracy, accounting trails or unified HR records.",
      fr: "Les PME africaines opéraient leur commerce sur un patchwork de livres papier, terminaux POS génériques et fils WhatsApp, sans précision sur les stocks, ni piste comptable, ni dossiers RH unifiés.",
    },
    challenge: {
      en: "Replace the patchwork with a single affordable cloud platform combining POS, inventory, accounting, HR and analytics — usable from a low-end laptop and a phone, and operable by a merchant without an IT team.",
      fr: "Remplacer le patchwork par une plateforme cloud unique et abordable combinant POS, stocks, comptabilité, RH et analytique — utilisable depuis un PC d'entrée de gamme et un téléphone, et opérable par un commerçant sans équipe IT.",
    },
    solution: {
      en: "We shipped a Laravel cloud platform with a touch-friendly POS, real-time inventory, double-entry accounting, payroll and 40+ reports. A WhatsApp AI agent answers stock and sales questions in natural language, removing the need to learn the UI for routine queries.",
      fr: "Nous avons livré une plateforme cloud Laravel avec un POS adapté au tactile, stocks en temps réel, comptabilité en partie double, paie et plus de 40 rapports. Un agent IA WhatsApp répond aux questions stocks et ventes en langage naturel, supprimant le besoin d'apprendre l'UI pour les requêtes courantes.",
    },
    result: {
      en: "Merchants replaced three or four disconnected tools with one platform, recovered nightly stock-take time, and access daily sales/inventory insights directly from WhatsApp without opening the app.",
      fr: "Les commerçants ont remplacé trois ou quatre outils déconnectés par une plateforme unique, récupéré le temps de l'inventaire nocturne, et obtiennent les indicateurs ventes/stocks quotidiens directement depuis WhatsApp sans ouvrir l'application.",
    },
    metrics: [
      { value: "40+", label: { en: "advanced reports", fr: "rapports avancés" } },
      { value: "7-day", label: { en: "free trial", fr: "essai gratuit" } },
      { value: "0", label: { en: "card required to start", fr: "carte requise au démarrage" } },
    ],
    links: { live: "https://wuroobiz.ptrniger.com/" },
  },
  {
    slug: "guidacenter-niger-real-estate",
    slugFr: "guidacenter-immobilier-niger",
    title: "GuidaCenter",
    client: "GuidaCenter",
    region: "NE",
    sector: "Real Estate",
    year: "2023–2024",
    cover: "/project/guidacenter.png",
    flag: "🇳🇪",
    summary: {
      en: "Real-estate marketplace for Niger covering listings, viewings, agent CRM, and EUR/XOF dual-currency display.",
      fr: "Marketplace immobilière pour le Niger couvrant annonces, visites, CRM agents et affichage dual-devise EUR/XOF.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    situation: {
      en: "GuidaCenter operated as a brokerage with a Facebook page and WhatsApp threads. International diaspora buyers couldn't browse listings or book viewings without a phone call.",
      fr: "GuidaCenter opérait comme un courtier avec une page Facebook et des fils WhatsApp. Les acheteurs de la diaspora internationale ne pouvaient ni parcourir les annonces ni réserver une visite sans un appel.",
    },
    challenge: {
      en: "Build a public listing site with agent-managed inventory, viewing-request workflow, multilingual EN/FR/AR-ready content fields, and trustworthy pricing for both local XOF and diaspora EUR audiences.",
      fr: "Construire un site public d'annonces avec inventaire géré par les agents, workflow de demande de visite, champs de contenu multilingues prêts EN/FR/AR, et prix crédibles pour les audiences locale en XOF et diaspora en EUR.",
    },
    solution: {
      en: "Next.js front-end with ISR-cached listing pages, an agent back-office in TypeScript, image optimization through Next/Image, and a viewing-request endpoint that emits notifications to both agent (Telegram) and prospect (email).",
      fr: "Front-end Next.js avec pages d'annonce en ISR, back-office agent en TypeScript, optimisation d'images via Next/Image, et endpoint de demande de visite qui émet des notifications à la fois pour l'agent (Telegram) et le prospect (email).",
    },
    result: {
      en: "Diaspora viewing requests now reach agents inside the same hour, the listing inventory grew threefold without needing more agent labor, and Lighthouse mobile performance settled above 90.",
      fr: "Les demandes de visite de la diaspora atteignent désormais les agents dans la même heure, l'inventaire d'annonces a triplé sans embauche supplémentaire, et la performance mobile Lighthouse s'est stabilisée au-dessus de 90.",
    },
    metrics: [
      { value: "3×", label: { en: "listing inventory growth", fr: "croissance inventaire annonces" } },
      { value: "< 1h", label: { en: "viewing-request to agent SLA", fr: "SLA visite → agent" } },
      { value: "≥ 90", label: { en: "mobile Lighthouse score", fr: "score Lighthouse mobile" } },
    ],
    links: { live: "https://guidacenter.com/" },
  },
  {
    slug: "csf-cross-border-logistics-cn-ne",
    slugFr: "csf-logistique-transfrontaliere-cn-ne",
    title: "Commande Sans Frontière",
    client: "CSF",
    region: "CN/NE",
    sector: "Logistics",
    year: "2023–2024",
    cover: "/project/csf.png",
    flag: "🇨🇳🇳🇪",
    summary: {
      en: "Cross-border procurement and logistics platform connecting West African buyers with Chinese suppliers and shippers.",
      fr: "Plateforme d'approvisionnement et logistique transfrontalière reliant acheteurs ouest-africains, fournisseurs et transporteurs chinois.",
    },
    stack: ["Laravel", "Vue.js", "MySQL", "Redis", "Stripe"],
    situation: {
      en: "CSF coordinated multimodal shipments (air, sea, road) from Shenzhen and Yiwu to Niamey by hand — quotes on WhatsApp, tracking via screenshots, payments via informal channels.",
      fr: "CSF coordonnait à la main des expéditions multimodales (air, mer, route) de Shenzhen et Yiwu vers Niamey — devis sur WhatsApp, suivi par capture d'écran, paiements via canaux informels.",
    },
    challenge: {
      en: "Replace manual coordination with a quotation engine, a unified order ledger, customer-facing tracking, and a finance trail compatible with future audits — without losing the trust the manual process had built.",
      fr: "Remplacer la coordination manuelle par un moteur de devis, un registre de commandes unifié, un suivi visible côté client et une piste financière compatible avec d'éventuels audits — sans perdre la confiance gagnée par le process manuel.",
    },
    solution: {
      en: "We shipped a Laravel back-end with a quoting engine that combines air, sea and road tariffs by weight and volume, a Vue.js customer portal for order tracking with public lookup links, Redis-backed quote caching, and Stripe for the EUR portion of payments. Operations team kept their WhatsApp triage but now logs every conversation back into the order ledger.",
      fr: "Nous avons livré un back-end Laravel avec un moteur de devis qui combine les tarifs aérien, maritime et routier par poids et volume, un portail client Vue.js pour le suivi avec liens publics de consultation, un cache Redis pour les devis, et Stripe pour la part EUR des paiements. L'équipe ops conserve son triage WhatsApp mais journalise chaque échange dans le registre de commandes.",
    },
    result: {
      en: "Quote turnaround dropped from a day-plus to under fifteen minutes for standard lanes, the orders book is now auditable, and CSF onboarded two more agents without losing visibility on inflight shipments.",
      fr: "Le délai de devis est passé de plus d'une journée à moins de quinze minutes pour les couloirs standards, le carnet de commandes est désormais auditable, et CSF a intégré deux agents supplémentaires sans perdre la visibilité sur les expéditions en cours.",
    },
    metrics: [
      { value: "1d → 15min", label: { en: "standard-lane quote turnaround", fr: "délai devis couloir standard" } },
      { value: "100%", label: { en: "orders ledgered & auditable", fr: "commandes journalisées et auditables" } },
      { value: "+2", label: { en: "agents added without visibility loss", fr: "agents ajoutés sans perte de visibilité" } },
    ],
    links: { live: "https://commandesansfrontiere.com/" },
  },
];

export const caseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug || c.slugFr === slug);
