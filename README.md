<p align="center">
  <img src="https://raw.githubusercontent.com/nestjs/docs.main/master/src/assets/logo-small.svg" width="96" alt="NestJS" />
</p>

# LizardMart API

An extendable NestJS 11 service that powers the LizardMart storefront. The API currently ships with the default `GET /` health endpoint and is ready to grow into modules for products, cart, checkout, and authentication.

## Tech Stack

- Node.js 20+
- NestJS 11 with Express adapter
- TypeScript 5.7 (strict)
- Jest + Supertest for unit and e2e coverage
- ESLint 9 + Prettier for consistent formatting

## Project Structure

```
src/
├─ main.ts           # Bootstraps Nest and configures the HTTP server
├─ app.module.ts     # Root module for registering feature modules
├─ app.controller.ts # Example HTTP controller (GET /)
└─ app.service.ts    # Placeholder business logic layer
```

As the API grows, introduce feature modules under `src/<feature>` and register them inside `AppModule` for clean separation of concerns.

## Getting Started

```bash
cd LizardMart-api
npm install

# launch on http://localhost:3000
npm run start:dev
```

Environment variables:

| Variable | Purpose           | Default |
| -------- | ----------------- | ------- |
| `PORT`   | Exposed HTTP port | `3000`  |

Create a `.env` (or rely on the default) before running the service locally.

## Useful Scripts

| Script               | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run start`      | Start the API once in development mode      |
| `npm run start:dev`  | Watch mode with auto reload on file changes |
| `npm run start:prod` | Execute the compiled build from `dist/`     |
| `npm run build`      | Transpile TypeScript to `dist/`             |
| `npm run lint`       | Lint and auto-fix the codebase              |
| `npm run test`       | Run unit tests                              |
| `npm run test:e2e`   | Execute e2e specs located in `test/`        |
| `npm run test:cov`   | Generate a coverage summary                 |

## API Surface

| Method | Path | Description                                      |
| ------ | ---- | ------------------------------------------------ |
| `GET`  | `/`  | Returns a simple health string from `AppService` |

Use this endpoint as a smoke test once the server is running. Future modules (products, carts, checkout) should follow the same pattern: controller + service + DTOs under their own directory.

## Testing

```bash
npm run test       # unit tests via ts-jest
npm run test:e2e   # end-to-end tests in test/app.e2e-spec.ts
```

Jest is already configured in `package.json`. Add spec files next to the code under test (`*.spec.ts`) for fast feedback.

## Deployment

1. `npm run build`
2. Copy the `dist/` folder plus `package.json` and `package-lock.json` to your server or container.
3. Install production deps (`npm ci --omit=dev`).
4. Start with `node dist/main.js` (or a process manager like PM2).

## Contributing Guidelines

1. Fork or branch from `main`.
2. Create feature modules under `src/` and register them in `AppModule`.
3. Add or update tests alongside your changes.
4. Run `npm run lint && npm run test` before opening a PR.

Once this folder is pushed to GitHub, enable required checks for lint and test workflows to keep the API reliable.
