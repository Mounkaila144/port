// Skill curation gate (Story 1.9 — FR-076/FR-077).
// Fails the build if content/skills.ts contains a skill name not in
// content/skills.mastery.txt.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { skillGroups } from "../content/skills";

const mastery = new Set(
  readFileSync(resolve(__dirname, "../content/skills.mastery.txt"), "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#")),
);

const declared = skillGroups.flatMap((g) => g.items.map((i) => i.name));
const unauthorized = declared.filter((name) => !mastery.has(name));

if (unauthorized.length) {
  console.error(
    `\nSkill gate FAILED — ${unauthorized.length} unauthorized skill(s) in content/skills.ts:`,
  );
  for (const s of unauthorized) console.error("  - " + s);
  console.error(
    "\nAdd them to content/skills.mastery.txt or remove them from content/skills.ts.",
  );
  process.exit(1);
}
console.log(`Skill gate PASSED — ${declared.length} skills verified against mastery checklist.`);
