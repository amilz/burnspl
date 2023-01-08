import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";


export const tryGetTokenMetaData = async(solanaConnection: Connection, mintAddress: PublicKey): Promise<MintWithMetadata> => {
    let result: MintWithMetadata = {mint: mintAddress};
    try {
        const METAPLEX = Metaplex.make(solanaConnection);
        const sft = await METAPLEX.nfts().findByMint({ mintAddress });
        result.img = sft.json?.image;
        result.name = sft.name;
        result.symbol = sft.symbol;
        result.decimals = sft.mint.decimals;
        let supply = parseInt(sft.mint.supply.basisPoints.toString())/(10**result.decimals);
        result.supply = supply;
        return result;
    } 
    catch {
        return result;
    }
    // TO DO ADD A REGISTRY LOOKUP IF NO DATA FOUND
}

export interface MintWithMetadata {
    mint: PublicKey,
    name?: string,
    symbol?: string, 
    img?: string,
    decimals?: number,
    supply?: any
}
