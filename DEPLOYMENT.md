# Deployment Guide — Odisha: The Soul of India

This project is built with **React Router v8**, **Vite**, **Tailwind CSS v4**, and **@agent-native/core**.

---

## 1. Local Run
- **Double-click:** `run.bat` (inside `Odisha` folder or `run_odisha.bat` from `ARHIA`)
- Runs database migrations and starts the development server.

---

## 2. Deploying to Vercel

The project is pre-configured with `vercel.json` and React Router static prerendering for zero-config Vercel deployment:

### Configuration Details
- **Build Command:** `pnpm run build`
- **Output Directory:** `build/client`
- **Clean URLs:** `true`
- **Single Page App Routing:** Rewrites `/(.*)` to `/index.html`

### Deploying via GitHub
1. Connect repository `https://github.com/shresthasrii/India_INC_OD.git` to Vercel.
2. Vercel automatically detects `vercel.json`:
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `build/client`
3. Click **Deploy**.

---

## 3. Environment Variables (Optional)
If deploying with a live backend / Postgres database:
- `AUTH_DISABLED`: `true` (to bypass user authentication)
- `DATABASE_URL`: Connection string to persistent Postgres (Neon, Supabase, etc.)
- `BETTER_AUTH_SECRET`: Random 32-character hex string (`openssl rand -hex 32`)
