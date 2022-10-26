import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { CoreTolyToken } from "../target/types/core_toly_token";

describe("core-toly-token", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const treasuryAccount = new PublicKey('demouAmvsq6CbpdWzVpfampXdzpFQMbDhei55DjzRCn');
  const wl_mint = new PublicKey('CmA4aTPgssfax6bUbk3Lw1LyxpeVJSvk2yPwaeoFAFGH');
  //const wl_mint_generated = new PublicKey('5orS1sa9eRG9V57xgMJYR2MqCGFkFUPVJFEF1eeVsnbL');
  const program = anchor.workspace.CoreTolyToken as Program<CoreTolyToken>;
  const triesArray = [...Array(10).keys()];
  const [mint_auth, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint_auth")],
    program.programId
  )
/*   it("Initialized", async () => {

    const tx = await program.methods
      .initializeTokenMint()
      .accounts({})
      .rpc();
    console.log("Your transaction signature", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);

  }); */
  it("Flipped!", async () => {
    // Add your test here.
    const wlAta = await getAssociatedTokenAddress(wl_mint, provider.wallet.publicKey);
    try {
      for (let flip in triesArray) {
        console.log(`Flip no: ${flip}`);
        const tx = await program.methods
          .flipCoin(0,bump)
          .accounts({
            programFeeDestination: treasuryAccount,
            wlTokenMint: wl_mint,
            userWlAta: wlAta,
            mintAuthority: mint_auth
          })
          .rpc();
        console.log("Your transaction signature", `https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      }
    }
    catch (err) {
      console.trace(err);
    }


  });
});
