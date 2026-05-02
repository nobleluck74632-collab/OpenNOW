# OpenNOW Website

A high-quality landing page and functional web-based version of the OpenNOW application.

## Project Structure

```
website/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx    # Marketing landing page
│   │   └── WebAppWrapper.tsx  # Wrapper for the web app
│   ├── lib/
│   │   └── web-api.ts        # Web-compatible implementation of OpenNowApi
│   ├── styles/
│   │   ├── landing.css       # Landing page styles
│   │   └── app.css           # Symlink to opennow-stable renderer styles
│   ├── main.tsx              # Landing page entry point
│   └── webapp.tsx            # Web app entry point
├── public/
│   └── logo.png             # OpenNOW logo
├── index.html               # Landing page HTML
├── webapp.html             # Web app HTML
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features

### Landing Page (`/`)
- Modern, responsive hero section with animated particles
- Feature showcase with 8 key features
- Games showcase grid
- Architecture/tech stack section
- CTA and download sections
- Dark theme with NVIDIA green accent colors

### Web App (`/app`)
- Full implementation of the OpenNOW UI using the Electron renderer's React components
- Web-compatible IPC API polyfill that mocks:
  - Authentication (demo mode)
  - Games catalog (mock data)
  - Settings persistence (localStorage)
  - Session management (demo mode)
  - Signaling (mock WebRTC signaling)
  - Media operations (localStorage-based screenshots/recordings)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Web API Polyfill (`src/lib/web-api.ts`)

The web API provides a full implementation of the `OpenNowApi` interface that works in a browser environment:

- **Authentication**: Mock login with demo user session
- **Games**: Returns mock game data simulating the GFN catalog
- **Settings**: Stored in localStorage, persisted across sessions
- **Signaling**: Mock WebSocket client for UI demonstration
- **Media**: Screenshots and recordings stored as localStorage data URLs

### Reusing Renderer Code

The web app imports components directly from `opennow-stable/src/renderer/src/`:
- `App.tsx` - Main application component
- Individual UI components as needed
- Shared utilities and hooks

This is achieved through Vite path aliases configured in `vite.config.ts`.

## Limitations

The web version is designed as a **high-fidelity interactive demo** because:

1. **Authentication**: Real NVIDIA OAuth flow requires desktop app capabilities
2. **Signaling**: Real WebRTC streaming requires GPU access and proprietary codecs
3. **File System**: Screenshots/recordings use localStorage (limited capacity)
4. **Network**: GFN API calls require CORS-enabled backend proxy

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type checking |

## Tech Stack

- **Vite 7** - Build tooling
- **React 19** - UI framework
- **TypeScript 6** - Type safety
- **React Router 7** - Client-side routing
- **lucide-react** - Icons
