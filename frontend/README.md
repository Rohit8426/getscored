# Frontend

Next.js frontend using the app router, Tailwind CSS, SEO metadata, sitemap/robots routes, structured data, and ad-ready placements.

## Getting Started

Create a local environment file:

```bash
cp .env.example .env.local
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO

- Main metadata lives in `src/app/layout.tsx`.
- Sitemap is generated from `src/app/sitemap.ts`.
- Robots rules are generated from `src/app/robots.ts`.
- The home page includes JSON-LD structured data.

Set `NEXT_PUBLIC_SITE_URL` to your production domain before deployment.

## Ads

Ad placements use `src/components/ad-slot.tsx`. Add your AdSense client and slot IDs in `.env.local` or your deployment platform:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_HERO_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_TOP_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_INLINE_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=1234567890
```

## Backend

The sibling `../backend` folder exposes API endpoints. Set `NEXT_PUBLIC_API_URL` to the backend URL when you connect frontend data fetching.
