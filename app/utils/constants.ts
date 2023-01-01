import { clusterApiUrl, PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID ?? ""
)

export const BONK_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_BONK_TOKEN_ID ?? ""
)

export const SOLANA_RPC = (
    process.env.NEXT_PUBLIC_RPC ?? clusterApiUrl('devnet')
)