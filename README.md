# Portfolio Next.js

Portfolio professionnel moderne avec animations et filtres interactifs, construit avec Next.js 15, React 19, Framer Motion et Tailwind CSS v4.

## Fonctionnalités

- Portfolio avec 4 sections : Profil, Compétences, Projets, Entreprises
- Système de filtrage avancé pour les projets (par type, tags, recherche)
- Animations fluides avec Framer Motion
- Effet tilt 3D sur les cartes de projets
- Interface moderne avec Shadcn UI
- Dark mode par défaut
- Design responsive

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Personnalisation

### 1. Informations de profil

Modifiez l'objet `profile` dans `app/page.tsx` (lignes 34-43) :

```typescript
const profile = {
  name: "Votre Nom",
  role: "Votre Titre",
  photo: "URL de votre photo",
  about: "Votre description",
  location: "Votre ville, Pays",
  email: "votre@email.com",
};
```

### 2. Compétences

Modifiez le tableau `skillGroups` dans `app/page.tsx` (lignes 45-51) :

```typescript
const skillGroups: { title: string; items: string[] }[] = [
  { title: "Langages", items: ["PHP", "JavaScript", "TypeScript"] },
  { title: "Frameworks", items: ["Laravel", "React", "Next.js"] },
  // Ajoutez ou modifiez les catégories
];
```

### 3. Entreprises

Modifiez le tableau `companies` dans `app/page.tsx` (lignes 53-63) :

```typescript
const companies = [
  {
    id: "company1",
    name: "Nom de l'entreprise",
    role: "Votre rôle",
    years: "2022–2025",
    logo: "URL du logo",
    desc: "Description de votre rôle",
    site: "https://site-entreprise.com",
  },
  // Ajoutez plus d'entreprises
];
```

### 4. Projets

Modifiez le tableau `projects` dans `app/page.tsx` (lignes 65-92) :

```typescript
const projects = [
  {
    id: "projet-unique",
    title: "Titre du projet",
    company: "Entreprise ou Personnel",
    kind: "Personnel", // "Personnel", "Freelance", ou "Entreprise"
    year: "2025",
    cover: "URL de l'image de couverture",
    description: "Description détaillée du projet",
    tags: ["Next.js", "React", "Tailwind"],
    links: {
      site: "https://demo-projet.com", // ou "#" si pas de lien
      repo: "https://github.com/vous/projet" // ou "#" si privé
    },
  },
  // Ajoutez plus de projets
];
```

### 5. Métadonnées SEO

Modifiez les métadonnées dans `app/layout.tsx` (lignes 15-18) :

```typescript
export const metadata: Metadata = {
  title: "Votre Titre - Portfolio",
  description: "Votre description pour le SEO",
};
```

## Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **Shadcn UI** - Composants UI réutilisables
- **Lucide React** - Icônes
- **Radix UI** - Composants accessibles

## Structure du projet

```
portofoliomkl/
├── app/
│   ├── globals.css          # Styles globaux et variables CSS
│   ├── layout.tsx            # Layout principal et métadonnées
│   └── page.tsx              # Page portfolio (à personnaliser)
├── components/
│   └── ui/                   # Composants UI Shadcn
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── separator.tsx
│       └── tabs.tsx
├── lib/
│   └── utils.ts              # Utilitaires (cn function)
└── package.json
```

## Personnalisation du design

### Couleurs

Les couleurs sont définies dans `app/globals.css` via des variables CSS. Modifiez les valeurs pour personnaliser le thème :

```css
.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #fafafa;
  --secondary: #262626;
  /* etc. */
}
```

### Animations

Les animations sont gérées par Framer Motion. Personnalisez-les dans `app/page.tsx` :
- Animations d'entrée : lignes 285-288
- Effet tilt : lignes 98-120
- Animation de fond : lignes 473-477

## Déploiement

### Vercel (recommandé)

```bash
npm run build
# Suivez les instructions sur vercel.com
```

### Autres plateformes

```bash
npm run build
npm start
```

## Licence

Ce projet est libre d'utilisation pour votre portfolio personnel.
