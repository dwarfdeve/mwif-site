// $MWIF NFT sticker drop scaffold.
// This file is intentionally not imported by the client and does not mint or expose secrets.
// Replace placeholder collection values when the Solana drop is ready.

export default {
  collection: {
    name: "$MWIF F Sticker Drop",
    symbol: "MWIF",
    description: "Classic F stickers for the FFF gang.",
    network: "solana-devnet",
    status: "placeholder",
    maxSupply: 5,
    sellerFeeBasisPoints: 500,
    treasury: "TBA",
    candyMachine: "TBA",
  },
  assets: [
    { id: "f1", type: "gif", uri: "/manus-storage/f1_8d61767f.gif", filename: "f1.gif" },
    { id: "f2", type: "gif", uri: "/manus-storage/f2_2088c9cd.gif", filename: "f2.gif" },
    { id: "f3", type: "png", uri: "/manus-storage/f3_280e3a25.png", filename: "f3.png" },
    { id: "f4", type: "png", uri: "/manus-storage/f4_c02dea15.png", filename: "f4.png" },
    { id: "f5", type: "gif", uri: "/manus-storage/f5_89756447.gif", filename: "f5.gif" },
  ],
};
