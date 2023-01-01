import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js"
import { BurnBonkIdl } from "./idl"
import { Program,  } from "@project-serum/anchor"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { BONK_MINT } from "./constants"
import { BN } from "bn.js"
  
export async function createInitBurnAccountIx(
    bonkBurnProgram: Program<BurnBonkIdl>,
    userPubkey: PublicKey,
    userName: string, 
): Promise<TransactionInstruction> {
    const [BURN_SCORE] = await PublicKey.findProgramAddressSync(
        [Buffer.from("bonkburn"), userPubkey.toBytes()],
        bonkBurnProgram.programId
      );
    const tx = await bonkBurnProgram.methods
        .initialize(userName)
        .accountsStrict({
            newBurnScore: BURN_SCORE,
            signer: userPubkey,
            systemProgram: SystemProgram.programId,
        })
        .instruction()

    return tx;  

}

export async function createBurnIx(
    bonkBurnProgram: Program<BurnBonkIdl>,
    userPubkey: PublicKey,
    amountToBurn: string, 
): Promise<TransactionInstruction> {
    const [BURN_SCORE] = await PublicKey.findProgramAddressSync(
        [Buffer.from("bonkburn"), userPubkey.toBytes()],
        bonkBurnProgram.programId
      );
    const TOKEN_ACCOUNT = await getAssociatedTokenAddress(BONK_MINT,userPubkey);

    const tx = await bonkBurnProgram.methods
        .burnToken(new BN(amountToBurn))
        .accountsStrict({
            mint: BONK_MINT,
            tokenProgram: TOKEN_PROGRAM_ID,
            from: TOKEN_ACCOUNT,
            authority: userPubkey,
            burnScore: BURN_SCORE
        })
        .instruction()

    return tx;  

}
  

  

  

