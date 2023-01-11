import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TokenView } from '../../components/TokenView';
import { MintWithMetadata, tryGetTokenMetaData } from '../../utils/metaplex';
import { tryGetPubKey, tryParseTokenMint } from '../../utils/solana';

export default function Home() {
    const [mint, setMint] = useState<PublicKey>();
    const [tokenData, setTokenData] = useState<MintWithMetadata>();
    const router = useRouter();
    const { connection } = useConnection();

    useEffect(() => {
        (async () => {
            if (!router.isReady) return;
            const { mint } = router.query;
            let searchValue = Array.isArray(mint) ? mint[0] : mint;
            if (!searchValue) return;
            const mintPubKey = tryGetPubKey(searchValue);
            if (!mintPubKey) return;
            const info = await connection.getAccountInfo(mintPubKey);
            if (!info || !info.data) return;
            const tokenMintData = await tryParseTokenMint(info.data, connection);
            if (!tokenMintData) return;
            const mintWithMeta = await tryGetTokenMetaData(connection,mintPubKey);
            setTokenData(mintWithMeta);
            setMint(mintWithMeta.mint);
        })();
    }, [router.isReady]);

    return (
        // TO DO ADD LOADING (rn just says invalid while loading)
        // TO DO ADD More margin above body. (hitting the navbar rn)
        tokenData ? <TokenView tokenData={tokenData}/> : <div className='mid-notice'>invalid mint</div>
    )
}
