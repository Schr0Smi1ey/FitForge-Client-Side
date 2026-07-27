# FitForge 🏋️‍♀️

[![CI](https://github.com/Schr0Smi1ey/FitForge-Client-Side/actions/workflows/ci.yml/badge.svg?branch=enhanced)](https://github.com/Schr0Smi1ey/FitForge-Client-Side/actions/workflows/ci.yml)

FitForge is a fitness platform where members browse trainers and classes, book
training slots, pay by card, and take part in a community forum. React + Vite
front end; the API lives in
[FitForge-Server-Side](https://github.com/Schr0Smi1ey/FitForge-Server-Side).

**[Live demo](https://fitforge-44b27.web.app/)**

---

## Contents

- [Features](#features)
- [Architecture](#architecture)
- [Booking and payment](#booking-and-payment)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Setup](#setup)
- [Tests](#tests)

---

## Features

**Everyone** — browse trainers and classes (paginated, searchable), read the
community forum, subscribe to the newsletter.

**Members** — book a training slot, pay by card, track an activity log, review
trainers, apply to become a trainer, vote on forum posts.

**Trainers** — create and remove slots (each with a seat capacity), post to the
forum.

**Admins** — approve or reject trainer applications, manage trainers and classes,
and see revenue broken down by membership tier.

Auth is Firebase (email/password and Google), with a JWT issued by the API for
authorising requests to it.

---

## Architecture

```
src/
  Components/
    Cards/            reusable cards (trainer, class, forum post)
    Details/          trainer detail + slot table
    Forms/            login, signup, payment, add-slot, profile
    Layout/           root layout
    Pages/            route-level pages, incl. Dashboard/*
    Shared/           Navbar, Footer, Loader, TableSkeleton, Reveal, ErrorPage
  Contexts/           AuthContext (Firebase user, theme, toasts)
  Hooks/              useAxiosSecure (attaches the JWT), useCustomAxios
  ProtectedRoute/     route guards
  utils/              compressImage, packages, shared helpers
  theme.js            brand palette for libraries that take a colour prop
  motion.js           AOS config + the shared stagger scale
```

**Data fetching** is TanStack Query throughout. **Styling** is Tailwind + DaisyUI
with a class-based dark mode.

### Design tokens

The palette is defined twice on purpose, and a test asserts the two agree:

- `tailwind.config.js` — for markup (`bg-primary`, `text-accent`, …)
- `src/theme.js` — for libraries that take a colour **prop** and cannot use a class
  name (MUI charts, SweetAlert)

The only hardcoded hex values left in the codebase are genuinely third-party:
Google's sign-in brand colours, and Stripe's `CardElement` defaults, which are
passed into a cross-origin iframe that cannot read our stylesheet.

### Loading states

Two components, one rule: **if the shape of the result is known, draw the shape.**

| Component | Use |
| --- | --- |
| `Shared/Loader` | Everything else. A CSS ring — no spinner library |
| `Shared/Loader/TableSkeleton` | Table-shaped dashboard routes |

A skeleton keeps the page the right size so content lands in place; a spinner in
a table makes everything below it jump when the data arrives.

`Loader` takes `size="sm" | "md" | "lg"` (16 / 32 / 48px), not free pixel
numbers. Call sites previously passed 30, 40 and 50 interchangeably, so the
loader was a slightly different size on nearly every route. Pair `size="md"` with
`fullScreen={false}` when the loader sits inside page chrome that has already
rendered — the default fills the viewport, which is right for a whole route and
wrong for one card.

### Motion

Scroll reveals go through `Shared/Reveal`, which reads its timing from
`src/motion.js`. Call sites say *what*, not *how*:

```jsx
{posts.map((post, index) => (
  <Reveal key={index} index={index}>
    <PostCard postData={post} />
  </Reveal>
))}
```

- **One animation.** `fade-up` everywhere. It was previously five (`fade-up`,
  `fade-down`, `fade-left`, `fade-right`, `zoom-in`) plus a typo'd `"fade-down "`
  whose trailing space AOS silently ignored, so that element never animated at all.
- **Three delays.** `STAGGER = [0, 100, 200]`, indexed by an item's position in
  its group and clamped at the end, so a long list does not accumulate lag. There
  were 21 distinct hand-typed delay values before.
- **One `AOS.init()`**, in `main.jsx`. It used to run inside a `useEffect` in 31
  separate components, all reconfiguring the same global singleton — and
  `Banner.jsx` passed a *different* duration and easing, so the app's animation
  timing depended on which component mounted last.

`Reveal` emits AOS attributes today. The indirection exists so that moving to
framer-motion's `whileInView` is a change to one file rather than a sweep across
every animated page.

---

## Booking and payment

The client deliberately has **no say** in what a user is charged or in whether a
booking is recorded:

- It sends a `packageName`, never a price. The server looks the amount up in its own
  price table.
- It does not write the booking. Stripe notifies the API over a signed webhook, and
  the API records the payment and books the slot.
- After the card is confirmed, the client polls briefly to see whether the webhook
  has landed. If it hasn't yet, the user is told the payment succeeded and the
  booking is *being confirmed* — never that it failed, because their card was
  charged.

The slot table shows seats taken against capacity, and a full slot renders as a
genuinely `disabled` button rather than a styled link, so it is unreachable by
keyboard as well as by click. Slots with no capacity recorded show `0/?` rather than
implying a known limit.

---

## Accessibility

- Every icon-only control has an accessible name — the theme toggle
  (`aria-pressed`), the profile menu and both hamburgers (`aria-expanded`).
- Loading states use `role="status"` with a visually hidden label, so a screen
  reader is told something is loading rather than encountering an unnamed spinner.
- Decorative logos and SVG flourishes are `aria-hidden`; content images have real
  `alt` text.
- Visible `focus-visible` rings on interactive controls.
- `prefers-reduced-motion` is honoured globally. Scroll animations start at
  `opacity: 0`, so the reduced-motion rules restore opacity as well as cancelling
  the animation — otherwise the page would be blank for the users who asked for
  less motion. The loader ring is the one deliberate exception: the blanket rule
  caps animations at one iteration, which would freeze it on its first frame, and
  a motionless ring beside the word "Loading" reads as a broken page. It keeps
  turning, at half speed.

> Not yet measured: a Lighthouse accessibility score, and a full keyboard-only pass
> of the booking flow. Those numbers are not claimed here until they are actually
> run.

---

## Performance

Images were the dominant cost of a page load and came from two independent places:

| | Before | After |
| --- | --- | --- |
| Bundled assets (`src/assets`) | 23.34 MB | 0.54 MB |
| imgbb-hosted images referenced by the database | 27.67 MB | 1.13 MB |

Both were converted to WebP and resized to the dimensions they are actually
rendered at — one testimonial avatar was 5760×3840 for a 56 px circle.

User uploads are compressed in the browser before they reach the image host
(`src/utils/compressImage.js`), capped at 1200 px for content images and 600 px for
avatars, so new uploads cannot recreate the problem. It preserves EXIF orientation
so portrait photos are not rotated, skips GIFs, and falls back to the original file
if re-encoding fails — compression can never block an upload.

---

## Setup

```bash
git clone https://github.com/Schr0Smi1ey/FitForge-Client-Side.git
cd FitForge-Client-Side
npm install
cp .env.example .env.local    # then fill in the values
npm run dev                   # http://localhost:5173
```

`.env.local` needs Firebase web-app config, an imgbb API key, and your Stripe
**publishable** key — see `.env.example` for the exact names. Vite inlines
`VITE_*` variables into the bundle, so treat all of them as public and never put a
secret key there.

The API must be running too, and its CORS allow-list must include
`http://localhost:5173` (it does by default). See the
[server README](https://github.com/Schr0Smi1ey/FitForge-Server-Side#setup) — note
that **bookings require a configured Stripe webhook**, or payments will succeed
while no booking is recorded.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (single run) |
| `npm run test:watch` | Vitest (watch) |

---

## Tests

```bash
npm test
```

22 tests covering the slot-fullness rules (including the off-by-one on the last
seat), the package price table against the server's canonical prices, and the
loading components' accessibility semantics.

CI runs lint → test → build on Node 20 and 22. The build step is load-bearing:
CI is case-sensitive where local Windows development is not, so it is what catches
a `utils` vs `Utils` import before it reaches production.

---

## Built with

React 19 · Vite 6 · Tailwind CSS · DaisyUI · TanStack Query · React Router 7 ·
Firebase Auth · Stripe · MUI X Charts · Framer Motion · AOS · SweetAlert2 ·
React Toastify · Swiper

---

Built by [Sarafat Karim](https://www.linkedin.com/in/sarafat-karim/)
