# Images to PDF

Combine multiple images into a single PDF document — 100% client-side, no uploads, no servers.

## Features

- 🖼️ **Drag & drop** multiple images (PNG, JPEG, WebP)
- 🔀 **Reorder images** via drag-and-drop before conversion
- ☑️ **Select/deselect** individual images
- 📄 **Page formats**: A4, Letter, or Fit-to-image
- 🔄 **Orientation**: Portrait or Landscape
- 📐 **Adjustable margins** in millimeters
- 🎨 **Quality control**: High / Medium / Low (JPEG re-compression)
- 📥 **Single PDF download** via pdf-lib
- 🌐 **7 languages**: EN, FR, DE, ES, PT, NL, IT
- 🔒 **Privacy-first**: everything runs in your browser, nothing is uploaded

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool
- [pdf-lib](https://pdf-lib.js.org/) — PDF creation
- [Vitest](https://vitest.dev/) — unit tests

## Development

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run test     # unit tests
```

## Privacy

No data leaves your browser. Images are processed entirely client-side. No analytics, no tracking, no server-side processing.
