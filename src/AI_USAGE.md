#### `AI_USAGE.md`
```markdown
# AI Usage Disclosure

- **Tools used:** AI assistant for code scaffolding and layout structure, paired with manual inspection against the Figma reference and browser viewports.
- **Representative prompts:**
  1. Generate a React + Vite task dashboard organized into the requested `src/` structure.
  2. Implement task filtering, derived statistics, carousel slides, and `localStorage` persistence.
- **AI-assisted areas:** Component structure, filtering and statistics derivation, modal dialogs, and `localStorage` hook setup.
- **Checked / adjusted item:** Confirmed `useLocalStorage` checks for `null` rather than truthiness so deleting all tasks (`[]`) persists across reloads without re-seeding sample tasks.