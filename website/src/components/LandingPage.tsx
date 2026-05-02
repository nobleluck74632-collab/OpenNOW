import React from "react";
import { Link } from "react-router-dom";
import {
  Gamepad2,
  Zap,
  Monitor,
  Settings,
  Shield,
  Cloud,
  Clock,
  Users,
  Download,
  Code,
  ChevronRight,
  Play,
  Sparkles,
  Rocket,
  Layers,
} from "lucide-react";

export function LandingPage(): React.JSX.Element {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="OpenNOW" />
            <span className="nav-logo-text">OpenNOW</span>
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#games" className="nav-link">Games</a>
            <a href="#architecture" className="nav-link">Architecture</a>
            <a href="https://github.com/OpenCloudGaming/OpenNOW" target="_blank" rel="noopener noreferrer" className="nav-link">
              <Code size={18} style={{ marginRight: "0.5rem" }} />
              GitHub
            </a>
            <Link to="/app" className="nav-cta">
              Try Web App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Now Open Source</span>
          </div>
          <h1 className="hero-title">
            Play PC Games<br />
            <span>From the Cloud</span>
          </h1>
          <p className="hero-subtitle">
            OpenNOW is an open-source GeForce NOW client that brings cloud gaming to any device.
            No restrictions, no subscriptions required for the client—just stream your favorite games
            with ultra-low latency.
          </p>
          <div className="hero-actions">
            <a href="https://github.com/OpenCloudGaming/OpenNOW/releases" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary">
              <Download size={20} />
              Download Now
            </a>
            <Link to="/app" className="hero-btn hero-btn-secondary">
              <Play size={20} />
              Try Web Version
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">1000+</div>
              <div className="hero-stat-label">Games Available</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4K</div>
              <div className="hero-stat-label">Resolution Support</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">240</div>
              <div className="hero-stat-label">FPS Gaming</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">0ms</div>
              <div className="hero-stat-label">Extra Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Everything You Need for Cloud Gaming</h2>
            <p className="section-subtitle">
              Built with cutting-edge technology to deliver the best cloud gaming experience.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={28} />
              </div>
              <h3 className="feature-title">Ultra-Low Latency</h3>
              <p className="feature-description">
                WebRTC-based streaming with custom optimization for minimal input lag.
                Experience near-native responsiveness from the cloud.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Monitor size={28} />
              </div>
              <h3 className="feature-title">4K / 240 FPS</h3>
              <p className="feature-description">
                Support for resolutions up to 4K and frame rates up to 240 FPS.
                Choose from multiple codecs including H.264, H.265, and AV1.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Gamepad2 size={28} />
              </div>
              <h3 className="feature-title">Full Controller Support</h3>
              <p className="feature-description">
                Native gamepad support for up to 4 controllers. Play with your favorite
                gamepads using both desktop and PS/Xbox-style layouts.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Cloud size={28} />
              </div>
              <h3 className="feature-title">Multi-Account Support</h3>
              <p className="feature-description">
                Easily manage multiple gaming accounts. Switch between accounts,
                save sessions, and keep your library organized.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Settings size={28} />
              </div>
              <h3 className="feature-title">Fully Configurable</h3>
              <p className="feature-description">
                Customize video quality, mouse sensitivity, keyboard layouts, and more.
                Fine-tune every aspect of your streaming experience.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={28} />
              </div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-description">
                Zero telemetry by design. All settings are stored locally.
                Your gaming data stays on your device.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={28} />
              </div>
              <h3 className="feature-title">Session Recording</h3>
              <p className="feature-description">
                Record your gameplay directly from the stream. Capture screenshots
                and video clips with a single keystroke.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <h3 className="feature-title">Cross-Platform</h3>
              <p className="feature-description">
                Available on Windows, macOS, and Linux. Plus a web version
                for gaming directly in your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Showcase */}
      <section id="games" className="games">
        <div className="games-container">
          <div className="section-header">
            <span className="section-label">Games</span>
            <h2 className="section-title">Play Your Favorites</h2>
            <p className="section-subtitle">
              Access over 1000 games from top publishers including Steam, Epic, GOG, and more.
            </p>
          </div>
          <div className="games-grid">
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">Cyberpunk 2077</h3>
                <p className="game-card-meta">CD Projekt Red • RPG</p>
              </div>
              <span className="game-card-tier">Ultimate</span>
            </div>
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">Elden Ring</h3>
                <p className="game-card-meta">FromSoftware • Action RPG</p>
              </div>
              <span className="game-card-tier">Ultimate</span>
            </div>
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">Fortnite</h3>
                <p className="game-card-meta">Epic Games • Battle Royale</p>
              </div>
              <span className="game-card-tier">Free</span>
            </div>
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #3d5a80 0%, #1d3557 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">Minecraft</h3>
                <p className="game-card-meta">Mojang • Sandbox</p>
              </div>
              <span className="game-card-tier">Free</span>
            </div>
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #4a1c40 0%, #2d1b4e 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">Baldur's Gate 3</h3>
                <p className="game-card-meta">Larian Studios • CRPG</p>
              </div>
              <span className="game-card-tier">Ultimate</span>
            </div>
            <div className="game-card">
              <div className="game-card-image" style={{ background: "linear-gradient(135deg, #1a4d2e 0%, #0d2818 100%)" }} />
              <div className="game-card-overlay">
                <h3 className="game-card-title">The Witcher 3</h3>
                <p className="game-card-meta">CD Projekt Red • RPG</p>
              </div>
              <span className="game-card-tier">Ultimate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="architecture">
        <div className="architecture-container">
          <div className="section-header">
            <span className="section-label">Architecture</span>
            <h2 className="section-title">Modern Tech Stack</h2>
            <p className="section-subtitle">
              Built with Electron, React, and TypeScript for a native-quality experience.
            </p>
          </div>
          <div className="architecture-grid">
            <div className="architecture-item">
              <div className="architecture-icon">
                <Rocket size={32} />
              </div>
              <h3 className="architecture-title">Electron 41+</h3>
              <p className="architecture-description">
                Multi-process architecture for robust and stable performance across all platforms.
              </p>
            </div>
            <div className="architecture-item">
              <div className="architecture-icon">
                <Sparkles size={32} />
              </div>
              <h3 className="architecture-title">React 19</h3>
              <p className="architecture-description">
                Modern UI framework with TypeScript 6 for type-safe, maintainable code.
              </p>
            </div>
            <div className="architecture-item">
              <div className="architecture-icon">
                <Layers size={32} />
              </div>
              <h3 className="architecture-title">WebRTC</h3>
              <p className="architecture-description">
                Real-time WebSocket signaling and peer-to-peer streaming for minimal latency.
              </p>
            </div>
            <div className="architecture-item">
              <div className="architecture-icon">
                <Zap size={32} />
              </div>
              <h3 className="architecture-title">Vite 7</h3>
              <p className="architecture-description">
                Lightning-fast build tooling with HMR for quick development iterations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Play?</h2>
          <p className="cta-subtitle">
            Download OpenNOW today or try the web version directly in your browser.
          </p>
          <div className="cta-buttons">
            <a href="https://github.com/OpenCloudGaming/OpenNOW/releases" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary">
              <Download size={20} />
              Download Desktop App
              <ChevronRight size={20} />
            </a>
            <Link to="/app" className="hero-btn hero-btn-secondary">
              <Play size={20} />
              Launch Web App
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/logo.png" alt="OpenNOW" />
            <span className="footer-logo-text">OpenNOW</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/OpenCloudGaming/OpenNOW" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://github.com/OpenCloudGaming/OpenNOW/releases" target="_blank" rel="noopener noreferrer" className="footer-link">Releases</a>
            <a href="https://github.com/OpenCloudGaming/OpenNOW/issues" target="_blank" rel="noopener noreferrer" className="footer-link">Issues</a>
            <a href="https://github.com/OpenCloudGaming/OpenNOW/discussions" target="_blank" rel="noopener noreferrer" className="footer-link">Discussions</a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} OpenCloudGaming. Open source under MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
}
