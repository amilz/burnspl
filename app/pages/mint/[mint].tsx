import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { TokenView } from '../../components/TokenView';
import { KNOWN_MINTS } from '../../utils/knownMints';
import { MintWithMetadata, tryGetTokenMetaData } from '../../utils/metaplex';
import { tryGetPubKey, tryParseTokenMint } from '../../utils/solana';

export default function Home() {
    const [mint, setMint] = useState<PublicKey>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tokenData, setTokenData] = useState<MintWithMetadata>();
    const [customDiv, setCustomDiv] = useState<JSX.Element>();
    const router = useRouter();
    const { connection } = useConnection();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            if (!router.isReady) { setIsLoading(false); return };
            const { mint } = router.query;
            let searchValue = Array.isArray(mint) ? mint[0] : mint;
            if (!searchValue) { setIsLoading(false); return };
            let knownTokenId = Object.keys(KNOWN_MINTS).find(address => KNOWN_MINTS[address].id === searchValue);
            if (knownTokenId) {searchValue = knownTokenId}
            let knownMint = Object.keys(KNOWN_MINTS).find(address => address === searchValue);
            if (knownMint) { document.body.style.backgroundColor = KNOWN_MINTS[knownMint].background }
            else { document.body.style.backgroundColor = "black" }
            if (knownMint && KNOWN_MINTS[knownMint].customDiv) {setCustomDiv(KNOWN_MINTS[knownMint].customDiv)}
            const mintPubKey = tryGetPubKey(searchValue);
            if (!mintPubKey) { setIsLoading(false); return };
            const info = await connection.getAccountInfo(mintPubKey);
            if (!info || !info.data) { setIsLoading(false); return };
            const tokenMintData = await tryParseTokenMint(info.data, connection);
            if (!tokenMintData) { setIsLoading(false); return };
            const mintWithMeta = await tryGetTokenMetaData(connection, mintPubKey);
            setTokenData(mintWithMeta);
            setMint(mintWithMeta.mint);
            setIsLoading(false);
        })();
    }, [router.isReady, router.query, connection]);

    return (
        // TO DO ADD More margin above body. (hitting the navbar rn)
        <>
            {tokenData ? <>{customDiv ?? ''} <TokenView tokenData={tokenData} /></> :
                !isLoading ? <div className='mid-notice'>invalid mint</div> :
                    <div className="mid-notice"><Loading show={isLoading} text={'Loading . . . '} /></div>}
        </>
    )
}
