import { clusterApiUrl, PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID ?? ""
)

export const WL_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_WL_TOKEN_ID ?? ""
)

export const CANDY_MACHINE = new PublicKey(
    process.env.NEXT_PUBLIC_CANDY_MACHINE ?? ""
  )

export const CANDY_MACHINE_AUTHORITY = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_AUTHORITY ?? ""  
)

export const TREASURY = new PublicKey(
    process.env.NEXT_PUBLIC_TREASURY ?? ""
)

export const SOLANA_RPC = (
    process.env.NEXT_PUBLIC_RPC ?? clusterApiUrl('devnet')
)

export const FLIP_COST = (
    process.env.NEXT_PUBLIC_PRICE ?? 0.01
)