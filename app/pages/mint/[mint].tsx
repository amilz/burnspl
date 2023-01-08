import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TokenView } from '../../components/TokenView';
import { isPubKey, isTokenMint } from '../../utils/solana';

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
            if (!isPubKey(searchValue)) return;
            const searchKey = new PublicKey(searchValue);
            const info = await connection.getAccountInfo(searchKey);
            if (!info || !info.data) return;
            const isMint = await isTokenMint(info.data, connection);
            if (isMint) setMint(searchKey);
        })();
    }, [router.isReady]);

    return (
        mint ? <TokenView mint={mint}/> : <div>invalid mint</div>
    )
}
