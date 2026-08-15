# $MWIF Upgrade Checklist

- [x] Add true letter-by-letter typing animation for the terminal output.
- [x] Add pulsing green glow and enlarged hover state to the Buy $MWIF CTA.
- [x] Make the logo 90% width on mobile and capped at 400px on desktop, with hover glitch treatment.
- [x] Add or refine the Press F section with a 200px purple button, persistent counter, and five falling F letters per click.
- [x] Add subtle matrix / falling-F background characters at low opacity.
- [x] Add looping green FFF marquee at the bottom of the page.
- [x] Stack FFF cards on mobile with 20px side padding and larger touch targets/type.
- [x] Update footer copy and links to the requested Launching Soon / FFF Gang content.
- [x] Verify build, desktop/mobile rendering, localStorage persistence, and interactions.

## Share on X update

- [x] Add a Share on X button beside the Press F score.
- [x] Generate a URL-encoded X intent containing the current F's Pressed score.
- [x] Verify the button styling, responsive layout, and production build.

## Social links update

- [x] Replace the placeholder X link with https://x.com/iam_mwif?s=11.
- [x] Replace the placeholder Telegram link with https://t.me/mwifportal.
- [x] Verify the updated links and production build.

## Meme-share upgrade

- [x] Add multiple degen-style X post templates that include the live F's Pressed score.
- [x] Randomize or rotate the generated post on each Share on X click.
- [x] Keep posts URL-encoded and open them in the X composer for user review.
- [x] Verify the new share flow and production build.

## Media lab upgrade

- [x] Generate branded $MWIF meme photos for social sharing.
- [x] Generate reusable $MWIF sticker assets for Telegram and X.
- [x] Replace the runtime creator with a static gallery of pre-made sticker/GIF assets and direct download/share actions.
- [x] Add the media lab section to the existing terminal site and keep it responsive.
- [x] Verify media previews, download behavior, share links, and production build.

## Static-only media clarification

- [x] Remove runtime generator expectations from the media-lab plan.
- [x] Prepare only transferable static photos, sticker PNGs, and GIF files.
- [x] Build a static gallery with direct download links and no external runtime dependencies.

## Full website upgrade

- [x] Reconfirm the requested hero typing sequence and character-by-character behavior.
- [x] Confirm Press F sizing, counter persistence, five falling F letters, and hover scale.
- [x] Confirm CTA hover/pulse behavior and responsive button sizing.
- [x] Add F01 matrix background characters and logo glitch hover.
- [x] Confirm logo sizing, stacked mobile cards, and viewport metadata.
- [x] Add green-background black-text infinite FFF marquee.
- [x] Update footer copy and preserve supplied social destinations.
- [x] Add viewport and Open Graph metadata using logo.png.
- [x] Verify desktop/mobile rendering and production build.

## Live F-count share image

- [x] Generate a branded share image in-browser using the current F's Pressed count.
- [x] Add download and social-share controls for the generated image.
- [x] Keep the generator lightweight and compatible with the existing static media pack.
- [x] Verify image generation, responsive preview, and production build.

## Static STORE menu clarification

- [x] Keep every store asset static and transferable.
- [x] Organize all meme images, sticker PNGs, and GIF files under a dedicated STORE menu.
- [x] Provide static previews, categories, and direct download links without runtime generation.

## Classic asset quantities confirmed

- [x] Prepare approximately 100 distinct classic $MWIF meme images.
- [x] Prepare 20 additional classic $MWIF sticker PNGs.
- [x] Prepare 20 additional classic $MWIF GIFs.
- [x] Put every asset into the static STORE menu with direct downloads.

## Press F + NFT scaffold upgrade

- [x] Preserve the current black terminal meme vibe and logo while syncing requested visible behavior.
- [x] Add click.mp3 playback to Press F taps with a safe fallback if audio is unavailable.
- [x] Add 100 F Club, 500 F Club, and 1000 F Club badge states.
- [x] Add the exact Share My Score X intent behavior using the live count.
- [x] Preserve typing animation, green CTA pulse, F01 matrix, marquee, card responsiveness, and footer copy.
- [ ] Complete the hidden NFT scaffold after receiving the remainder of the truncated config specification.
- [x] Verify desktop/mobile interactions and production build.

## GitHub push

- [x] Confirm the latest verified project state is the source to push.
- [x] Prepare a private GitHub repository named `mwif-site` unless a conflict requires a fallback name.
- [x] Commit the current project code and push the default branch.
- [x] Verify the remote repository and report its URL.

## Solana wallet connection

- [x] Add a preparation-only wallet control for Phantom and Solflare.
- [x] Detect installed providers and show install guidance when unavailable.
- [x] Support connect, connected-address display, and disconnect states.
- [x] Keep the control responsive and aligned with the terminal styling.
- [x] Verify the wallet UI and production build without adding transaction logic.

## Public GitHub release

- [x] Audit tracked files and configuration for secrets, wallet credentials, and private tokens.
- [x] Commit and push the latest wallet-ready project state.
- [x] Change `dwarfdeve/mwif-site` from private to public.
- [x] Verify the public repository URL, default branch, and remote commit.
- [x] Document that transaction and launch automation backend work is deferred.

## Public readable repository clarification

- [x] Keep the normal website source readable in the public repository for coder maintenance and publishing.
- [x] Exclude secrets, wallet credentials, and private backend configuration.
- [x] Keep transaction and launch automation backend work separate from this public frontend release.
- [x] Complete the push after GitHub integration is enabled.

## Static GitHub Pages cleanup

- [x] Remove Phantom and Solflare UI, provider detection, connect/disconnect handlers, and NFT wallet messaging.
- [x] Remove `nft-config.js` and the hidden NFT placeholder asset manifest/docs from the public project source.
- [x] Keep the visible Press F, sound, share, store, and static media features intact.
- [x] Add a committed GitHub Pages-compatible `docs` artifact and repository instructions.
- [ ] Verify the static build and public repository contents; Pages source selection remains pending in repository Settings because the GitHub integration lacks Pages-write permission.

## GitHub sync

- [x] Compare the latest local checkpoint with `github/main`.
- [x] Commit any remaining local changes and push all current static-only files.
- [x] Verify the public repository URL, remote commit, and docs artifact on GitHub.

## Public repository protection

- [x] Add an All Rights Reserved license file and visible copyright/usage notices.
- [x] Add a source header notice without pretending browser code is technically uncopyable.
- [x] Apply GitHub branch protection or the closest available canonical-repository control.
- [x] Commit, push, and verify the public repository protection state.

## GitHub Pages diagnosis

- [x] Inspect the live GitHub Pages HTML, console behavior, and asset requests.
- [x] Identify whether the failure is Pages source configuration, base path, or missing static assets.
- [x] Confirm no static artifact fix is required; the published page is rendering correctly.
- [x] Verify the live URL and console behavior after the published build.

## Static HTML diagnosis

- [x] Check the live GitHub Pages HTTP response and content type.
- [x] Check the Pages source configuration and the committed `docs/index.html` artifact.
- [x] Confirm no repair is required; Pages is serving the expected static artifact.
- [x] Recheck the live URL and document the exact result.

## GitHub Pages 404 repair

- [ ] Confirm the repository tree contains the expected static index file and inspect Pages source configuration.
- [ ] Move or mirror the static artifact into the reliable root publishing location with a root `index.html`.
- [ ] Verify the public root URL no longer returns the GitHub Pages 404.

## Interaction polish pass

- [x] Add smooth scroll-reveal animations to major landing-page sections.
- [x] Add refined hover and press feedback to primary buttons while respecting reduced-motion preferences.
- [x] Verify desktop/mobile rendering and save a checkpoint for the interaction pass.

## F-post download consistency fix

- [x] Trace all generated-post and download paths to identify the multiple-format behavior.
- [x] Standardize the downloadable F-post to one fixed canvas format and design.
- [x] Verify the generated preview, download filename, and share flow on desktop and mobile.

## GitHub Pages blank-page repair

- [x] Inspect live HTML, bundle paths, and browser errors for the blank GitHub Pages page.
- [x] Repair the root static artifact or base-path mismatch and repush the fix.
- [x] Verify the public GitHub Pages URL renders successfully after deployment.

## STORE top-menu enhancement

- [ ] Inspect the current header and STORE anchor behavior.
- [ ] Add a prominent special STORE menu item with reliable section scrolling.
- [ ] Verify desktop/mobile navigation and save a checkpoint.

## F-counter meme carousel upgrade

- [x] Inspect the current share-image generator and export controls.
- [x] Add swipeable/clickable terminal-style meme templates with the live F count.
- [x] Validate previews and consistent 1080x1080 PNG downloads on desktop/mobile.
- [x] Rebuild and push the complete static site to GitHub.

## Dedicated STORE page

- [x] Inspect routing, catalog data, and the current landing-page STORE section.
- [x] Create a separate STORE page using the full 105 meme, 20 sticker, and 20 GIF catalog.
- [x] Preserve the existing landing-page interface and verify back-navigation, filters, downloads, and responsive layout.
- [x] Rebuild, push to GitHub, and save a checkpoint.

## Full display and empty-gap repair

- [x] Audit the home and STORE routes for empty space, overflow, missing assets, and responsive display issues.
- [x] Fix the main-page empty gap and any display inconsistencies without changing the project’s core interface.
- [x] Verify desktop/mobile routes, rebuild, push, and save a checkpoint.
