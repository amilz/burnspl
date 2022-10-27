import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js"
import { CoreTolyToken } from "./core_toly_token"
import { Program,  } from "@project-serum/anchor"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { TREASURY, WL_MINT } from "./constants"
  
export async function createFlipInstructions(
    coreTolyProgram: Program<CoreTolyToken>,
    userPubkey: PublicKey,
    flip: 0 | 1, 
): Promise<TransactionInstruction> {
    const [mint_auth] = PublicKey.findProgramAddressSync(
        [Buffer.from("mint_auth")],
        coreTolyProgram.programId
        )
    const [streak_pda] = PublicKey.findProgramAddressSync(
        [Buffer.from("winning_streak"), userPubkey.toBuffer()],
        coreTolyProgram.programId
        )
    const wlAta = await getAssociatedTokenAddress(WL_MINT, userPubkey);
    const tx = await coreTolyProgram.methods
        .flipCoin(flip)
        .accountsStrict({
            flipper: userPubkey,
            programFeeDestination: TREASURY,
            wlTokenMint: WL_MINT,
            userWlAta: wlAta,
            mintAuthority: mint_auth,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            winStreak: streak_pda,
            rent: SYSVAR_RENT_PUBKEY
        })
        .instruction()

    return tx;  

}
  

  

  

