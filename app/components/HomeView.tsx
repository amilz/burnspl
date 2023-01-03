import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Head from 'next/head'
import { FC, useEffect, useState } from 'react'
import Template from '../components/ClickTemplate'
import styles from '../styles/Home.module.css'
import { getSolBalance, getBonkBalance } from '../utils/solana'
import BurnTable from './BurnTable'
import Footer from './Footer'
import NavBar from './NavBar'
import WalletBalances from './WalletBalances'
import BonkLogo from '../public/bonklogo.webp';
import Image from "next/image";


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
                <meta name="description" content="BuildSpace Core 2022 Demo Project" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            </Head>
            <main className={styles.main}>
                <NavBar tokenBalance={bonkBalance} tokenSymbol={'BONK'} />

                <Image src={BonkLogo} height={200} alt="Bonk" />

                <BurnTable />
                {/* <Init onInit={()=>{console.log('on init')}} />  */}
            </main>
            {/* <Footer /> */}
        </div>
    )
}
