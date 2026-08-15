# Hidden NFT Sticker Assets

The five placeholder sticker assets and `click.mp3` are kept in Manus persistent web storage and referenced by `nft-config.js`. They are intentionally not imported into the client bundle or exposed in the visible STORE menu. The local staging layout used for later GitHub transfer is:

```text
assets/
  click.mp3
  stickers/
    f1.gif
    f2.gif
    f3.png
    f4.png
    f5.gif
```

When the project is transferred to GitHub or another host, replace the storage URIs in `nft-config.js` with the destination's asset URLs or copy the staged files into this layout.
