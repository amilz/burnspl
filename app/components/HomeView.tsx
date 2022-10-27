import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import AirDropSol from '../components/AirDropSol'
import Template from '../components/ClickTemplate'
import styles from '../styles/Home.module.css'
import { FLIP_COST } from '../utils/constants'
import { getSolBalance, getWlBalance } from '../utils/solana'
import CandyMachine from './CandyMachine'
import FlipCoin from './FlipCoin'
import Footer from './Footer'
import WalletBalances from './WalletBalances'

export const HomeView: FC = ({ }) => {
    const [solBalance, setSolBalance] = useState<number>(0);
    const [wlBalance, setWlBalance] = useState<number>(0);
    const [refreshSol, refreshSolTrigger] = useState<boolean>(false);
    const [refreshWl, refreshWlTrigger] = useState<boolean>(false);

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
                let wlBalance = await getWlBalance(publicKey.toString(), connection);
                setWlBalance(wlBalance);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [publicKey, connection, refreshWl])

    return (
        <div className={styles.container}>
            <Head>
                <title>Toly Token Flip</title>
                <meta name="description" content="BuildSpace Core 2022 Demo Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="">Toly Flip!</a>
                </h1>
                <WalletMultiButton className={styles["wallet-adapter-button-trigger"]} />

                <p className={styles.description}>
                    Flip a coin for <code className={styles.code}>◎{FLIP_COST}</code> for a chance to win a free Mint!
                </p>
                <WalletBalances solBalance={solBalance} wlBalance={wlBalance} />

                {connected &&
                    <div className={styles.grid}>
                        {(solBalance < 1) && <AirDropSol onComplete={() => refreshSolTrigger(prevCheck => !prevCheck)} />}
                        {(solBalance > 1) && <FlipCoin onWin={() => refreshWlTrigger(prevCheck => !prevCheck)} />}
                        {(wlBalance  > 1) && <CandyMachine onComplete={() => refreshWlTrigger(prevCheck => !prevCheck)} />}
                    </div>}
            </main>
            <Footer/>         
        </div>
    )
}
