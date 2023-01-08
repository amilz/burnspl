import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { getBonkBalance } from '../utils/solana'
import BurnTable from './BurnTable'
import NavBar from './NavBar'
import BonkLogo from '../public/bonklogo.webp';
import Image from "next/image";
import { BONK_MINT } from '../utils/constants'
import { PublicKey } from '@solana/web3.js'
import TotalBonkBurned from './TotalBonkBurned'

export const HomeView: FC = ({ }) => {
    const [solBalance, setSolBalance] = useState<number>(0);
    const [bonkBalance, setBonkBalance] = useState<number>(0);
    const [refreshSol, refreshSolTrigger] = useState<boolean>(false);
    const [refreshBonk, refreshBonkTrigger] = useState<boolean>(false);
    const [totalBurn, setTotalBurn] = useState<number>(0);
    const { publicKey } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (!publicKey) {
            setBonkBalance(0); // if user disconnects wallet, reset a 0 balance
            return;
        };
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
                <title>The Bonk Fire</title>
                <meta name="description" content="Track BONK Burns" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>
            <main className={styles.main}>
                <NavBar tokenBalance={bonkBalance} tokenSymbol={'BONK'} />
                <Image src={BonkLogo} className='on-top' height={200} alt="Bonk" />
                <TotalBonkBurned bonkBurned={totalBurn} />
                <BurnTable mint={new PublicKey(BONK_MINT)} updateTotalBurn={(amt) => { setTotalBurn(amt) }} />
                {/* <Init onInit={()=>{console.log('on init')}} />  */}
            </main>
            {/* <Footer /> */}
        </div>
    )
}