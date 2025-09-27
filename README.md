# README.md
## Dev
npm i
npm run dev

## Build
npm run build
npm run preview

## Deploy (GitHub Pages)
- Set repo Settings → Pages → Source: GitHub Actions.
- Ensure `vite.config.js` base matches `/repo-name/` and push to `main`.

## Deploy (Vercel/Netlify)
Use framework = Vite, build = `npm run build`, output = `dist/`.
