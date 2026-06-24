# Job Application Record Pad (Redux)

A React.js refactor of [jihopark6/job-application-record-pad](https://github.com/jihopark6/job-application-record-pad/tree/develop).

All data is stored locally in the browser (`localStorage`) — no backend or account required.

---

## Tech Stack

| Layer | Library | Purpose |
|---|---|---|
| UI | React 19 | Component rendering |
| Routing & Data | React Router v6.4+ | Loaders, actions, navigation, error boundaries |
| Global State | Redux Toolkit + React Redux | Search query shared across layout and list page |
| Build | Vite | Dev server and bundling |

---

## Features

- **Add & manage applications** — log company name, job title, application date, contact info, and job posting URL
- **Track status** — mark each application as Applied, Interviewing, Offer, or Rejected
- **Live search** — filter the application list by company name or job title; state persists across navigation
- **Memos** — attach free-form notes to any application (follow-up reminders, interview prep, impressions)
- **Company autocomplete** — debounced suggestion dropdown backed by an external API
- **Offline-ready** — works without an internet connection once loaded

---

## Pages & Routes

| Path | Page | Loader | Action |
|---|---|---|---|
| `/` | Application List | `rootLoader` (all applications) | — |
| `/new` | New Application | — | `newApplicationAction` |
| `/applications/:id` | Application Detail / Edit | `applicationDetailLoader` (deferred memos) | `editApplicationAction` |
| `/memo` | Memos | `memoLoader` (all memos) | `memoAction` |

---

## Data Flow

```
localStorage
    └── src/data/           ← single source of truth for all reads and writes
          ├── applications.js
          ├── memos.js
          └── api.js (external)

src/data/ ← called by → src/loaders/   ← React Router calls before rendering
                          └── data available via useLoaderData() or useRouteLoaderData('root')

src/data/ ← called by → src/actions/   ← React Router calls on <Form> submit
                          └── returns redirect() → triggers loader revalidation → UI updates
```

No page component reads `localStorage` directly. No component manages a `useEffect` data-loading cycle. All reads flow through loaders; all writes flow through actions.


