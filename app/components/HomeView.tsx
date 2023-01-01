import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import Template from '../components/ClickTemplate'
import styles from '../styles/Home.module.css'
import { getSolBalance, getBonkBalance } from '../utils/solana'
import FlipCoin from './FlipCoin'
import Footer from './Footer'
import Init from './Init'
import WalletBalances from './WalletBalances'

export const HomeView: FC = ({ }) => {
    const [solBalance, setSolBalance] = useState<number>(0);
    const [bonkBalance, setBonkBalance] = useState<number>(0);
    const [refreshSol, refreshSolTrigger] = useState<boolean>(false);
    const [refreshBonk, refreshBonkTrigger] = useState<boolean>(false);

    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (!publicKey) return;
        (async () => {
            try {
                let balance = await getSolBalance(connection, publicKey);
                setSolBalance(balance);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [publicKey, connection, refreshSol])
    useEffect(() => {
        if (!publicKey) return;
        (async () => {
            try {
                let bonkBalance = await getBonkBalance(publicKey.toString(), connection);
                setBonkBalance(bonkBalance);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [publicKey, connection, refreshBonk])

    return (
        <div className={styles.container}>
            <Head>
                <title>Bonk Burn</title>
                <meta name="description" content="BuildSpace Core 2022 Demo Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="">Bonk Burn!</a>
                </h1>
                <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />

                <p className={styles.description}>
                    Burn <code className={styles.code}>$BONK</code> to join the ranks!
                </p>
                {connected && <WalletBalances solBalance={solBalance} bonkBalance={bonkBalance} />
}
                {connected &&
                    <div className={styles.grid}>
                        <Init onInit={()=>{console.log('on init')}} /> 
                        {/* INSERT MEAT HERE */}
                    </div>}
            </main>
            <Footer/>         
        </div>
    )
}
