/* Phosphor Terminal style: neo-brutalist terminal UI, black void, phosphor green signal, purple interrupt moments, visible scanlines, deliberate command-line rhythm. */
import { useEffect, useMemo, useRef, useState } from "react";

const LOGO_URL = "/manus-storage/logo_2005e11e.png";
const F_MARK_URL = "/manus-storage/mwif-f-mark_f820e130.png";
const TERMINAL_TEXTURE = "/manus-storage/mwif-terminal-grid_e1e029b5.png";
const PURPLE_ORBIT = "/manus-storage/mwif-purple-orbit_b50a1426.png";
const GREEN_NOISE = "/manus-storage/mwif-green-noise_962fb930.png";

const terminalText = [
  "man_with_f.exe started...",
  "2021: Had 100k",
  "2022: Had 100",
  "2024: Pressed F",
  "2025: Building $MWIF",
  "Press F to join_",
].join("\n");

const memePostTemplates = [
  (count: string) => `I pressed F ${count} times. The market said stop. I said FFF. $MWIF #Solana`,
  (count: string) => `POV: you pressed F ${count} times and still have conviction. FFF gang only. $MWIF`,
  (count: string) => `My portfolio? Unclear. My F count? ${count}. My conviction? Unfortunately strong. $MWIF`,
  (count: string) => `They told me to touch grass. I pressed F ${count} times instead. $MWIF`,
  (count: string) => `F = Faith. F = Fortitude. F = Fuck-it. Current tally: ${count}. $MWIF #Solana`,
  (count: string) => `I did not come here to be early. I came here to press F ${count} times. $MWIF`,
];

const cards = [
  { code: "01", title: "F = Faith", body: "Hold when everyone sells", accent: "0.42s" },
  { code: "02", title: "F = Fortitude", body: "Build in the bear", accent: "0.69x" },
  { code: "03", title: "F = Fuck-it", body: "YOLO one more time", accent: "1.00x" },
];

const matrixChars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  char: index % 4 === 0 ? "F" : index % 3 === 0 ? "+" : index % 2 === 0 ? "0" : "1",
  left: `${(index * 29) % 100}%`,
  delay: `${(index % 9) * 0.8}s`,
  duration: `${8 + (index % 5) * 1.7}s`,
}));

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [pressed, setPressed] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(window.localStorage.getItem("mwif-f-count") || 0);
  });
  const [falling, setFalling] = useState<number[]>([]);
  const lastShareIndex = useRef(-1);

  useEffect(() => {
    if (typedText.length >= terminalText.length) return;
    const timeout = window.setTimeout(() => setTypedText(terminalText.slice(0, typedText.length + 1)), 34);
    return () => window.clearTimeout(timeout);
  }, [typedText]);

  const formattedCount = useMemo(() => pressed.toLocaleString("en-US"), [pressed]);

  function shareOnX() {
    let nextIndex = Math.floor(Math.random() * memePostTemplates.length);
    if (memePostTemplates.length > 1 && nextIndex === lastShareIndex.current) {
      nextIndex = (nextIndex + 1) % memePostTemplates.length;
    }
    lastShareIndex.current = nextIndex;
    const tweet = memePostTemplates[nextIndex](formattedCount);
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  function pressF() {
    const next = pressed + 1;
    setPressed(next);
    window.localStorage.setItem("mwif-f-count", String(next));
    const burst = Array.from({ length: 5 }, (_, index) => Date.now() + index);
    setFalling(burst);
    window.setTimeout(() => setFalling([]), 1550);
  }

  const terminalLines = typedText.split("\n");
  const typingComplete = typedText.length >= terminalText.length;

  return (
    <main className="site-shell">
      <div className="matrix-layer" aria-hidden="true">{matrixChars.map((item) => <span key={item.id} style={{ left: item.left, animationDelay: item.delay, animationDuration: item.duration }}>{item.char}</span>)}</div>
      <div className="ambient ambient-top" aria-hidden="true" />
      <header className="topbar page-frame">
        <a className="micro-brand" href="#top" aria-label="MWIF home"><img src={F_MARK_URL} alt="" /><span>MWIF / 001</span></a>
        <span className="system-status"><i /> SYSTEM ONLINE</span>
      </header>

      <section id="top" className="hero page-frame">
        <div className="eyebrow"><span>BOOT_SEQUENCE</span><span>v.2025.04</span></div>
        <div className="hero-grid">
          <div className="hero-copy"><p className="hero-kicker">// A MEME COIN FOR THE F-FORTIFIED</p><h1>MAN WITH <em>F</em></h1><p className="hero-subcopy">No roadmap. No promises. Just conviction, questionable decisions, and a community that knows when to press F.</p></div>
          <div className="hero-mark-wrap"><div className="logo-frame"><span className="corner corner-tl" /><span className="corner corner-br" /><img className="mwif-logo" src={LOGO_URL} alt="MWIF graffiti logo with two cartoon faces" /></div><div className="logo-caption"><span>asset://logo.png</span><span>768 × 768</span></div></div>
        </div>
        <div className="terminal-window" style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.8), rgba(10,10,10,.92)), url(${TERMINAL_TEXTURE})` }}>
          <div className="terminal-bar"><span className="terminal-dots"><i /><i /><i /></span><span>/usr/bin/man_with_f</span><span className="terminal-live">LIVE</span></div>
          <div className="terminal-body" aria-live="polite">{terminalLines.map((line, index) => <div className={`terminal-line ${index === terminalLines.length - 1 && typingComplete ? "terminal-prompt" : ""}`} key={`${line}-${index}`}><span className="prompt-mark">{index === 0 ? ">" : "+"}</span>{line}</div>)}{!typingComplete && <span className="typing-caret" aria-label="typing" />}</div>
        </div>
        <div className="hero-actions"><a href="#" className="terminal-button filled buy-button">Buy $MWIF <span>↗</span></a><a href="#" className="terminal-button">View Chart <span>↗</span></a></div>
        <div className="scroll-cue"><span className="scroll-line" /> SCROLL TO EXECUTE</div>
      </section>

      <section className="press-section" id="press-f" style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.7), rgba(10,10,10,.9)), url(${PURPLE_ORBIT})` }}>
        <div className="press-inner page-frame"><div className="section-heading press-heading"><span className="section-index">[01]</span><h2>PRESS <strong>F</strong> TO PAY RESPECTS</h2><span className="section-rule" /></div><p className="press-copy">For the bags we lost. For the bags we build. For the ones still holding.</p><div className="press-stage">{falling.map((id, index) => <span className={`falling-f falling-${index + 1}`} key={id}>F</span>)}<button className="press-button" onClick={pressF} aria-label="Press F to pay respects">F</button></div><div className="press-score-row"><p className="counter"><span>F's Pressed:</span> {formattedCount}</p><button className="share-x-button" type="button" onClick={shareOnX}>Share a meme on X <span>↗</span></button></div><p className="counter-note">local_storage // persistence enabled</p></div>
      </section>

      <section className="values-section page-frame" id="what-is-fff"><div className="section-heading"><span className="section-index">[02]</span><h2>WHAT IS <strong>FFF</strong></h2><span className="section-rule" /></div><p className="section-intro">Three letters. One operating system. No exit strategy.</p><div className="value-grid">{cards.map((card) => <article className="value-card" key={card.code}><div className="card-top"><span>{card.code} //</span><span>{card.accent}</span></div><div className="card-glyph">F</div><h3>{card.title}</h3><p>{card.body}</p><span className="card-arrow">↘</span></article>)}</div></section>

      <section className="signal-section page-frame" style={{ backgroundImage: `url(${GREEN_NOISE})` }}><div className="signal-line"><span>COMMUNITY_SIGNAL</span><span>// FFF ONLY</span></div><div className="signal-grid"><h2>STAY<br /><span>FORTIFIED.</span></h2><p>Some coins have utility. We have a story, a terminal, and an unreasonable amount of F.</p></div></section>

      <footer className="footer page-frame"><div className="footer-top"><div className="contract-label">Contract: <strong>TBA</strong> <span>|</span> Launching Soon</div><div className="footer-links"><a href="https://x.com/iam_mwif?s=11" target="_blank" rel="noreferrer">[ X ]</a><a href="https://t.me/mwifportal" target="_blank" rel="noreferrer">[ Telegram ]</a><a href="#">[ GitHub ]</a><a href="#">[ Jupiter ]</a></div></div><div className="footer-gang">Join the FFF Gang</div><div className="footer-bottom"><span>$MWIF is a meme coin. Not financial advice.</span><span>© 2025 MWIF / END_OF_FILE</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
