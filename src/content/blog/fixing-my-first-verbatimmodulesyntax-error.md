---
title: "Fixing my first verbatimModuleSyntax error"
description: "Understanding TypeScript 5's verbatimModuleSyntax compiler option, why type-only imports matter, and how to resolve TS1484 errors."
date: 2026-09-27
starred: false
draft: false
---

When configuring a strict TypeScript project targeting modern ECMAScript modules in Node.js, you might enable `"verbatimModuleSyntax": true` in your `tsconfig.json`. Soon after, you might see this compiler error:

```text
TS1484: 'User' matches a type-only declaration and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```

Here is a quick look at why this happens and how to resolve it cleanly.

## Why does verbatimModuleSyntax exist?

In earlier versions of TypeScript, the compiler used heuristic analysis to decide whether an `import` was only used for types, and if so, it stripped the import statement from the generated JavaScript.

While convenient, this caused issues with modern build systems and native Node.js ESM loaders, because build tools could not tell from the JavaScript syntax alone whether an import was meant to be executed for side effects or if it was merely a type.

With `verbatimModuleSyntax`:
1. Any import that is not explicitly marked with `type` is preserved in the JavaScript output.
2. If TypeScript notices you are importing an interface or type using regular `import` syntax, it prevents the build to save you from runtime errors (like `SyntaxError: The requested module does not provide an export named 'User'`).

## The Solution: Explicit Type Imports

Separate your value imports from your type imports using `import type`:

```typescript
// ❌ Incorrect: This causes TS1484 under verbatimModuleSyntax
import { Request, Response, NextFunction } from "express";
import { User, TokenPayload } from "../types/auth";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // middleware logic
}
```

```typescript
// ✅ Correct: Clearly demarcate runtime values vs compiler-only types
import type { Request, Response, NextFunction } from "express";
import type { User, TokenPayload } from "../types/auth";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // middleware logic
}
```

Alternatively, you can use inline type imports if you are importing both values and types from the same module:

```typescript
import { Router, type Request, type Response } from "express";

const router = Router();
```

Enabling this option might require a bit of initial cleanup, but it leads to cleaner, more predictable ESM output.
