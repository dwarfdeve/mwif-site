/* Phosphor Terminal style: neo-brutalist terminal UI, black void, phosphor green signal, purple interrupt moments, visible scanlines, deliberate command-line rhythm. */
import { useEffect, useMemo, useState } from "react";

const LOGO_URL = "/manus-storage/mwif-logo_ea600c56.jpg";
const F_MARK_URL = "/manus-storage/mwif-f-mark_f820e130.png";
const TERMINAL_TEXTURE = "/manus-storage/mwif-terminal-grid_e1e029b5.png";
const PURPLE_ORBIT = "/manus-storage/mwif-purple-orbit_b50a1426.png";
const GREEN_NOISE = "/manus-storage/mwif-green-noise_962fb930.png";

const bootLines = [
  "man_with_f.exe started...",
  "2021: Had 100k",
  "2022: Had 100",
  "2024: Pressed F",
  "2025: Building $MWIF",
  "Press F to join_",
];

const cards = [
  { code: "01", title: "F = Faith", body: "Hold when everyone sells", accent: "0.42s" },
  { code: "02", title: "F = Fortitude", body: "Build in the bear", accent: "0.69x" },
  { code: "03", title: "F = Fuck-it", body: "YOLO one more time", accent: "1.00x" },
];

export default function Home() {
  const [typed, setTyped] = useState(0);
  const [pressed, setPressed] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(window.localStorage.getItem("mwif-f-count") || 0);
  });
  const [falling, setFalling] = useState<number[]>([]);

  useEffect(() => {
    if (typed >= bootLines.length) return;
    const timeout = window.setTimeout(() => setTyped((value) => value + 1), 500);
    return () => window.clearTimeout(timeout);
  }, [typed]);

  const formattedCount = useMemo(() => pressed.toLocaleString("en-US"), [pressed]);

  function pressF() {
    const next = pressed + 1;
    setPressed(next);
    window.localStorage.setItem("mwif-f-count", String(next));
    const burst = [Date.now(), Date.now() + 1, Date.now() + 2];
    setFalling(burst);
    window.setTimeout(() => setFalling([]), 1500);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-top" aria-hidden="true" />
      <header className="topbar page-frame">
        <a className="micro-brand" href="#top" aria-label="MWIF home">
          <img src={F_MARK_URL} alt="" />
          <span>MWIF / 001</span>
        </a>
        <span className="system-status"><i /> SYSTEM ONLINE</span>
      </header>

      <section id="top" className="hero page-frame">
        <div className="eyebrow"><span>BOOT_SEQUENCE</span><span>v.2025.04</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">// A MEME COIN FOR THE F-FORTIFIED</p>
            <h1>MAN WITH <em>F</em></h1>
            <p className="hero-subcopy">No roadmap. No promises. Just conviction, questionable decisions, and a community that knows when to press F.</p>
          </div>
          <div className="hero-mark-wrap">
            <div className="logo-frame">
              <span className="corner corner-tl" /><span className="corner corner-br" />
              <img className="mwif-logo" src={LOGO_URL} alt="MWIF graffiti logo with two cartoon faces" />
            </div>
            <div className="logo-caption"><span>asset://mwif_original.jpg</span><span>768 × 768</span></div>
          </div>
        </div>

        <div className="terminal-window" style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.8), rgba(10,10,10,.92)), url(${TERMINAL_TEXTURE})` }}>
          <div className="terminal-bar"><span className="terminal-dots"><i /><i /><i /></span><span>/usr/bin/man_with_f</span><span className="terminal-live">LIVE</span></div>
          <div className="terminal-body" aria-live="polite">
            {bootLines.slice(0, typed).map((line, index) => (
              <div className={`terminal-line ${index === bootLines.length - 1 ? "terminal-prompt" : ""}`} key={line}>
                <span className="prompt-mark">{index === 0 ? ">" : "+"}</span>{line}
              </div>
            ))}
            {typed < bootLines.length && <span className="typing-caret" aria-label="typing" />}
          </div>
        </div>
        <div className="hero-actions">
          <a href="#" className="terminal-button filled">Buy $MWIF <span>↗</span></a>
          <a href="#" className="terminal-button">View Chart <span>↗</span></a>
        </div>
        <div className="scroll-cue"><span className="scroll-line" /> SCROLL TO EXECUTE</div>
      </section>

      <section className="values-section page-frame" id="what-is-fff">
        <div className="section-heading"><span className="section-index">[01]</span><h2>WHAT IS <strong>FFF</strong></h2><span className="section-rule" /></div>
        <p className="section-intro">Three letters. One operating system. No exit strategy.</p>
        <div className="value-grid">
          {cards.map((card) => (
            <article className="value-card" key={card.code}>
              <div className="card-top"><span>{card.code} //</span><span>{card.accent}</span></div>
              <div className="card-glyph">F</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <span className="card-arrow">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section className="press-section" id="press-f" style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.7), rgba(10,10,10,.9)), url(${PURPLE_ORBIT})` }}>
        <div className="press-inner page-frame">
          <div className="section-heading press-heading"><span className="section-index">[02]</span><h2>PRESS <strong>F</strong> TO PAY RESPECTS</h2><span className="section-rule" /></div>
          <p className="press-copy">For the bags we lost. For the bags we build. For the ones still holding.</p>
          <div className="press-stage">
            {falling.map((id, index) => <span className={`falling-f falling-${index + 1}`} key={id}>F</span>)}
            <button className="press-button" onClick={pressF} aria-label="Press F to pay respects">F</button>
          </div>
          <p className="counter"><span>F's Pressed:</span> {formattedCount}</p>
          <p className="counter-note">local_storage // persistence enabled</p>
        </div>
      </section>

      <section className="signal-section page-frame" style={{ backgroundImage: `url(${GREEN_NOISE})` }}>
        <div className="signal-line"><span>COMMUNITY_SIGNAL</span><span>// FFF ONLY</span></div>
        <div className="signal-grid"><h2>STAY<br /><span>FORTIFIED.</span></h2><p>Some coins have utility. We have a story, a terminal, and an unreasonable amount of F.</p></div>
      </section>

      <footer className="footer page-frame">
        <div className="footer-top"><div className="contract-label">CONTRACT: <strong>TBA</strong></div><div className="footer-links"><a href="#">X</a><span>|</span><a href="#">Telegram</a><span>|</span><a href="#">GitHub</a><span>|</span><a href="#">Jupiter</a></div></div>
        <div className="footer-bottom"><span>$MWIF is a meme coin. Not financial advice. FFF gang only.</span><span>© 2025 MWIF / END_OF_FILE</span></div>
      </footer>
    </main>
  );
}
