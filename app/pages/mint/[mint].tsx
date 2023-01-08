import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TokenView } from '../../components/TokenView';
import { tryGetPubKey, tryParseTokenMint } from '../../utils/solana';

export default function Home() {
    const [mint, setMint] = useState<PublicKey>();
    const router = useRouter();
    const { connection } = useConnection();

    useEffect(() => {
        (async () => {
            if (!router.isReady) return;
            const { mint } = router.query;
            let searchValue = Array.isArray(mint) ? mint[0] : mint;
            if (!searchValue) return;
            const searchKey = tryGetPubKey(searchValue);
            if (!searchKey) return;
            const info = await connection.getAccountInfo(searchKey);
            if (!info || !info.data) return;
            const tokenMintData = await tryParseTokenMint(info.data, connection);
            if (tokenMintData) setMint(searchKey);
            // POTENTIAL TO DO: migrate some/all of this logic to a useAccountInfo hook
        })();
    }, [router.isReady]);

    return (
        mint ? <TokenView mint={mint}/> : <div>invalid mint</div>
    )
}
