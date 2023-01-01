import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js"
import { BurnBonkIdl } from "./idl"
import { Program,  } from "@project-serum/anchor"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { BONK_MINT } from "./constants"
  
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
  

  

  

