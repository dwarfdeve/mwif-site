# $MWIF — Man With F

A static React/Vite meme site for `$MWIF`, preserving the black terminal, phosphor-green, Solana-purple, and hand-drawn MWIF logo direction. The project is proprietary and published for canonical viewing and maintenance; see [`LICENSE`](./LICENSE) and [`NOTICE.md`](./NOTICE.md) before using any code or media.

## Static-only scope

The repository contains only frontend code and static browser interactions: terminal typing, Press F localStorage counting, click sound, falling F animation, score sharing, client-side share-image generation, and a downloadable static media store. Wallet connection, NFT minting, transaction signing, private keys, backend APIs, and launch automations are intentionally not included.

## Local development

```bash
pnpm install
pnpm dev
```

## Production build

```bash
pnpm check
pnpm build
```

## GitHub Pages

GitHub Pages serves the committed, self-contained static artifact from the repository root on `main`. The root includes `index.html`, `assets/`, and `manus-storage/` with relative paths, so it does not depend on Manus runtime storage. In the repository settings, set **Pages → Source** to **Deploy from a branch**, choose `main`, and choose the `/ (root)` folder. The public project site is `https://dwarfdeve.github.io/mwif-site/`.

## Future backend boundary

Solana transactions, NFT minting, wallet signatures, collection metadata, and launch automation should be added later as a separate backend or carefully scoped integration. Do not place secrets or private keys in this public repository.
