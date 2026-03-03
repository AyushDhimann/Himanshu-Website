# 🏎️ Himanshu's Ultimate Garage

> *"If you can dream it, you can park it here."*

**🌐 Live at → [himanshudhiman.website](https://himanshudhiman.website)**

A dark, cinematic showcase of the world's most insane cars — built with the latest web tech so it's fast, beautiful, and actually impressive to show your friends.

---

## 🤙 What Even Is This?

This is a personal car showcase website. You scroll through a grid of hypercars, supercars, F1 machines, and luxury tanks. There's:

- **A custom cursor** that follows your mouse with a cool lagging ring
- **Variable-font magic** — hover over the title and watch the letters get lighter
- **3D card tilt** on every car card
- **Animated background** with floating colour orbs and a moving grid
- **Category filters** to sort by Supercars, Hypercars, SUVs, etc.
- **A visitor counter** so you can flex the traffic to your friends
- **Vercel Analytics** — see how many people are visiting in real time

And yes, the Eeco has infinite horsepower. Non-negotiable.

---

## ⚡ Tech Stack (what is all this stuff?)

| Tech | What it does |
|------|-------------|
| **Next.js 16** | The framework — handles routing, server rendering, and builds |
| **React 19** | The UI library — components, hooks, all that |
| **TypeScript** | JavaScript but smarter — catches bugs before you even run the code |
| **Tailwind CSS v4** | Utility CSS classes right in your JSX — no more writing CSS files for everything |
| **Vercel** | Hosting + Analytics + Speed Insights — all in one dashboard |

### Why App Router? (not Pages Router)

App Router is the *new* way Next.js works. Your files in `/app` become routes automatically. Server Components (most of the page) run on the server and ship **zero JavaScript** to the browser — which means your site loads faster. Only the interactive bits (cursor, filters, cards) ship JS.

### Why TypeScript?

Because guessing sucks. TypeScript tells you *exactly* what properties an object has. If you try to access `car.horsepwer` (note the typo), TypeScript yells at you before the app even starts. Once you get used to it, you'll never go back.

---

## 🚀 Running It Locally

**Prerequisites:** Node.js 18+ installed

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server on port 6217
npm run dev
```

Then open **http://localhost:6217** in your browser. Or just hit `F5` in VS Code — it starts the server *and* opens the browser automatically.

> **Other commands:**
> ```bash
> npm run build   # Build for production
> npm run start   # Run the production build locally
> npm run lint    # Check for code problems
> ```

---

## 🏠 Project Structure

```
himanshu/
│
├── app/                    ← Next.js App Router
│   ├── layout.tsx          ← Root HTML shell (fonts, metadata, analytics)
│   ├── page.tsx            ← Home page (Server Component)
│   └── globals.css         ← Tailwind + custom animations
│
├── components/             ← Reusable UI pieces
│   ├── Preloader.tsx       ← Loading screen (fades after 3.5s)
│   ├── CustomCursor.tsx    ← The pink dot + ring cursor
│   ├── Hero.tsx            ← Full-screen title section
│   ├── GarageSection.tsx   ← Owns filter state (wraps Nav + GarageGrid)
│   ├── Nav.tsx             ← Category filter pill bar
│   ├── GarageGrid.tsx      ← The car card grid
│   ├── CarCard.tsx         ← Individual car card with 3D tilt
│   └── Footer.tsx          ← Visitor counter footer
│
├── data/
│   └── cars.json           ← ← ← ADD CARS HERE
│
├── public/
│   └── images/             ← Car images (served at /images/filename.jpg)
│
├── types/
│   └── index.ts            ← TypeScript types (Car, Filter, etc.)
│
├── vercel.json             ← Vercel deployment + cache + security headers
└── tsconfig.json           ← TypeScript config
```

---

## 🚗 Adding Your Own Cars

Open `data/cars.json` and add a new entry to the `cars` array. Here's the template:

```json
{
  "name": "Your Car Name",
  "category": "supercar",
  "image": "/images/your-image.jpg",
  "alt": "Description of what's in the image",
  "description": "A sentence or two about the car.",
  "specs": {
    "horsepower": "500 hp",
    "topSpeed": "200 mph / 322 km/h"
  }
}
```

**Category must be one of:**
- `"supercar"` — Lambos, Ferraris, etc.
- `"hypercar"` — Bugattis, Pagani, track monsters
- `"suv-luxury"` — Rolls, Hummers, Range Rovers
- `"concept-racing"` — F1 cars, concepts, prototypes

**For the image:**
1. Drop the image into the `public/images/` folder
2. Reference it as `"/images/your-filename.jpg"` in the JSON
3. Or just paste a URL from the internet (like `"https://..."`)

> **Tip:** Use WebP format for images — they're ~30% smaller than JPG and look identical.

---

## 📊 Analytics & Monitoring

The site uses two Vercel tools to track performance. Both are already wired up in `app/layout.tsx` — you just need to enable them in your dashboard.

### Vercel Analytics (visitor tracking)
Go to **[vercel.com](https://vercel.com) → your project → Analytics tab → Enable**

You'll see:
- Page views and unique visitors
- Which countries people are visiting from
- Which devices/browsers they're using
- Realtime visitor count right now

### Vercel Speed Insights (performance)
Go to **[vercel.com](https://vercel.com) → your project → Speed Insights tab → Enable**

You'll see [Core Web Vitals](https://web.dev/vitals/) measured from REAL users:
| Metric | What it means |
|--------|---------------|
| **LCP** | How fast the main content loads |
| **FID** | How quickly the page responds to clicks |
| **CLS** | Whether things jump around as the page loads |
| **FCP** | When the first thing appears on screen |
| **TTFB** | How fast your server responds |

> Both tools only collect data on the live Vercel deployment — they're completely silent when running locally.

---

## 🌍 Deploying to Vercel

The site is live at **[himanshudhiman.website](https://himanshudhiman.website)** — already deployed!

Every time you push to `main`, Vercel automatically rebuilds and redeploys. Zero manual steps.

### Setting up from scratch (if you fork this):
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub
3. Click **"Add New Project"** → select this repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Live at `yourproject.vercel.app` in ~60 seconds
6. Add your custom domain in **Project Settings → Domains**

---

## 🛠️ VS Code Play Button

Press **F5** (or click the play button in the Run & Debug panel) to:
1. Auto-start `npm run dev` in the background
2. Wait for Next.js to be ready
3. Open `http://localhost:6217` in Microsoft Edge automatically

If you prefer Chrome, open `.vscode/launch.json` and change `"msedge"` to `"chrome"`.

---

## 💡 Things To Try / Ideas

- [ ] Add a **search bar** to filter by car name
- [ ] Add a **"favourite" button** that saves cars to localStorage
- [ ] Make a **detail page** for each car at `/cars/[name]`
- [ ] Add **more cars** — this is YOUR garage after all
- [ ] Use **`next/image`** instead of `<img>` for automatic WebP conversion
- [ ] Add a **"Share" button** that copies the URL for a specific car

---

## 📄 License

Do whatever you want with this. It's your project. Show it off.

---

## 📬 Contact

Got questions, collabs, or just want to talk cars?

**✉️ [contact@himanshudhiman.website](mailto:contact@himanshudhiman.website)**

---

*Built by Himanshu. Live at [himanshudhiman.website](https://himanshudhiman.website).*
