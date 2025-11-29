export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    // Navbar
    profile: "Profil",
    skills: "Compétences",
    projects: "Projets",
    companies: "Entreprises",
    contact: "Contact",
    email: "Email",

    // Hero
    fullstackDeveloper: "Développeur Fullstack Senior",
    heroDescription: "Développeur Fullstack Senior avec 5+ ans d'expérience en conception d'architectures web, mobile et microservices. Expert en développement front-end (Angular, React, Vue.js), mobile (Flutter), back-end (Spring Boot, Laravel) et DevOps (Docker, Kubernetes). Spécialisé dans la sécurité (JWT, OAuth2, OWASP), les APIs REST/GraphQL et les bases de données SQL/NoSQL.",
    contactMe: "Me contacter",
    learnMore: "En savoir plus",

    // Profile
    about: "À propos",
    location: "Niamey, Niger",
    joinMe: "Me joindre",
    github: "GitHub",

    // Skills
    skillsTitle: "Langages & Outils",
    skillsSubtitle: "Sélection des technologies que je maîtrise",
    languages: "Langages",
    frameworks: "Frameworks",
    uiDesign: "UI/Design",
    databases: "Databases",
    tools: "Outils",

    // Projects
    projectsTitle: "Projets",
    projectsSubtitle: "Images, descriptions, stacks et liens",
    search: "Rechercher...",
    all: "Tous",
    enterprise: "Entreprise",
    freelance: "Freelance",
    personal: "Personnel",
    viewProject: "Voir",
    site: "Site",
    code: "Code",
    viewSite: "Voir le site",
    viewCode: "Voir le code",
    moreProjectsTitle: "Et ce n'est pas tout !",
    moreProjectsDescription: "J'ai réalisé plus de 98 projets au total. Cette sélection représente mes réalisations les plus récentes et les plus significatives.",
    projectsShown: "Projets affichés",
    totalProjects: "Total de projets",
    portfolioShown: "de mon portfolio affiché",

    // Companies
    companiesTitle: "Entreprises & Collaborations",
    companiesSubtitle: "Clients et partenaires avec lesquels j'ai travaillé",

    // Footer
    navigation: "Navigation",
    social: "Réseaux",
    availableFor: "Disponible pour missions freelance & contrats",
    copyright: "Développeur Fullstack Senior",

    // Projects descriptions
    projectDetails: {
      entrepriseDebtManagement: {
        title: "App Gestion Créances",
        description: "Application multiplateforme Flutter de gestion des créances et dettes des abonnés. Interface web et mobile responsive, tableau de bord analytics, gestion multi-utilisateurs avec rôles et permissions OAuth2, notifications Firebase, exports Excel/PDF, authentification sécurisée JWT et synchronisation temps réel avec backend Spring Boot."
      },
      entrepriseEcommerceMobile: {
        title: "E-Commerce Mobile App",
        description: "Application mobile e-commerce Flutter complète avec catalogue produits, panier intelligent, paiement sécurisé (conformité OWASP), suivi de commandes en temps réel, favoris, notifications push Firebase, mode offline-first, intégration API REST/GraphQL et backend microservices Spring Boot avec MongoDB et Redis pour le cache."
      },
      entrepriseCsf: {
        title: "Commande Sans Frontière",
        description: "Plateforme de transport multimodal (aérien, maritime et routier) offrant des solutions sur mesure pour le commerce international. Plus de 5 ans d'expérience avec livraison rapide et sécurisée depuis la Chine."
      },
      entrepriseStaff: {
        title: "NigerDev Staff",
        description: "Application complète de gestion d'entreprise intégrant la gestion des employés, le suivi des stagiaires et l'administration des salaires. Solution centralisée pour optimiser les processus RH."
      },
      entrepriseHydrolink: {
        title: "HydroLink",
        description: "Plateforme de solutions durables en BTP, hydraulique, e-commerce et commerce général. Des solutions de qualité pour accompagner le développement du Niger."
      },
      entrepriseAyki: {
        title: "AYKI Emploi",
        description: "Plateforme de recrutement qui connecte les talents aux opportunités. AYKI simplifie le processus en mettant directement en relation les meilleurs candidats avec les entreprises qui recherchent leurs compétences."
      },
      entreprisePtrniger: {
        title: "PTR Niger E-Learning",
        description: "Plateforme e-learning proposant des formations en entrepreneuriat, marketing digital, informatique et plus. Les élèves s'inscrivent et apprennent directement en ligne avec un suivi personnalisé."
      },
      entrepriseSchool: {
        title: "PTR School",
        description: "Solution de gestion scolaire complète : bibliothèques, gestion du personnel, comptabilité, paiement des personnels et professeurs, inscription, scolarités, emplois du temps, examens et devoirs. Une plateforme tout-en-un pour les établissements."
      },
      entrepriseEmmalab: {
        title: "EMMA-Lab",
        description: "Laboratoire d'innovation qui accompagne les entrepreneurs et les organisations dans leur transformation digitale et leurs projets innovants. Innover ensemble pour construire l'avenir."
      },
      entrepriseLastuce: {
        title: "L'Astuce",
        description: "Communauté d'astuces permettant de découvrir les meilleures techniques avec une communauté passionnée. Conseils pratiques pour améliorer le quotidien : voir les épisodes et proposer ses propres astuces."
      },
      entrepriseGuidacenter: {
        title: "GuidaCenter",
        description: "Plateforme immobilière moderne qui simplifie l'achat, la vente et la location de biens au Niger. Interface intuitive pour faciliter les transactions immobilières."
      },
      freelanceSoftis: {
        title: "Softis Pilates",
        description: "Plateforme complète pour un club sportif de Pilates au Japon. Gestion des cours, réservations, membres et planning pour une expérience utilisateur optimale."
      },
      freelanceNina: {
        title: "Nina Massage & Kiné",
        description: "Centre de massage professionnel à Niamey proposant massage et kinésithérapie. Services premium : drainage lymphatique, massage 4 mains, soins esthétiques et bien plus."
      },
      personnelIcall: {
        title: "iCall CRM",
        description: "Suite CRM complète avec de très nombreuses fonctionnalités : gestion des contacts, suivi des opportunités, automatisation des processus et rapports analytiques. Solution robuste pour la gestion de la relation client."
      },
      personnelGestion: {
        title: "Gestion Boutique",
        description: "Application de gestion de boutique intégrant la gestion des stocks, la comptabilité, le suivi des revenus et les opérations commerciales. Interface simple pour une gestion efficace au quotidien."
      },
      personnelShop: {
        title: "Shop POS",
        description: "Application de gestion commerciale complète : fournisseurs, comptabilité, achats, QR codes et système POS pour des ventes instantanées. Solution tout-en-un pour la gestion de points de vente."
      }
    },

    // Companies descriptions
    companyDescriptions: {
      freelance: "Réalisation de projets web et mobiles sur mesure, gestion complète de projets, support technique et relation client.",
      icall: "Gestion des mises à jour et correctifs logiciels, formation des utilisateurs, analyse des besoins clients et propositions d'améliorations.",
      ptrNiger: "Création de sites web responsives et optimisés SEO avec React, conception d'interfaces utilisateurs attractives et de maquettes.",
      idevNiger: "Réalisation de projets innovants et technologiques, conception d'applications, collaboration avec des équipes pluridisciplinaires."
    }
  },

  en: {
    // Navbar
    profile: "Profile",
    skills: "Skills",
    projects: "Projects",
    companies: "Companies",
    contact: "Contact",
    email: "Email",

    // Hero
    fullstackDeveloper: "Senior Fullstack Developer",
    heroDescription: "Senior Fullstack Developer with 5+ years of experience in web, mobile, and microservices architecture design. Expert in front-end (Angular, React, Vue.js), mobile (Flutter), back-end (Spring Boot, Laravel) and DevOps (Docker, Kubernetes). Specialized in security (JWT, OAuth2, OWASP), REST/GraphQL APIs and SQL/NoSQL databases.",
    contactMe: "Contact Me",
    learnMore: "Learn More",

    // Profile
    about: "About",
    location: "Niamey, Niger",
    joinMe: "Reach Out",
    github: "GitHub",

    // Skills
    skillsTitle: "Languages & Tools",
    skillsSubtitle: "Selection of technologies I master",
    languages: "Languages",
    frameworks: "Frameworks",
    uiDesign: "UI/Design",
    databases: "Databases",
    tools: "Tools",

    // Projects
    projectsTitle: "Projects",
    projectsSubtitle: "Images, descriptions, stacks and links",
    search: "Search...",
    all: "All",
    enterprise: "Enterprise",
    freelance: "Freelance",
    personal: "Personal",
    viewProject: "View",
    site: "Site",
    code: "Code",
    viewSite: "View Site",
    viewCode: "View Code",
    moreProjectsTitle: "And that's not all!",
    moreProjectsDescription: "I have completed over 98 projects in total. This selection represents my most recent and significant achievements.",
    projectsShown: "Projects shown",
    totalProjects: "Total projects",
    portfolioShown: "of my portfolio displayed",

    // Companies
    companiesTitle: "Companies & Collaborations",
    companiesSubtitle: "Clients and partners I've worked with",

    // Footer
    navigation: "Navigation",
    social: "Social",
    availableFor: "Available for freelance missions & contracts",
    copyright: "Senior Fullstack Developer",

    // Projects descriptions
    projectDetails: {
      entrepriseDebtManagement: {
        title: "Debt Management App",
        description: "Flutter cross-platform app for subscriber debt and credit management. Responsive web and mobile interface, analytics dashboard, multi-user management with OAuth2 roles and permissions, Firebase notifications, Excel/PDF exports, secure JWT authentication and real-time sync with Spring Boot backend."
      },
      entrepriseEcommerceMobile: {
        title: "E-Commerce Mobile App",
        description: "Complete Flutter mobile e-commerce app with product catalog, smart cart, secure payment (OWASP compliance), real-time order tracking, favorites, Firebase push notifications, offline-first mode, REST/GraphQL API integration and Spring Boot microservices backend with MongoDB and Redis for caching."
      },
      entrepriseCsf: {
        title: "Commande Sans Frontière",
        description: "Multimodal transport platform (air, sea, and road) offering customized solutions for international trade. Over 5 years of experience with fast and secure delivery from China."
      },
      entrepriseStaff: {
        title: "NigerDev Staff",
        description: "Complete business management application integrating employee management, intern tracking, and payroll administration. Centralized solution to optimize HR processes."
      },
      entrepriseHydrolink: {
        title: "HydroLink",
        description: "Sustainable solutions platform in construction, hydraulics, e-commerce, and general trade. Quality solutions to support Niger's development."
      },
      entrepriseAyki: {
        title: "AYKI Jobs",
        description: "Recruitment platform that connects talents with opportunities. AYKI simplifies the process by directly connecting the best candidates with companies seeking their skills."
      },
      entreprisePtrniger: {
        title: "PTR Niger E-Learning",
        description: "E-learning platform offering training in entrepreneurship, digital marketing, IT and more. Students enroll and learn directly online with personalized support."
      },
      entrepriseSchool: {
        title: "PTR School",
        description: "Complete school management solution: libraries, staff management, accounting, staff and teacher payments, enrollment, tuition, schedules, exams, and homework. An all-in-one platform for educational institutions."
      },
      entrepriseEmmalab: {
        title: "EMMA-Lab",
        description: "Innovation lab that supports entrepreneurs and organizations in their digital transformation and innovative projects. Innovating together to build the future."
      },
      entrepriseLastuce: {
        title: "L'Astuce",
        description: "Tips community for discovering the best techniques with a passionate community. Practical advice to improve daily life: view episodes and submit your own tips."
      },
      entrepriseGuidacenter: {
        title: "GuidaCenter",
        description: "Modern real estate platform that simplifies buying, selling, and renting properties in Niger. Intuitive interface to facilitate real estate transactions."
      },
      freelanceSoftis: {
        title: "Softis Pilates",
        description: "Complete platform for a Pilates sports club in Japan. Management of classes, bookings, members, and scheduling for an optimal user experience."
      },
      freelanceNina: {
        title: "Nina Massage & Physio",
        description: "Professional massage center in Niamey offering massage and physiotherapy. Premium services: lymphatic drainage, 4-hand massage, aesthetic treatments, and more."
      },
      personnelIcall: {
        title: "iCall CRM",
        description: "Complete CRM suite with numerous features: contact management, opportunity tracking, process automation, and analytical reports. Robust solution for customer relationship management."
      },
      personnelGestion: {
        title: "Shop Management",
        description: "Shop management application integrating inventory management, accounting, revenue tracking, and business operations. Simple interface for efficient daily management."
      },
      personnelShop: {
        title: "Shop POS",
        description: "Complete business management application: suppliers, accounting, purchases, QR codes, and POS system for instant sales. All-in-one solution for point-of-sale management."
      }
    },

    // Companies descriptions
    companyDescriptions: {
      freelance: "Custom web and mobile project development, complete project management, technical support and client relations.",
      icall: "Software updates and bug fixes management, user training, client needs analysis and improvement proposals.",
      ptrNiger: "Creation of responsive and SEO-optimized websites with React, attractive user interface design and mockups.",
      idevNiger: "Implementation of innovative and technological projects, application design, collaboration with multidisciplinary teams."
    }
  }
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
