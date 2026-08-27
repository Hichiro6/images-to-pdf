# Images to PDF

> Combine multiple images into a single PDF document — 100% client-side, privacy-first

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![Tests](https://img.shields.io/badge/Tests-Playwright%20%7C%20Vitest-blue)

**Your files never leave your browser — no uploads, no servers, no tracking**

</div>

---

## 🔒 Privacy-First Design

Need to send photos as a single PDF? Create a scanned document from camera shots? Compile images into a printable format?

Images to PDF does it **locally in your browser** using [pdf-lib](https://pdf-lib.js.org/). Your images stay on your device — nothing is uploaded to any server.

---

## ⚡ Key Features

- **🖼️ Drag & Drop** — Upload multiple images (PNG, JPEG, WebP)
- **🔀 Reorder Images** — Drag-and-drop to rearrange before conversion
- **☑️ Select / Deselect** — Toggle individual images in the output
- **📄 Page Formats** — A4, Letter, or Fit-to-image
- **🔄 Orientation** — Portrait or Landscape
- **📐 Adjustable Margins** — Set margins in millimeters
- **🎨 Quality Control** — High / Medium / Low (JPEG re-compression level)
- **📥 Single PDF Download** — One consolidated PDF via pdf-lib
- **🌐 7 Languages** — EN, FR, DE, ES, PT, NL, IT
- **🔒 Privacy-First** — Everything runs in your browser, nothing is uploaded

---

## 🚀 Quick Start

```bash
git clone https://github.com/Hichiro6/images-to-pdf.git
cd images-to-pdf

npm install
npm run dev
```

---

## 📖 Usage Guide

### Step 1: Upload Your Images
Drag and drop image files (PNG, JPEG, WebP) onto the dropzone, or click to browse.

### Step 2: Arrange & Configure
- **Reorder** images via drag-and-drop
- **Select/deselect** individual images
- **Choose page format** (A4, Letter, or Fit-to-image)
- **Set orientation** (Portrait or Landscape)
- **Adjust margins** in millimeters
- **Pick quality level** (High, Medium, Low)

### Step 3: Convert & Download
Click **Convert** to generate the PDF, then **Download** to save it.

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server |
| **[pdf-lib](https://pdf-lib.js.org/)** | PDF creation |
| **[Biome](https://biomejs.dev/)** | Linting & formatting |
| **[Vitest](https://vitest.dev/)** | Unit testing |
| **[Playwright](https://playwright.dev/)** | E2E testing |

---

## 🧪 Testing

```bash
npm run test:run       # Unit tests
npm run test:e2e       # Playwright E2E suite (upload, reorder, export, i18n, a11y)
npm run test:ui        # Interactive mode
```

---

## 📂 Project Structure

```
images-to-pdf/
├── src/
│   ├── main.js           # Application logic
│   └── i18n.js           # Internationalization
├── styles/
│   └── main.css          # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   └── favicon.svg
├── tests/
│   ├── unit/             # Unit tests
│   └── e2e/              # Playwright E2E tests + fixtures
├── vite.config.js        # Vite configuration
├── playwright.config.js  # Playwright configuration
└── biome.json            # Biome linting rules
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm run test:run` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

---

## 📝 Use Cases

- **Receipts & invoices** — Photograph and compile into a single PDF for expense reports
- **School assignments** — Convert handwritten notes/photos into a submitable PDF
- **Photo albums** — Create a printable album from image collections
- **ID documents** — Combine front/back photos of an ID into one PDF page
- **Archive** — Bundle images for email without attaching dozens of files

---

## 🔐 Security & Privacy

- ✅ **No network calls** — All processing is local
- ✅ **No analytics** — No tracking or telemetry
- ✅ **No cookies** — Nothing stored externally
- ✅ **Open source** — Code is auditable
- ✅ **Client-side only** — No backend requirements

---

## 📄 License

Copyright © 2026 Hichiro6

Licensed under **CC BY-NC-ND 4.0** — Non-commercial use with attribution, no derivative works.

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Report Bug](https://github.com/Hichiro6/images-to-pdf/issues) · [Request Feature](https://github.com/Hichiro6/images-to-pdf/issues)

</div>
