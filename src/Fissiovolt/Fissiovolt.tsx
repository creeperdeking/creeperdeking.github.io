import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./fissiovolt.css";

const SECTIONS = [
  { id: "technology", label: "Technology" },
  { id: "mission", label: "Mission" },
  { id: "team", label: "Team" },
] as const;

function postToFilm(frame: HTMLIFrameElement | null, cmd: string) {
  frame?.contentWindow?.postMessage({ type: "rhs", cmd }, "*");
}

const Fissiovolt: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const techRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const syncFilmRef = useRef<() => void>(() => {});

  useEffect(() => {
    const body = document.body;
    const previousMargin = body.style.margin;
    const previousBackground = body.style.background;
    body.style.margin = "0";
    body.style.background = "#07090e";
    return () => {
      body.style.margin = previousMargin;
      body.style.background = previousBackground;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 720px)");
    const closeIfWide = () => {
      if (wide.matches) setMenuOpen(false);
    };
    closeIfWide();
    wide.addEventListener("change", closeIfWide);
    return () => wide.removeEventListener("change", closeIfWide);
  }, []);

  useEffect(() => {
    const section = techRef.current;
    const frame = frameRef.current;
    const veil = veilRef.current;
    if (!section || !frame || !veil) return;

    let frameId = 0;
    let filmPlaying = false;
    const sync = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(scrollable, 0));
      const raw = scrollable > 0 ? scrolled / scrollable : 0;
      const fade = raw <= 0.28 ? 0 : Math.min(1, (raw - 0.28) / 0.55);
      veil.style.opacity = String(1 - fade);

      const onStage = rect.bottom > 80 && rect.top < window.innerHeight - 80;
      const wantPlay = onStage && fade > 0.82;
      if (wantPlay !== filmPlaying) {
        filmPlaying = wantPlay;
        postToFilm(frame, wantPlay ? "play" : "pause");
      }
    };
    syncFilmRef.current = () => {
      filmPlaying = false;
      sync();
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(sync);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow) return;
      if (event.data?.type === "rhs" && event.data.cmd === "ready") {
        postToFilm(frame, "restart");
        filmPlaying = false;
        sync();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("message", onMessage);
    onScroll();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="fv">
      <Helmet>
        <title>Fissiovolt</title>
        <meta
          name="description"
          content="Fissiovolt’s breakthrough: a practical way to use photovoltaic to make nuclear electricity."
        />
        <meta name="theme-color" content="#07090e" />
        <link rel="icon" type="image/png" href="/fissiovolt/logo-mark.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,500..800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <header className="fv-header">
        <a className="fv-logo" href="#technology" aria-label="Fissiovolt">
          <img src="/fissiovolt/logo-horizontal.png" alt="Fissiovolt" />
        </a>
        <nav className="fv-header-nav" aria-label="Sections">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="fv-menu-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="fissiovolt-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <nav id="fissiovolt-menu" className="fv-nav" aria-label="Sections">
          <button type="button" className="fv-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ×
          </button>
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
              {section.label}
            </a>
          ))}
        </nav>
      )}

      <section id="technology" className="fv-tech" ref={techRef}>
        <div className="fv-tech-sticky">
          <iframe
            ref={frameRef}
            className="fv-stage"
            src="/fissiovolt/rotary-heat-shuttle.html?embed=1"
            title="Rotary Heat Shuttle"
            onLoad={() => {
              postToFilm(frameRef.current, "restart");
              syncFilmRef.current();
            }}
          />
          <div className="fv-veil" ref={veilRef}>
            <p className="fv-kicker">Technology</p>
            <h1 className="fv-hero-title">
              Fissiovolt’s breakthrough: A practical way to use photovoltaic to make nuclear electricity
            </h1>
            <p className="fv-scroll">Scroll</p>
          </div>
        </div>
      </section>

      <section id="mission" className="fv-section fv-mission">
        <p className="fv-kicker">Mission</p>
        <h2>Nuclear can be cheap, let’s make it so!</h2>
        <p>
          Fissiovolt’s mission is to deliver cheap electricity from nuclear fission, by radically reducing plant
          complexity and size. No boiling water! No turbine! We leverage the latest improvements in photovoltaic
          technology in service of the atom.
        </p>
      </section>

      <section id="team" className="fv-section">
        <h2>Team</h2>
        <div className="fv-person">
          <img src="/fissiovolt/alexis-gros.jpg" alt="Alexis Gros" />
          <strong>Alexis Gros</strong>
          <span>Founder</span>
        </div>
      </section>

      <footer className="fv-footer">
        <img src="/fissiovolt/logo-mark.png" alt="" />
        <span>Fissiovolt</span>
      </footer>
    </div>
  );
};

export default Fissiovolt;
