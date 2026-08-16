/* Phosphor Terminal style: dedicated archive page, black terminal field, phosphor-green rules, purple interrupt panels, and dense command-line inventory rhythm. */
import { useMemo, useState } from "react";
import { classicStoreAssets } from "../lib/classicStoreAssets";

const filters = ["ALL", "SIGNATURE", "MEME", "STICKER", "GIF"] as const;
type StoreFilter = (typeof filters)[number];
type StoreItem = { category: string; label: string; url: string; filename: string; preview?: string };
const previewUrl = (item: StoreItem) => item.preview || item.url.replace(/\.png$/i, ".webp");
const assetPath = (filename: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/mwif-assets/${filename}`;
const releaseAssetPath = (filename: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/assets/${filename}`;
const logoEffectUrl = assetPath("mwif-logo-effect.gif");
const signatureAssets: StoreItem[] = [
  { category: "SIGNATURE", label: "MWIF Logo Effect // Animated GIF", url: logoEffectUrl, filename: "mwif-logo-effect.gif", preview: logoEffectUrl },
  { category: "SIGNATURE", label: "MWIF Logo // Telegram Sticker GIF", url: assetPath("mwif-logo-telegram-sticker.gif"), filename: "mwif-logo-telegram-sticker.gif", preview: assetPath("mwif-logo-telegram-sticker.gif") },
  { category: "SIGNATURE", label: "MWIF Logo // Telegram Sticker WebP", url: assetPath("mwif-logo-telegram-sticker.webp"), filename: "mwif-logo-telegram-sticker.webp", preview: assetPath("mwif-logo-telegram-sticker.webp") },
  { category: "SIGNATURE", label: "MWIF Logo // Transparent Edit Pack", url: assetPath("mwif-logo-transparent.png"), filename: "mwif-logo-transparent.png", preview: assetPath("mwif-logo-transparent.png") },
];

// SECTION 9: SIGNATURE ASSETS
const v6AssetCards = [
  { title: "PRESS F GIF", preview: releaseAssetPath("preview-f.gif"), description: "512x512 WebP. Telegram ready. Transparent BG.", downloads: [{ label: "DOWNLOAD GIF", url: releaseAssetPath("press-f.gif"), filename: "press-f.gif" }, { label: "TELEGRAM STICKER", url: releaseAssetPath("press-f.webp"), filename: "press-f.webp" }] },
  { title: "FFF BADGE PNG", preview: releaseAssetPath("preview-badge.png"), description: "512x512 WebP. Use as profile pic or sticker.", downloads: [{ label: "DOWNLOAD PNG", url: releaseAssetPath("fff-badge.png"), filename: "fff-badge.png" }, { label: "TELEGRAM STICKER", url: releaseAssetPath("fff-badge.webp"), filename: "fff-badge.webp" }] },
  { title: "TERMINAL WALLPAPER", preview: releaseAssetPath("preview-wallpaper.jpg"), description: "1920x1080 + 1080x1920. For X headers and phones.", downloads: [{ label: "DESKTOP 1920×1080", url: releaseAssetPath("wallpaper-1920.jpg"), filename: "wallpaper-1920.jpg" }, { label: "MOBILE 1080×1920", url: releaseAssetPath("wallpaper-1080x1920.jpg"), filename: "wallpaper-1080x1920.jpg" }] },
] as const;
const v6AssetCount = classicStoreAssets.length + signatureAssets.length + 6;

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
        <div className="store-title-row"><div><p className="hero-kicker">// FFF MEDIA VAULT FOR THE F-FORTIFIED</p><h1>CLASSIC <em>DROP</em></h1><p className="store-lede">The complete FFF drop: memes for the timeline, stickers for the group chat, GIFs for every questionable decision, and signature assets for the next transmission.</p></div><div className="store-terminal-badge"><span>STATUS</span><strong>ONLINE</strong><small>{v6AssetCount} FILES // FFF DROP</small></div></div>
      </section>

      <section className="store-feature page-frame" aria-labelledby="logo-drop-heading"><div className="store-feature-copy"><span className="share-image-kicker">MWIF // SIGNATURE_ASSET</span><h2 id="logo-drop-heading">THE MWIF <em>LOGO EFFECT</em></h2><p>Animated scanlines, purple signal, green conviction. Download the effect logo for X, Telegram, edits, and the next FFF transmission.</p><div className="store-feature-actions"><a className="terminal-button filled" href={logoEffectUrl} download="mwif-logo-effect.gif" data-button>DOWNLOAD GIF ↘</a><a className="store-feature-post" href={assetPath("mwif-logo-telegram-sticker.webp")} download="mwif-logo-telegram-sticker.webp">TELEGRAM WEBP ↘</a><a className="store-feature-post" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Deploying the MWIF logo effect. FFF signal online.")}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></div><div className="store-feature-preview"><img src={logoEffectUrl} alt="Animated MWIF logo with terminal scanline and neon signal effect" loading="eager" decoding="async" /><span>GIF // 640×640 // LOOP</span></div></section>

      {/* SECTION 9: SIGNATURE ASSETS */}
      <section className="v6-assets page-frame" aria-labelledby="signature-assets-heading"><div className="section-heading"><span className="section-index">[09]</span><h2 id="signature-assets-heading"><strong>SIGNATURE ASSETS</strong> // BUILD THE MEME</h2><span className="section-rule" /></div><p className="v6-assets-subtitle">Free to use. Build the meme.</p><div className="v6-assets-grid">{v6AssetCards.map((card) => <article className="v6-asset-card" key={card.title}><div className="v6-asset-preview"><img src={card.preview} alt={`${card.title} preview`} loading="eager" decoding="async" /></div><div className="v6-asset-copy"><span className="media-kind">SIGNATURE DROP</span><h3>{card.title}</h3><p>{card.description}</p><div className="v6-asset-downloads">{card.downloads.map((download) => <a key={download.filename} href={download.url} download={download.filename}>{download.label} ↘</a>)}</div></div></article>)}</div><a className="terminal-button filled v6-zip-button" href={releaseAssetPath("MWIF_SIGNATURE_ASSETS.zip")} download="MWIF_SIGNATURE_ASSETS.zip" data-button>DOWNLOAD FULL ASSET PACK .ZIP ↘</a></section>

      {/* SECTION 10: USAGE GUIDE */}
      <section className="usage-guide page-frame" aria-labelledby="usage-guide-heading"><div className="section-heading"><span className="section-index">[10]</span><h2 id="usage-guide-heading"><strong>HOW TO USE THESE ASSETS</strong></h2><span className="section-rule" /></div><div className="usage-grid"><article><span>01 // FOR X / TWITTER</span><p>Post GIFs in replies. Use the FFF badge as your PFP during launch week. Tag #MWIF #FFF #Solana.</p></article><article><span>02 // FOR TELEGRAM</span><p>Download the 512px WebP files. Open Telegram → Settings → Stickers → Create New Pack → upload them as “MWIF FFF”.</p></article><article><span>03 // FOR EDITING / MEMES</span><p>Use transparent PNG/WebP files in CapCut, Photoshop, or Canva. Overlay “Press F” on charts and screenshots. Keep it respectful. Build, don’t shill.</p></article></div><p className="usage-note">Assets are CC0. Do what you want. Just build.</p></section>

      <section className="store-inventory page-frame" aria-labelledby="inventory-heading">
        <div className="section-heading"><span className="section-index">[03]</span><h2 id="inventory-heading"><strong>MEDIA_INVENTORY</strong> // FULL_PAYLOAD</h2><span className="section-rule" /></div>
        <div className="store-inventory-bar"><p>{visibleAssets.length} assets armed // click a category to filter the vault</p><div className="store-toolbar store-page-toolbar" role="tablist" aria-label="Store asset categories">{filters.map((item) => <button key={item} type="button" className={`store-filter ${filter === item ? "is-active" : ""}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item} <span>{countFor(item)}</span></button>)}</div></div>
        <div className="media-grid store-grid store-page-grid">{visibleAssets.map((asset) => <article className="media-card" key={asset.filename}><div className="media-preview"><img src={previewUrl(asset)} alt={asset.label} loading={asset.category === "SIGNATURE" ? "eager" : "lazy"} decoding="async" /></div><div className="media-meta"><span className="media-kind">{asset.category}</span><span>FFF DROP</span></div><h3>{asset.label}</h3><div className="media-actions"><a href={asset.url} download={asset.filename} target="_blank" rel="noreferrer">DOWNLOAD ↘</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Deploying ${asset.label} for $MWIF. FFF gang only.`)}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></article>)}</div>
      </section>

      {/* SECTION 11: FOOTER */}
      <footer className="footer page-frame store-page-footer"><div className="footer-top"><div className="contract-label">STORE // <strong>END_OF_DROP</strong></div><a className="store-home-link" href="#/">RETURN TO MAIN ↗</a></div><div className="footer-bottom"><span>Copyright 2026 $MWIF. Community Owned. Built on Solana.</span><span>All assets free to use. // FFF GANG ONLY</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
