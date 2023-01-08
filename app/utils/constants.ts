import { PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey('FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg');
export const SOLANA_RPC: string = process.env.NEXT_PUBLIC_RPC as string;
export const FUNGIBLE_USER_SEED = 'fungibleuser';

export const TOKEN_CONFIG = {
    mint: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
    name: 'Bonk',
    symbol: 'BONK'
}