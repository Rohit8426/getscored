# Backend

Express + TypeScript API using Sequelize as the ORM and Postgres as the database.

## Setup

Create a local environment file:

```bash
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

Start Postgres locally:

```bash
docker compose up -d
```

Run the API in development:

```bash
npm run dev
```

Default URL: [http://localhost:4000](http://localhost:4000)

## Scripts

- `npm run dev` starts Express with TypeScript watch mode.
- `npm run build` compiles TypeScript into `dist`.
- `npm start` runs the compiled server.
- `npm run typecheck` checks TypeScript without writing output.

## ORM

Sequelize is configured in `src/database/sequelize.ts`. The default database is Postgres, controlled by separate `DB_*` environment variables.

Default local connection:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=web_page
DB_USER=postgres
DB_PASSWORD=postgres
```

## Endpoints

- `GET /api/health` returns service health.
- `GET /api/site-config` returns basic public site configuration.
- `GET /api/pages` returns stored pages.
- `POST /api/pages` creates a page with `title`, `slug`, and `description`.

Set `FRONTEND_ORIGIN` to the deployed frontend URL before production deployment.
