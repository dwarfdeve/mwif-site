/* Copyright (c) 2026 dwarfdeve / MWIF — Man With F. All rights reserved. */
/* Phosphor Terminal style: neo-brutalist terminal UI, black void, phosphor green signal, purple interrupt moments, visible scanlines, deliberate command-line rhythm. */
import { useEffect, useMemo, useRef, useState } from "react";

const storagePath = (filename: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/mwif-assets/${filename}`;
const LOGO_URL = storagePath("logo_2005e11e.png");
const F_MARK_URL = storagePath("mwif-f-mark_f820e130.png");
const TERMINAL_TEXTURE = storagePath("mwif-terminal-grid_e1e029b5.png");
const PURPLE_ORBIT = storagePath("mwif-purple-orbit_b50a1426.png");
const GREEN_NOISE = storagePath("mwif-green-noise_962fb930.png");
const SHARE_IMAGE_SIZE = 1080;
const SHARE_IMAGE_FILENAME = "mwif-f-share.png";

const mediaAssets = [
  { kind: "PHOTO", name: "late_night_conviction.png", format: "X / TELEGRAM", url: storagePath("mwif-meme-photo-01_37b9c8a3.png") },
  { kind: "PHOTO", name: "build_through_it.png", format: "X / TELEGRAM", url: storagePath("mwif-meme-photo-02_f790df34.png") },
  { kind: "STICKER", name: "press_the_fist.png", format: "TELEGRAM / X", url: storagePath("mwif-sticker-fist_3043fa24.png") },
  { kind: "STICKER", name: "terminal_cope.png", format: "TELEGRAM / X", url: storagePath("mwif-sticker-cope_87b52cad.png") },
  { kind: "STICKER", name: "fff_anthem.png", format: "TELEGRAM / X", url: storagePath("mwif-sticker-fff_654b1b38.png") },
  { kind: "GIF", name: "press_f_reaction.gif", format: "TELEGRAM / X", url: storagePath("mwif-press-f_fa946905.gif") },
  { kind: "GIF", name: "fff_chant.gif", format: "TELEGRAM / X", url: storagePath("mwif-fff-chant_65b5bcc1.gif") },
];

const terminalText = [
  "man_with_f.exe started...",
  "2026: Project booted",
  "2026: Community assembled",
  "2026: Pressed F",
  "2026: Building $MWIF",
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

const shareMemeTemplates = [
  { id: "boot-log", label: "BOOT LOG", caption: "classic terminal receipt" },
  { id: "market-alert", label: "MARKET ALERT", caption: "red candles, green conviction" },
  { id: "fff-stack", label: "FFF STACK", caption: "three letters, one tally" },
  { id: "degen-report", label: "DEGEN REPORT", caption: "status: still pressing" },
  { id: "survival-card", label: "SURVIVAL CARD", caption: "for the F-fortified" },
] as const;

const cards = [
  { code: "01", title: "F = Faith", body: "Hold when everyone sells", accent: "0.42s" },
  { code: "02", title: "F = Fortitude", body: "Build in the bear", accent: "0.69x" },
  { code: "03", title: "F = Fuck-it", body: "YOLO one more time", accent: "1.00x" },
];

const matrixChars = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  char: "F01"[index % 3],
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
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedFile, setGeneratedFile] = useState<File | null>(null);
  const [activeMemeIndex, setActiveMemeIndex] = useState(0);

  const lastShareIndex = useRef(-1);
  const generatedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (typedText.length >= terminalText.length) return;
    const timeout = window.setTimeout(() => setTypedText(terminalText.slice(0, typedText.length + 1)), 34);
    return () => window.clearTimeout(timeout);
  }, [typedText]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px" });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const formattedCount = useMemo(() => pressed.toLocaleString("en-US"), [pressed]);
  const badge = pressed >= 1000 ? "1000 F Club" : pressed >= 500 ? "500 F Club" : pressed >= 100 ? "100 F Club" : null;

  function shareMyScore() {
    const siteUrl = `${window.location.origin}${window.location.pathname}`;
    const shareText = `I pressed F ${pressed} times for $MWIF 🫡 ${siteUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
  }

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

  function createShareImage(count: number, templateIndex = activeMemeIndex) {
    const logoElement = document.querySelector(".mwif-logo") as HTMLImageElement | null;
    if (logoElement && !logoElement.complete) {
      logoElement.addEventListener("load", () => createShareImage(count, templateIndex), { once: true });
      return;
    }

    const template = shareMemeTemplates[templateIndex] ?? shareMemeTemplates[0];
    const canvas = document.createElement("canvas");
    canvas.width = SHARE_IMAGE_SIZE;
    canvas.height = SHARE_IMAGE_SIZE;
    const context = canvas.getContext("2d");
    if (!context) return;

    const green = "#00FF94";
    const purple = "#9945FF";
    const white = "#FFFFFF";
    const black = "#0A0A0A";
    const muted = "#89918C";
    const formatted = count.toLocaleString("en-US");

    context.fillStyle = black;
    context.fillRect(0, 0, SHARE_IMAGE_SIZE, SHARE_IMAGE_SIZE);
    context.strokeStyle = green;
    context.lineWidth = 4;
    context.strokeRect(34, 34, SHARE_IMAGE_SIZE - 68, SHARE_IMAGE_SIZE - 68);
    context.globalAlpha = 0.12;
    context.strokeStyle = purple;
    context.lineWidth = 2;
    for (let y = 90; y < 1040; y += 30) {
      context.beginPath();
      context.moveTo(50, y);
      context.lineTo(1030, y);
      context.stroke();
    }
    context.globalAlpha = 1;

    const drawLogo = (x = 735, y = 72, size = 260) => {
      if (logoElement?.complete && logoElement.naturalWidth > 0) {
        context.globalAlpha = 0.95;
        context.drawImage(logoElement, x, y, size, size);
        context.globalAlpha = 1;
      } else {
        context.fillStyle = purple;
        context.font = "800 220px JetBrains Mono, monospace";
        context.fillText("F", x + 70, y + 205);
      }
    };
    const drawLabel = (text: string, color = green, x = 70, y = 105) => {
      context.fillStyle = color;
      context.font = "700 27px JetBrains Mono, monospace";
      context.fillText(text, x, y);
    };
    const drawCount = (y: number, color = white, size = 126) => {
      context.fillStyle = color;
      context.font = `800 ${size}px JetBrains Mono, monospace`;
      context.fillText(formatted, 70, y);
    };

    if (template.id === "boot-log") {
      drawLabel("MWIF // BOOT_LOG", green);
      context.fillStyle = white;
      context.font = "800 104px JetBrains Mono, monospace";
      context.fillText("PRESS F", 70, 250);
      context.fillStyle = purple;
      context.fillText("TO PAY", 70, 370);
      context.fillStyle = white;
      context.fillText("RESPECTS", 70, 490);
      drawLabel("F's Pressed:", green, 70, 650);
      drawCount(790);
      drawLabel("$MWIF // FFF GANG ONLY", purple, 70, 930);
      drawLabel("man_with_f.exe // live count", green, 70, 985);
      drawLogo();
    } else if (template.id === "market-alert") {
      context.fillStyle = purple;
      context.fillRect(50, 50, 980, 175);
      drawLabel("// MARKET_ALERT //", black, 80, 105);
      context.fillStyle = black;
      context.font = "800 64px JetBrains Mono, monospace";
      context.fillText("RED CANDLES", 80, 180);
      context.fillStyle = green;
      context.font = "800 104px JetBrains Mono, monospace";
      context.fillText("GREEN", 70, 365);
      context.fillStyle = white;
      context.fillText("CONVICTION", 70, 475);
      drawLabel("F COUNT // STILL CLIMBING", green, 70, 610);
      drawCount(770, purple, 142);
      drawLabel("STATUS: ABSURDLY ONLINE", white, 70, 900);
      drawLogo(710, 655, 265);
    } else if (template.id === "fff-stack") {
      drawLabel("MWIF // FFF_STACK", green);
      const rows = ["F = FAITH", "F = FORTITUDE", "F = FUCK-IT"];
      rows.forEach((row, index) => {
        const y = 245 + index * 145;
        context.strokeStyle = index === 1 ? purple : green;
        context.lineWidth = 3;
        context.strokeRect(70, y - 65, 940, 105);
        context.fillStyle = index === 1 ? purple : white;
        context.font = "800 48px JetBrains Mono, monospace";
        context.fillText(row, 100, y);
      });
      drawLabel("CURRENT TALLY", green, 70, 765);
      drawCount(900, white, 136);
      drawLogo(780, 55, 190);
    } else if (template.id === "degen-report") {
      drawLabel("/usr/bin/degen_report", green);
      context.fillStyle = muted;
      context.font = "500 29px JetBrains Mono, monospace";
      ["market_status: unstable", "exit_liquidity: irrelevant", "conviction: operational"].forEach((line, index) => context.fillText(`> ${line}`, 70, 230 + index * 58));
      context.fillStyle = purple;
      context.font = "800 250px JetBrains Mono, monospace";
      context.fillText("F", 775, 380);
      drawLabel("F's PRESSED", green, 70, 500);
      drawCount(685, white, 145);
      drawLabel("REPORT CLOSED // FFF ONLY", purple, 70, 900);
      drawLogo(715, 700, 250);
    } else {
      drawLabel("MWIF // SURVIVAL_CARD", green);
      context.fillStyle = white;
      context.font = "800 74px JetBrains Mono, monospace";
      context.fillText("I SURVIVED", 70, 285);
      context.fillStyle = purple;
      context.fillText("ANOTHER", 70, 385);
      context.fillStyle = white;
      context.fillText("DIP", 70, 485);
      drawLabel("PROOF OF WORK", green, 70, 620);
      drawCount(790, white, 142);
      drawLabel("F-FORTIFIED // $MWIF", purple, 70, 930);
      drawLogo(735, 90, 250);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      if (generatedUrlRef.current) URL.revokeObjectURL(generatedUrlRef.current);
      const url = URL.createObjectURL(blob);
      generatedUrlRef.current = url;
      setGeneratedImage(url);
      setGeneratedFile(new File([blob], `mwif-f-${template.id}.png`, { type: "image/png" }));
    }, "image/png");
  }

  async function shareGeneratedImage() {
    if (!generatedFile) return;
    try {
      if (navigator.share) {
        await navigator.share({ files: [generatedFile], title: "$MWIF F count", text: `I pressed F ${formattedCount} times on $MWIF. FFF gang only.` });
      } else if (generatedImage) {
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = generatedFile.name;
        link.click();
      }
    } catch {
      // Sharing can be cancelled by the user; keep the generated image available for download.
    }
  }

  function selectMemeTemplate(index: number) {
    const nextIndex = (index + shareMemeTemplates.length) % shareMemeTemplates.length;
    setActiveMemeIndex(nextIndex);
    if (generatedImage) createShareImage(pressed, nextIndex);
  }

  function pressF() {
    const next = pressed + 1;
    const clickSound = new Audio(storagePath("click_b18b5911.mp3"));
    clickSound.volume = 0.22;
    clickSound.play().catch(() => undefined);
    setPressed(next);
    window.localStorage.setItem("mwif-f-count", String(next));
    createShareImage(next, activeMemeIndex);
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
        <nav className="topbar-nav" aria-label="Primary"><a className="store-menu-link" href="#/store" aria-label="Open the MWIF static media store"><span className="store-menu-signal" aria-hidden="true" /><span className="store-menu-label">STORE</span><strong>145 ASSETS</strong><span className="store-menu-arrow" aria-hidden="true">↘</span></a></nav><span className="system-status"><i /> SYSTEM ONLINE</span>
      </header>

      <section id="top" className="hero page-frame scroll-reveal" data-reveal>
        <div className="eyebrow"><span>BOOT_SEQUENCE</span><span>v.2026.01</span></div>
        <div className="hero-grid">
          <div className="hero-copy"><p className="hero-kicker">// A MEME COIN FOR THE F-FORTIFIED</p><h1>MAN WITH <em>F</em></h1><p className="hero-subcopy">No roadmap. No promises. Just conviction, questionable decisions, and a community that knows when to press F.</p></div>
          <div className="hero-mark-wrap"><div className="logo-frame"><span className="corner corner-tl" /><span className="corner corner-br" /><img className="mwif-logo" src={LOGO_URL} alt="MWIF graffiti logo with two cartoon faces" /></div><div className="logo-caption"><span>asset://logo.png</span><span>768 × 768</span></div></div>
        </div>
        <div className="terminal-window" style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.8), rgba(10,10,10,.92)), url(${TERMINAL_TEXTURE})` }}>
          <div className="terminal-bar"><span className="terminal-dots"><i /><i /><i /></span><span>/usr/bin/man_with_f</span><span className="terminal-live">LIVE</span></div>
          <div className="terminal-body" aria-live="polite">{terminalLines.map((line, index) => <div className={`terminal-line ${index === terminalLines.length - 1 && typingComplete ? "terminal-prompt" : ""}`} key={`${line}-${index}`}><span className="prompt-mark">{index === 0 ? ">" : "+"}</span>{line}</div>)}{!typingComplete && <span className="typing-caret" aria-label="typing" />}</div>
        </div>
        <div className="hero-actions"><a href="#" className="terminal-button filled buy-button" data-button>Buy $MWIF <span>↗</span></a><a href="#" className="terminal-button" data-button>View Chart <span>↗</span></a></div>
        <div className="scroll-cue"><span className="scroll-line" /> SCROLL TO EXECUTE</div>
      </section>

      <section className="press-section scroll-reveal" id="press-f" data-reveal style={{ backgroundImage: `linear-gradient(rgba(10,10,10,.7), rgba(10,10,10,.9)), url(${PURPLE_ORBIT})` }}>
        <div className="press-inner page-frame"><div className="section-heading press-heading"><span className="section-index">[01]</span><h2>PRESS <strong>F</strong> TO PAY RESPECTS</h2><span className="section-rule" /></div><p className="press-copy">For the bags we lost. For the bags we build. For the ones still holding.</p><div className="press-stage">{falling.map((id, index) => <span className={`falling-f falling-${index + 1}`} key={id}>F</span>)}<button className="press-button" data-button onClick={pressF} aria-label="Press F to pay respects">F</button></div><div className="press-score-row"><div className="press-score"><p className="counter"><span>F's Pressed:</span> {formattedCount}</p>{badge && <span className="f-badge">{badge}</span>}</div><button className="share-x-button" data-button type="button" onClick={shareMyScore}>Share My Score <span>↗</span></button></div><p className="counter-note">local_storage // persistence enabled // export_format: 1080x1080 PNG</p>{generatedImage && <div className="share-image-panel"><div className="share-carousel-head"><div><span className="share-image-kicker">MEME_GENERATOR // LIVE F COUNT</span><strong>{shareMemeTemplates[activeMemeIndex].label}</strong><small>{shareMemeTemplates[activeMemeIndex].caption}</small></div><div className="share-carousel-count">{activeMemeIndex + 1} / {shareMemeTemplates.length}</div></div><div className="share-image-preview"><img src={generatedImage} alt={`${shareMemeTemplates[activeMemeIndex].label} $MWIF meme showing ${formattedCount} F's Pressed`} /></div><div className="share-carousel-controls"><button className="carousel-arrow" type="button" onClick={() => selectMemeTemplate(activeMemeIndex - 1)} aria-label="Previous meme design">←</button><div className="meme-template-dots" role="tablist" aria-label="F counter meme designs">{shareMemeTemplates.map((meme, index) => <button key={meme.id} className={`meme-template-dot ${activeMemeIndex === index ? "is-active" : ""}`} type="button" role="tab" aria-selected={activeMemeIndex === index} aria-label={`Use ${meme.label} meme design`} onClick={() => selectMemeTemplate(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div><button className="carousel-arrow" type="button" onClick={() => selectMemeTemplate(activeMemeIndex + 1)} aria-label="Next meme design">→</button></div><div className="share-image-actions"><span>single_format // 1080x1080 PNG</span><div><a className="share-image-button" href={generatedImage} download={generatedFile?.name || SHARE_IMAGE_FILENAME}>Download Meme PNG ↘</a><button className="share-image-button" type="button" onClick={shareGeneratedImage}>Share Meme Image ↗</button></div></div></div>}</div>
      </section>

      <section className="values-section page-frame scroll-reveal" id="what-is-fff" data-reveal><div className="section-heading"><span className="section-index">[02]</span><h2>WHAT IS <strong>FFF</strong></h2><span className="section-rule" /></div><p className="section-intro">Three letters. One operating system. No exit strategy.</p><div className="value-grid">{cards.map((card) => <article className="value-card" key={card.code}><div className="card-top"><span>{card.code} //</span><span>{card.accent}</span></div><div className="card-glyph">F</div><h3>{card.title}</h3><p>{card.body}</p><span className="card-arrow">↘</span></article>)}</div></section>

      <section className="signal-section page-frame scroll-reveal" data-reveal style={{ backgroundImage: `url(${GREEN_NOISE})` }}><div className="signal-line"><span>COMMUNITY_SIGNAL</span><span>// FFF ONLY</span></div><div className="signal-grid"><h2>STAY<br /><span>FORTIFIED.</span></h2><p>Some coins have utility. We have a story, a terminal, and an unreasonable amount of F.</p></div></section>

      <section className="home-store-teaser page-frame scroll-reveal" data-reveal><div className="section-heading"><span className="section-index">[03]</span><h2><strong>STORE</strong> // CLASSIC_DROP</h2><span className="section-rule" /></div><div className="home-store-teaser-grid"><div><p className="section-intro">The full static payload is mounted in a dedicated archive: 105 memes, 20 stickers, and 20 GIFs for the timeline, group chat, and next questionable decision.</p><a className="terminal-button filled" href="#/store" data-button>OPEN FULL STORE <span>↗</span></a></div><div className="home-store-stats"><span><strong>105</strong> MEMES</span><span><strong>20</strong> STICKERS</span><span><strong>20</strong> GIFS</span><small>STATIC_ONLY // DOWNLOADABLE // FFF GANG</small></div></div></section>

      <footer className="footer page-frame"><div className="footer-top"><div className="contract-label">Contract: <strong>TBA</strong> <span>|</span> Launching Soon</div><div className="footer-links"><a href="https://x.com/iam_mwif?s=11" target="_blank" rel="noreferrer">[ X ]</a><a href="https://t.me/mwifportal" target="_blank" rel="noreferrer">[ Telegram ]</a><a href="#">[ Jupiter ]</a></div></div><div className="footer-gang">Join the FFF Gang</div><div className="footer-bottom"><span>$MWIF is a meme coin. Not financial advice. FFF gang only.</span><span>© 2026 MWIF / END_OF_FILE</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
