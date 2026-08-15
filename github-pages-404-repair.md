# GitHub Pages 404 Repair

The repository’s Pages source was configured as `main /`, while the static entrypoint had been stored only under `docs/index.html`, causing the root 404. The static artifact was moved to the repository root as `index.html`, `assets/`, `manus-storage/`, and `.nojekyll`, and the README was updated accordingly. After pushing commit `f4e6af9`, the public URL `https://dwarfdeve.github.io/mwif-site/` loaded the $MWIF page successfully in the browser with the hero, logo, terminal, Press F controls, STORE filters, and downloadable catalog visible. The root, `/index.html`, JS, CSS, and logo requests returned HTTP 200.

## F-post export consistency repair

Commit `699b1e5` standardizes the in-browser F-post export to one fixed `1080x1080` PNG master named `mwif-f-share.png`, with the UI labeled `SINGLE MASTER`. The canonical root artifact was rebuilt and pushed to `github/main`; the remote head matches the local commit. The public GitHub Pages URL loaded successfully after the push.
