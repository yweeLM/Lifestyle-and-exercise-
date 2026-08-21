# Her Strength Plan

A personal health and fitness site built around a 2-gym / 2-home strength
training week, a hormone-smart nutrition plan, and a progress tracker —
tailored for a 48-year-old woman with 5kg dumbbells, resistance bands, and a
bench at home, plus full gym access twice a week.

It's a static site (plain HTML/CSS/JS, no build step, no backend), so it
deploys in minutes on either GitHub Pages or Vercel.

## Features

- **Today tab** — set (or backdate) the date you started the plan, see your
  day count and streak, and check off today's exercises.
- **Weekly Plan tab** — the full Mon–Sun schedule (gym/home/recovery/rest),
  with sets & reps, a form cue, an illustration, and a link to a YouTube
  search for a proper-form tutorial for every exercise.
- **Nutrition tab** — the protein/carbs/fats/hydration guidance.
- **Key Habits tab** — sleep, stress, consistency, progressive overload.
- **Progress tab** — a monthly calendar heatmap of workout days plus a log
  history, current streak, and total workouts logged.

All tracking data (start date + completed exercises) is saved in the
browser's `localStorage` — nothing leaves your device, and there's no
sign-up. Using a different browser or device starts a separate log.

## Run it locally

No install needed — it's static files. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or just open `index.html` directly in a browser.

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repo.
2. Framework preset: **Other** (no build command, no output directory needed
   — it will serve the static files as-is).
3. Click **Deploy**. Vercel will give you a live URL in under a minute.

Any push to the connected branch will auto-redeploy.

## Deploy on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Pick this branch and the `/ (root)` folder, then save.
4. GitHub will publish the site at `https://<username>.github.io/<repo>/`.

## Editing the plan

- `data.js` — the weekly workout schedule, nutrition pillars, and key
  habits. Edit exercises, sets/reps, or days here.
- `icons.js` — the small SVG illustrations used as exercise demo images.
- `app.js` — app logic (tabs, tracking, localStorage).
- `styles.css` — visual styling (light/dark mode aware).

## Note

This is a personal tracking tool, not medical advice. Check with a doctor
before starting a new exercise or nutrition program, especially with
existing joint pain or other medical conditions.
