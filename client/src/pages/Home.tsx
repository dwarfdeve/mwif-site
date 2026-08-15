/* Copyright (c) 2026 dwarfdeve / MWIF — Man With F. All rights reserved. */
/* Phosphor Terminal style: neo-brutalist terminal UI, black void, phosphor green signal, purple interrupt moments, visible scanlines, deliberate command-line rhythm. */
import { useEffect, useMemo, useRef, useState } from "react";
import { classicStoreAssets } from "../lib/classicStoreAssets";

const storagePath = (filename: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/manus-storage/${filename}`;
const LOGO_URL = storagePath("logo_2005e11e.png");
const F_MARK_URL = storagePath("mwif-f-mark_f820e130.png");
const TERMINAL_TEXTURE = storagePath("mwif-terminal-grid_e1e029b5.png");
const PURPLE_ORBIT = storagePath("mwif-purple-orbit_b50a1426.png");
const GREEN_NOISE = storagePath("mwif-green-noise_962fb930.png");

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
  const [storeFilter, setStoreFilter] = useState<"ALL" | "MEME" | "STICKER" | "GIF">("ALL");
  const visibleStoreAssets = useMemo(() => storeFilter === "ALL" ? classicStoreAssets : classicStoreAssets.filter((asset) => asset.category === storeFilter), [storeFilter]);

  const lastShareIndex = useRef(-1);

  useEffect(() => {
    if (typedText.length >= terminalText.length) return;
    const timeout = window.setTimeout(() => setTypedText(terminalText.slice(0, typedText.length + 1)), 34);
    return () => window.clearTimeout(timeout);
  }, [typedText]);

  const formattedCount = useMemo(() => pressed.toLocaleString("en-US"), [pressed]);
  const badge = pressed >= 1000 ? "1000 F Club" : pressed >= 500 ? "500 F Club" : pressed >= 100 ? "100 F Club" : null;

  function shareMyScore() {
    const shareText = `I pressed F ${pressed} times for $MWIF 🫡 https://mwifcoin-x9pwj42b.manus.space`;
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

  function createShareImage(count: number) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#0A0A0A";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#00FF94";
    context.lineWidth = 4;
    context.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);
    context.globalAlpha = 0.12;
    context.strokeStyle = "#9945FF";
    context.lineWidth = 2;
    for (let y = 90; y < 1040; y += 30) {
      context.beginPath();
      context.moveTo(50, y);
      context.lineTo(1030, y);
      context.stroke();
    }
    context.globalAlpha = 1;
    context.font = "700 28px JetBrains Mono, monospace";
    context.fillStyle = "#00FF94";
    context.fillText("MWIF // SHARE_PACKET", 70, 105);
    context.fillStyle = "#FFFFFF";
    context.font = "800 110px JetBrains Mono, monospace";
    context.fillText("PRESS F", 70, 250);
    context.fillStyle = "#9945FF";
    context.fillText("TO PAY", 70, 370);
    context.fillStyle = "#FFFFFF";
    context.fillText("RESPECTS", 70, 490);
    context.fillStyle = "#00FF94";
    context.font = "700 34px JetBrains Mono, monospace";
    context.fillText("F's Pressed:", 70, 650);
    context.fillStyle = "#FFFFFF";
    context.font = "800 118px JetBrains Mono, monospace";
    context.fillText(count.toLocaleString("en-US"), 70, 790);
    context.fillStyle = "#9945FF";
    context.font = "700 28px JetBrains Mono, monospace";
    context.fillText("$MWIF // FFF GANG ONLY", 70, 930);
    context.fillStyle = "#00FF94";
    context.fillText("man_with_f.exe // live count", 70, 985);

    const logoElement = document.querySelector(".mwif-logo") as HTMLImageElement | null;
    if (logoElement?.complete && logoElement.naturalWidth > 0) {
      context.globalAlpha = 0.95;
      context.drawImage(logoElement, 700, 90, 290, 290);
      context.globalAlpha = 1;
    } else {
      context.fillStyle = "#9945FF";
      context.font = "800 210px JetBrains Mono, monospace";
      context.fillText("F", 790, 300);
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setGeneratedImage(url);
      setGeneratedFile(new File([blob], `mwif-f-${count}.png`, { type: "image/png" }));
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

  function pressF() {
    const next = pressed + 1;
    const clickSound = new Audio(storagePath("click_b18b5911.mp3"));
    clickSound.volume = 0.22;
    clickSound.play().catch(() => undefined);
    setPressed(next);
    window.localStorage.setItem("mwif-f-count", String(next));
    createShareImage(next);
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
        <nav className="topbar-nav" aria-label="Primary"><a href="#store">STORE</a></nav><span className="system-status"><i /> SYSTEM ONLINE</span>
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
        <div className="press-inner page-frame"><div className="section-heading press-heading"><span className="section-index">[01]</span><h2>PRESS <strong>F</strong> TO PAY RESPECTS</h2><span className="section-rule" /></div><p className="press-copy">For the bags we lost. For the bags we build. For the ones still holding.</p><div className="press-stage">{falling.map((id, index) => <span className={`falling-f falling-${index + 1}`} key={id}>F</span>)}<button className="press-button" onClick={pressF} aria-label="Press F to pay respects">F</button></div><div className="press-score-row"><div className="press-score"><p className="counter"><span>F's Pressed:</span> {formattedCount}</p>{badge && <span className="f-badge">{badge}</span>}</div><button className="share-x-button" type="button" onClick={shareMyScore}>Share My Score <span>↗</span></button></div><p className="counter-note">local_storage // persistence enabled</p>{generatedImage && <div className="share-image-panel"><div className="share-image-preview"><img src={generatedImage} alt={`Generated $MWIF share image showing ${formattedCount} F's Pressed`} /></div><div className="share-image-actions"><span>share_image // generated on tap</span><div><a className="share-image-button" href={generatedImage} download={generatedFile?.name || "mwif-f-share.png"}>Download PNG ↘</a><button className="share-image-button" type="button" onClick={shareGeneratedImage}>Share Image ↗</button></div></div></div>}</div>
      </section>

      <section className="values-section page-frame" id="what-is-fff"><div className="section-heading"><span className="section-index">[02]</span><h2>WHAT IS <strong>FFF</strong></h2><span className="section-rule" /></div><p className="section-intro">Three letters. One operating system. No exit strategy.</p><div className="value-grid">{cards.map((card) => <article className="value-card" key={card.code}><div className="card-top"><span>{card.code} //</span><span>{card.accent}</span></div><div className="card-glyph">F</div><h3>{card.title}</h3><p>{card.body}</p><span className="card-arrow">↘</span></article>)}</div></section>

      <section className="signal-section page-frame" style={{ backgroundImage: `url(${GREEN_NOISE})` }}><div className="signal-line"><span>COMMUNITY_SIGNAL</span><span>// FFF ONLY</span></div><div className="signal-grid"><h2>STAY<br /><span>FORTIFIED.</span></h2><p>Some coins have utility. We have a story, a terminal, and an unreasonable amount of F.</p></div></section>

      <section className="media-section page-frame" id="store"><div className="section-heading"><span className="section-index">[03]</span><h2><strong>STORE</strong> // CLASSIC_DROP</h2><span className="section-rule" /></div><p className="section-intro">145 static F assets for the group chat, the timeline, and the next questionable decision. Choose a category, download, transfer, deploy.</p><div className="store-toolbar" role="tablist" aria-label="Store asset categories">{(["ALL", "MEME", "STICKER", "GIF"] as const).map((filter) => <button key={filter} type="button" className={`store-filter ${storeFilter === filter ? "is-active" : ""}`} onClick={() => setStoreFilter(filter)} role="tab" aria-selected={storeFilter === filter}>{filter} <span>{filter === "ALL" ? classicStoreAssets.length : classicStoreAssets.filter((asset) => asset.category === filter).length}</span></button>)}</div><div className="media-grid store-grid">{visibleStoreAssets.map((asset) => <article className="media-card" key={asset.filename}><div className="media-preview"><img src={asset.url} alt={asset.label} loading="lazy" /></div><div className="media-meta"><span className="media-kind">{asset.category}</span><span>STATIC</span></div><h3>{asset.label}</h3><div className="media-actions"><a href={asset.url} download={asset.filename} target="_blank" rel="noreferrer">DOWNLOAD ↘</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Deploying ${asset.label} for $MWIF. FFF gang only.`)}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></article>)}</div></section>

      <footer className="footer page-frame"><div className="footer-top"><div className="contract-label">Contract: <strong>TBA</strong> <span>|</span> Launching Soon</div><div className="footer-links"><a href="https://x.com/iam_mwif?s=11" target="_blank" rel="noreferrer">[ X ]</a><a href="https://t.me/mwifportal" target="_blank" rel="noreferrer">[ Telegram ]</a><a href="#">[ GitHub ]</a><a href="#">[ Jupiter ]</a></div></div><div className="footer-gang">Join the FFF Gang</div><div className="footer-bottom"><span>$MWIF is a meme coin. Not financial advice. FFF gang only.</span><span>© 2025 MWIF / END_OF_FILE</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
