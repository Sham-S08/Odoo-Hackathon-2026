# AssetFlow — Frontend

Next.js (App Router) + Tailwind CSS scaffold for the AssetFlow Enterprise Asset
& Resource Management System.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — it redirects to `/landing`.

## Structure

- `app/landing` — public landing page with four role cards (Admin, Asset
  Manager, Department Head, Employee). Clicking a card opens an inline login
  form for that role.
- `app/(auth)/login`, `app/(auth)/signup` — standalone auth pages. Signup only
  ever creates an Employee account; other roles are promoted later from the
  Employee Directory (Organization Setup, admin only).
- `app/dashboard` — KPI cards, quick actions, recent notifications.
- `app/organization`, `app/assets`, `app/allocations`, `app/bookings`,
  `app/maintenance`, `app/audits`, `app/reports`, `app/notifications`,
  `app/profile` — one page per module, each wrapped in the shared `AppShell`
  (sidebar + navbar + footer) so every module shares the same navigation.
- `components/common` — Button, Input, Modal, Loader, Table primitives used
  everywhere.
- `components/layout` — Sidebar, Navbar, Footer, and `AppShell` that composes
  them around a page's content.
- `components/<module>` — feature-specific pieces (dashboard KPI cards, quick
  actions, recent activity, landing role cards + login modal).
- `services/` — one file per domain, thin wrappers around `axios` hitting the
  backend's REST API (see `services/api.js` for the base client and auth
  token handling).
- `context/` — `AuthContext` (current user/session) and `ThemeContext`.
- `hooks/` — `useAuth`, `useFetch`, `useNotification` built on top of context
  and services.
- `utils/` — constants (roles, asset/maintenance/booking statuses), generic
  helpers (overlap/overdue checks), validators, and formatters.

## Theme

Light background, white surfaces, purple (`brand-*` in `tailwind.config.js`)
as the single accent color — used for the sidebar's active state, primary
buttons, badges, and headings.

## Notes

- Pages currently render with sample/static data so the UI is fully
  browsable without a backend running. Swap the inline arrays in each
  `page.js` for the matching `services/*` call once the Node/Express API is
  up.
- `NEXT_PUBLIC_API_BASE_URL` in `.env.local` points at the backend; update it
  to match wherever the Express server runs.
