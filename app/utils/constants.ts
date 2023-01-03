import { clusterApiUrl, PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey('ChyvGj2ticc6NghwgoUiykJwcZv4NsfYvXQWsLC5Rzwz');
export const BONK_MINT = new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr');
export const SOLANA_RPC = (process.env.NEXT_PUBLIC_RPC ?? clusterApiUrl('devnet'));
export const FUNGIBLE_USER_SEED = 'fungibleuser';