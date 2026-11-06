# Juicy

A modern interactive juice product showcase built with Next.js 15. A 3D wheel of juice cans turns with the mouse wheel, arrow keys or buttons, and the page takes on the colours of the flavour in front.

## Features

- **3D can carousel**: four juice cans on a wheel, built with React Three Fiber and Three.js.
- **Theme per flavour**: background, glow and buttons change with the selected juice.
- **Floating fruits**: fruit images that follow the selected flavour.
- **Ice cubes and leaves**: decorative elements around the scene.
- **Water ripple**: the background ripples under the pointer.
- **Responsive**: a separate layout for phones.

The flavours are Lemon Ginger, Blueberry Açai, Mango Burst and Raspberry Rosé.

The sign-in form and the cart panel are demo UI. The form validates its fields, but there is no back-end.

## Requirements

Pick one:

- **Docker**, nothing else.
- **Node.js 22 or newer** and **Yarn 4**. Yarn comes with Node through Corepack: run `corepack enable` once if the `yarn` command is missing. The exact Yarn version is pinned in `package.json`.

The site reads no environment variables, so there is no `.env` file to create. Every file it loads ships in this folder, including the 3D models and the lighting, so it needs no outside service to run.

## Path A: run it with Docker

From this folder:

```bash
docker build -t juicy .
docker run -p 3000:3000 juicy
```

Open http://localhost:3000. Press `Ctrl+C` in the terminal to stop it.

## Path B: run it without Docker

From this folder:

```bash
yarn install
yarn dev
```

Open http://localhost:3000. The development server reloads the page when you change a file.

For a normal production build (static export into `out/`):

```bash
yarn build
```

For GitHub Pages on this repo ([SonoJS/sonojs-hero-02](https://github.com/SonoJS/sonojs-hero-02)):

```bash
# Windows PowerShell
$env:BASE_PATH="/sonojs-hero-02"; $env:NEXT_PUBLIC_BASE_PATH="/sonojs-hero-02"; npm run build
```

```bash
# macOS / Linux
BASE_PATH=/sonojs-hero-02 NEXT_PUBLIC_BASE_PATH=/sonojs-hero-02 npm run build
```

The static site is in `out/` (includes images, 3D models, HDRI, and `.nojekyll`).

### Deploy to GitHub Pages

1. Push to `main` on [SonoJS/sonojs-hero-02](https://github.com/SonoJS/sonojs-hero-02).
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) builds and deploys `out/`.
4. Live URL: https://sonojs.github.io/sonojs-hero-02/

Docker still uses a Node server when built with `BUILD_STANDALONE=true` (see `Dockerfile`).

## A port is already in use?

Another program is using port 3000. Stop it, or use another port:

- With Docker, change the left number only: `docker run -p 3041:3000 juicy`, then open http://localhost:3041.
- Without Docker: `yarn dev -p 3041` (or `yarn start -p 3041`), then open http://localhost:3041.

## Make it yours

| What | Where |
| --- | --- |
| Text / SEO copy | `src/content/copy.ts` |
| Flavours (the 3D cans) | `src/features/carousel/constants/juiceCans.ts`, models in `public/assets/3d/can/` |
| Colours of each flavour | `src/features/product-showcase/constants/themes.ts`. While the page runs, `useBodyBackground` paints the page background in the active flavour's `mainBgColor`. |
| Lighting on the cans | `public/assets/hdri/forest_slope_1k.hdr`, set in `src/features/carousel/constants/environment.ts`. It is Poly Haven's Forest Slope HDRI (CC0). |
| Fruit images | `public/assets/images/fruit/`, listed in `src/features/floating-fruits/constants/fruitImages.ts` |
| Ice cubes, leaves, water drop | `public/assets/images/ice/`, `public/assets/images/leaf/`, `public/assets/images/drop.png` |
| Cart sample items | `src/features/navigation/constants/sampleCartItems.ts`, images in `public/assets/images/can/` |
| Bottle sizes | `src/features/product-showcase/constants/sizes.ts` |
| Contact links | `src/features/product-showcase/constants/contactLinks.ts` |
| Menu items | `src/features/navigation/constants/navItems.ts` |
| Fonts | `src/app/layout.tsx` loads Anton (wordmark) and DM Sans (body), both free Google Fonts. |
| Favicon | `src/app/favicon.ico` |

The wheel holds four cans, one per quarter turn (`src/features/carousel/constants/positionConfigs.ts`). To replace a flavour, rename its id in `src/types/juice.ts`, then update its entry in `juiceCans.ts`, `themes.ts`, `fruitImages.ts`, `sampleCartItems.ts` (if it is in the cart), and under `juices` / `cart.items` in `src/content/copy.ts`. `yarn typecheck` lists any code file you missed.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Development server on port 3000 |
| `yarn build` | Production build |
| `yarn start` | Serve the production build on port 3000 |
| `yarn lint` | ESLint |
| `yarn typecheck` | TypeScript check (`tsc --noEmit`) |

Dependencies are pinned to exact versions, and lockfiles are included, so install gives you the same versions this was tested with.

## Project structure

```
public/assets/              # 3D can models and images
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx          # root layout (lang=en)
│   └── page.tsx            # landing page
├── components/             # shared UI: backgrounds, spinner, ui/
├── content/
│   └── copy.ts             # English UI strings
├── features/
│   ├── carousel/           # 3D juice wheel
│   ├── floating-fruits/    # animated fruit images
│   ├── ice-cubes/          # ice cube and leaf decorations
│   ├── landing/            # page state + water stage
│   ├── navigation/         # nav bar, cart and account dropdowns
│   └── product-showcase/   # product text, sizes, themes, contact
├── hooks/                  # shared hooks
├── lib/
│   └── format.ts           # currency formatting
└── types/                  # shared types
```

## Tech stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, React Three Fiber with Three.js and Drei, GSAP, React Hook Form with Zod, react-water-wave.

## Licence

The licence terms are in `LICENSE.md`, at the top of your downloaded folder.
