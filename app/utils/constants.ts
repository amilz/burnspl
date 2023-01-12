import { PublicKey } from "@solana/web3.js"

export const PROGRAM_ID = new PublicKey('FiRESpaNzgYUiba5vkb44CZJLZjrux1AUECdfwPRsNkg');
export const SOLANA_RPC: string = process.env.NEXT_PUBLIC_RPC as string;
export const FUNGIBLE_USER_SEED = 'fungibleuser';

export const KNOWN_MINTS:KnownMints = {
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU': {
        id: 'samo',
        background: '#CC33FF'
    },
    'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6': {
        id: 'kin',
        background: '#7546f6'
    },
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
        id: 'bonk',
        background: '#FF8103'
    }

}

interface KnownMints {
    [mints: string]:{
        id:string,
        background: string
    }
}