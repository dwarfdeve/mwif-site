/* Phosphor Terminal style: dedicated archive page, black terminal field, phosphor-green rules, purple interrupt panels, and dense command-line inventory rhythm. */
import { useMemo, useState } from "react";
import { classicStoreAssets } from "../lib/classicStoreAssets";

const filters = ["ALL", "SIGNATURE", "MEME", "STICKER", "GIF"] as const;
type StoreFilter = (typeof filters)[number];
type StoreItem = { category: string; label: string; url: string; filename: string; preview?: string };
const previewUrl = (item: StoreItem) => item.preview || item.url.replace(/\.png$/i, ".webp");
const assetPath = (filename: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/mwif-assets/${filename}`;
const logoEffectUrl = assetPath("mwif-logo-effect.gif");
const signatureAssets: StoreItem[] = [
  { category: "SIGNATURE", label: "MWIF Logo Effect // Animated GIF", url: logoEffectUrl, filename: "mwif-logo-effect.gif", preview: logoEffectUrl },
  { category: "SIGNATURE", label: "MWIF Logo // Telegram Sticker", url: assetPath("mwif-logo-telegram-sticker.gif"), filename: "mwif-logo-telegram-sticker.gif", preview: assetPath("mwif-logo-telegram-sticker.gif") },
  { category: "SIGNATURE", label: "MWIF Logo // Transparent Edit Pack", url: assetPath("mwif-logo-transparent.png"), filename: "mwif-logo-transparent.png", preview: assetPath("mwif-logo-transparent.png") },
];

export default function Store() {
  const [filter, setFilter] = useState<StoreFilter>("ALL");
  const visibleAssets = useMemo<StoreItem[]>(() => {
    if (filter === "SIGNATURE") return signatureAssets;
    if (filter === "ALL") return [...signatureAssets, ...classicStoreAssets];
    return classicStoreAssets.filter((asset) => asset.category === filter);
  }, [filter]);
  const countFor = (category: StoreFilter) => category === "ALL" ? classicStoreAssets.length + signatureAssets.length : category === "SIGNATURE" ? signatureAssets.length : classicStoreAssets.filter((asset) => asset.category === category).length;

  return (
    <main className="site-shell store-page">
      <div className="ambient ambient-top" aria-hidden="true" />
      <header className="topbar page-frame store-page-topbar">
        <a className="micro-brand" href="#/" aria-label="Return to MWIF home"><span className="store-back-mark">←</span><span>MWIF / STORE</span></a>
        <a className="store-home-link" href="#/">RETURN TO MAIN ↗</a>
      </header>

      <section className="store-hero page-frame">
        <div className="eyebrow"><span>STORE_EXECUTABLE</span><span>v.2026.01</span></div>
        <div className="store-title-row"><div><p className="hero-kicker">// FFF MEDIA VAULT FOR THE F-FORTIFIED</p><h1>CLASSIC <em>DROP</em></h1><p className="store-lede">The complete FFF drop: memes for the timeline, stickers for the group chat, and GIFs for every questionable decision.</p></div><div className="store-terminal-badge"><span>STATUS</span><strong>ONLINE</strong><small>{classicStoreAssets.length} FILES // FFF DROP</small></div></div>
      </section>

      <section className="store-feature page-frame" aria-labelledby="logo-drop-heading"><div className="store-feature-copy"><span className="share-image-kicker">MWIF // SIGNATURE_ASSET</span><h2 id="logo-drop-heading">THE MWIF <em>LOGO EFFECT</em></h2><p>Animated scanlines, purple signal, green conviction. Download the effect logo for X, Telegram, edits, and the next FFF transmission.</p><div className="store-feature-actions"><a className="terminal-button filled" href={logoEffectUrl} download="mwif-logo-effect.gif" data-button>DOWNLOAD GIF ↘</a><a className="store-feature-post" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Deploying the MWIF logo effect. FFF signal online.")}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></div><div className="store-feature-preview"><img src={logoEffectUrl} alt="Animated MWIF logo with terminal scanline and neon signal effect" loading="eager" decoding="async" /><span>GIF // 640×640 // LOOP</span></div></section>

      <section className="store-inventory page-frame" aria-labelledby="inventory-heading">
        <div className="section-heading"><span className="section-index">[03]</span><h2 id="inventory-heading"><strong>MEDIA_INVENTORY</strong> // FULL_PAYLOAD</h2><span className="section-rule" /></div>
        <div className="store-inventory-bar"><p>{visibleAssets.length} assets armed // click a category to filter the vault</p><div className="store-toolbar store-page-toolbar" role="tablist" aria-label="Store asset categories">{filters.map((item) => <button key={item} type="button" className={`store-filter ${filter === item ? "is-active" : ""}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item} <span>{countFor(item)}</span></button>)}</div></div>
        <div className="media-grid store-grid store-page-grid">{visibleAssets.map((asset) => <article className="media-card" key={asset.filename}><div className="media-preview"><img src={previewUrl(asset)} alt={asset.label} loading={asset.category === "SIGNATURE" ? "eager" : "lazy"} decoding="async" /></div><div className="media-meta"><span className="media-kind">{asset.category}</span><span>FFF DROP</span></div><h3>{asset.label}</h3><div className="media-actions"><a href={asset.url} download={asset.filename} target="_blank" rel="noreferrer">DOWNLOAD ↘</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Deploying ${asset.label} for $MWIF. FFF gang only.`)}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></article>)}</div>
      </section>

      <footer className="footer page-frame store-page-footer"><div className="footer-top"><div className="contract-label">STORE // <strong>END_OF_DROP</strong></div><a className="store-home-link" href="#/">RETURN TO MAIN ↗</a></div><div className="footer-bottom"><span>FFF archive mounted // ready for deployment.</span><span>$MWIF // FFF GANG ONLY</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
