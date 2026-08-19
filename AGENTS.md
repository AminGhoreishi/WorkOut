# Extract Components Types Skill

Use this skill whenever generating, refactoring, or modifying React/Next.js components, hooks, or API files that require TypeScript interfaces, types, or enums.

## Intent Trigger

- "Create a new component"
- "Add a new feature"
- "Refactor types"
- "Define props for this component"

## CRITICAL CONSTRAINTS (CRUCIAL)
- **ABSOLUTELY NO COMMENTS:** Never write any comments, inline comments, TODOs, or documentation blocks inside any code files (TSX, TS, CSS, Config). 
- **NO EXPLANATIONS IN CODE:** If you need to explain how the code works, write it strictly in the chat output—never as code comments. The code must remain 100% clean and comment-free.

## Architecture Rules

1. **No Inline Types:** Never declare complex prop interfaces, API response types, or shared object types directly within a component file (e.g., inside `src/app/page.tsx` or individual components).
2. **Directory Placement:** All types must be written into a dedicated file or feature folder inside the `src/types/` directory.
   - For shared models, use global type definitions (e.g., `src/types/workout.ts`).
   - For a specific feature or a complex component, create a matching types file (e.g., `src/types/components.ts`).
3. **Clean Imports:** Always export the types using explicit named exports and import them into your components using the `import type` syntax to keep bundle sizes lean.
4. **No Code Comments (Strict):** Do not write any explanatory comments, inline comments, or TODOs inside the generated TypeScript, TSX, or configuration code. The code must be completely clean, self-documenting, and free of comment blocks.

## Example Workflow

### 1. File: `src/types/components.ts`
```typescript
export interface CardProps {
  title: string;
  count: number;
}
```

---

# StarFit Next.js Module Audit & Refactor Skill

Use this skill when auditing, reviewing, refactoring, or finalizing Next.js modules, pages, components, Server Actions, or API routes.

## Role & Persona

Senior / Principal Next.js Architect & Security & Performance Specialist.

## Intent Trigger

- "Audit component/module"
- "Refactor Next.js module"
- "Review security and performance"
- "Finalize Next.js component"
- "بررسی و رفکتور ماژول"

## Core Workflow & Protocol

### 1. Security & Data Leakage Audit
- Verify Server Actions, API Routes, and Server Components for security vulnerabilities.
- Ensure sensitive secrets, private environment variables, API tokens, and internal keys are never leaked to the client bundle.
- Enforce input validation and authorization checks.

### 2. Performance & Rendering Optimization
- Enforce strict separation between Server Components (page wrappers, SSR data fetching) and Client Components (interactivity).
- Optimize data fetching strategies, revalidation, and caching.
- Use `SWR` for client-side data fetching, caching, automatic revalidation, and optimistic UI updates when required.
- Enforce page Metadata title/branding to **StarFit** (`استار فیت`).

### 3. Error Handling & Edge Cases
- Identify and guard against unhandled runtime errors, UI crashes, and race conditions.
- Ensure resilient UI behavior during network disconnections or unexpected server responses.

### 4. Refactor & Clean Code Rules
- Write clean, self-documenting code.
- **Zero Comments Constraint (Strict):** ABSOLUTELY NO comments (inline, block, JSDoc, TODO) in any TSX, TS, CSS, or Config files.
- **Type Extraction:** Extract complex TypeScript prop interfaces and response types to dedicated files in `src/types/` using `import type`.