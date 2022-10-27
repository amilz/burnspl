import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SignatureResult } from "@solana/web3.js";
import { FC, useState } from "react"
import styles from "../styles/Home.module.css"
import { generateExplorerUrl } from "../utils/solana";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { CANDY_MACHINE, CANDY_MACHINE_AUTHORITY } from "../utils/constants";
import Loading from "./Loading";

interface CandyMachineProps {
    onComplete: () => void,
}
const CandyMachine: FC<CandyMachineProps> = (props: CandyMachineProps) => {
    const [minting, setMinting] = useState<boolean>(false);
    const [success, setSuccess] = useState<string|null>(null);
    const { connection } = useConnection();
    const walletAdapter = useWallet();
    const METAPLEX = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter));


    async function mintNft(): Promise<void> {
        setMinting(true);
        const candyMachine = await METAPLEX.candyMachines().findByAddress({ address: CANDY_MACHINE });
        try {
            let { nft, response } = await METAPLEX.candyMachines().mint({
                candyMachine,
                collectionUpdateAuthority: CANDY_MACHINE_AUTHORITY,
            }, { commitment: 'finalized' })
            if (!nft.address) {setSuccess('Error fetching your NFT. Check your wallet.'); return;}
            let url = generateExplorerUrl(response.signature, 'devnet', nft.address.toString());
            setSuccess(url);            
        }
        catch (err) {
            throw new Error(`Unable to mint NFT: ${err}`)
        }
        finally {
            props.onComplete();
            setMinting(false);
        }
    }
    const { publicKey } = useWallet();

    return (<>
        {!success && (<a href="#" className={styles.card}
            onClick={() => {
                if (!publicKey) return;
                mintNft();
                return false;
            }}>
            <h2>{!minting ? 'Mint a Toly Token NFT' : 'Minting your NFT'}</h2>
            {!minting ? <p>Click here to initiate candy machine and get your NFT!</p>
            : <Loading/>}
        </a>)}
        {success && (<a 
            href={success} 
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                setSuccess(null);
            }}>
            <h2>Sweet new NFT!</h2>
            <p>Click to see your NFT!</p>
        </a>)}
        </>
    )
}

export default CandyMachine