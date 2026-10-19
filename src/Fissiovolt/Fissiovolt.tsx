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
  const [stageReady, setStageReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
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
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;

    let filmPlaying = false;
    let parked = false;
    let parkTimer = 0;
    const sync = () => {
      const rect = stage.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const wantPlay = visible > window.innerHeight * 0.6;
      if (wantPlay === filmPlaying) return;
      filmPlaying = wantPlay;
      if (wantPlay) {
        postToFilm(frame, "restart");
        postToFilm(frame, "play");
      } else {
        postToFilm(frame, "pause");
      }
    };
    syncFilmRef.current = () => {
      filmPlaying = false;
      sync();
    };

    const park = () => {
      if (parked) return;
      parked = true;
      postToFilm(frame, "suspend");
    };
    const unpark = () => {
      if (!parked) return;
      parked = false;
      sync();
      postToFilm(frame, "resume");
    };
    const onScroll = () => {
      park();
      if ("onscrollend" in window) return;
      window.clearTimeout(parkTimer);
      parkTimer = window.setTimeout(unpark, 120);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow) return;
      if (event.data?.type === "rhs" && event.data.cmd === "ready") {
        setStageReady(true);
        postToFilm(frame, "restart");
        filmPlaying = false;
        sync();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if ("onscrollend" in window) window.addEventListener("scrollend", unpark);
    window.addEventListener("resize", sync);
    window.addEventListener("message", onMessage);
    sync();

    return () => {
      window.clearTimeout(parkTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", unpark);
      window.removeEventListener("resize", sync);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let locked = false;
    let armed = true;
    let settleTimer = 0;

    const stageTop = () => stage.getBoundingClientRect().top + window.scrollY;
    const enterDistance = () => window.innerHeight * 0.28;
    const nudgeDistance = () => Math.min(48, window.innerHeight * 0.07);

    const decide = () => {
      const distance = window.scrollY - stageTop();
      const abs = Math.abs(distance);
      const enter = enterDistance();

      if (abs > enter) {
        locked = false;
        armed = true;
        return;
      }
      if (abs <= 2) {
        locked = true;
        return;
      }
      // A scroll already past a slight nudge keeps its place, so slow
      // trackpad swipes accumulate instead of being rewound on each pause.
      if (locked && abs >= nudgeDistance()) return;

      const arriving = !locked && armed;
      const nudged = locked && abs < nudgeDistance();
      if (!arriving && !nudged) return;
      locked = true;
      armed = false;
      window.scrollTo({ top: stageTop(), behavior: "auto" });
    };

    const schedule = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(decide, 400);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", schedule);
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
        <link rel="icon" type="image/png" href="/fissiovolt/favicon.png" />
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

      <section id="technology" className="fv-tech">
        <div className="fv-tech-intro">
          <p className="fv-kicker">Technology</p>
          <h1 className="fv-hero-title">
            Fissiovolt’s breakthrough: A practical way to use photovoltaic to make nuclear electricity
          </h1>
        </div>
        <div className="fv-tech-stage" ref={stageRef}>
          <iframe
            ref={frameRef}
            className="fv-stage"
            src="/fissiovolt/rotary-heat-shuttle.html?embed=1"
            title="Rotary Heat Shuttle"
            onLoad={() => {
              setStageReady(true);
              postToFilm(frameRef.current, "restart");
              syncFilmRef.current();
            }}
          />
          {!stageReady && (
            <div className="fv-stage-loading" role="status" aria-live="polite" aria-label="Loading animation">
              <img src="/fissiovolt/logo-mark.png" alt="" />
              <div className="fv-load-track" aria-hidden="true">
                <div className="fv-load-bar" />
              </div>
            </div>
          )}
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
