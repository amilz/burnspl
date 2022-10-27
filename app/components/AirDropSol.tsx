import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SignatureResult } from "@solana/web3.js";
import { FC, useState } from "react"
import styles from "../styles/Home.module.css"
import { generateExplorerUrl } from "../utils/solana";
import { useWallet } from "@solana/wallet-adapter-react"
import Loading from "./Loading";

interface AirDropResult {
    success: boolean,
    txId?: string,
    err?: SignatureResult | string
}

interface AirDropProps {
    onComplete: () => void,
}
const AirDropSol: FC<AirDropProps> = (props: AirDropProps) => {
    const [dropping, setDropping] = useState<boolean>(false);

    async function airdrop1Sol(wallet: PublicKey): Promise<AirDropResult> {
        console.log('requesting an airdrop of 1 sol to:', wallet.toString());
        const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
        if (!wallet) return {
            success: false,
            err: 'No wallet connected'
        };
        setDropping(true);
        const airdropSignature = await SOLANA_CONNECTION.requestAirdrop(
            wallet,
            LAMPORTS_PER_SOL
        );
        const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash();
        console.log(`AIRDROP DETAILS`);
        console.log('latestBlockHash', latestBlockHash.blockhash);
        console.log('lastValidHeight', latestBlockHash.lastValidBlockHeight);

        const confirmation = await SOLANA_CONNECTION.confirmTransaction({
            signature: airdropSignature,
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight
        });

        if (confirmation.value.err) {
            console.log(`ERROR:`, confirmation.value.err);
            setDropping(false);
            return {
                success: false,
                err: confirmation.value
            }
        }
        else {
            console.log('🎉 SUCCESS!', generateExplorerUrl(airdropSignature));
            props.onComplete();
            setDropping(false);
            return {
                success: true,
                txId: airdropSignature
            };
        }
    }
    const { publicKey } = useWallet();

    return (
        <a href="#" className={styles.card}
            onClick={() => {
                if (!publicKey) return;
                airdrop1Sol(publicKey);
                return false;
            }}>
            <h2>{!dropping ? 'Airdrop ◎1' : 'Airdrop in Progress'}</h2>
            {!dropping ? <p>Looks like you don't have any devnet SOL. Click here to get some...</p>
            : <Loading/>}
        </a>
    )
}

export default AirDropSol