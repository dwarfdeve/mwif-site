/* Phosphor Terminal style: dedicated archive page, black terminal field, phosphor-green rules, purple interrupt panels, and dense command-line inventory rhythm. */
import { useMemo, useState } from "react";
import { classicStoreAssets } from "../lib/classicStoreAssets";

const filters = ["ALL", "MEME", "STICKER", "GIF"] as const;
type StoreFilter = (typeof filters)[number];

export default function Store() {
  const [filter, setFilter] = useState<StoreFilter>("ALL");
  const visibleAssets = useMemo(
    () => filter === "ALL" ? classicStoreAssets : classicStoreAssets.filter((asset) => asset.category === filter),
    [filter],
  );
  const countFor = (category: StoreFilter) => category === "ALL" ? classicStoreAssets.length : classicStoreAssets.filter((asset) => asset.category === category).length;

  return (
    <main className="site-shell store-page">
      <div className="ambient ambient-top" aria-hidden="true" />
      <header className="topbar page-frame store-page-topbar">
        <a className="micro-brand" href="#/" aria-label="Return to MWIF home"><span className="store-back-mark">←</span><span>MWIF / STORE</span></a>
        <a className="store-home-link" href="#/">RETURN TO MAIN ↗</a>
      </header>

      <section className="store-hero page-frame">
        <div className="eyebrow"><span>STORE_EXECUTABLE</span><span>v.2025.04</span></div>
        <div className="store-title-row"><div><p className="hero-kicker">// STATIC MEDIA ARCHIVE FOR THE F-FORTIFIED</p><h1>CLASSIC <em>DROP</em></h1><p className="store-lede">The full downloadable payload: memes for the timeline, stickers for the group chat, and GIFs for every questionable decision.</p></div><div className="store-terminal-badge"><span>STATUS</span><strong>ONLINE</strong><small>{classicStoreAssets.length} FILES // STATIC ONLY</small></div></div>
      </section>

      <section className="store-inventory page-frame" aria-labelledby="inventory-heading">
        <div className="section-heading"><span className="section-index">[03]</span><h2 id="inventory-heading"><strong>MEDIA_INVENTORY</strong> // FULL_PAYLOAD</h2><span className="section-rule" /></div>
        <div className="store-inventory-bar"><p>{visibleAssets.length} assets mounted // click a category to filter the archive</p><div className="store-toolbar store-page-toolbar" role="tablist" aria-label="Store asset categories">{filters.map((item) => <button key={item} type="button" className={`store-filter ${filter === item ? "is-active" : ""}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item} <span>{countFor(item)}</span></button>)}</div></div>
        <div className="media-grid store-grid store-page-grid">{visibleAssets.map((asset) => <article className="media-card" key={asset.filename}><div className="media-preview"><img src={asset.url} alt={asset.label} loading="lazy" /></div><div className="media-meta"><span className="media-kind">{asset.category}</span><span>STATIC</span></div><h3>{asset.label}</h3><div className="media-actions"><a href={asset.url} download={asset.filename} target="_blank" rel="noreferrer">DOWNLOAD ↘</a><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Deploying ${asset.label} for $MWIF. FFF gang only.`)}`} target="_blank" rel="noreferrer">POST ON X ↗</a></div></article>)}</div>
      </section>

      <footer className="footer page-frame store-page-footer"><div className="footer-top"><div className="contract-label">STORE // <strong>END_OF_DROP</strong></div><a className="store-home-link" href="#/">RETURN TO MAIN ↗</a></div><div className="footer-bottom"><span>All files are static project assets.</span><span>$MWIF // FFF GANG ONLY</span></div></footer>
      <div className="marquee" aria-label="FFF"><div className="marquee-track">FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;FFF FFF FFF FFF&nbsp;&nbsp;&nbsp;</div></div>
    </main>
  );
}
