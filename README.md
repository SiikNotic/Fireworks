# Fireworks / Jobzapp

Jobzapp is a production-minded, bilingual two-sided service marketplace: customers post work, professionals respond with offers, and both sides can communicate, schedule, and complete payments securely.

## Current foundation

- Next.js 16 + React 19 + TypeScript
- Responsive mobile-first marketplace landing experience
- English / Spanish language switch
- Accessible navigation and responsive mobile menu
- Clear customer and professional entry points
- GitHub Actions type-check + production build gate

## Product layers planned

1. Authentication and profiles
2. Customer job posting and professional offers
3. Search, service categories, location and availability
4. In-app messaging and notifications
5. Verification, reviews, moderation and reporting
6. Protected payments and payouts
7. Admin operations and marketplace analytics

No secrets, payment credentials, or external service keys belong in source control.

## Development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```
