# بيت المسلمين · Bayt Al-Muslimin

A modern Arabic Islamic web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit**.

Features:
- 📖 **المصحف** — Read all 114 surahs of the Quran with tafseer (Al-Muyassar) on every ayah.
- 🎙️ **القراء** — Browse reciters alphabetically, search, switch between rewayat, and stream audio.
- 📜 **الأحاديث** — Browse nine major hadith collections (Bukhari, Muslim, Abu Dawud, …).
- 🕌 **مواقيت الصلاة** — Today's prayer times for 30 cities; choice persists in `localStorage`.
- ✨ Random ayah on the homepage.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| State | Redux Toolkit |
| Audio | react-h5-audio-player |
| Icons | react-icons |
| Fonts | next/font/google — Cairo (UI), Amiri (Quranic text) |

## Architecture

```
src/
├── app/                # routes + API handlers (App Router)
│   ├── api/            # server-side proxies to upstream APIs
│   ├── mushaf/         # /mushaf, /mushaf/[surahId]
│   ├── quraa/          # /quraa, /quraa/[qareeId]
│   ├── hadith/         # /hadith, /hadith/[category]
│   └── prayer-times/   # /prayer-times
├── components/         # feature + UI + layout components
├── store/              # Redux store, slices (audio, reciter, settings)
├── lib/                # api wrappers, constants, utils
└── types/              # shared TypeScript types
```

Every third-party API call is proxied through `src/app/api/*` so:
- API URLs live in env vars, never in client code
- Responses are cached server-side via Next's `revalidate`
- No CORS issues

## Environment

Copy `.env.example` to `.env.local` (already done locally):

```bash
ALQURAN_API_BASE=https://api.alquran.cloud/v1
QURANENC_API_BASE=https://quranenc.com/api/v1
MP3QURAN_API_BASE=https://mp3quran.net/api/v3
HADITH_API_BASE=https://hadis-api-id.vercel.app
ALADHAN_API_BASE=https://api.aladhan.com/v1

NEXT_PUBLIC_DEFAULT_CITY=cairo
NEXT_PUBLIC_DEFAULT_COUNTRY=egypt
NEXT_PUBLIC_PRAYER_METHOD=8
NEXT_PUBLIC_SITE_NAME=بيت المسلمين
```

## Scripts

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Routes

| URL | Purpose |
| --- | --- |
| `/` | Home (hero, feature cards, prayer times strip, random ayah) |
| `/mushaf` | List of all 114 surahs |
| `/mushaf/[surahId]` | Surah text — click any ayah for tafseer |
| `/quraa` | Reciter directory with search |
| `/quraa/[qareeId]` | Reciter detail + rewaya selector + playlist |
| `/hadith` | Hadith collections |
| `/hadith/[category]` | Hadith list per collection |
| `/prayer-times` | Today's prayer times + city selector |

## Responsive breakpoints

Mobile-first using Tailwind's three core breakpoints:

| Breakpoint | Width | Behavior |
| --- | --- | --- |
| Default | < 768px | Single column, bottom-sheet mobile menu, sticky audio |
| `md:` | ≥ 768px | Two-column grids, full top navbar |
| `lg:` | ≥ 1024px | Three+ column grids, labels in navbar |

## Credits

Built on top of free public Islamic-content APIs: alquran.cloud, quranenc.com, mp3quran.net, hadis-api-id, aladhan.com.
