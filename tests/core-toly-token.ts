import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { CoreTolyToken } from "../target/types/core_toly_token";

describe("core-toly-token", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const treasuryAccount = new PublicKey('demouAmvsq6CbpdWzVpfampXdzpFQMbDhei55DjzRCn')
  const program = anchor.workspace.CoreTolyToken as Program<CoreTolyToken>;
  const triesArray = [...Array(10).keys()];
  it("Flipped!", async () => {
    // Add your test here.

  for (let flip in triesArray) {
    console.log(`Flip no: ${flip}`);
    const tx = await program.methods
      .flipCoin(0)
      .accounts({programFeeDestination: treasuryAccount})
      .rpc();
    console.log("Your transaction signature", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  }

  });
});
