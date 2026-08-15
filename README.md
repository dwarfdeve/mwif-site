# $MWIF — Man With F

A static React/Vite meme site for `$MWIF`, preserving the black terminal, phosphor-green, Solana-purple, and hand-drawn MWIF logo direction.

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

The workflow in `.github/workflows/pages.yml` validates the frontend and deploys the committed, self-contained `docs` artifact through GitHub Pages on every push to `main`. The artifact includes the relative-path JavaScript/CSS bundle and the static media under `docs/manus-storage`, so it does not depend on Manus runtime storage. In the repository settings, set **Pages → Source** to **GitHub Actions**. The public project site will then be available at `https://dwarfdeve.github.io/mwif-site/` after the first successful workflow run.

## Future backend boundary

Solana transactions, NFT minting, wallet signatures, collection metadata, and launch automation should be added later as a separate backend or carefully scoped integration. Do not place secrets or private keys in this public repository.
